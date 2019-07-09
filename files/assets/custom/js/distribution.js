config.distribution = $('.page-content-wrapper.distribution');

    /*
     *  ----- CLICKABLE ACTIONS -----
    ----------------------------------------------------------------------*/

// Clickable
// when change select-system-date
// will reload table content with events from selected date.
config.distribution.on('change', '.select-system-date', function() {
    var date = $(this).val();

    getEventsAssociations('run', date);
    getEventsAssociations('ruv', date);
    getEventsAssociations('nun', date);
    getEventsAssociations('nuv', date);

    $("#event-datepicker").val(date);
    $("#association-system-date").val(date);

    getDistributedEvents(date);
    sessionStorage.setItem("date", date);
});

// Clickable
// when click on site checkbox
// toogle select/unselect all site events
config.distribution.on('change', '.table-content .select-group-site', function() {
    var siteId = $(this).val();
    var bool = $(this).is(':checked') ? true : false;
    config.distribution.find('.use[data-site-id="' + siteId + '"]').prop('checked', bool);
});

// Clickable
// when change select-sort-dist-real-users
// will reload table content with events from selected date sorted by the selected value.
config.distribution.on('change', '.select-sort-dist-real-users', function() {
	// reset the other 2 sort selects 
	$('.select-sort-dist-vip-users').val('0');
	$('.select-sort-dist-emails').val('0');
	
    getDistributedEvents( config.distribution.find('.select-system-date').val() );
});

// Clickable
// when change select-sort-dist-vip-users
// will reload table content with events from selected date sorted by the selected value.
config.distribution.on('change', '.select-sort-dist-vip-users', function() {
	// reset the other 2 sort selects 
	$('.select-sort-dist-real-users').val('0');
	$('.select-sort-dist-emails').val('0');
	
    getDistributedEvents( config.distribution.find('.select-system-date').val() );
});

// Clickable
// when change select-sort-dist-emails
// will reload table content with events from selected date sorted by the selected value.
config.distribution.on('change', '.select-sort-dist-emails', function() {
	// reset the other 2 sort selects 
	$('.select-sort-dist-vip-users').val('0');
	$('.select-sort-dist-real-users').val('0');
	
    getDistributedEvents( config.distribution.find('.select-system-date').val() );
});


    /*
     *  ----- ACTIONS  -----
    ----------------------------------------------------------------------*/

