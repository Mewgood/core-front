config.distribution = $('.page-content-wrapper.distribution');

    /*
     *  ----- CLICKABLE ACTIONS -----
    ----------------------------------------------------------------------*/

// Clickable
// when change select-system-date
// will reload table content with events from selected date.
config.distribution.on('change', '.select-system-date', function() {
    getDistributedEvents($(this).val());
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
	
    config.distribution.find('.table-content .use[email-sent="not-sent"]').prop('checked', true);
});

// Actions
// Select all sites where event was not published
config.distribution.on('click', '.actions .select-unpublish', function() {
	// first clear the existing selection
	config.distribution.find('.table-content .use').prop('checked', false);
	
    config.distribution.find('.table-content .use[event-publish="not-publish"]').prop('checked', true);
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
function getDistributedEvents(date = '0') {
	// check for sorting selects
	// real / no users 
	var real_user_sort = config.distribution.find('.select-sort-dist-real-users').val();
	var vip_user_sort = config.distribution.find('.select-sort-dist-vip-users').val();
	var emails_sort = config.distribution.find('.select-sort-dist-emails').val();
	
    $.ajax({
        url: config.coreUrl + "/get-distributions/" + date + "?" + getToken(),
        type: "post",
		data: {
			real_user_sort: real_user_sort,
			vip_user_sort: vip_user_sort,
			emails_sort: emails_sort,
		},
        success: function (response) {
            var data = {sites: response};
            var element = config.distribution;

			/*
			// populate table using template7
            var template = element.find('.template-table-content').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
						
			element.find('#distributions-table-content').html(html);
			$('.popovers').popover();
			*/
			
			// manually populate the layout
			// first we empty the table
			$('#manually-populated-table tbody').html('');
			
			$.each( data.sites , function(index, item) {
				// var template = $('#dist-row-template').html();	
				console.log(item);
				var siteId = item.siteId;
				var distributionIdsString = item.distributionIdsString;
				var distributionUserTD = '';
				var distributionSiteTD = '';
				var distributionTipTD = '';
				var eventInfo = '';
				var sentAtSpan = '';
				var emailsReceivedSpan = '';
				var publishedSpan = '';				
				var useClass = '';
				var isSent = '';
				if(item.isTotalEmailSend) {
					isSent = 'sent';
				} else {
					isSent = 'not-sent';
				}
				
				var isPublish = '';
				if(item.isTotalPublish) {
					isPublish = 'publish';
				} else {
					isPublish = 'not-publish';
				}
				
				if( item.eventsCount == 0 ) {
					var template = $('#dist-row-template').html();

					var packagesNames = '';
					$.each( item.packages , function( pIndex, pack ) {
						packagesNames += pack + '<br>';
					});					
					distributionUserTD = '<td class="distribution-user">'+item.ruNu+'</td>';
					distributionSiteTD = '<td class="distribution-site">'+item.siteName+'</td>';
					distributionTipTD = '<td class="distribution-tip">';
					distributionTipTD += '<span class="popovers" data-trigger="hover" data-container=".distribution-event" data-html="true" data-content="'+packagesNames+'" >';
					if( item.isVip ) {
						distributionTipTD += '<i class="fa fa-star" ></i>';							
					}
					distributionTipTD += item.type+'</span></td>';
					
					var tmp = template.replace(/{{useClass}}/ig, useClass )
						.replace(/{{siteId}}/ig, siteId)
						.replace(/{{distributionIdsString}}/ig, distributionIdsString)
						.replace(/{{isSent}}/ig, isSent)
						.replace(/{{isPublish}}/ig, isPublish)
						.replace(/{{distributionUserTD}}/ig, distributionUserTD)
						.replace(/{{distributionSiteTD}}/ig, distributionSiteTD)
						.replace(/{{distributionTipTD}}/ig, distributionTipTD)
						.replace(/{{eventInfo}}/ig, eventInfo)
						.replace(/{{sentAtSpan}}/ig, sentAtSpan)
						.replace(/{{emailsReceivedSpan}}/ig, emailsReceivedSpan)
						.replace(/{{publishedSpan}}/ig, publishedSpan)
                        .replace(/{{toDistribute}}/ig, "disabled");
					
					$('#manually-populated-table tbody').append(tmp);
					
				} else {
					
					
					
					useClass = ' class="use" ';

					$.each( item.events , function( dIndex, dEvent) {
                        var toDistribute = !dEvent.to_distribute ? "disabled" : "";
						var template = $('#dist-row-template').html();	
						
						sentAtSpanFixed = '';
						
						// we add special code for the first event 
						if( dIndex == 0 ) {
							var packagesNames = '';
							$.each( item.packages , function( pIndex, pack ) {
								packagesNames += pack + '<br>';
							});
							
							distributionUserTD = '<td rowspan="'+item.eventsCount+'" class="distribution-user">'+item.ruNu+'</td>';
							distributionSiteTD = '<td rowspan="'+item.eventsCount+'" class="distribution-site">'+item.siteName+'</td>';
							distributionTipTD = '<td rowspan="'+item.eventsCount+'" class="distribution-tip">';
							distributionTipTD += '<span class="popovers" data-trigger="hover" data-container=".distribution-event" data-html="true" data-content="'+packagesNames+'" >';
							if( item.isVip ) {
								distributionTipTD += '<i class="fa fa-star" ></i>';							
							}
							distributionTipTD += item.type+'</span></td>';
							
							
						
						} else {
							distributionUserTD = '';
							distributionSiteTD = '';
							distributionTipTD = '';
							
						}
						
						eventInfo = dEvent.eventInfo;
						distributionIdsString = dEvent.eventDistributionIds;
						
						// Sent at column
						if( dEvent.isEmailSend == '0' && dEvent.mailingDate ) {
							sentAtSpanFixed = '<span class="label label-sm label-warning"> '+dEvent.mailingDate+' </span>';
						} else if( dEvent.isEmailSend == '1' && dEvent.mailingDate ) {
							sentAtSpanFixed = '<span class="label label-sm label-success"> '+dEvent.mailingDate+' </span>';
						}
							
						// if( item.isTotalEmailSend ) {							
						if( dEvent.totalSubscriptions == dEvent.totalSentSubscriptions ) {
							sentAtSpan = '<span class="label label-sm label-success"> '+dEvent.mailingDate+' </span>';
							emailsReceivedSpan = '<span class="label label-sm label-success">Received</span>';
						} else {							
							sentAtSpan = '';
							// emailsReceivedSpan = '<span class="label label-sm label-info">Waiting '+item.totalSentSubscriptions+'/'+item.totalSubscriptions+'</span>';
							emailsReceivedSpan = '<span class="label label-sm label-info">Waiting '+dEvent.totalSentSubscriptions+'/'+dEvent.totalSubscriptions+'</span>';
						}
						
						
						
						
						if( item.isTotalPublish ) {
							publishedSpan = '<span class="label label-sm label-success">Published</span>';
						} else {
							publishedSpan = '<span class="label label-sm label-danger">Unpublished</span>';
						}
						
						var tmp = template.replace(/{{useClass}}/ig, useClass )
							.replace(/{{siteId}}/ig, siteId)
							.replace(/{{distributionIdsString}}/ig, distributionIdsString)
							.replace(/{{isSent}}/ig, isSent)
							.replace(/{{isPublish}}/ig, isPublish)
							.replace(/{{distributionUserTD}}/ig, distributionUserTD)
							.replace(/{{distributionSiteTD}}/ig, distributionSiteTD)
							.replace(/{{distributionTipTD}}/ig, distributionTipTD)
							.replace(/{{eventInfo}}/ig, eventInfo)
							// .replace(/{{sentAtSpan}}/ig, sentAtSpan)
							.replace(/{{sentAtSpan}}/ig, sentAtSpanFixed)
							.replace(/{{emailsReceivedSpan}}/ig, emailsReceivedSpan)
							.replace(/{{publishedSpan}}/ig, publishedSpan)
                            .replace(/{{toDistribute}}/ig, toDistribute);
							
						$('#manually-populated-table tbody').append(tmp);
					});
				}
				
				
			});
			$('.popovers').popover();
			
			
			
            // element.find('.table-content').html(html);
			/*
			if( date != '0' ) {				
				element.find('#distributions-table-content').html(html);
				$('.popovers').popover();
			}
			*/
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
