config.leagueAlias = $('.page-content-wrapper.league-alias');

    /*
     *  ----- CLICKABLE ACTIONS -----
    ----------------------------------------------------------------------*/

// Clickable - country selection
// change country selection
// show available leagues in selected country.
config.leagueAlias.on('change', '.select-country', function() {
    $.ajax({
        url: config.coreUrl + "/league-country/" + $(this).val() + "?" + getToken(),
        type: "get",
        success: function (response) {

            var data = {
                leagues: response,
            }
            var element = config.leagueAlias;

            var template = element.find('.template-select-league').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
            element.find('.select-league').html(html).change();
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// Clickable - league selection
// change league selection
// get league alias if exists.
config.leagueAlias.on('change', '.select-league', function() {
    $.ajax({
        url: config.coreUrl + "/league/alias/get/" + $(this).val() + "?" + getToken(),
        type: "get",
        success: function (response) {
            config.leagueAlias.find('.league-alias-name').val(response.alias);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// Clickable - save alias
// save alias for a league.
config.leagueAlias.on('click', '.save', function() {

    var leagueId = config.leagueAlias.find('.select-league').val();
    var alias = config.leagueAlias.find('.league-alias-name').val();

    if (leagueId == '-') {
        alert('You must select a league.');
        return;
    }

    $.ajax({
        url: config.coreUrl + "/league/alias/" + leagueId + "?" + getToken(),
        type: "post",
        data: {
            leagueId: leagueId,
            alias: alias,
        },
        success: function (response) {
            alert("Type: --- " + response.type + " --- \r\n" + response.message);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

    /*
     *  ----- FUNCTIONS -----
    ----------------------------------------------------------------------*/

// Functions
// populate country selector with all country exist in system
function leagueAliasShowAllCountries() {
    $.ajax({
        url: config.coreUrl + "/country/all" + "?" + getToken(),
        type: "get",
        success: function (response) {

            var data = {
                countries: response,
            }
            var element = config.leagueAlias;

            var template = element.find('.template-select-country').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
            element.find('.select-country').html(html).change();
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}
