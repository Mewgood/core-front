config.countryAlias = $('.page-content-wrapper.country-alias');

    /*
     *  ----- CLICKABLE ACTIONS -----
    ----------------------------------------------------------------------*/

// Clickable - country selection
// change country selection
// show available leagues in selected country.
config.countryAlias.on('change', '.select-country', function() {
    $.ajax({
        url: config.coreUrl + "/country/get-country-alias/" + $(this).val() + "?" + getToken(),
        type: "get",
        success: function (response) {
            config.countryAlias.find('.country-alias-name').val(response.alias);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// Clickable - save alias
// save alias for a league.
config.countryAlias.on('click', '.save', function() {

    var countryCode = config.countryAlias.find('.select-country').val();
    var alias = config.countryAlias.find('.country-alias-name').val();

    if (countryCode == '-') {
        alert('You must select a country.');
        return;
    }

    $.ajax({
        url: config.coreUrl + "/country/set-alias/" + countryCode + "?" + getToken(),
        type: "post",
        data: {
            countryCode: countryCode,
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
function countryAliasShowAllCountries() {
    $.ajax({
        url: config.coreUrl + "/country/all" + "?" + getToken(),
        type: "get",
        success: function (response) {

            var data = {
                countries: response,
            }
            var element = config.countryAlias;

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
