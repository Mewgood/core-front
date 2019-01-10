<!-- BEGIN CONTENT -->
<div class="page-content-wrapper distribution hidden">
    <!-- BEGIN CONTENT BODY -->
    <div class="page-content">
        <!-- BEGIN PAGE HEADER-->
        <!-- BEGIN PAGE BAR-->
        <div class="page-bar">
            <div class="date-selector">
                <select class="form-control select-system-date">
                    <option value="<?php echo gmdate('Y-m-d', strtotime('+3day')); ?>">+3 Days: <?php echo gmdate('Y-m-d', strtotime('+3day')); ?></option>
                    <option value="<?php echo gmdate('Y-m-d', strtotime('+2day')); ?>">+2 Days: <?php echo gmdate('Y-m-d', strtotime('+2day')); ?></option>
                    <option value="<?php echo gmdate('Y-m-d', strtotime('+1day')); ?>">+1 Day: <?php echo gmdate('Y-m-d', strtotime('+1day')); ?></option>
                    <option value="<?php echo gmdate('Y-m-d'); ?>" selected="selected">Today: <?php echo gmdate('Y-m-d'); ?></option>
                    <option value="<?php echo gmdate('Y-m-d', strtotime('-1day')); ?>">-1 Day: <?php echo gmdate('Y-m-d', strtotime('-1day')); ?></option>
                    <option value="<?php echo gmdate('Y-m-d', strtotime('-2day')); ?>">-2 Days: <?php echo gmdate('Y-m-d', strtotime('-2day')); ?></option>
                    <option value="<?php echo gmdate('Y-m-d', strtotime('-3day')); ?>">-3 Days: <?php echo gmdate('Y-m-d', strtotime('-3day')); ?></option>
                </select>
            </div>
            <div class="bar-buttons actions">
                <div class="btn-group">
                    <span> Sort By</span>
                </div>
                <div class="btn-group">
                    <select class="form-control select-sort-dist-real-users">
                        <option selected="selected" value="0" >Real Users/No Users</option>
                        <option value="ru" >Real Users</option>
                        <option value="nu" >No Users</option>
                    </select>
                </div>
                <div class="btn-group">
                    <select class="form-control select-sort-dist-vip-users">
                        <option selected="selected" value="0" >Normal Users/VIP Users</option>
                        <option value="notvip" >Normal Users</option>
                        <option value="vip" >VIP Users</option>
                    </select>
                </div>
                <div class="btn-group">
                    <select class="form-control select-sort-dist-emails">
                        <option selected="selected" value="0" >Email Sent/Email Unsent</option>
                        <option value="sent" >Email Sent</option>
                        <option value="unsent" >Email Unsent</option>
                    </select>
                </div>
                <div class="btn-group action-group">
                    <span> Action</span>
                </div>
                <div class="btn-group">
                    <button class="btn green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Select
                        <i class="fa fa-angle-down"></i>
                    </button>
                    <ul class="dropdown-menu pull-right" role="menu">
                        <li><a class="select-unsent"> Select All Unsent </a></li>
                        <li><a class="select-unpublish"> Select All Unpublish </a></li>
                        <li><a class="clear-selection"> Clear All </a></li>
                    </ul>
                </div>
                <div class="btn-group">
                    <button class="btn green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Open
                        <i class="fa fa-angle-down"></i>
                    </button>
                    <ul class="dropdown-menu pull-right" role="menu">
                        <li><a> All Win Websites - Real Users </a></li>
                        <li><a> All Win Websites - No Users </a></li>
                        <li><a> All Loss Websites - Real Users </a></li>
                        <li><a> All Loss Websites - No Users </a></li>
                    </ul>
                </div>
                <div class="btn-group">
                    <button class="btn green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Schedule
                        <i class="fa fa-angle-down"></i>
                    </button>
                    <ul class="dropdown-menu pull-right schedule" role="menu">
                        <li>
                            <div class="form-group">
                                <label class="control-label">Start Date</label>
                                <input class="form-control form-control-inline timepicker timepicker-24 start"/>
                            </div>
                        </li>
                        <li>
                            <div class="form-group">
                                <label class="control-label">End Date</label>
                                <input class="form-control form-control-inline timepicker timepicker-24 end" />
                            </div>
                        </li>
                        <li>
                            <button class="stop btn btn-primary">Stop Schedule</button>
                        </li>
                        <li>
                            <button class="create btn btn-primary">Create Schedule</button>
                        </li>
                    </ul>
                </div>
                <div class="btn-group">
                    <button class="btn green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Controls
                        <i class="fa fa-angle-down"></i>
                    </button>
                    <ul class="dropdown-menu pull-right" role="menu">
                        <li><a class="preview-and-send" data-toggle="modal" href="#modal-distribution-preview-and-send"> Preview and Send </a></li>
                        <li><a class="send"> Send </a></li>
                        <li><a href="#modal-distribution-set-time" data-toggle="modal" > Edit </a></li>
                        <li><a class="publish"> Publish </a></li>
                        <li><a class="delete"> Delete </a></li>
                        <li><a class="subscription-restricted-tips"> Manage Users </a></li>
                    </ul>
                </div>
                
            </div>
        </div>
        <!-- END PAGE BAR-->
        <!-- END PAGE HEADER-->

        <!-- BEGIN TIPS DISTRIBUTION -->
        <!-- BEGIN PAGE TITLE-->
        <h1 class="page-title">Tips Distributions</h1>
        <!-- END PAGE TITLE-->

        <!-- BEGIN SAMPLE TABLE PORTLET-->
        <div class="portlet light bordered">
            <div class="portlet-body">
				
				<script class="manual-template-table-content" type="text/template" id="dist-row-template" >
					<tr>
						<td> 
							<label class="disabled_mt-checkbox disabled_mt-checkbox-single disabled_mt-checkbox-outline">
								<input  
                                    {{useClass}}
                                    {{toDistribute}}
                                    name="btSelectItem" 
                                    type="checkbox" 
                                    data-site-id="{{siteId}}" 
                                    data-event-id="{{distributionIdsString}}" 
                                    data-distribution-ids="{{distributionIdsString}}" 
									email-sent="{{isSent}}" event-publish="{{isPublish}}"
                                    {{toDistribute}}
									>
								<span></span>
							</label>
						</td>
						{{distributionUserTD}}
						{{distributionSiteTD}}
						{{distributionTipTD}}						
						<td class="distribution-event">{{eventInfo}}</td>
						<td> {{sentAtSpan}} </td>
						<td> {{emailsReceivedSpan}} </td>
						<td> {{publishedSpan}} </td>
					</tr>					
				</script>
				
				<!-- main table -->
                <div class="table-content distributions-table" id="distributions-table-content" >
					<div class="table-scrollable">
						<table class="table table-hover table-bordered" id="manually-populated-table" >
							<thead>
								<tr>
									<th> # </th>
                                    <th class="distribution-user"> RU/NU </th>
                                    <th class="distribution-site"> Website </th>
                                    <th class="distribution-tip"> Tip </th>
                                    <th> Event </th>
                                    <th> Sent At </th>
                                    <th> Email Received </th>
                                    <th> Published </th>
								</tr>
							</thead>
							<tbody>
							
							</tbody>
						</table>
					</div>
				</div>
				
            </div>
        </div>
        <!-- END SAMPLE TABLE PORTLET-->

        <div class="date-selector">
                <select class="form-control select-system-date">
                    <option value="<?php echo gmdate('Y-m-d'); ?>" selected="selected">Today: <?php echo gmdate('Y-m-d'); ?></option>
                    <option value="<?php echo gmdate('Y-m-d', strtotime('-1day')); ?>">-1 Day: <?php echo gmdate('Y-m-d', strtotime('-1day')); ?></option>
                    <option value="<?php echo gmdate('Y-m-d', strtotime('-2day')); ?>">-2 Days: <?php echo gmdate('Y-m-d', strtotime('-2day')); ?></option>
                    <option value="<?php echo gmdate('Y-m-d', strtotime('-3day')); ?>">-3 Days: <?php echo gmdate('Y-m-d', strtotime('-3day')); ?></option>
                </select>
            </div>

        <!-- BEGIN SAMPLE TABLE PORTLET-->
        <div class="portlet light bordered">
            <div class="portlet-body">

                <!-- main table -->
                <div class="table-content">
                    <div class="table-scrollable">
                        <table class="table table-hover">
                            <tbody>
                            	<tr class="email-logs-website-caption">
                                    <td colspan="5"> Dailysoccerwins.com </td>
                                </tr>
                                <tr>
                                    <td> cristi@cristi.com </td>
                                    <td class="email-log-email-sending-status"> <span class="label label-sm label-success"> Sent | 13:00 </span> </td>
                                    <td> <span class="label label-sm label-success"> Received | 13:05 </span> </td>
                                    <td class="email-log-email-content"> <span class="popovers" data-trigger="hover" data-container=".email-log-email-content" data-html="true" data-content="email body" >Email Content</span> </td>
                                    <td> <a type="button" class="btn blue btn-xs">Resend</a></td>
                                </tr>
                                <tr>
                                    <td> cristi@cristi.com </td>
                                    <td class="email-log-email-sending-status"> <span class="label label-sm label-success"> Sent | 13:00 </span> </td>
                                    <td> <span class="label label-sm label-warning"> Waiting Response </span> </td>
                                    <td class="email-log-email-content"> <span class="popovers" data-trigger="hover" data-container=".email-log-email-content" data-html="true" data-content="email body" >Email Content</span> </td>
                                    <td> <a type="button" class="btn blue btn-xs">Resend</a></td>
                                </tr>
                                <tr>
                                    <td> cristi@cristi.com </td>
                                    <td class="email-log-email-sending-status"> <span class="label label-sm label-success"> Sent | 13:00 </span> </td>
                                    <td> <span class="label label-sm label-danger popovers" data-trigger="hover" data-container=".email-log-email-sending-status" data-html="true" data-content="Error details"> Not Received </span> </td>
                                    <td class="email-log-email-content"> <span class="popovers" data-trigger="hover" data-container=".email-log-email-content" data-html="true" data-content="email body" >Email Content</span> </td>
                                    <td> <a type="button" class="btn blue btn-xs">Resend</a></td>
                                </tr>
                                <tr class="email-logs-website-caption">
                                    <td colspan="5"> Dailysoccerwins.com </td>
                                </tr>
                                <tr>
                                    <td> cristi@cristi.com </td>
                                    <td class="email-log-email-sending-status"> <span class="label label-sm label-info"> Sending </span> </td>
                                    <td> </td>
                                    <td class="email-log-email-content"> <span class="popovers" data-trigger="hover" data-container=".email-log-email-content" data-html="true" data-content="email body" >Email Content</span> </td>
                                    <td> <a type="button" class="btn blue btn-xs">Resend</a></td>
                                </tr>
                                <tr>
                                    <td> cristi@cristi.com </td>
                                    <td class="email-log-email-sending-status"> <span class="label label-sm label-danger popovers" data-trigger="hover" data-container=".email-log-email-sending-status" data-html="true" data-content="Error details"> Not Sent </span> </td>
                                    <td> </td>
                                    <td class="email-log-email-content"> <span class="popovers" data-trigger="hover" data-container=".email-log-email-content" data-html="true" data-content="email body" >Email Content</span> </td>
                                    <td> <a type="button" class="btn blue btn-xs">Resend</a></td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>                    
                </div>
                

            </div>
        </div>
        <!-- END SAMPLE TABLE PORTLET-->




        <!-- END TIPS DISTRIBUTION -->
    </div>
    <!-- END CONTENT BODY -->
