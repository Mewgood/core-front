config.autoUnitSiteConfiguration = $('.page-content-wrapper.auto-unit-site-configuration');

$(document).on("click", ".config-label", function() {
    var params = {};
    params.site = $(this).data("site");
    params.date = $(this).data("date");

    config.activePage = "auto-unit";
    
    localStorage.setItem("core-app-active-page", config.activePage);
    setActivePage(params);
});

function getAutoUnitSiteConfigurations() {
    $.ajax({
        url: config.coreUrl + "/auto-unit/sites/statistics?" + getToken(),
        type: "get",
        success: function (response) {
            var element = config.autoUnitSiteConfiguration;
            var template = element.find('.template-table-auto-unit-site-statistics').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(response);
            element.find('.table-auto-unit-site-configuration').html(html).change();
            $('.site-details').tooltipster({
                theme: 'tooltipster-shadow',
                contentAsHTML: true
            });
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}
