config.autoUnit = $('.page-content-wrapper.auto-unit');

    /*
     *  ----- CLICKABLE ACTIONS -----
    ----------------------------------------------------------------------*/

// Clickable - site selection
// change site selection
// show available tables for selected site.
config.autoUnit.on('change', '.select-site', function() {
    $.ajax({
        url: config.coreUrl + "/site/available-table/" + $(this).val() + "?" + getToken(),
        type: "get",
        success: function (response) {

            var data = {
                tables: response,
            }
            var element = config.autoUnit;

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

// Clickable - select table | select date
// change table or date selection
// show scheduler for selected site, date and table.
config.autoUnit.on('change', '.select-table , .select-date', function() {
    autoUnitGetSchedulerForTable();
    autoUnitGetScheduledEventsForTable();
});

// Clickable - new schedule event
// launch modal to add new schedule event
config.autoUnit.on('click', '.new-schedule-event', function() {
    var param = {
        siteId: config.autoUnit.find('.select-site').val(),
        tableIdentifier: config.autoUnit.find('.select-table').val(),
        date: config.autoUnit.find('.select-date').val(),
    };

    if (param.siteId == '-' || param.tableIdentifier == '-' || param.date == 'default') {
        alert('You must select site, table and other month than default');
        return;
    }
    var element = config.autoUnit.find('#auto-unit-new-schedule-event');
    element.modal();

    var tips = [];
    $.each(config.autoUnit.find('.content-tip .tip-identifier'), function(i, e) {
        tips.push($(e).val());
    });

    data = {tips: tips};
    var template = element.find('.template-new-event').html();
    var compiledTemplate = Template7.compile(template);
    var html = compiledTemplate(data);
    element.find('.new-event').html(html).change();

    element.find('.system-date').datepicker({
        dateFormat: 'yy-mm-dd'
    });
});

// Clickable - change prediction percentage
// calculate sum of total percentage
config.autoUnit.on(
  'change',
  '.content-tip .group-1x2 ,.content-tip .group-ou ,.content-tip .group-ah ,.content-tip .group-gg',
  function() {
    autoUnitCalculatePredictionPercentage();
});

// change value of:
//    tips total
//    winrate
//    draw number
config.autoUnit.on(
    'keyup', '.content-tip .tips-number, .content-tip .tips-per-day, .content-tip .winrate, .content-tip .draw',
    function() {

    var tipSection = $(this).closest('.panel.panel-default');

    if (tipSection.find('.configuration-type').val() == 'default')
        return;

    var numberOfTips = 0;
    if (tipSection.find('.config-type').val() == 'tips') {
        // tips
        var numberOfTips = tipSection.find('.tips-number').val();
    } else {
        // days
        var daysInMonth = parseInt(tipSection.find('.days-in-month').val());
        var tipsPerDay = parseInt(tipSection.find('.tips-per-day').val());
        var numberOfTips = isNaN(tipsPerDay) ? '' : daysInMonth * tipsPerDay;
    }

    tipSection.find('.tips-total').val(numberOfTips);

    calculateWinLoss(tipSection);
});

// change value of:
//    wins
//    losses
config.autoUnit.on('keyup', '.content-tip .win, .content-tip .loss', function() {
    var tipSection = $(this).closest('.panel.panel-default');

    if (tipSection.find('.configuration-type').val() == 'default')
        return;

    var values = getWinLossDrawTotalWinrate(tipSection);

    manageWinLossErrors(tipSection);

    if (isNaN(values.win) || isNaN(values.loss))
        return;

    var winrate = (values.win * 100) / (values.win + values.loss);
    tipSection.find('.winrate').val(winrate.toFixed(2));
});

// Clickable - save tip settings
// save current settings for selected tip
config.autoUnit.on('click', '.content-tip .save-tip-settings', function() {
    var elem = config.autoUnit;
    var tipSection = $(this).closest('.panel.panel-default');
    var data = {
        siteId: elem.find('.select-site').val(),
        tableIdentifier: elem.find('.select-table').val(),
        date: elem.find('.select-date').val(),
        tipIdentifier: tipSection.find('.tip-identifier').val(),
        leagues: JSON.stringify(tipSection.find('.leagues').val()),
        minOdd: tipSection.find('.min-odd').length ? tipSection.find('.min-odd').val() : 0,
        maxOdd: tipSection.find('.max-odd').length ? tipSection.find('.max-odd').val() : 0,
        maxWinrate: tipSection.find('.max-winrate').length ? tipSection.find('.max-winrate').val() : 0,
        minWinrate: tipSection.find('.min-winrate').length ? tipSection.find('.min-winrate').val() : 0,
        winrate: tipSection.find('.winrate').length ? tipSection.find('.winrate').val() : 0,
        win: tipSection.find('.win').length ? tipSection.find('.win').val() : 0,
        loss: tipSection.find('.loss').length ? tipSection.find('.loss').val() : 0,
        draw: tipSection.find('.draw').val(),
        prediction1x2: tipSection.find('.group-1x2').val(),
        predictionOU: tipSection.find('.group-ou').val(),
        predictionAH: tipSection.find('.group-ah').val(),
        predictionGG: tipSection.find('.group-gg').val(),
        configType: tipSection.find('.config-type').val(),
        minTips: tipSection.find('.min-tips').length ? tipSection.find('.min-tips').val() : 0,
        maxTips: tipSection.find('.max-tips').length ? tipSection.find('.max-tips').val() : 0,
        tipsPerDay: tipSection.find('.tips-per-day').length ? tipSection.find('.tips-per-day').val() : 0,
        tipsNumber: tipSection.find('.tips-number').length ? tipSection.find('.tips-number').val() : 0,
    };

    $.ajax({
        url: config.coreUrl + "/auto-unit/save-tip-settings/" + "?" + getToken(),
        type: "post",
        data: data,
        success: function (response) {
            alert("Type: --- " + response.type + " --- \r\n" + response.message);

            if (response.type == 'success') {
                autoUnitGetSchedulerForTable();
                autoUnitGetScheduledEventsForTable();
            }
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// Clickable - delete event
// delete event from table schedule,
//    - for archive events use distribution force delete procedure
config.autoUnit.on('click', '.table-schedule .delete-event', function() {

    var eventType = $(this).attr('data-type');

    // default values for autoUnit
    var message = "Event is part of AutoUnits schedule.";
    var url = config.coreUrl + "/auto-unit/delete-event?" + getToken();


    // values for archive-big
    if (eventType == 'archive-big') {
        message = "Event is part of Big Archive and it was published in site.";
        url = config.coreUrl + "/distribution/force-delete" + "?" + getToken();
    }

    if(confirm(message + " Are you sure?")) {
        $.ajax({
            url: url,
            type: "post",
            data: {
                ids: [$(this).attr('data-id')],
            },
            success: function (response) {
                alert("Type: --- " + response.type + " --- \r\n" + response.message);
                autoUnitGetScheduledEventsForTable();
            },
            error: function (xhr, textStatus, errorTrown) {
                manageError(xhr, textStatus, errorTrown);
            }
        });
    }
});
    /*
     *  ----- Modal New Schedule Event -----
    ----------------------------------------------------------------------*/

// Modal - new schedule event
// save new schedule event
$('#auto-unit-new-schedule-event').on('click', '.save', function() {
    var element = $('#auto-unit-new-schedule-event');

    var data = {
        siteId: config.autoUnit.find('.select-site').val(),
        tableIdentifier: config.autoUnit.find('.select-table').val(),
        date: config.autoUnit.find('.select-date').val(),
        systemDate: element.find('.system-date').val(),
        tipIdentifier: element.find('.tip-identifier').val(),
        predictionGroup: element.find('.prediction-group').val(),
        statusId: element.find('.status').val(),
    };

    $.ajax({
        url: config.coreUrl + "/auto-unit/save-new-schedule-event?" + getToken(),
        type: "post",
        data: data,
        success: function (response) {
            if(response.type == 'success') {
                element.modal('hide');
                autoUnitGetScheduledEventsForTable();
            }
            alert("Type: --- " + response.type + " --- \r\n" + response.message);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

$('.show-admin-pool').on('click', function() {
    const page = "admin-pool";

    // set active page in config
    config.activePage = page;

    // set active page in localStorage
    localStorage.setItem("core-app-active-page", page);

    setActivePage();
});

$(".auto-unit-container").on("click", ".auto-unit-info", function() {
    var matches = $(this).data("matches").split(",");
    var html = "";
    
    for (index in matches) {
        html += "<p>" + matches[index] + "</p>";
    }
    $("body").popover({
        selector: '.auto-unit-info',
        trigger: 'click',
        content: "placeholder", // it is needed for some reason
        template: `<div class="popover" role="tooltip">
            <div class="arrow"></div>
            <h3 class="popover-header">Invalid Matches</h3>
            <div class="popover-body">
                ${html}
            </div>
        </div>`,
        placement: 'top',
        html: true
    });
});
    /*
     *  ----- Functions -----
    ----------------------------------------------------------------------*/

// Functions
// this will be exectuted on page loading.
// will populate site selector
function autoUnitShowAvailableSites() {
    $.ajax({
        url: config.coreUrl + "/site/ids-and-names" + "?" + getToken(),
        type: "get",
        success: function (response) {

            var data = {
                sites: response,
            }
            var element = config.autoUnit;
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

// functions
// this will populate mounth table with events
// it use: select-date, select-site, select-table
function autoUnitGetSchedulerForTable() {
    var param = {
        siteId: config.autoUnit.find('.select-site').val(),
        tableIdentifier: config.autoUnit.find('.select-table').val(),
        date: config.autoUnit.find('.select-date').val(),
    };

    if (param.siteId == '-' || param.tableIdentifier == '-') {
        config.autoUnit.find('.table-content-month').html('');
        autoUnitPopulateTipsInTemplate({});
        return;
    }

    $.ajax({
        url: config.coreUrl + "/auto-unit/get-schedule?" + $.param(param) + "&" + getToken(),
        type: "get",
        success: function (response) {
            var data = {
                tips: response,
            }
            autoUnitPopulateTipsInTemplate(data);
            autoUnitCalculatePredictionPercentage();
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}
// functions
// this will show sum percentage for all prediction groups
function autoUnitCalculatePredictionPercentage() {
    var element = config.autoUnit.find('.content-tip');
    var group1x2 = parseInt(element.find('.group-1x2').val());
    var groupOU = parseInt(element.find('.group-ou').val());
    var groupAH = parseInt(element.find('.group-ah').val());
    var groupGG = parseInt(element.find('.group-gg').val());

    var total = group1x2 + groupOU + groupAH + groupGG;
    element.find('.prediction-percentage').html(total);
}

// functions
// this will get all events for selected month
// will bring past event from archive and new sheduled type of events
function autoUnitGetScheduledEventsForTable() {
    var param = {
        siteId: config.autoUnit.find('.select-site').val(),
        tableIdentifier: config.autoUnit.find('.select-table').val(),
        date: config.autoUnit.find('.select-date').val(),
    };

    if (param.siteId == '-' || param.tableIdentifier == '-' || param.date == 'default') {
        config.autoUnit.find('.table-content-month').html('');
        autoUnitPopulateTipsInTemplate({});
        autoUnitShowAssociatedEventsWithTable({});
        return;
    }

    $.ajax({
        url: config.coreUrl + "/auto-unit/get-scheduled-events?" + $.param(param) + "&" + getToken(),
        type: "get",
        success: function (response) {
            autoUnitShowAssociatedEventsWithTable(response);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

// functions
// this will show all events accordind to selected table
function autoUnitShowAssociatedEventsWithTable(data) {
    var element = config.autoUnit;
    var template = element.find('.template-table-schedule').html();
    var compiledTemplate = Template7.compile(template);
    var html = compiledTemplate(data);
    element.find('.table-schedule').html(html);
}

// functions
// this will populate content-tip with data
function autoUnitPopulateTipsInTemplate(data) {
    var element = config.autoUnit;
    var template = element.find('.template-content-tip').html();
    var compiledTemplate = Template7.compile(template);
    var html = compiledTemplate(data);

    element.find('.content-tip').html(html);

    element.find('.leagues').each(function(i, e) {
        $(e).multiselect({
            includeSelectAllOption: true,
            enableFiltering: true,
            maxHeight: 400,
            numberDisplayed: 1,
            onChange: function(option, checked) {
                var values = [];
                var optGroupLabel = $(option).parent().attr('label');
                $('#menu optGroup[label="'+optGroupLabel+'"] option').each(function() {
                   if ($(this).val() !== option.val()) {
                      values.push($(this).val());
                   }
                });
                // $(e).multiselect('deselect', values);
            },
        });
    });

}

// functions
// @param object of tip section.
// this will automatically calcuate number of wins, losses
// by winrate and by tips number
function calculateWinLoss(elem) {
    var values = getWinLossDrawTotalWinrate(elem);

    if (isNaN(values.tipsTotal) || isNaN(values.winrate) || isNaN(values.draw)) {
        // alert('You need Tips Number (or TipsPerDay) and Winrate');
        alert('You need Tips Number (or TipsPerDay), Winrate and Draws number');
        return;
    }

    if (values.draw > values.tipsTotal) {
        // alert('Draws can not be greather than tips number');
        alert('Draws can not be greather than tips number');
        return;
    }

    var total = values.tipsTotal - values.draw;

    values.win = Math.round((values.winrate / 100) * total);
    elem.find('.win').val(values.win);

    values.loss = total - values.win;
    elem.find('.loss').val(values.loss);

    manageWinLossErrors(elem);
}

// functions
// @parma elem jquery object of tip-section
// add errors if wins + loss + draw != tipsTotal
// add or remeve errors;
function manageWinLossErrors(elem) {

    var action = 'remove';
    var el = ['tips-number', 'win', 'loss', 'draw'];
    var values = getWinLossDrawTotalWinrate(elem);

    var total = values.win + values.loss + values.draw;
    if (total != values.tipsTotal)
        action = 'add';

    $.each(el, function(i, e) {
        var input = elem.find('.' + e);
        if (action == 'add')
            input.parent().addClass('has-error');
        else
            input.parent().removeClass('has-error');
    });
}

// functions
// @parma elem jquery object of tip-section
// @return object
function getWinLossDrawTotalWinrate(elem) {
    return {
        winrate: parseFloat(elem.find('.winrate').val()),
        tipsTotal: parseInt(elem.find('.tips-total').val()),
        win: parseInt(elem.find('.win').val()),
        loss: parseInt(elem.find('.loss').val()),
        draw: parseInt(elem.find('.draw').val()),
    };
}