</div>
<!-- END CONTENT -->

<!-- START EDIT SEND HOUR -->
<div class="modal fade" id="modal-distribution-set-time" tabindex="-1" role="basic" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">Change Send Hour</h4>
            </div>
            <div class="modal-body">
                <label class="control-label">Choose Date</label>
                <!--<input type="text" value="2:30 PM" data-format="hh:mm A" class="form-control clockface_1" />-->
                <input type="text" class="form-control timepicker timepicker-24 time" />
            </div>
            <div class="modal-footer">
                <button type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
                <button type="button" class="btn green save">Save changes</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- END EDIT SEND HOUR -->


<!-- START PREVIEW AND SEND -->
<div class="modal fade" id="modal-distribution-preview-and-send" tabindex="-1" role="basic" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content"></div>
		
		<script class="template-modal-content-preview" type="text/template7">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">Preview and Send</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-8">
                        <label class="control-label">Pack: {{siteName}} - {{packageName}}</label>
                        <div class="form-group">
                            <div class="summernote">{{template}}</div>
                        </div>
                        <br/>
                        <div class="preview-template"></div>
                    </div>
                    <div class="col-md-4">
                        <div class="portlet light">
                            <div class="portlet-title">
                                <div class="caption">
                                    <span class="caption-subject bold uppercase"> Send To</span>
                                </div>
                            </div>
                            <div class="portlet-body">
                                <div class="scroller" style="height:200px" data-rail-visible="1">
                                    <div class="form-group">
                                        <div class="mt-checkbox-list">
                                            <label class="mt-checkbox mt-checkbox-outline"> email@email.com
                                                <input type="checkbox" value="1" name="test">
                                                <span></span>
                                            </label>
                                            <label class="mt-checkbox mt-checkbox-outline"> email@email.com
                                                <input type="checkbox" value="1" name="test">
                                                <span></span>
                                            </label>
                                            <label class="mt-checkbox mt-checkbox-outline"> email@email.com
                                                <input type="checkbox" value="1" name="test">
                                                <span></span>
                                            </label>
                                            <label class="mt-checkbox mt-checkbox-outline"> email@email.com
                                                <input type="checkbox" value="1" name="test">
                                                <span></span>
                                            </label>
                                            <label class="mt-checkbox mt-checkbox-outline"> email@email.com
                                                <input type="checkbox" value="1" name="test">
                                                <span></span>
                                            </label>
                                            <label class="mt-checkbox mt-checkbox-outline"> email@email.com
                                                <input type="checkbox" value="1" name="test">
                                                <span></span>
                                            </label>
                                            <label class="mt-checkbox mt-checkbox-outline"> email@email.com
                                                <input type="checkbox" value="1" name="test">
                                                <span></span>
                                            </label>
                                            <label class="mt-checkbox mt-checkbox-outline"> email@email.com
                                                <input type="checkbox" value="1" name="test">
                                                <span></span>
                                            </label>
                                            <label class="mt-checkbox mt-checkbox-outline"> email@email.com
                                                <input type="checkbox" value="1" name="test">
                                                <span></span>
                                            </label>
                                            <label class="mt-checkbox mt-checkbox-outline"> email@email.com
                                                <input type="checkbox" value="1" name="test">
                                                <span></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <button type="button" class="btn btn-default">Select All</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn dark btn-outline" id="close_preview_modal" data-dismiss="modal">Close</button>
                <button type="button" class="btn green show-preview-template">Preview Template</button>
                <button type="button" class="btn green send">Send</button>
            </div>
		</script>
        
		
        <!-- <script class="template-modal-content" type="text/template7">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">Preview and Send</h4>
            </div>
            <div class="modal-body">
                <label class="control-label">Pack: {{siteName}} - {{packageName}}</label>
                <div class="form-group">
                    <div class="summernote">{{template}}</div>
                </div>
                <br/>
                <div class="preview-template"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
                <button type="button" class="btn green show-preview-template">Preview Template</button>
                <button type="button" class="btn green send">Send</button>
            </div>
        </script> -->
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- END PREVIEW AND SEND -->


