config.autoUnit = $('.page-content-wrapper.auto-unit');

    /*
     *  ----- CLICKABLE ACTIONS -----
    ----------------------------------------------------------------------*/

// Clickable - site selection
// change site selection
// show available tables for selected site.
config.autoUnit.on('change', '.select-site', function() {
    $('body .itm-autounit-statistics .badge').popover('hide');
    $('body').popover('destroy');
    var site = $(this).find("option:selected").first();

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
            var table = $("#autounit-table-select option").eq(1).val();
            if (response.length) {
                var monthlyGenerationBtn = generateMonthlyGenerationButton(!response[0].generate_autounit_monthly);
                $(".toggle-generate-monthly-config").parent().remove();
                $(".auto-unit .table_import_filters_container").append(monthlyGenerationBtn);
            }
            $("#autounit-table-select").val(table).trigger("change");
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

    var siteId = config.autoUnit.find('.select-site').val();
    var table = config.autoUnit.find('.select-table').val();
    $(".popover").remove();

    getAutoUnitLastMonthsStatistics(siteId, table, function(data) {
        createAutoUnitStatisticsHTML(data);
    });
});

config.autoUnit.on('change', '.select-site, .select-table', function() {
    var site = "";
    var table = "";
    if ($(".select-site option:selected").val() && $(".select-site option:selected").val() != "-") {
        site = "/" + $(".select-site option:selected").val();
    }
    if ($("#autounit-table-select").val() && $("#autounit-table-select").val() != "-") {
        table = "/" + $("#autounit-table-select").val();
    }
    $(".run-autounit").attr("href", config.coreUrl + "/autounit" + site + table + "?" + getToken());
    $(".reset-autounit").attr("href", config.coreUrl + "/autounit-reset" + site + table + "?" + getToken());
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
        url: config.coreUrl + "/auto-unit/save-tip-settings" + "?" + getToken(),
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

    var type = "distribution";
    var ids = [$(this).data('id')];

    if (!ids[0]) {
        type = "autounit";
        ids = $(this).data('scheduleid');
    }

    // default values for autoUnit
    var message = "Event is part of AutoUnits schedule.";
    var url = config.coreUrl + "/distribution/force-delete" + "?" + getToken();

    if(confirm(message + " Are you sure?")) {
        $.ajax({
            url: url,
            type: "post",
            data: {
                ids: ids,
                type: type
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

$(".table_import_filters_container").on("click", ".toggle-generate-monthly-config", function() {
    var siteId = config.autoUnit.find('.select-site').val();
    var state = $(this).data('state');
    var btn = $(this);

    $.ajax({
        url: config.coreUrl + "/auto-unit/toggle-monthly-config?" + getToken(),
        type: "post",
        data: {
            siteId: siteId,
            state: state
        },
        success: function (response) {
            var state = response.state ? 1 : 0;
            $(btn).data("state", state);
            if (state) {
                $(btn).removeClass("btn-danger").addClass("btn-success");
                $(btn).text("Monthly generation On");
            } else {
                $(btn).removeClass("btn-success").addClass("btn-danger");
                $(btn).text("Monthly generation Off");
            }
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

$(".table_import_filters_container").on("click", ".toggle-empty-matches", function() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var currentDate = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
    
    $(".itm-display-empty-match").toggleClass("hidden");
    $(".itm-display-empty-match[data-date='" + currentDate + "']").removeClass("hidden");
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

$('.show-site-configurations').on('click', function() {
    const page = "auto-unit-site-configuration";

    // set active page in config
    config.activePage = page;

    // set active page in localStorage
    localStorage.setItem("core-app-active-page", page);

    setActivePage();
});

$(".auto-unit-container").on("click", ".auto-unit-info", function() {
    var html = "";
    var matches = $(this).data("matches").split(",");
    
    for (index in matches) {
        html += "<p>" + matches[index] + "</p>";
    }

    $('body .auto-unit-info span').popover('hide');
    $('body').popover('destroy');
    
    $("body").popover({
        selector: '.auto-unit-info span',
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

$('body').on('click', function (e) {
    if ($(e.target).data('toggle') !== 'popover'
        && $(e.target).parents('.popover.in').length === 0) { 
        $('[data-toggle="popover"]').popover('hide');
    }
});

$(".table-schedule").on("click", ".itm-autounit-match-status", function(event) {
    event.preventDefault();
    var scheduleHTMLElement = $(this);
    var scheduleId = $(this).data("schedule");
    var statusId = $(this).data("statusId");
    
    updateAutoUnitMatchStatus(scheduleId, statusId, function(success) {
        if (success) {
            var statusText = "";
            var currentStatus = $(scheduleHTMLElement).parent().siblings(".itm-current-status").first().data("statusId");

            decrementCurrentStatusCounter(currentStatus);
            var data = incrementNewStatusCounter(statusId);

            $(scheduleHTMLElement).parent().siblings(".itm-current-status").first().data("statusId", statusId);
            $(scheduleHTMLElement).parent().siblings(".itm-current-status").first().text(data.statusText);
            $(scheduleHTMLElement).parent().siblings(".itm-current-status").first().attr("class", data.classes);

            calculateWLDRates();
        }
    });
});

$(".table-schedule").on("click", ".itm-autounit-match-prediction", function(event) {
    event.preventDefault();
    var scheduleHTMLElement = $(this);
    var scheduleId = $(this).data("schedule");
    var predictionGroup = $(this).data("predictionGroup");
    
    updateAutoUnitMatchPrediction(scheduleId, predictionGroup, function(success) {
        if (success) {
            $(scheduleHTMLElement).parents().eq(1).siblings(".itm-current-prediction").first().text(predictionGroup);
        }
    });
});

$(".table-schedule").on("click", ".itm-add-autounit-match", function() {
    var date = $(this).data("date");
    var tip = $(this).data("tipIdentifier");

    autoUnitAddNewEntry(date, tip);
});

$(".content-tip").on("click", ".toggle-autounit-state", function() {
    var confirmed = true;

    if ($(this).data("hasSubscription")) {
        confirmed = confirm("Site has a subscription, are you sure you want to activate this one?");
    } else if ($(".toggle-autounit-all-sites-state").data("state") == 1 && $(this).data("state") == 1) {
        confirmed = confirm("All sites are paused, are you sure you want to activate this one?");
    }
    if (confirmed) {
        var label = $(this).parents(".panel").find(".autounit-status").first();
        toggleAutounitState($(this).data("state"), $(this).data("tipIdentifier"), $(this).data("site"), label, $(this));
    }
});

$(".table_import_filters_container").on("click", ".toggle-autounit-all-sites-state", function() {
    toggleAutounitState($(this).data("state"));
});

$(".auto-unit-container").on("click", ".clear-alert", function () {
    var tableIdentifier = $(this).data("tableIdentifier");
    var tipIdentifier = $(this).data("tipIdentifier");
    var siteId = $(this).data("siteId");
    clearAlerts(tableIdentifier, tipIdentifier, siteId, $(this));
});

    /*
     *  ----- Functions -----
    ----------------------------------------------------------------------*/

// Functions
// this will be exectuted on page loading.
// will populate site selector
function autoUnitShowAvailableSites(params) {
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
            
            if (params) {
                $(".select-site").val(params.site).trigger("change");
                $(".select-date").val(params.date).trigger("change");
            }
            toggleAutounitAllSitesState(parseInt(response.all_state.value));
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

// update the schedule's match status
function updateAutoUnitMatchStatus(scheduleId, statusId, callback) {
    $.ajax({
        url: config.coreUrl + "/auto-unit/update-fields" + "?" + getToken(),
        type: "POST",
        data: {
            schedule: {
                id: scheduleId,
                statusId: statusId
            }
        },
        success: function (response) {
            callback(true);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
            callback(false);
        }
    });
}

function updateAutoUnitMatchPrediction(scheduleId, predictionGroup, callback) {
    $.ajax({
        url: config.coreUrl + "/auto-unit/update-fields" + "?" + getToken(),
        type: "POST",
        data: {
            schedule: {
                id: scheduleId,
                predictionGroup: predictionGroup
            }
        },
        success: function (response) {
            callback(true);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
            callback(false);
        }
    });
}

function calculateWLDRates() {
    var win = 0;
    var loss = 0;
    var draw = 0;
    var postp = 0;
    var winRate = 0;

    $(".itm-current-status").each(function(index, item) {
        switch ($(item).data("statusId")) {
            case 1:
                win++;
            break;
            case 2:
                loss++;
            break;
            case 3:
                draw++;
            break;
            case 4:
                postp++;
            break;
            
            default:
            break;
        }
        
        if (win > 0 || loss > 0) {
            winRate = ((win * 100) / (win + loss)).toFixed(2);
        }
        $(".winrate").text(winRate);
    });
}

function decrementCurrentStatusCounter(currentStatus) {
    switch (currentStatus) {
        case 1:
            $(".win-counter").text(parseInt($(".win-counter").text()) - 1);
        break;
        case 2:
            $(".loss-counter").text(parseInt($(".loss-counter").text()) - 1);
        break;
        case 3:
            $(".draw-counter").text(parseInt($(".draw-counter").text()) - 1);
        break;
        case 4:
        break;
        default:
        break;
    }
}

function incrementNewStatusCounter(statusId) {
    var classes = "btn btn-info btn-sm itm-current-status";
    var data = {};
    
    switch (statusId) {
        case 1:
            data.classes = classes + " bg-green-jungle";
            data.statusText = "WIN";
            $(".win-counter").text(parseInt($(".win-counter").text()) + 1);
        break;
        case 2:
            data.classes = classes + " bg-red-thunderbird";
            data.statusText = "LOSS";
            $(".loss-counter").text(parseInt($(".loss-counter").text()) + 1);
        break;
        case 3:
            data.classes = classes + " bg-yellow-gold";
            data.statusText = "DRAW";
            $(".draw-counter").text(parseInt($(".draw-counter").text()) + 1);
        break;
        case 4:
            data.classes = classes + " bg-yellow-gold";
            data.statusText = "POSTP";
        break;
        default:
        break;
    }
    return data;
}

function getAutoUnitLastMonthsStatistics(siteId, table, callback) {
    $.ajax({
        url: config.coreUrl + "/auto-unit/get-monthly-statistics" + "?" + getToken(),
        type: "POST",
        data: {
            siteId: siteId,
            table: table
        },
        success: function (response) {
            callback(response);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
            callback(false);
        }
    });
}

function createAutoUnitStatisticsHTML(data) {
    var html = '';
    $("body").popover('destroy');

    for (index in data) {
        html += `<p class="text-center text-primary">${data[index].date}</p>`;
        html += '<ul class="text-center inline-list nostyle-list">';
        html +=     `<li class="text-center"><span class="label bg-blue"> WIN RATE: <span class="winrate">${data[index].winRate}</span>% </span></li>`;
        html +=     `<li class="text-center"><span class="label bg-green-jungle"> WIN: <span class="winrate">${data[index].win}</span></span></li>`;
        html +=     `<li class="text-center"><span class="label bg-red-thunderbird"> LOSS: <span class="winrate">${data[index].loss}</span></span></li>`;
        html +=     `<li class="text-center"><span class="label bg-yellow-gold"> DRAW: <span class="winrate">${data[index].draw}</span></span></li>`;
        html +=     `<li class="text-center"><span class="label bg-purple"> VIP: <span class="winrate">${data[index].vip}</span></span></li>`;
        html += '</ul>';
        html += "<hr>";
    }
    
    $("body").popover({
        selector: '.itm-autounit-statistics .statistics-container',
        trigger: 'click',
        content: "placeholder", // it is needed for some reason
        template: `<div class="popover" role="tooltip">
            <div class="arrow"></div>
            <h4 class="popover-header text-center text-primary">Last 5 months statistics</h4>
            <div class="popover-body">
                ${html}
            </div>
        </div>`,
        placement: 'right',
        html: true
    });
}

function autoUnitAddNewEntry(date, tip) {
    var element = config.autoUnit.find('#auto-unit-new-schedule-event');
    element.modal();

    var tips = [];
    $.each(config.autoUnit.find('.content-tip .tip-identifier'), function(i, e) {
        tips.push($(e).val());
    });

    data = {tips: tips, selectedTip: tip};
    var template = element.find('.template-new-event').html();
    var compiledTemplate = Template7.compile(template);
    var html = compiledTemplate(data);
    element.find('.new-event').html(html).change();

    element.find('.system-date').datepicker({
        dateFormat: 'yy-mm-dd',
    });
    element.find('.system-date').datepicker("setDate", date);
}

function toggleAutounitStateButton(paused, element, button) {
    if (paused !== undefined) {
        if (paused) {
            $(element).removeClass("label-primary");
            $(element).addClass("label-danger");
            $(element).text("Paused");

            $(button).removeClass("btn-danger");
            $(button).addClass("btn-primary");
            $(button).text("Activate autounit");
        } else if (!paused) {
            $(element).removeClass("label-danger");
            $(element).addClass("label-primary");
            $(element).text("Active");
            
            $(button).removeClass("btn-primary");
            $(button).addClass("btn-danger");
            $(button).text("Pause Autounit");
        }
        $(button).data("state", paused);
    }
}

function toggleAutounitAllSitesState(paused) {
    if (paused) {
        $(".toggle-autounit-all-sites-state").removeClass("btn-danger");
        $(".toggle-autounit-all-sites-state").addClass("btn-primary");
        $(".toggle-autounit-all-sites-state").text("Reactivate Autounits for all websites");

        $(".toggle-autounit-state").removeClass("btn-danger");
        $(".toggle-autounit-state").addClass("btn-primary");
        $(".toggle-autounit-state").text("Activate autounit");
    } else if (!paused) {
        $(".toggle-autounit-all-sites-state").removeClass("btn-primary");
        $(".toggle-autounit-all-sites-state").addClass("btn-danger");
        $(".toggle-autounit-all-sites-state").text("Pause Autounits for all websites");
        
        $(".toggle-autounit-state").removeClass("btn-primary");
        $(".toggle-autounit-state").addClass("btn-danger");
        $(".toggle-autounit-state").text("Pause autounit");
    }
    $(".toggle-autounit-all-sites-state").data("state", paused);
    $(".toggle-autounit-state").data("state", paused);
}

function toggleAutounitState(state, tipIdentifier = null, site = null, element = null, button = null) {
    $.ajax({
        url: config.coreUrl + "/auto-unit/toggle-state" + "?" + getToken(),
        type: "POST",
        data: {
            site: site,
            state: state,
            tipIdentifier: tipIdentifier,
            manual_pause: 1
        },
        success: function (response) {
            var state = response.state ? 1 : 0;
            if (!tipIdentifier) {
                toggleAutounitAllSitesState(state);
                toggleAutounitStateButton(state, $(".autounit-status:not(.has-subscription)"));
            } else {
                toggleAutounitStateButton(state, element, button);
            }
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

function clearAlerts(tableIdentifier, tipIdentifier, siteId, alertElement) {
    $.ajax({
        url: config.coreUrl + "/package/clear-alerts" + "?" + getToken(),
        type: "POST",
        data: {
            tableIdentifier: tableIdentifier,
            tipIdentifier: tipIdentifier,
            siteId: siteId
        },
        success: function (response) {
            console.log(response);
            getSubscriptionNotifications();
            $(alertElement).remove();
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

function generateMonthlyGenerationButton(generate_autounit_monthly) {
    var html = "";
    html += "<li>";
    html += '   <button type="button" class="btn toggle-generate-monthly-config ' + 
                    (generate_autounit_monthly ? 'btn-success' : 'btn-danger') + 
                    '" data-state="' + generate_autounit_monthly + '">' + 
                    (generate_autounit_monthly ? 'Monthly generation On' : 'Monthly generation Off') + '</button>';
    html += "</li>";
    return html;
}