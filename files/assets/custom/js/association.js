config.association = $('.page-content-wrapper.association');


    /*
     *  ----- CLICKABLE ACTIONS -----
    ----------------------------------------------------------------------*/

// reload content in tables when change systemDate selector
$('#association-system-date').on('change', function() {
    var date = $(this).val();

    getEventsAssociations('run', date);
    getEventsAssociations('ruv', date);
    getEventsAssociations('nun', date);
    getEventsAssociations('nuv', date);
});

    /*
     *  ----- 4 Tables -----
    ----------------------------------------------------------------------*/

// 4 Tables
// refresh table filters: provider, leagues
// refresh available events number
$('.table-association').on('click', '.refresh-event-info', function() {
    var table = $(this).parents('.table-association').attr('data-table');

    getTableAvailableFiltersValues(table);
    getAvailableEventsNumber({ table: table });
});

// 4 Tables
// show available events number when change provider, league, odds selection
$('.table-association').on('change', '.select-provider, .select-league, .select-minOdd, .select-maxOdd', function() {
    var parrentTable = $(this).parents('.table-association');

    getAvailableEventsNumber({
        table: parrentTable.attr('data-table'),
        provider: parrentTable.find('.select-provider').val(),
        league: parrentTable.find('.select-league').val(),
        minOdd: parrentTable.find('.select-minOdd').val(),
        maxOdd: parrentTable.find('.select-maxOdd').val()
    });
});

