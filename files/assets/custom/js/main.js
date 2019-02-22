$(document).ready(function() {

    var activePage = localStorage.getItem('core-app-active-page');
    if (activePage)
        config.activePage = activePage;

    // app start flow
    setActivePage();
    getSubscriptionNotifications();

    $('.page-sidebar-menu .nav-item').on('click', function() {
        var page = $(this).attr('target');

        // set active page in config
        config.activePage = page;

        // set active page in localStorage
        localStorage.setItem("core-app-active-page", page);

        setActivePage();
    });

    $(".itm-subscription-notification").on("click", function() {
        const page = "auto-unit-site-configuration";
        config.activePage = page;
        localStorage.setItem("core-app-active-page", page);
        setActivePage();
    });
    // show notifications
    setInterval(showLogs, 5000);
});

/*
 * Make visible active page and trigger setControlFlow()
 * te retrive json with data for current page
 */
function setActivePage(params = null) {

    // add class active for left mennu
    $('.page-sidebar-menu .nav-item').removeClass('active');
    $('.page-sidebar-menu .nav-item[target="' + config.activePage + '"]').addClass('active');

    // show content of desired page
    $('.page-content-wrapper').addClass('hidden');
    $('.page-content-wrapper.' + config.activePage).removeClass('hidden');

    // trigger setControlFlow() method
    setControlFlow(params);
}

// this will show all notification in front.
function showLogs() {
    $.ajax({
        url: config.coreUrl + "/log/all?" + getToken(),
        type: "get",
        success: function (response) {
            if (response.type == 'success') {
                var data = response;

                var template = $('.template-notification-warning').html();
                var compiledTemplate = Template7.compile(template);
                var html = compiledTemplate(data);
                $('.notification-warning').html(html).change();

                var template = $('.template-notification-panic').html();
                var compiledTemplate = Template7.compile(template);
                var html = compiledTemplate(data);
                $('.notification-panic').html(html).change();
            }
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

function getSubscriptionNotifications() {
    $.ajax({
        url: config.coreUrl + "/subscription-notification?" + getToken(),
        type: "get",
        success: function (response) {
            if (response == 0) {
                $(".itm-subscription-notification").text("");
            } else {
                $(".itm-subscription-notification").text("Check recently AutoUnits reactivated websites (" + response + ")");
            }
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

/*
 * This function will controll methods
 * executed by specific page
 */
function setControlFlow(params) {
    if (config.activePage == 'site') {
        getAllSitesIdsAndNames();
    }

    if (config.activePage == 'subscription') {
        subscriptionShowAvailableSites();
        subscriptionShowAllSubscriptions();
    }

    if (config.activePage == 'event') {
        eventGetEvents();
    }

    if (config.activePage == 'association') {

        // autocomlete provider and league
        getTableAvailableFiltersValues('run');
        getTableAvailableFiltersValues('ruv');
        getTableAvailableFiltersValues('nun');
        getTableAvailableFiltersValues('nuv');

        // get availlable events number
        getAvailableEventsNumber({ table: "run" });
        getAvailableEventsNumber({ table: "ruv" });
        getAvailableEventsNumber({ table: "nun" });
        getAvailableEventsNumber({ table: "nuv" });

        // get already associated events
        getEventsAssociations('run');
        getEventsAssociations('ruv');
        getEventsAssociations('nun');
        getEventsAssociations('nuv');
    }

    if (config.activePage == 'distribution') {
        getDistributedEvents();
    }

    if (config.activePage == 'archive-big') {
        showAvailableMonths();
        showAvailableSites();
        bigArchiveShowAllPredictions();
    }

    if (config.activePage == 'archive-home') {
        archiveHomeShowAvailableSites();
        archiveHomeShowAllPredictions();
    }

    if (config.activePage == 'auto-unit') {
        autoUnitShowAvailableSites(params);
    }

    if (config.activePage == 'country-league-team') {
        countryLeagueTeamShowAllCountries();
    }

    if (config.activePage == 'league-alias') {
        leagueAliasShowAllCountries();
    }
    
    if (config.activePage == 'country-alias') {
        countryAliasShowAllCountries();
    }
    if (config.activePage == 'auto-unit-site-configuration') {
        getAutoUnitSiteConfigurations();
    }
}
