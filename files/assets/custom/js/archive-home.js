config.archiveHome = $('.page-content-wrapper.archive-home');

    /*
     *  ----- CLICKABLE ACTIONS -----
    ----------------------------------------------------------------------*/

// Clickable - site selection
// change site selection
// show available tables for selected site.
config.archiveHome.on('change', '.select-site', function() {
    $.ajax({
        url: config.coreUrl + "/site/available-table/" + $(this).val() + "?" + getToken(),
        type: "get",
        success: function (response) {

            var data = {
                tables: response,
            }
            var element = config.archiveHome;

            var template = element.find('.template-select-table').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
            element.find('.select-table').html(html).change();
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// Clickable - table selection
// change table selection
// get archive events for selected: site, table
config.archiveHome.on('change', '.select-table', function() {
    archiveHomeGetTableEvents();
});

// Clickable - publish changes in site
// publish allbig archive changes in site
// - for all tables
config.archiveHome.on('click', '.publishInSite', function() {
    var siteId = config.archiveHome.find('.select-site').val();

    if (siteId ==  '-') {
        alert('You must select a site.');
        return;
    }

    $.ajax({
        url: config.coreUrl + "/site/update-archive-home/" + siteId  + "?" + getToken(),
        type: "get",
        success: function (response) {
            alert("Type: --- " + response.type + " --- \r\n" + response.message);
        },
        error: function (xhr, textStatus, errorTrown) {
            //manageError(xhr, textStatus, errorTrown);
        }
    });
});

// Clickable - save configuration
// save home archive configuration.
config.archiveHome.on('click', '.save-configuration', function() {

    var param = {
        siteId: config.archiveHome.find('.select-site').val(),
        tableIdentifier: config.archiveHome.find('.select-table').val(),
        eventsNumber: config.archiveHome.find('.events-number').val(),
        dateStart: config.archiveHome.find('.date-start').val(),
    };

    var message = "Events before: " + param.dateStart + " will be deleted\n";
    message += "It will be keep only " + param.eventsNumber + " in descending order.\n";
    message += "You can not undo this operation!\n";

    var date = new Date(param.dateStart);
    var today = new Date();
    today.setDate(today.getDate() - 5);
    var dateDiff = new Date(today - date);

    if (dateDiff.getTime() < 0) {
        dateDiff = new Date(date - today);

        if (dateDiff.getUTCDate() - 1 >= 5) {
            message += "**********************************************************************\n";
            message += "!!! You selected a date in the future, continue? !!!"
            message += "**********************************************************************\n";
        }
    }

    if (! confirm(message))
       return;

    if (param.siteId == '-' || param.tableIdentifier == '-')
        return;

    $.ajax({
        url: config.coreUrl + "/archive-home/save-configuration?" + $.param(param) + "&" + getToken(),
        type: "post",
        data: {
            eventsNumber: param.eventsNumber,
            dateStart: param.dateStart,
        },
        success: function (response) {
            config.archiveHome.find('.select-table').change();
            alert("Type: --- " + response.type + " --- \r\n" + response.message);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// Clickable - show / hide event
// toogle show/hide even
config.archiveHome.on('click', '.table-content .show-hide', function() {
    var $this = $(this);
    $.ajax({
        url: config.coreUrl + "/archive-home/show-hide/" + $this.closest('li').attr('data-id') + "?" + getToken(),
        type: "get",
        success: function (response) {
            alert("Type: --- " + response.type + " --- \r\n" + response.message);
            if (response.type === 'success') {
                if ($this.hasClass('red'))
                    $this.removeClass('red').addClass('green').text('Show');
                else
                    $this.removeClass('green').addClass('red').text('Hide');
            }
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

    /*
     *  ----- Modal Edit -----
    ----------------------------------------------------------------------*/

// Modal - Edit
// get selected event
// get all predictions
// launch modal
config.archiveHome.on('click', '.table-content .edit', function() {
    var $this = $(this);
    $.ajax({
        url: config.coreUrl + "/archive-home/event/" + $this.closest('li').attr('data-id') + "?" + getToken(),
        type: "get",
        success: function (response) {

            if (!response) {
                alert('Maybe this event will not exists anymore.');
                return;
            }

            var data = response;
            var element = $('#archive-home-modal-edit');

            var template = element.find('.template-event').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
            element.find('.event').html(html);

            // set status selected
            element.find('.status option[value="' + data.statusId + '"]').prop('selected', true).change();

            // set prediction selected
            element.find('.prediction option[value="' + data.predictionId + '"]').prop('selected', true).change();

            element.modal();
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// Modal - Edit
// save edit prediction and status
$('#archive-home-modal-edit').on('click', '.save', function() {
    var element = $('#archive-home-modal-edit');

    $.ajax({
        url: config.coreUrl + "/archive-home/update/" + element.find('.event-id').val() + "?" + getToken(),
        type: "post",
        data: {
            siteId: config.archiveHome.find('.select-site').val(),
            country: element.find('.country').val(),
            league: element.find('.league').val(),
            stringEventDate: element.find('.string-event-date').val(),
            homeTeam: element.find('.home-team').val(),
            awayTeam: element.find('.away-team').val(),
            predictionId: element.find('.prediction').val(),
            statusId: element.find('.status').val(),
        },
        success: function (response) {

            alert("Type: --- " + response.type + " --- \r\n" + response.message);
            archiveHomeGetTableEvents();
            element.modal('hide');
        },
        error: function (xhr, textStatus, errorTrown) {
            //manageError(xhr, textStatus, errorTrown);
        }
    });
});

    /*
     *  ----- Functions -----
    ----------------------------------------------------------------------*/

// Functions
// this will be exectuted on page loading.
// will populate site selector
function archiveHomeShowAvailableSites() {
    $.ajax({
        url: config.coreUrl + "/site/ids-and-names" + "?" + getToken(),
        type: "get",
        success: function (response) {

            var data = {
                sites: response,
            }
            var element = config.archiveHome;

            var template = element.find('.template-select-site').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
            element.find('.select-site').html(html).change();
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

// Functions
// This will get events according to current site selection and tabele selection
function archiveHomeGetTableEvents() {
    var param = {
        siteId: config.archiveHome.find('.select-site').val(),
        tableIdentifier: config.archiveHome.find('.select-table').val(),
    };

    var element = config.archiveHome;

    if (param.siteId == '-' || param.tableIdentifier == '-') {
        element.find('.table-content').html('');
        return;
    }

    $.ajax({
        url: config.coreUrl + "/archive-home/table-events?" + $.param(param) + "&" + getToken(),
        type: "get",
        success: function (response) {

            var data = response;

            var template = element.find('.template-table-content').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
            element.find('.table-content').html(html);
            element.find('.table-content .sortable').sortable({
                update: function(event, ui) {
                    archiveHomeUpdateOrder();
                },
            });
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

// Functions
// this will update in db sort order for each drag and drop
function archiveHomeUpdateOrder() {
    var element = config.archiveHome;
    var order = {};

    // get all events in order
    element.find('.table-content .sortable li').each(function(i, e) {
        var id = $(e).attr('data-id');
        order[i] = {
            order: i,
            id: id,
        };
    });

    $.ajax({
        url: config.coreUrl + "/archive-home/set-order?" + getToken(),
        type: "post",
        data: {
            order: order,
        },
        success: function (response) {
            if (response.type == 'error') {
                alert("Type: --- " + response.type + " --- \r\n" + response.message);
            }
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

// Functions
// get and complete predictions in edit modal events
function archiveHomeShowAllPredictions() {
    $.ajax({
        url: config.coreUrl + "/prediction" + "?" + getToken(),
        type: "get",
        success: function (response) {
            var data = {
                groups: response,
            }
            var element = $('#archive-home-modal-edit');

            var template = element.find('.template-prediction').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
            element.find('.prediction').html(html);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}