// 4 Tables
// delete an event associated with a table
$('.table-association').on('click', '.delete-event', function() {
    var $this = $(this);
    var id = $this.parents('tr').attr('data-id');

    $.ajax({
        url: config.coreUrl + "/association/delete/" + id + "?" + getToken(),
        type: "get",
        success: function (response) {
            alert("Type: --- " + response.type + " --- \r\n" + response.message);
            getEventsAssociations($this.parents('.table-association').attr('data-table'), $('#association-system-date').val());
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

    /*
     *  ----- Modal Add New Event -----
    ----------------------------------------------------------------------*/

// Modal Add Event
// Launch modal for add new event
config.association.on('click', '.add-manual-event', function() {
    $.ajax({
        url: config.coreUrl + "/prediction?" + getToken(),
        type: "get",
        success: function (response) {

            var data = {predictions: response};
            var element = $('#modal-add-manual-event');

            var template = element.find('.template-select-prediction').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);

            element.find('.select-prediction').html(html);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
	
	// fetch the countries for the 'manual event' -> select countries drop down 
	$.ajax({
        url: config.coreUrl + "/leagues/get-all-countries?" + getToken(),
        type: "get",
        success: function (response) {
			console.log(response);
			
			var options_string = '';
			var options_string = '<option value="-">-</option>';
			$.each(response, function(i, e) {
				// options_string += '<option value="'+e.country_code+'" >'+e.name+'</option>';
				options_string += '<option value="'+e.code+'" >'+e.name+'</option>';
			});
			// clear the countries select options and re-generate them
			// $('#manual_event_country_sel').html('');
			// $('#manual_event_country_sel').html(options_string);
			$('#manual_event_country_sel').append(options_string);
			
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });

    showContentBasedOnEventType($('#modal-add-manual-event [name="association-modal-event-type"]:checked').val());
    $('#modal-add-manual-event .confirm-event .systemDate').html($('#association-system-date').val());
    $('#modal-add-manual-event .confirm-event .table').html($('#modal-add-manual-event .select-table option:selected').val());

    // reset modal fields
    $('#modal-add-manual-event .select-table').val('run').change();
    $('#modal-add-manual-event .search-match').val('');
    $('#modal-add-manual-event .odd').val('');
    $('#modal-add-manual-event .confirm-event .country').html('-');
    $('#modal-add-manual-event .confirm-event .league').html('-');
    $('#modal-add-manual-event .confirm-event .teams').html('-');
    $('#modal-add-manual-event .confirm-event .prediction').html('-');
    $('#modal-add-manual-event .confirm-event .odd').html('-');

    $('#modal-add-manual-event .button-previous').trigger('click');

    $('#modal-add-manual-event').modal('show');
});

// Modal Add Event
// when change type of new event show differit content based os selection
$('#modal-add-manual-event').on('change', '[name="association-modal-event-type"]', function() {
    showContentBasedOnEventType($(this).val())
});

// Modal Add Event
// when change prediction show text in confirm area
$('#modal-add-manual-event').on('change', '.select-prediction', function() {
    var element = $('#modal-add-manual-event');

    var matchId = element.find('.match-id').val();
    var leagueId = element.find('.league-id').val();
    var predictionId = $(this).val();

    element.find('.confirm-event .prediction').html(predictionId);

    $.ajax({
        url: config.coreUrl + "/odd/get-value?" + getToken(),
        type: "post",
        data: {
            matchId: matchId,
            leagueId: leagueId,
            predictionId: predictionId,
        },
        success: function (response) {
            if (response.type == 'success'){
                element.find('.odd').val(response.value);
                element.find('.confirm-event .odd').html(response.value);
            }
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// Modal Add Event
// when change table show text in confirm area
$('#modal-add-manual-event').on('change', '.select-table', function() {
    $('#modal-add-manual-event .confirm-event .table').html($(this).val());
});

// Modal Add Event
// show odd on confirm add event modal
$('#modal-add-manual-event .odd').keyup(function() {
    $('#modal-add-manual-event .confirm-event .odd').html($(this).val());
});

// Modal Add Event --- add complete event
var matchFilterAjax; // define an variable to be used for the Ajax call ( in order to cancel older requests when we make a new one )
// live search fot available events
// every keyup means a new search
$('#modal-add-manual-event .search-match').keyup(function() {
    var element = $('#modal-add-manual-event');
    var table = element.find('.select-table').val();
    var filterValue = $(this).val().trim();
	var filterDate = $('#match_date_filter').val();
	var dateFilterQuery = '';
	if( typeof filterDate != 'undefined' && filterDate != 'none' ) {
		dateFilterQuery = "/"+filterDate;
	}
	
	if (typeof matchFilterAjax !='undefined' ) {
		matchFilterAjax.abort();
	}

    if (filterValue.length < 2) {
        element.find('.selectable-block').addClass('hidden');
        return;
    }
	
	
    matchFilterAjax = $.ajax({
        url: config.coreUrl + "/match/filter/" + table + "/" + filterValue + dateFilterQuery + "?" + getToken(),
        type: "get",
        success: function (response) {

            var data = {matches: response};
            element.find('.selectable-block').removeClass('hidden');

            var template = element.find('.template-selectable-block').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
            element.find('.selectable-block').html(html);
        },
        error: function (xhr, textStatus, errorTrown) {
			// we don't throw error if the request was 'aborted'
			if( errorTrown != 'abort' ) {
				manageError(xhr, textStatus, errorTrown);
			}
        }
    });
});
// Date select change means a new search
$('#modal-add-manual-event #match_date_filter').on('change',function() {
    var element = $('#modal-add-manual-event');
    var table = element.find('.select-table').val();
    var filterValue = $('#modal-add-manual-event .search-match').val().trim();
	var filterDate = $('#match_date_filter').val();
	var dateFilterQuery = '';
	if( typeof filterDate != 'undefined' && filterDate != 'none' ) {
		dateFilterQuery = "/"+filterDate;
	}

	if (typeof matchFilterAjax !='undefined' ) {
		matchFilterAjax.abort();
	}
	
    if (filterValue.length < 2) {
        element.find('.selectable-block').addClass('hidden');
        return;
    }
	
	
    matchFilterAjax = $.ajax({
        url: config.coreUrl + "/match/filter/" + table + "/" + filterValue + dateFilterQuery + "?" + getToken(),
        type: "get",
        success: function (response) {

            var data = {matches: response};
            element.find('.selectable-block').removeClass('hidden');

            var template = element.find('.template-selectable-block').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
            element.find('.selectable-block').html(html);
        },
        error: function (xhr, textStatus, errorTrown) {
			// we don't throw error if the request was 'aborted'
			if( errorTrown != 'abort' ) {
				manageError(xhr, textStatus, errorTrown);
			}
        }
    });
});
// Hide the search results when closing the modal
$('#modal-add-manual-event').on('hidden.bs.modal', function(e) { 
    $('#modal-add-manual-event').find('.selectable-block').addClass('hidden');
});

// Modal Add Event --- add complete event
// click on selectable-row to choose it
$('#modal-add-manual-event .selectable-block').on('click', '.selectable-row', function() {
    var matchId = $(this).attr('data-id');
    var leagueId = $(this).attr('data-league-id');

    // return if click on no available events
    if (typeof matchId === typeof undefined || matchId === false)
        return;

    if (typeof leagueId === typeof undefined || leagueId === false)
        return;

    var element = $('#modal-add-manual-event');

    // put content in html input
    element.find('.search-match').val($(this).html());

    // put id in hidden input .match-id
    element.find('.match-id').val(matchId);
    element.find('.league-id').val(leagueId);
    element.find('.selectable-block').addClass('hidden');

    // get selected event and complete confirmation step with event details
    $.ajax({
        url: config.coreUrl + "/match/" + matchId + "?" + getToken(),
        type: "get",
        success: function (response) {
            var element = $('#modal-add-manual-event .confirm-event');
            element.find('.country').html(response.country);
            element.find('.league').html(response.league);
            element.find('.teams').html(response.homeTeam + ' - ' + response.awayTeam);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// Modal Add Event
// submit action to add new event
$('#modal-add-manual-event').on('click', '.button-submit', function() {
    // check what user want to do: add no tip, add tip from events or create tip
    var eventType = $('#modal-add-manual-event [name="association-modal-event-type"]:checked').val();
    var table = $('#modal-add-manual-event .select-table').val();
    var currentDate = $('#association-system-date').val();

    if (eventType === 'noTip') {
        $.ajax({
            url: config.coreUrl + "/association/no-tip" + "?" + getToken(),
            type: "post",
            dataType: "json",
            data: {
                table : table,
                systemDate: currentDate,
            },
            success: function (r) {
                alert("Type: --- " + r.type + " --- \r\n" + r.message);

                // refresh table to see new entry
                getEventsAssociations(table, currentDate);
                $('#modal-add-manual-event').modal('hide');
            },
            error: function (xhr, textStatus, errorTrown) {
                manageError(xhr, textStatus, errorTrown);
            }
        });

        return;
    }

    if (eventType === 'create') {
        alert('Not implemented yet!');
        return;
    }

    if (eventType === 'add') {
        // get match id
        var matchId = $('#modal-add-manual-event').find('.match-id').val();

        $.ajax({
            url: config.coreUrl + "/event/create-from-match" + "?" + getToken(),
            type: "post",
            dataType: "json",
            data: {
                matchId: matchId,
                predictionId: $('#modal-add-manual-event .select-prediction').val(),
                odd: $('#modal-add-manual-event .odd').val(),
            },
            success: function (response) {
                alert("Type: --- " + response.type + " --- \r\n" + response.message);
                if (response.type == 'error')
                    return;

                // start seccond ajax to create association event - table
                $.ajax({
                    url: config.coreUrl + "/association" + "?" + getToken(),
                    type: "post",
                    dataType: "json",
                    data: {
                        eventsIds: [response.data.id],
                        table : table,
                        systemDate: currentDate,
                    },
                    beforeSend: function() {},
                    success: function (r) {
                        alert("Type: --- " + r.type + " --- \r\n" + r.message);
                        // refresh table to see new entry
                        getEventsAssociations(table, currentDate);
                        $('#modal-add-manual-event').modal('hide');

                        // TODO clean inputs
                    },
                    error: function (xhr, textStatus, errorTrown) {
                        manageError(xhr, textStatus, errorTrown);
                    }
                });
            },
            error: function (xhr, textStatus, errorTrown) {
                manageError(xhr, textStatus, errorTrown);
            }
        });
        return;
    }
});

/* ------ Country / League / Team drop-down actions ------- */
// Clickable - country selection
// change country selection
// show leagues in selected country.
$('#modal-add-manual-event').on('change', '#manual_event_country_sel' , function() {
	var country_code = $('#manual_event_country_sel').val();
	if( country_code == '-' ) {
		return;
	}
	
    $.ajax({
        url: config.coreUrl + "/leagues/get-country-leagues/" + country_code + "?" + getToken(),
        type: "get",
        success: function (response) {
            console.log(response);
			
			var options_string = '<option value="-">-</option>';
			$.each(response, function(i, e) {
				// options_string += '<option value="'+e.league_id+'" >'+e.title+'</option>';
				options_string += '<option value="'+e.id+'" >'+e.name+'</option>';
			});
			// clear the league select options and re-generate them
			$('#manual_event_league_sel').append(options_string);
			
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});
// Clickable - league selection
// change league selection
// show teams in selected league.
$('#modal-add-manual-event').on('change', '#manual_event_league_sel', function() {
	var league = $('#manual_event_league_sel').val();
	if( league == '-' ) {
		return;
	}
	
    $.ajax({
        url: config.coreUrl + "/leagues/get-league-teams/" + league + "?" + getToken(),
        type: "get",
        success: function (response) {			
            console.log(response);
			
			var options_string = '<option value="-">-</option>';
			$.each(response, function(i, e) {
				// options_string += '<option value="'+e.team_id+'" >'+e.title+'</option>';
				options_string += '<option value="'+e.id+'" >'+e.name+'</option>';
			});
			// clear the teams select options and re-generate them
			$('#manual_event_home_sel').append(options_string);
			$('#manual_event_away_sel').append(options_string);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

	
    /*
     *  ----- Modal Available Events -----
    ----------------------------------------------------------------------*/

// Modal Available Events
// get available events filtered by selection: proviser, league, minOdd, maxOdd
// launch modal available events
$('.table-association').on('click', '.modal-get-event', function() {
    var parrentTable = $(this).parents('.table-association');

    var filters = {
        table: parrentTable.attr('data-table'),
        provider: parrentTable.find('.select-provider').val(),
        league: parrentTable.find('.select-league').val(),
        minOdd: parrentTable.find('.select-minOdd').val(),
        maxOdd: parrentTable.find('.select-maxOdd').val()
    };

    $.ajax({
        url: config.coreUrl + "/event/available?" + $.param(filters) + "&" + getToken(),
        type: "get",
        success: function (response) {

            var element = $('#modal-available-events');
            var data = {
                table: filters.table,
                events: response,
                systemDate: $('#association-system-date').val(),
            };

            var template = element.find('.template-modal-content').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
            element.find('.modal-content').html(html);
            element.modal();
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// Modal Available Events
// action submit to import selected event(s) in table
$('#modal-available-events').on('click', '.import', function() {
    var ids = [];
    var table = $('#modal-available-events .table-identifier').val();

    // get events ids for association
    $('#modal-available-events .use:checked').each(function() {
        ids.push($(this).attr('data-id'));
    });

    $.ajax({
        url: config.coreUrl + "/association" + "?" + getToken(),
        type: "post",
        dataType: "json",
        data: {
            eventsIds: ids,
            table : table,
            systemDate: $('#association-system-date').val(),
        },
        beforeSend: function() {},
        success: function (response) {
            alert("Type: --- " + response.type + " --- \r\n" + response.message);

            $('#modal-available-events').modal('hide');
            getEventsAssociations(table, $('#association-system-date').val());
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

    /*
     *  ----- Modal Associate Event-Packages -----
    ----------------------------------------------------------------------*/

// Modal Associate Event-Packages
// launch modal for associate event - packages
$('.table-association').on('click', '.modal-available-packages', function() {
    var associateEventId = $(this).parents('tr').attr('data-id');
    var table = $(this).parents('.table-association').attr('data-table');
    var date = $('#association-system-date').val();

    $.ajax({
        url: config.coreUrl + "/association/package/available/" + table + "/" + associateEventId  +"/" + date + "?" + getToken(),
        type: "get",
        success: function (response) {

            if (response.type === "error") {
                alert("Type: --- " + response.type + " --- \r\n" + response.message);
                return;
            }

            var element = $('#modal-associate-events');
            // add table identifier to data object for show in modal
            var data = response;
            data.table = table;

            var template = element.find('.template-modal-content').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
            element.find('.modal-content').html(html);

            element.modal();
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});


// Modal Associate Event-Packages
// action submit for create/delete associations event - packages
$('#modal-associate-events').on('click', '.associate-event', function() {
    // get events ids for association
    var packagesIds = [];
    $('#modal-associate-events .use:checked').each(function() {
        packagesIds.push($(this).attr('data-id'));
    });

    $.ajax({
        url: config.coreUrl + "/distribution" + "?" + getToken(),
        type: "post",
        dataType: "json",
        data: {
            packagesIds: packagesIds,
            eventId : $('#modal-associate-events .event-id').val(),
        },
        success: function (response) {

            // refresh table to see new association numbers
            var currentDate = $('#association-system-date').val();
            var table = $('#modal-associate-events .table-identifier').val();
            getEventsAssociations(table, currentDate);

            alert("Type: --- " + response.type + " --- \r\n" + response.message);
            if (response.type == "success")
                $('#modal-associate-events').modal('hide');
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// Modal Associate Event-Packages
// check / uncheck all events with same tip
$('#modal-associate-events').on('click', '.use', function() {
    var c = $(this).closest('.tip-identifier').find('.use');
    var val = $(this).is(':checked') ? true : false;
    c.prop('checked', val);
});

    /*
     *  ----- Functions -----
    ----------------------------------------------------------------------*/

// Functions
// @string tableIdentifier
// will populate table filters with available values in db
//  - provider select
//  - league select
function getTableAvailableFiltersValues(tableIdentifier) {
    $.ajax({
        url: config.coreUrl + "/event/available-filters-values/" + tableIdentifier + "?" + getToken(),
        type: "get",
        success: function (response) {

            var table = $('#table-association-' + tableIdentifier);

            var template = table.find('.template-select-provider').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(response);
            table.find('.select-provider').html(html);

            var template = table.find('.template-select-league').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(response);
            table.find('.select-league').html(html);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

// Functions
// @object filters {table, provider, league, minOdd, maxOdd}
// show in table available events number based on filters
function getAvailableEventsNumber(filters) {
    $.ajax({
        url: config.coreUrl + "/event/available/number?" + $.param(filters) + "&" + getToken(),
        type: "get",
        success: function (response) {
            var data = {number: response};
            var element = $('#table-association-' + filters.table);

            var template = element.find('.template-events-number').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
            element.find('.events-number').html(html);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

// Functions
// @string argTable
// @string date
// get associated events - table based on date format: YYYY-mm-dd
// first clear DataTable, after repopulate it add row by row.
function getEventsAssociations(argTable, date = '0') {
    $.ajax({
        url: config.coreUrl + "/association/event/" + argTable + '/' + date + "?" + getToken(),
        type: "get",
        success: function (response) {

            var element = $('#table-association-' + argTable);
            var table = element.find('.association-table-datatable').DataTable();
            var buttons = '<button type="button" class="btn green btn-outline search-events-btn modal-available-packages">Associate</button>';
            buttons += '<button type="button" class="btn red btn-outline search-events-btn delete-event">Del</button>';

            // clear table
            table.clear().draw();
            $.each(response, function(i, e) {

                var node = table.row.add( [
                    e.country,
                    e.league,
                    e.homeTeam,
                    e.awayTeam,
                    e.odd,
                    e.predictionId,
                    e.result,
                    (e.status) ? e.status.name: '???',
                    e.eventDate,
                    e.systemDate,
                    buttons + ' ' + e.distributedNumber + ' ' + e.provider,
                ] ).draw(false).node();

                // add data-id attribute to inserted row
                $(node).attr('data-id', e.id);
            });
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

// Functions ----- Modal Add Event
// @string type
// manage content when change event type (noTip, create, add)
function showContentBasedOnEventType(type) {
    // add class hidden  for all .add-event-option
    $('#modal-add-manual-event .add-event-option').addClass('hidden');

    if (type === 'noTip')
        $('#modal-add-manual-event .add-event-option.option-no-tip').removeClass('hidden');

    if (type === 'create') {
        $('#modal-add-manual-event .add-event-option.option-create').removeClass('hidden');
        $('#modal-add-manual-event .add-event-option.option-add-create').removeClass('hidden');
    }

    if (type === 'add') {
        $('#modal-add-manual-event .add-event-option.option-add').removeClass('hidden');
        $('#modal-add-manual-event .add-event-option.option-add-create').removeClass('hidden');
    }
}