// Actions
// check if events selected
// launch modal for preview and send
config.distribution.on('click', '.actions .preview-and-send', function() {
	// clear the preview tamplate section
	$('#modal-distribution-preview-and-send').find('.preview-template').empty();
	

    $.ajax({
        url: config.coreUrl + "/distribution/preview-and-send/preview" + "?" + getToken(),
        type: "post",
        data: {
            ids: getCheckedEventsIds(),
        },
        success: function (response) {

            if (response.type !== 'success') {
				$('#modal-distribution-preview-and-send').modal('hide');
                alert("Type: --- " + response.type + " --- \r\n" + response.message);
                return;
            }

            var element = $('#modal-distribution-preview-and-send');
            var data = response;

            var template = element.find('.template-modal-content-preview').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);

            element.find('.modal-content').html(html);
            element.find('.summernote').summernote();
            element.modal();
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// Actions
// trigger procedure to send emails.
config.distribution.on('click', '.actions .send', function() {	
    distributionSendEmails();
});


// Actions
// Publish events in archive
config.distribution.on('click', '.actions .publish', function() {
    $.ajax({
        url: config.coreUrl + "/archive/publish" + "?" + getToken(),
        type: "post",
        data: {
            ids: getCheckedEventsIds(),
        },
        success: function (response) {
            alert("Type: --- " + response.type + " --- \r\n" + response.message);
            getDistributedEvents(config.distribution.find('.select-system-date').val());
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// Actions
// Delete events from distribution
config.distribution.on('click', '.actions .delete', function() {
    var ids = getCheckedEventsIds();
    $.ajax({
        url: config.coreUrl + "/distribution/delete" + "?" + getToken(),
        type: "post",
        data: {
            ids: ids,
        },
        success: function (response) {

            if (response.forceDestroy) {
                if (confirm(response.message)) {
                    $.ajax({
                        url: config.coreUrl + "/distribution/force-delete" + "?" + getToken(),
                        type: "post",
                        data: {
                            ids: ids,
                        },
                        success: function (response) {
                            alert("Type: --- " + response.type + " --- \r\n" + response.message);
                            getDistributedEvents(config.distribution.find('.select-system-date').val());
                        },
                        error: function (xhr, textStatus, errorTrown) {
                            manageError(xhr, textStatus, errorTrown);
                        }
                    });
                    return;
                }
            } else {
                alert("Type: --- " + response.type + " --- \r\n" + response.message);
                getDistributedEvents(config.distribution.find('.select-system-date').val());
            }
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// Actions
// manage users
// launch modal for manage users.
config.distribution.on('click', '.actions .subscription-restricted-tips', function() {

    $.ajax({
        url: config.coreUrl + "/distribution/subscription-restricted-tips" + "?" + getToken(),
        type: "get",
        success: function (response) {

            if (response.type !== 'success') {
                alert("Type: --- " + response.type + " --- \r\n" + response.message);
                return;
            }

            var element = $('#modal-distribution-subscription-restricted-tips');
            var data = response;

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

// Actions
// Select all sites where email was not sent
config.distribution.on('click', '.actions .select-unsent', function() {
	// first clear the existing selection
	config.distribution.find('.table-content .use').prop('checked', false);
	
    config.distribution.find('.table-content .use[email-sent="0"]').prop('checked', true);
});

// Actions
// Select all sites where event was not published
config.distribution.on('click', '.actions .select-unpublish', function() {
	// first clear the existing selection
	config.distribution.find('.table-content .use').prop('checked', false);
	
    config.distribution.find('.table-content .use[event-publish="0"]:not(:disabled)').prop('checked', true);
});

// Actions
// clear all selection
config.distribution.on('click', '.actions .clear-selection', function() {
    config.distribution.find('.table-content .use').prop('checked', false);
});

    /*
     *  ----- Modals -----
    ----------------------------------------------------------------------*/

// Modals --- Start Email Scheduler
// Click on Start.
config.distribution.on('click', '.actions .schedule .create', function() {
    var element = config.distribution.find('.actions .schedule');
	
    $.ajax({
        url: config.coreUrl + "/distribution/create-email-schedule" + "?" + getToken(),
        type: "post",
        data: {
            timeStart: element.find('.start').val(),
            timeEnd: element.find('.end').val(),
        },
        success: function (response) {
            alert("Type: --- " + response.type + " --- \r\n" + response.message);
            if (response.type == 'success') {
                getDistributedEvents(config.distribution.find('.select-system-date').val());
            }
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// Modals --- Delete Email Schedule
// Click on stop.
config.distribution.on('click', '.actions .schedule .stop', function() {
    $.ajax({
        url: config.coreUrl + "/distribution/delete-email-schedule" + "?" + getToken(),
        type: "get",
        success: function (response) {
            alert("Type: --- " + response.type + " --- \r\n" + response.message);
            if (response.type == 'success') {
                getDistributedEvents(config.distribution.find('.select-system-date').val());
            }
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// Modals --- Delete Email Schedule
// Click on stop.
$('#modal-distribution-set-time').on('click', '.save', function() {
    var element = $('#modal-distribution-set-time');
    $.ajax({
        url: config.coreUrl + "/distribution/set-time-email-schedule" + "?" + getToken(),
        type: "post",
        data: {
          ids: getCheckedEventsIds(),
          time: element.find('.time').val(),
        },
        success: function (response) {
            alert("Type: --- " + response.type + " --- \r\n" + response.message);
            element.modal('hide');
            if (response.type == 'success') {
                getDistributedEvents(config.distribution.find('.select-system-date').val());
            }
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// Modals --- modal preview-and-send
// Click on send emails.
// trigger send emails procedure
// close modal.
$('#modal-distribution-preview-and-send').on('click', '.show-preview-template', function() {
    var element = $('#modal-distribution-preview-and-send');

    $.ajax({
        url: config.coreUrl + "/distribution/preview-and-send/preview-template" + "?" + getToken(),
        type: "post",
        data: {
            ids: getCheckedEventsIds(),
            template: element.find('.summernote').summernote('code'),
        },
        success: function (response) {

            if (response.type !== 'success') {
				$('#modal-distribution-preview-and-send').modal('hide');
                alert("Type: --- " + response.type + " --- \r\n" + response.message);				
                return;
            }

            element.find('.preview-template').html(response.template);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// Modals --- modal preview-and-send
// Click on send emails.
// trigger send emails procedure
// close modal.
$('#modal-distribution-preview-and-send').on('click', '.send', function() {
    var element = $('#modal-distribution-preview-and-send');
    var template = element.find('.summernote').summernote('code');
    distributionSendEmails(template);
    element.modal('hide');
});

// Modals --- modal subscription-restricted-tip
// Click on save.
// will delete restricted tips, and add again according to selection
$('#modal-distribution-subscription-restricted-tips').on('click', '.save', function() {
    var element = $('#modal-distribution-subscription-restricted-tips');
    var data = [];

    // collect all checked events according to subscription.
    $.each(element.find('.subscription-events'), function(ind, elem) {
        var $this = $(this);
        $.each($this.find('.use:checked'), function() {
            data.push({
                "subscriptionId": $this.attr('data-subscription-id'),
                "distributionId": $(this).val(),
            });
        });
    });

    $.ajax({
        url: config.coreUrl + "/distribution/subscription-restricted-tips" + "?" + getToken(),
        type: "post",
        data: {
            systemDate: element.find('.systemDate').attr('date'),
            restrictions: data,
        },
        success: function (response) {

            if (response.type !== 'success') {
                alert("Type: --- " + response.type + " --- \r\n" + response.message);
                return;
            }

            element.modal('hide');
            getDistributedEvents(config.distribution.find('.select-system-date').val());

        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

$("#restrict-vip").on("change", function() {
    var date = $(".select-system-date").val();
    var restrictVip = $(this).prop("checked");
    getDistributedEvents(date, restrictVip);
});

    /*
     *  ----- Functions -----
    ----------------------------------------------------------------------*/

// Functions - general
// colect in array all checked events from .table-content
// @return []
function getCheckedEventsIds() {
	 var d = [];	
    config.distribution.find('.table-content .use:checked').each(function(){
		var idsString = $(this).attr('data-event-id');
		if( idsString != '' && idsString !=' ' ) {				
			var ids = idsString.split(",");
			$.each( ids , function(index, id) {
				d.push(id);
			});
		}
    });
    return d;
	
	/*
    var d = [];	
    config.distribution.find('.table-content .use:checked').each(function(){
        d.push($(this).attr('data-event-id'));
    });
    return d;
	*/
}

// Functions
// @string date formaf: YYYY-mm-dd
// get all distributed events and put it on table
function getDistributedEvents(date = '0', restrictVip = false) {
	// check for sorting selects
	// real / no users 
	var real_user_sort = config.distribution.find('.select-sort-dist-real-users').val();
	var vip_user_sort = config.distribution.find('.select-sort-dist-vip-users').val();
    var emails_sort = config.distribution.find('.select-sort-dist-emails').val();
    var no_tip_vip = config.distribution.find('#restrict-vip').prop("checked");
	
    $.ajax({
        url: config.coreUrl + "/get-distributions/" + date + "?" + getToken(),
        type: "post",
		data: {
			real_user_sort: real_user_sort,
			vip_user_sort: vip_user_sort,
            emails_sort: emails_sort,
            no_tip_vip: no_tip_vip ? 1 : 0
		},
        success: function (response) {
            var element = config.distribution;
            var template = element.find('.manual-template-table-content').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(response);
            element.find('#manually-populated-table tbody').html(html);
            
			$('.popovers').popover();
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}
// kept as refference 
function getDistributedEvents_old(date = '0') {
    $.ajax({
        url: config.coreUrl + "/distribution/" + date + "?" + getToken(),
        type: "get",
        success: function (response) {
            var data = {sites: response};
            var element = config.distribution;

            var template = element.find('.template-table-content').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
            element.find('.table-content').html(html);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}


// Functions
// trigger procedure to send emails.
function distributionSendEmails(template = null) {
    var data = {
        ids: getCheckedEventsIds(),
    };
	
    if (template !== null)
        data['template'] = template;
    
	
    $.ajax({
        url: config.coreUrl + "/distribution/preview-and-send/send" + "?" + getToken(),
        type: "post",
        data: data,
        success: function (response) {
            alert("Type: --- " + response.type + " --- \r\n" + response.message);
            getDistributedEvents(config.distribution.find('.select-system-date').val());
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}
