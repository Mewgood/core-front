config.site = $('.page-content-wrapper.site');

/*
 * Clicks actions
 ---------------------------------------------------------------------*/

// click on site selection
config.site.on('change', '.site-selection', function(){
    getSiteInfo($(this).val());
    getSitePackages($(this).val());
    getSitePredictions($(this).val());
    getSiteResultStatusAndClass($(this).val());
});

// click on connect or update button
// this will send connection request to site
// or update request to site
config.site.on('click', '.site-token .connection-update', function() {
    var siteId = config.site.find('.site-selection').val();

    $.ajax({
        url: config.coreUrl + "/site/update-client/" + siteId + "?" + getToken(),
        type: "get",
        success: function (response) {
            alert('Type: ' + response.type + ' - Message: ' + response.message);
            // refresh all site info hard for machine fastter for dev.
            config.site.find('.site-selection').val(siteId).change();
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// click on send test email at:
// this will create a get request to send a test email for selected site
config.site.on('click', '.site-general .send-test-email', function() {
    var siteId = config.site.find('.site-selection').val();

    if (siteId == 'new') {
        alert("You must select a site.");
        return;
    }

    var email = config.site.find('.site-general .test-email');

    $.ajax({
        url: config.coreUrl + "/test/send-test-email/" + siteId + "?" + getToken(),
        type: "post",
        data: {
            email: email.val(),
        },
        success: function (response) {
            alert('Type: ' + response.type + ' - Message: ' + response.message);
            if (response.type == 'success')
                email.val('');
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// Add New Site button click
config.site.on('click', '.add-new-site', function(){
    config.site.find('.site-selection').val('new').change();
});

// Add New Package button click
config.site.on('click', '.add-new-package', function(){
    var id = 'new' +  Math.random().toString().substring(2);
    addNewPackageTab(id);
    addNewPackageTabContent(id);
});

// Check a bettype group for a package
// Select all bets for this group
config.site.on('click', '.package-tab-content .associated-predictions .use', function(){
    var identifier = $(this).attr('data-group-id');
    var bets = $(this).closest('.associated-predictions').find('[data-group="' + identifier + '"]');
    ($(this).is(':checked')) ? bets.prop('checked', true) : bets.prop('checked', false);
});

// Delete a package for front
config.site.on('click', '.delete-package', function(){
    if (confirm("Are you sure? You will delete active package!")) {
        config.site.find('.package-tab li.active').remove();
        config.site.find('.package-tab-content .tab-pane.active.in').remove();

        config.site.find('.package-tab li').first().addClass('active');
        config.site.find('.package-tab-content .tab-pane').first().addClass('active in');
    }
});

// Delete Site
config.site.on('click', '.delete-site', function(){

    var id = config.site.find('.site-selection').val();
    if (id === 'new') {
        alert("You must select a site!");
        return;
    }

    if (confirm("Are you sure? You will delete sected site, associated packages, prediction names!")) {
        response = deleteSite(id);
        alert(response.message);
    }

    getAllSitesIdsAndNames();
});


// Save button click
config.site.on('click', '.save-site', function(){

    var data = {
        site : {
            siteId: config.site.find('.site-selection').val(),
            name: config.site.find('.site-general .name').val(),
            email: config.site.find('.site-general .email').val(),
            url: config.site.find('.site-general .url').val(),
            dateFormat: config.site.find('.site-general .date-format').val(),
            type: config.site.find('.site-general .type').val(),

            smtpHost: config.site.find('.site-general .smtp-host').val(),
            smtpPort: config.site.find('.site-general .smtp-port').val(),
            smtpUser: config.site.find('.site-general .smtp-user').val(),
            smtpPassword: config.site.find('.site-general .smtp-password').val(),
            smtpEncryption: config.site.find('.site-general .smtp-encryption').val(),

            imapHost: config.site.find('.site-general .imap-host').val(),
            imapPort: config.site.find('.site-general .imap-port').val(),
            imapUser: config.site.find('.site-general .imap-user').val(),
            imapPassword: config.site.find('.site-general .imap-password').val(),
            imapEncryption: config.site.find('.site-general .imap-encryption').val(),
        },
        status: [],
        prediction: [],
        package: [],
    };
    console.log(data);
    if (data.site.siteId === 'new') {

        // add new site and retrive id
        var response = addNewSite(data.site);
        if (response.type === 'error') {
            alert(response.message);
            return;
        }

        // set siteId in site-selection and go ahead like an update
        data.site.siteId = response.data.id;

    } else {

        // add new site and retrive id
        var response = updateSite(data.site);
        if (response.type === 'error') {
            alert(response.message);
            return;
        }

        // delete deleted packages
        var existingPackages = getPackagesAssociatesWithSite(data.site.siteId);

        // check if package exist in front
        $.each(existingPackages, function(i, e) {

            // if element not exist in front
            if(config.site.find('.package-tab li[data-id="' + e +'"]').length === 0) {
                var response = deletePackage(e);
                alert(response.message);
            }
        });
    }

    alert(response.message);

    // add results names and classes in data.status array
    config.site.find('.site-result-status .row').each(function(i, e) {
        data['status'].push({
            statusId: $(this).attr('data-status-id'),
            statusName: $(this).find('.statusName').val(),
            statusClass: $(this).find('.statusClass').val(),
        });
    });

    // update results names and classes
    updateSiteResultStatusAndClass(data.status, data.site.siteId);

    // add predictions name and identifiers in data.prediction array
    config.site.find('.site-prediction-name .prediction').each(function(i, e) {
        data['prediction'].push({
            predictionIdentifier: $(this).attr('name'),
            name: $(this).val(),
        });
    });

    // update site predictions name
    updateSitePredictionsNames(data.prediction, data.site.siteId);

    // create or update packages and update associated predictions
    config.site.find('.package-tab-content .package-wrapper').each(function(i, e) {

        var g = $(this).find('.general-info');
        var id = g.attr('data-package-id');
        var template = $(this).find('.package-summernote').summernote('code');

        var package = {
            siteId: data.site.siteId,
            name: g.find('.name').val(),
            identifier: g.find('.identifier').val(),
            tipIdentifier: g.find('.tipIdentifier').val(),
            tableIdentifier: g.find('.tableIdentifier').val(),
            isVip: g.find('input[name="isVip_' + id +'"]:checked').val(),
            isRecurring: g.find('input[name="isRecurring_' + id +'"]:checked').val(),
            subscriptionType: g.find('input[name="subscriptionType_' + id +'"]:checked').val(),
            paymentName: g.find('.paymentName').val(),
            vipFlag: g.find('.vipFlag').val(),
            subscription: g.find('.subscription').val(),
            tipsPerDay: g.find('.tipsPerDay').val(),
            price: g.find('.price').val(),
            paymentCodePaypal: g.find('.paymentCodePaypal').val(),
            paymentCodeHipay: g.find('.paymentCodeHipay').val(),
            oldPrice: g.find('.oldPrice').val(),
            aliasSubscriptionType: g.find('.aliasSubscriptionType').val(),
            aliasTipsPerDay: g.find('.aliasTipsPerDay').val(),
            discount: g.find('.discount').val(),
            template: template,
            fromName: $(this).find('.fromName').val(),
            subject: $(this).find('.subject').val(),
        };

        // new package
        if (id.match(/new/g)) {

            var response = addNewPackage(package);
            if (response.type === 'error') {
                alert(response.message);
                return;
            }

            // add package id from response
            package.id = response.data.id;

            // asociate package with site
            resp = associatePackageWithSite({
                siteId: data.site.siteId,
                packageId: package.id,
            });

            if (resp.type === 'error') {
                // TODO do something on error
                alert('Association coould not be created');
            }

            alert(resp.message);

        } else {

            // existing package
            package.id = id;
            updatePackage(package, id);
        }

        // collect associated predictions with package
        var associatedPredictions = [];
        $(this).find('.associated-predictions .prediction:checked').each(function(i, e) {
            associatedPredictions.push({
                packageId: package.id,
                predictionIdentifier: $(this).val(),
            });
        });

        // update associated predictions with package
        associatePredicitonsWithPackage(associatedPredictions);

    });

    getAllSitesIdsAndNames();
});

/*
 * Run on start page
 ---------------------------------------------------------------------*/

// get all sites names and ids to populate site-selection
function getAllSitesIdsAndNames() {

    $.ajax({
        url: config.coreUrl + "/site/ids-and-names" + "?" + getToken(),
        type: "get",
        success: function (response) {

            var data = {
                sites: response,
            }
            var element = config.site;

            var template = element.find('.template-site-selection').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
            element.find('.site-selection').html(html).change();
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

/*
 * General Informations
 ---------------------------------------------------------------------*/

// store new site
function addNewSite(data) {
    var ret = {};

    $.ajax({
        url: config.coreUrl + "/site" + "?" + getToken(),
        type: "post",
        async: false,
        data: data,
        success: function (response) {
            ret = response;
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });

    return ret;
}

// store new site
function updateSite(data) {
    var ret = {};
    console.log(data);
    $.ajax({
        url: config.coreUrl + "/site/update/" + data.siteId + "?" + getToken(),
        type: "post",
        async: false,
        data: data,
        success: function (response) {
            ret = response;
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });

    return ret;
}

// store new site
function deleteSite(id) {
    var ret = {};

    $.ajax({
        url: config.coreUrl + "/site/delete/" + id + "?" + getToken(),
        type: "get",
        async: false,
        success: function (response) {
            ret = response;
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });

    return ret;
}

// get site general informations
function getSiteInfo(siteId) {
    $.ajax({
        url: config.coreUrl + "/site/" + siteId + "?" + getToken(),
        type: "get",
        success: function (response) {
            console.log(response);
            // show site name in front;
            showSiteName(response);
            showSiteToken(response);
            showSiteGeneralConfiguration(response);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

// show site name in h1
function showSiteName(data) {
    var element = config.site;
    var template = element.find('.template-site-name').html();
    var compiledTemplate = Template7.compile(template);
    var html = compiledTemplate(data);
    element.find('.site-name').html(html);
}

// show site name in h1
function showSiteToken(data) {
    var element = config.site;
    var template = element.find('.template-site-token').html();
    var compiledTemplate = Template7.compile(template);
    var html = compiledTemplate(data);
    element.find('.site-token').html(html);
}

// show site general configuration
function showSiteGeneralConfiguration(data) {
    var element = config.site;
    var template = element.find('.template-site-general').html();
    var compiledTemplate = Template7.compile(template);
    var html = compiledTemplate(data);
    element.find('.site-general').html(html);

    config.site.find('.site-general .date-format').val(data.dateFormat).change();
}

/*
 * Results and Status
 ---------------------------------------------------------------------*/

// update results status names and classes
function updateSiteResultStatusAndClass(data, siteId) {

    var params = {data: data};
    $.ajax({
        url: config.coreUrl + "/site-result-status/update/" + siteId + "?" + getToken(),
        type: "post",
        data: params,
        success: function (response) {
            alert(response.message);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

// get site results status names and classes
function getSiteResultStatusAndClass(siteId) {

    // new website
    if (siteId === 'new') {
        showSiteResultStatusNameAndClass({
            status: {1: {}, 2: {}, 3: {}, 4: {}},
        });
        return;
    }

    $.ajax({
        url: config.coreUrl + "/site-result-status/" + siteId + "?" + getToken(),
        type: "get",
        success: function (response) {

            var data = {
                status: response,
            }
            showSiteResultStatusNameAndClass(data);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

// show result status
function showSiteResultStatusNameAndClass(data) {
    var element = config.site;
    var template = element.find('.template-site-result-status').html();
    var compiledTemplate = Template7.compile(template);
    var html = compiledTemplate(data);
    element.find('.site-result-status').html(html);
}

/*
 * Packages
 ---------------------------------------------------------------------*/

// store new package
function addNewPackage(data) {
    var ret = {};

    $.ajax({
        url: config.coreUrl + "/package" + "?" + getToken(),
        type: "post",
        async: false,
        data: data,
        success: function (response) {
            ret = response;
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });

    return ret;
}

// create associatin package - site
// @return array
function getPackagesAssociatesWithSite(siteId) {
    var ret = {};
    $.ajax({
        url: config.coreUrl + "/site-package/" + siteId + "?" + getToken(),
        type: "get",
        async: false,
        success: function (response) {
            ret = response;
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });

    return ret;
}

// create associatin package - site
function associatePackageWithSite(data) {
    var ret = {};
    var params = {data: data};
    $.ajax({
        url: config.coreUrl + "/site-package" + "?" + getToken(),
        type: "post",
        async: false,
        data: params,
        success: function (response) {
            ret = response;
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });

    return ret;
}

// update site packages
function updatePackage(data, id) {
    var params = {data: data};
    $.ajax({
        url: config.coreUrl + "/package/update/" + id + "?" + getToken(),
        type: "post",
        data: params,
        success: function (response) {
            alert(response.message);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

// delete a package
function deletePackage(id) {
    var ret = {};
    $.ajax({
        url: config.coreUrl + "/package/delete/" + id + "?" + getToken(),
        type: "get",
        async: false,
        success: function (response) {
            ret = response;
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });

    return ret;
}

// get site packages
function getSitePackages(siteId) {
    $.ajax({
        url: config.coreUrl + "/package-site/" + siteId + "?" + getToken(),
        type: "get",
        success: function (response) {

            var data = {
                packages: response,
            }

            showPackagesTabs(data);
            showPackagesTabsContent(data);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

// show new packages tab
function addNewPackageTab(id) {

    var data = {
        packages: [{
            id: id,
            name: 'New - ' + id,
        }],
    };

    var element = config.site;
    var template = element.find('.template-package-tab').html();
    var compiledTemplate = Template7.compile(template);
    var html = compiledTemplate(data);
    element.find('.package-tab').append(html);

    element.find('.package-tab li').removeClass('active');
    element.find('.package-tab li[data-id="' + id + '"]').first().addClass('active');
}

// show new package tab content
function addNewPackageTabContent(id) {

    // get all predictions
    var predictions = getPredictions();

    var data = {
        packages: [{
            id: id,
            name: 'New - ' + id,
            isVip: 0,
            subscriptionType: 'days',
            isRecurring: 1,
            associatedPredictions: predictions,
        }],
    };

    var element = config.site;
    var template = element.find('.template-package-tab-content').html();
    var compiledTemplate = Template7.compile(template);
    var html = compiledTemplate(data);
    element.find('.package-tab-content').append(html);

    element.find('.package-tab-content .tab-pane').removeClass('active in');
    element.find('.package-tab-content .tab-pane#package-tab_' + id).addClass('active in');

    // make editor summernote
    $('.package-summernote').summernote();
}

// show packages tabs
function showPackagesTabs(data) {
    var element = config.site;
    var template = element.find('.template-package-tab').html();
    var compiledTemplate = Template7.compile(template);
    var html = compiledTemplate(data);
    element.find('.package-tab').html(html);

    element.find('.package-tab li').first().addClass('active');
}

// show packages tabs content
function showPackagesTabsContent(data) {
    var element = config.site;
    var template = element.find('.template-package-tab-content').html();
    var compiledTemplate = Template7.compile(template);
    var html = compiledTemplate(data);
    element.find('.package-tab-content').html(html);

    element.find('.package-tab-content .tab-pane').first().addClass('active in');
    // make editor summernote
    $('.package-summernote').summernote();
}

/*
 * Predictions
 ---------------------------------------------------------------------*/

// associate predictions with package
function associatePredicitonsWithPackage(data) {

    var params = {data: data};
    $.ajax({
        url: config.coreUrl + "/package-prediction" + "?" + getToken(),
        type: "post",
        data: params,
        success: function (response) {
            alert(response.message);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

// update site predictions name
function updateSitePredictionsNames(data, siteId) {

    var params = {data: data};
    $.ajax({
        url: config.coreUrl + "/site-prediction/update/" + siteId + "?" + getToken(),
        type: "post",
        data: params,
        success: function (response) {
            alert(response.message);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

// get site predictions name
function getSitePredictions(siteId) {
    $.ajax({
        url: config.coreUrl + "/site-prediction/" + siteId + "?" + getToken(),
        type: "get",
        success: function (response) {

            var data = {
                predictionGroup: response,
            }

            showSitePredictionsNames(data);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

// show predictions name
function showSitePredictionsNames(data) {
    var element = config.site;
    var template = element.find('.template-site-prediction-name').html();
    var compiledTemplate = Template7.compile(template);
    var html = compiledTemplate(data);
    element.find('.site-prediction-name').html(html);
}

// get all predictions
function getPredictions() {
    var ret = {};
    $.ajax({
        url: config.coreUrl + "/prediction" + "?" + getToken(),
        type: "get",
        async: false,
        success: function (response) {
            ret = response;
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
    return ret;
}
