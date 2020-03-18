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

    getDistributedEvents(date);

    $("#event-datepicker").val(date);
    $('.select-system-date').val(date);
    $(".match_date_filter").val(date);

    sessionStorage.setItem("date", date);
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

$('.table-association').on('click', '.change-prediction', function() {
    var associateEventId = $(this).data("associationId");

    $.ajax({
        url: config.coreUrl + "/association/detail/" + associateEventId + "?" + getToken(),
        type: "get",
        success: function (response) {
            var element = $('#modal-change-association-prediction');
            var template = element.find('.template-modal-content').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(response);
            element.find('.modal-content').html(html);
            element.modal();
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

$("#modal-change-association-prediction").on("click", ".update-prediction", function() {
    var associationId = $(this).parents("form").find(".association-id").val();
    var predictionId = $(this).parents("form").find("#prediction").val();
    var odd = $(this).parents("form").find("#odd").val();

    $.ajax({
        url: config.coreUrl + "/association/update-prediction?" + getToken(),
        method: "POST",
        data: {
            associationId: associationId,
            predictionId: predictionId,
            odd: odd
        },
        success: function (response) {
            if (response.error) {
                alert(response.error.message);
            } else {
                $('#modal-change-association-prediction').modal('hide');
    
                var element = $('#modal-change-association-prediction-report');
                var template = element.find('.template-modal-content').html();
                var compiledTemplate = Template7.compile(template);
                var html = compiledTemplate(response);
                element.find('.modal-content').html(html);
                element.modal();
            }

        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

$("#modal-change-association-prediction-report").on("click", ".save-prediction-report", function() {
    var associationId = $(this).parents(".modal-content").find(".association-id").val();
    var siteIds = $(this).parents(".modal-content").find(".siteIds").map(function(){return $(this).val();}).get();
    var actions = $(this).parents(".modal-content").find(".actions").map(function(){return $(this).val();}).get();

    if (siteIds.length == 0) {
        var date = $('#association-system-date').val();
        $("#modal-change-association-prediction-report").modal("hide");
        getEventsAssociations('nun', date);
        getEventsAssociations('nuv', date);
    } else {
        $.ajax({
            url: config.coreUrl + "/association/update-published-prediction?" + getToken(),
            method: "POST",
            data: {
                associationId: associationId,
                siteIds: siteIds,
                actions: actions
            },
            success: function (response) {
                $('#modal-change-association-prediction-report').modal('hide');
    
                var element = $('#modal-change-association-prediction-published-report');
                var template = element.find('.template-modal-content').html();
                var compiledTemplate = Template7.compile(template);
                var html = compiledTemplate(response);
                element.find('.modal-content').html(html);
                element.modal();
    
                var date = $('#association-system-date').val();
                getEventsAssociations('nun', date);
                getEventsAssociations('nuv', date);
            },
            error: function (xhr, textStatus, errorTrown) {
                manageError(xhr, textStatus, errorTrown);
            }
        });
    }

});


    /*
     *  ----- Modal Add New Event -----
    ----------------------------------------------------------------------*/

// Modal Add Event
// Launch modal for add new event
config.association.on('click', '.add-manual-event', function() {
    $("[href='#default']").first().attr("href", "#event");
    var panelHtml = $("#multiple-add-panel-template").html();
    $(panelHtml).insertBefore($(".add-multiple").parent());
    $(".panel-collapse").last().attr("id", "event");
    $("[href='#event']").first().attr("href", "#default");
    getPredictions();

    // fetch the countries for the 'manual event' -> select countries drop down 
    getCountries();

    var container = $('#modal-add-manual-event [name="association-modal-event-type[]"]');
    showContentBasedOnEventType($(container).val(), container);
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
    
    $('#modal-add-manual-event').modal({
        backdrop: 'static',
        keyboard: false
    });
    $('#modal-add-manual-event').modal('show');
    if (sessionStorage.getItem("date")) {
        $(".match_date_filter").val(sessionStorage.getItem("date"));
    }
});

// Modal Add Event
// when change type of new event show differit content based os selection
$('#modal-add-manual-event').on('change', '[name="association-modal-event-type[]"]', function() {
    $(this).parent().siblings(".match-id").first().val(null);
    showContentBasedOnEventType($(this).val(), $(this))
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
$('#modal-add-manual-event').on("keyup", ".search-match", function() {
    var table = $(this).parents().eq(5).find('.select-table').first().val();
    var filterValue = $(this).val().trim();
    var filterDate = $(this).parents().eq(3).find('.match_date_filter').val();
    var dateFilterQuery = '';
    if( typeof filterDate != 'undefined' && filterDate != 'none' ) {
        dateFilterQuery = "/"+filterDate;
    }

    if (typeof matchFilterAjax !='undefined' ) {
        matchFilterAjax.abort();
    }

    if (filterValue.length < 2) {
        $(this).parents().eq(3).find('.selectable-block').first().addClass('hidden');
        return;
    }

    var container = $(this);
    matchFilterAjax = $.ajax({
        url: config.coreUrl + "/match/filter/" + table + "/" + filterValue + dateFilterQuery + "?" + getToken(),
        type: "get",
        success: function (response) {
            console.log(response);
            var data = {matches: response};
            $(container).parents().eq(3).find('.selectable-block').removeClass('hidden');

            var template = $(container).parents().eq(3).find('.template-selectable-block').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
            $(container).parents().eq(3).find('.selectable-block').html(html);
        },
        error: function (xhr, textStatus, errorTrown) {
            // we don't throw error if the request was 'aborted'
            if( errorTrown != 'abort' ) {
                manageError(xhr, textStatus, errorTrown);
            }
        }
    });
});
$("#modal-add-manual-event").on("change", ".select-prediction", function() {
    var currentElement = $(this);
    var prediction = $(this).val();
    var match = $(this).parents().eq(4).find(".match-id").val();

    if (match) {
        $.ajax({
            url: config.coreUrl + "/match/prediction/odds/" + prediction + "/" + match + "?" + getToken(),
            type: "get",
            success: function (response) {
                var arrow = "";
                if (isNaN(response.initial_odd)) {
                    arrow = ' <span class="text-danger modal-odd-status"><i class="fa fa-times"></i></span>'
                } else if (response.odd > response.initial_odd) {
                    arrow = ' <span class="text-success modal-odd-status" data-odd="' + response.odd + '" data-initial-odd="' + response.initial_odd + '"><i class="fa fa-arrow-up"></i></span>'
                } else if (response.odd < response.initial_odd) {
                    arrow = ' <span class="text-danger modal-odd-status" data-odd="' + response.odd + '" data-initial-odd="' + response.initial_odd + '"><i class="fa fa-arrow-down"></i></span>'
                }

                $(currentElement).parents().eq(2).find(".odd").val(response.odd);
                $(currentElement).parents().eq(2).find(".modal-odd-status").remove();
                $(currentElement).parents().eq(2).find(".odd-label").append(arrow);

                var popOverSettings = {
                    placement: 'right',
                    container: 'body',
                    trigger: 'hover',
                    html: true,
                    selector: '.modal-odd-status',
                    content: function () {
                        return parseFloat($(this).data("initialOdd")).toFixed(2) + " >> " + parseFloat($(this).data("odd")).toFixed(2);
                    }
                };
                
                $('#modal-add-manual-event').popover(popOverSettings);
            },
            error: function (xhr, textStatus, errorTrown) {
                // we don't throw error if the request was 'aborted'
                if( errorTrown != 'abort' ) {
                    manageError(xhr, textStatus, errorTrown);
                }
            }
        });
    }
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
// Hide the search results when closing the modal and reset the manual event dropdowns 
$('#modal-add-manual-event').on('hidden.bs.modal', function(e) { 
    $('#modal-add-manual-event').find('.selectable-block').addClass('hidden');
	$('#manual_event_league_sel').empty().append('<option value="-">-</option>');
	$('#manual_event_home_sel').empty().append('<option value="-">-</option>');
	$('#manual_event_away_sel').empty().append('<option value="-">-</option>');
});

// Modal Add Event --- add complete event
// click on selectable-row to choose it
$('#modal-add-manual-event').on('click', '.selectable-row', function() {
    var matchId = $(this).attr('data-id');
    var leagueId = $(this).attr('data-league-id');
    var container = $(this);

    // return if click on no available events
    if (typeof matchId === typeof undefined || matchId === false)
        return;

    if (typeof leagueId === typeof undefined || leagueId === false)
        return;

    // put content in html input
    $(this).parents().eq(2).find('.search-match').val($(this).html());

    // put id in hidden input .match-id
    $(this).parents().eq(5).find('.match-id').val(matchId);
    $(this).parents().eq(5).find('.league-id').val(leagueId);
    $(this).parents().eq(5).find('.selectable-block').addClass('hidden');

    // get selected event and complete confirmation step with event details
    /*
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
    */
});

/* ------ Country / League / Team drop-down actions ------- */
// Clickable - country selection
// change country selection
// show leagues in selected country.
$('#modal-add-manual-event').on('change', '.manual_event_country_sel' , function() {
    var country_code = $(this).val();
    var country = $(this).find("option:selected").first().text();

    if( country_code == '-' ) {
        $(this).find('.modal-add-manual-event .confirm-event .country').first().html( '-' );
        $(this).find('.manual_event_league_sel').first().empty().append('<option value="-">-</option>');
        $(this).find('.manual_event_home_sel').first().empty().append('<option value="-">-</option>');
        $(this).find('.manual_event_away_sel').first().empty().append('<option value="-">-</option>');
        return;
    }
    $('.modal-add-manual-event .confirm-event .country').html( country );

    getCountryLeagues(country_code, $(this));
});
// Clickable - league selection
// change league selection
// show teams in selected league.
$('#modal-add-manual-event').on('change', '.manual_event_league_sel', function() {
    var leagueId = $(this).val();
    var league = $(this).find('.manual_event_league_sel option:selected' ).first().text();
    
    if( leagueId == '-' ) {
        $('#modal-add-manual-event .confirm-event .league').html( '-' );
        $('#manual_event_home_sel').empty().append('<option value="-">-</option>');
        $('#manual_event_away_sel').empty().append('<option value="-">-</option>');
        return;
    }
    $('#modal-add-manual-event .confirm-event .league').html( league );
    getLeagueTeams(leagueId, $(this));
});
// Clickable - Home/Away team selection
// set the html for the confirm poage
$('#modal-add-manual-event').on('change', '#manual_event_home_sel', function() {
	var homeTeam = $('#modal-add-manual-event #manual_event_home_sel option:selected' ).text();		
	var awayTeam = $('#modal-add-manual-event #manual_event_away_sel option:selected' ).text();	
		
	$('#modal-add-manual-event .confirm-event .teams').html(homeTeam + ' - '+ awayTeam);
});	
$('#modal-add-manual-event').on('change', '#manual_event_away_sel', function() {
	var homeTeam = $('#modal-add-manual-event #manual_event_home_sel option:selected' ).text();		
	var awayTeam = $('#modal-add-manual-event #manual_event_away_sel option:selected' ).text();	
		
	$('#modal-add-manual-event .confirm-event .teams').html(homeTeam + ' - '+ awayTeam);
});	
	
    /*
     *  ----- Modal Available Events -----
    ----------------------------------------------------------------------*/

function ajaxGetAvailableEvents(parrentTable, date) {
    var filters = {
        table: parrentTable.attr('data-table'),
        provider: parrentTable.find('.select-provider').val(),
        league: parrentTable.find('.select-league').val(),
        minOdd: parrentTable.find('.select-minOdd').val(),
        maxOdd: parrentTable.find('.select-maxOdd').val(),
        date: date
    };

    $.ajax({
        url: config.coreUrl + "/event/available?" + $.param(filters) + "&" + getToken(),
        type: "get",
        success: function (response) {
            var element = $('#modal-available-events');
            var data = {
                table: filters.table,
                events: response,
                systemDate: date,
            };

            var template = element.find('.template-modal-content').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
            element.find('.modal-content').html(html);
            $("#association-event-datepicker").datepicker({ dateFormat: 'yy-mm-dd' });
            $("#association-event-datepicker").datepicker("setDate", date);
            element.modal();
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}
    
// Modal Available Events
// get available events filtered by selection: proviser, league, minOdd, maxOdd
// launch modal available events
$('.table-association').on('click', '.modal-get-event', function() {
    var parrentTable = $(this).parents('.table-association');
    var date = $("#association-system-date").val();
    ajaxGetAvailableEvents(parrentTable, date);
});

$('#modal-available-events').on("change", "#association-event-datepicker", function() {
    var parrentTable = $(this).parents('.table-association');
    var date = $(this).val();
    ajaxGetAvailableEvents(parrentTable, date);
});

// Modal Available Events
// action submit to import selected event(s) in table
$('#modal-available-events').on('click', '.import', function() {
    var ids = [];
    var table = $('#modal-available-events .table-identifier').val();
    var events = [];

    // get events ids for association
    $('#modal-available-events .use:checked').each(function() {
        var event = {};
        event.id = $(this).attr('data-id');
        event.table = table;
        events.push(event);
    });

    $.ajax({
        url: config.coreUrl + "/association" + "?" + getToken(),
        type: "post",
        dataType: "json",
        data: {
            events: events,
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
            console.log(response);
            if (typeof(response.sites) == "object") {
                response.sites = Object.keys(response.sites).map(key => response.sites[key])
            }
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
            
            // check the checkbox near the site name
            // the real values are stored in the hidden checkboxes
            // of the site's packages
            $("#modal-associate-events .use:checked").parents(".site-container").find(".check-site-packages").prop("checked", true);
            
            element.modal();
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// toggle on/off site packages
$("#modal-associate-events").on("change", ".check-site-packages", function() {
    var sitePackages = $(this).parent().parent().find(".use");
    $(sitePackages).each(function(index, element) {
        $(element).prop("checked", !$(element).prop("checked"));
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
            sessionStorage.setItem("date", config.association.find('#association-system-date').val());
            var element = $('#table-association-' + argTable);
            var table = element.find('.association-table-datatable').DataTable();

            // clear table
            table.clear().draw();
            $.each(response, function(i, e) {
                e.odd = parseFloat(e.odd);
                e.initial_odd = parseFloat(e.initial_odd);

                var disabled = e.to_distribute ? "" : "disabled";
                var buttons = '<button type="button" class="btn green btn-outline search-events-btn modal-available-packages" ' + disabled + '>Associate</button>';
                if (argTable == "nun" || argTable == "nuv") {
                    buttons += '<button type="button" class="btn yellow btn-outline change-prediction" data-association-id="' + e.id + '">Update</button>'
                }
                buttons += '<button type="button" class="btn red btn-outline search-events-btn delete-event">Del</button>';

                var arrow = "";

                if (isNaN(e.initial_odd)) {
                    arrow = ' <span class="text-danger"><i class="fa fa-times"></i></span>'
                } else if (e.odd > e.initial_odd) {
                    arrow = ' <span class="text-success odd-status" data-odd="' + e.odd + '" data-initial-odd="' + e.initial_odd + '"><i class="fa fa-arrow-up"></i></span>'
                } else if (e.odd < e.initial_odd) {
                    arrow = ' <span class="text-danger odd-status" data-odd="' + e.odd + '" data-initial-odd="' + e.initial_odd + '"><i class="fa fa-arrow-down"></i></span>'
                }
            
                var node = table.row.add( [
                    e.country,
                    e.league,
                    e.homeTeam,
                    e.awayTeam,
                    parseFloat(e.odd).toFixed(2) + arrow,
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

            var popOverSettings = {
                placement: 'right',
                container: 'body',
                trigger: 'hover',
                html: true,
                selector: '.odd-status', //Sepcify the selector here
                content: function () {
                    return parseFloat($(this).data("initialOdd")).toFixed(2) + " >> " + parseFloat($(this).data("odd")).toFixed(2);
                }
            }
            
            $('body').popover(popOverSettings);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

/******************************************************************************/
/*********  MULTIPLE ADD MODAL     ********************************************/
/******************************************************************************/
    
// clone the panel form inputs and append to the panel body
$(document).on('click', '.add-multiple', function() {
    var remove = "";

    if($(this).parents().eq(2).find('.multiple-panel').find('.container-multiple').length == 1) {
        remove = '';
        remove += '<div class="row form-group">'
        remove += '<button class="btn btn-xs btn-danger pull-right itm-m-r-10 remove" type="button" title="Remove"><i class="fa fa-times"></i></button>';
        remove += '</div>';
        $(this).parents().eq(2).find(".multiple-panel").find('.container-multiple').first().prepend(remove);
    }

    var html = '';
    html += '<div class="panel panel-primary itm-none itm-panel">';
    html += $(this).parents().eq(2).find(".panel").last().html();
    html += '</div>';
    
    $(".modal a[data-parent='#accordion']").last().trigger("click");
    $(html).insertBefore($(this).parent());
    $(".itm-panel-counter").last().text($(".itm-panel-counter").length - 1);

    $(".modal .panel.panel-primary").slideDown('slow', function() {
        $('.modal [name="association-modal-event-type[]"]').last().trigger("change");
        $(this).removeClass("itm-none");
    });
    var length = $(".modal .panel.panel-primary").length;
    $(".modal .panel.panel-primary").last().find(".panel-heading").attr("href", "#events" + length);
    $(".modal .panel-collapse").last().attr("id", "events" + length);

    $('.modal .timepicker-24').timepicker({
        autoclose: true,
        minuteStep: 5,
        showSeconds: false,
        showMeridian: false
    });
});

// remove the item from the panel body
$(document).on('click', '.modal .remove', function() {
    var element = $(this);
    var length = $(element).parents().eq(6).find('.container-multiple').length;

    $(element).parents().eq(4).fadeOut('slow', function() {
        if (--length <= 1) {
            $(element).parents().eq(6).find('.container-multiple').find('.remove').parent().remove();
        }
        $(this).remove();
    });

    $(this).parents().eq(1).slideUp('slow', function() {});
});

// Functions ----- Modal Add Event
// @string type
// manage content when change event type (noTip, create, add)
function showContentBasedOnEventType(type, container) {
    // add class hidden  for all .add-event-option
    $(container).parent().parent().find('.add-event-option').addClass('hidden');

    if (type === 'noTip') {
        $(container).parent().parent().find('.add-event-option.option-no-tip').removeClass('hidden');
    }
    if (type === 'create') {
        $(container).parent().parent().find('.add-event-option.option-create').removeClass('hidden');
        $(container).parent().parent().find('.add-event-option.option-add-create').removeClass('hidden');
    }

    if (type === 'add') {
        $(container).parent().parent().find('.add-event-option.option-add').removeClass('hidden');
        $(container).parent().parent().find('.add-event-option.option-add-create').removeClass('hidden');
    }
}

// used to determine which panels to remove
var ajaxRequestsStatus = {
    addEvent: false,
    createEvent: false,
    addNoTip: false
}

$('#modal-add-manual-event').on('hidden.bs.modal', function () {
    deleteInsertedPanels("add");
    deleteInsertedPanels("create");
    deleteInsertedPanels("noTip");
})

$("#modal-add-manual-event").on("click", ".save-events", function() {
    // reset ajax flags
    ajaxRequestsStatus = {
        addEvent: false,
        createEvent: false,
        addNoTip: false
    }
    
    var addEvents = [];
    var createEvents = [];
    var noTipEvents = [];
    var currentDate = $('#association-system-date').val();

    $("#modal-add-manual-event .container-multiple").each(function () {
        var eventType = $(this).find("[name='association-modal-event-type[]']").first().val();

        if (eventType === 'add') {
            addEvents.push(mapAddEventData($(this)));
        }
        if (eventType === 'create') {
            createEvents.push(mapCreateEventData($(this)));
        }
        if (eventType === 'noTip') {
            noTipEvents.push(mapNoTipEventData($(this)));
        }
    });
    
    if (addEvents.length > 0) {
        ajaxAddEvent(addEvents, currentDate);
    } else {
        ajaxRequestsStatus.addEvent = true;
    }
    if (createEvents.length > 0) {
        ajaxCreateEvent(createEvents, currentDate);
    } else {
        ajaxRequestsStatus.createEvent = true;
    }
    if (noTipEvents.length > 0) {
        ajaxAddNoTipEvent(noTipEvents, currentDate);
    } else {
        ajaxRequestsStatus.addNoTip = true;
    }
});

function validateAjaxRequests() {
    if (
        ajaxRequestsStatus.addEvent === true &&
        ajaxRequestsStatus.createEvent === true &&
        ajaxRequestsStatus.addNoTip === true
    ) {
        return true;
    }
    return false;
}

function deleteInsertedPanels(eventType) {
    var selects = $("#modal-add-manual-event [name='association-modal-event-type[]']");
    $(selects).each(function(index, element) {
        if ($(element).val() == eventType) {
            $(element).parents(".panel.panel-primary").first().remove();
            var panelLength = $('#modal-add-manual-event .panel.panel-primary').length;
            if (panelLength <= 1) {
                $('#modal-add-manual-event .panel.panel-primary').find(".remove").first().remove()
            }
        }
    });
}

function ajaxAddEvent(data, currentDate) {
    $.ajax({
        url: config.coreUrl + "/event/create-from-match" + "?" + getToken(),
        type: "post",
        dataType: "json",
        data: {
            events: data
        },
        success: function (response) {
            if (response.type == 'error') {
                for (var index in response.data) {
                    if (response.data[index].type == "error") {
                        var errorMessage = "";
                        errorMessage = `Panel ${parseInt(index) + 1}# Type: 'Add Event' \n`;
                        errorMessage += `Message: ${response.data[index].message}`;
                        alert(errorMessage);
                    }
                }
                return;
            }

            // map the id from the events saved in the DB
            for (var index in response.data) {
                data[index].id = response.data[index].id;
            }
            // start seccond ajax to create association event - table
            $.ajax({
                url: config.coreUrl + "/association" + "?" + getToken(),
                type: "post",
                dataType: "json",
                data: {
                    events: data,
                    systemDate: currentDate,
                },
                beforeSend: function() {},
                success: function (r) {
                    console.log(r);
                    alert("Type: --- " + r.type + " --- \r\n" + r.message);
                    // refresh table to see new entry
                    var tables = [];
                    for (var index in data) {
                        if (tables.indexOf(data[index].table) == -1) {
                            getEventsAssociations(data[index].table, currentDate);
                            tables.push(data[index].table);
                        }
                    }
                    ajaxRequestsStatus.addEvent = true;
                    if (validateAjaxRequests()) {
                        $('#modal-add-manual-event').modal('hide');
                    }
                    deleteInsertedPanels("add");
                },
                error: function (xhr, textStatus, errorTrown) {
                    console.log(errorTrown);
                    manageError(xhr, textStatus, errorTrown);
                }
            });
        },
        error: function (xhr, textStatus, errorTrown) {
            console.log(errorTrown);
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

function ajaxCreateEvent(data, currentDate) {
    $.ajax({
        url: config.coreUrl + "/event/create-manually-bulk" + "?" + getToken(),
        type: "post",
        data: {
            events: data
        },
        success: function (response) {
            console.log(response);
            if (response.type == 'error') {
                for (var index in response.data) {
                    if (response.data[index].type == "error") {
                        var errorMessage = "";
                        errorMessage = `Panel ${parseInt(index) + 1}# Type: 'Create Event' \n`;
                        errorMessage += `${response.data[index].data.homeTeam} - ${response.data[index].data.awayTeam} \n`;
                        errorMessage += `Message: ${response.data[index].message}`;
                        alert(errorMessage);
                    }
                }
                return;
            }
            // map the id from the events saved in the DB
            for (var index in response.data) {
                data[index].id = response.data[index].id;
            }
            console.log(data);
            // start seccond ajax to create association event - table
            $.ajax({
                url: config.coreUrl + "/association" + "?" + getToken(),
                type: "post",
                dataType: "json",
                data: {
                    events: data,
                    systemDate: currentDate,
                },
                success: function (r) {
                    console.log(r);
                    alert("Type: --- " + r.type + " --- \r\n" + r.message);
                    
                    // refresh table to see new entry
                    var tables = [];
                    for (var index in data) {
                        if (tables.indexOf(data[index].table) == -1) {
                            getEventsAssociations(data[index].table, currentDate);
                            tables.push(data[index].table);
                        }
                    }
                    ajaxRequestsStatus.createEvent = true;
                    if (validateAjaxRequests()) {
                        $('#modal-add-manual-event').modal('hide');
                    }
                    deleteInsertedPanels("create")

                    // TODO clean inputs
                },
                error: function (xhr, textStatus, errorTrown) {
                    manageError(xhr, textStatus, errorTrown);
                }
            });
        },
        error: function (xhr, textStatus, errorTrown) {
            console.log(errorTrown);
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

function ajaxAddNoTipEvent(data, currentDate) {
    $.ajax({
        url: config.coreUrl + "/association/no-tip" + "?" + getToken(),
        type: "post",
        dataType: "json",
        data: {
            table : data,
            systemDate: currentDate,
        },
        success: function (response) {
            console.log(response);
            if (response.type == 'error') {
                for (var index in response.data) {
                    if (response.data[index].type == "error") {
                        var errorMessage = "";
                        errorMessage = `Panel ${parseInt(index) + 1}# Type: 'Add No Tip' \n`
                        errorMessage += `Message: ${response.data[index].message}`;
                        alert(errorMessage);
                    }
                }
                return;
            }

            // refresh table to see new entry
            var tables = [];
            for (var index in data) {
                if (tables.indexOf(data[index].table) == -1) {
                    getEventsAssociations(data[index].table, currentDate);
                    tables.push(data[index].table);
                }
            }
            ajaxRequestsStatus.addNoTip = true;
            if (validateAjaxRequests()) {
                $('#modal-add-manual-event').modal('hide');
            }
            deleteInsertedPanels("noTip");
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

function mapAddEventData(container) {
    var table = $(container).find("[name='table[]']").first().val();
    var matchId = $(container).find("[name='match_id[]']").val();
    var odd = $(container).find("[name='odd[]']").first().val();
    var predictionId = $(container).find("[name='prediction[]']").first().val();

    var data = {
        matchId: matchId,
        odd: odd,
        predictionId: predictionId,
        table: table
    };
    return data;
}

function mapCreateEventData(container) {
    var table = $(container).find("[name='table[]']").first().val();
    var eventDate = $(container).find("[name='event_date[]']").first().val();
    var eventTime = $(container).find($("[name='event_time[]']")).first().val();
    var countryCode = $(container).find("[name='country[]']").first().val();
    var leagueId = $(container).find("[name='league[]']").first().val();
    var homeTeamId = $(container).find("[name='home_team[]']").first().val();
    var awayTeamId = $(container).find("[name='away_team[]']").first().val();
    var predictionId = $(container).find("[name='prediction[]']").first().val();
    var odd = $(container).find("[name='odd[]']").first().val();
    var homeTeam = $(container).find("[name='home_team[]'] option:selected").first().text();
    var awayTeam = $(container).find("[name='away_team[]'] option:selected").first().text();
    var country = $(container).find("[name='country[]'] option:selected").first().text();
    var league = $(container).find("[name='league[]'] option:selected").first().text();

    var data = {
        eventDate: eventDate + " " + eventTime,
        eventTime: eventTime,
        countryCode: countryCode,
        leagueId: leagueId,
        homeTeamId: homeTeamId,
        awayTeamId: awayTeamId,
        predictionId: predictionId,
        odd: odd,
        homeTeam: homeTeam,
        awayTeam: awayTeam,
        country: country,
        league: league,
        table: table
    };
    return data;
}

function mapNoTipEventData(container) {
    var table = $(container).find("[name='table[]']").first().val();

    var data = {
        table: table
    };
    return data;
}

function getPredictions() {
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
}

function getCountries() {
    $.ajax({
        url: config.coreUrl + "/leagues/get-all-countries?" + getToken(),
        type: "get",
        success: function (response) {
            var options_string = '';
            var options_string = '<option value="-">-</option>';
            $.each(response, function(i, e) {
                options_string += '<option value="'+e.code+'" >'+e.name+'</option>';
            });
            // clear the countries select options and re-generate them
            $('.manual_event_country_sel').empty().append(options_string);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

function getCountryLeagues(country_code, container) {
    $.ajax({
        url: config.coreUrl + "/leagues/get-country-leagues/" + country_code + "?" + getToken(),
        type: "get",
        success: function (response) {
            var options_string = '<option value="-">-</option>';
            $.each(response, function(i, e) {
                options_string += '<option value="'+e.id+'" >'+e.name+'</option>';
            });
            // clear the league select options and re-generate them
            $(container).parent().parent().next().find('.manual_event_league_sel').first().empty().append(options_string);			
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

function getLeagueTeams(leagueId, container) {
    $.ajax({
        url: config.coreUrl + "/leagues/get-league-teams/" + leagueId + "?" + getToken(),
        type: "get",
        success: function (response) {
            var options_string = '<option value="-">-</option>';
            $.each(response, function(i, e) {
                options_string += '<option value="'+e.id+'" >'+e.name+'</option>';
            });
            // clear the teams select options and re-generate them
            $(container).parent().parent().next().find('.manual_event_home_sel').empty().append(options_string);
            $(container).parent().parent().next().next().find('.manual_event_away_sel').empty().append(options_string);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}