<!-- START MANAGE USERS -->
<div class="modal fade" id="modal-distribution-subscription-restricted-tips" tabindex="-1" role="basic" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content"></div>
        <script class="template-modal-content" type="text/template7">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">Manage Users - <span class="systemDate" date="{{date}}">{{date}}</span></h4>
            </div>
            <div class="modal-body">
                <div class="panel-group accordion" id="accordion3">

                    {{#each data}}
                        {{#each subscriptions}}
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                    <a class="accordion-toggle accordion-toggle-styled" data-toggle="collapse"
                                        data-parent="#accordion3" href="#collapse_3_{{id}}">
                                        {{siteName}} | {{subscriptionName}} |
                                        {{customerEmail}} -
                                        <span class="label label-danger">
                                            Total tips: {{totalTips}} Events: {{totalEvents}}
                                        </span>
                                    </a>
                                </h4>
                            </div>
                            <div id="collapse_3_{{id}}" class="panel-collapse collapse">
                                <div class="table-scrollable subscription-events" data-subscription-id="{{id}}">
                                    <table class="table table-hover table-bordered">
                                        <thead>
                                            <tr>
                                                <th> # </th>
                                                <th> Country </th>
                                                <th> League </th>
                                                <th> Event </th>
                                                <th> Prediction </th>
                                                <th> Odd </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {{#each events}}
                                            <tr>
                                                <td>
                                                    <input type="checkbox"
                                                        {{#if restricted}} checked="checked" {{/if}}
                                                        {{#if isEmailSend}} disabled="disabled" {{/if}}
                                                        class="use" value="{{id}}">
                                                </td>
                                                <td>{{country}}</td>
                                                <td>{{league}}</td>
                                                <td>{{homeTeam}} - {{awayTeam}}</td>
                                                <td>{{predictionName}}</td>
                                                <td>{{odd}}</td>
                                            </tr>
                                            {{/each}}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {{/each}}
                    {{/each}}

                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
                <button type="button" class="btn green save">Save</button>
            </div>
        </script>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- END MANAGE USERS -->
