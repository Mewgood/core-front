<!-- BEGIN CONTENT -->
<div class="page-content-wrapper distribution hidden">
    <!-- BEGIN CONTENT BODY -->
    <div class="page-content">
        <!-- BEGIN PAGE HEADER-->
        <!-- BEGIN PAGE BAR-->
        <div class="page-bar">
            <div class="date-selector">
                <select class="form-control input-sm select-system-date">
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
                    <button class="btn green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Schedule
                        <i class="fa fa-angle-down"></i>
                    </button>
                    <ul class="dropdown-menu pull-right schedule" role="menu">
                        <li>
                            <label class="control-label">Start Date</label>
                            <input class="form-control form-control-inline input-medium timepicker timepicker-24 start"/>
                        </li>
                        <li>
                            <label class="control-label">End Date</label>
                            <input class="form-control form-control-inline input-medium timepicker timepicker-24 end"/>
                        </li>
                        <li>
                            <button class="stop">Stop Schedule</button>
                        </li>
                        <li>
                            <button class="create">Create Schedule</button>
                        </li>
                    </ul>
                </div>
                <div class="btn-group">
                    <button class="btn green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Controls
                        <i class="fa fa-angle-down"></i>
                    </button>
                    <ul class="dropdown-menu pull-right" role="menu">
                        <li><a class="preview-and-send"> Preview and Send </a></li>
                        <li><a class="send"> Send </a></li>
                        <li><a href="#modal-distribution-set-time" data-toggle="modal" > Edit </a></li>
                        <li><a class="publish"> Publish </a></li>
                        <li><a class="delete"> Delete </a></li>
                        <li><a class="subscription-restricted-tips"> Manage Users </a></li>
                        <li><button class="btn btn-primary select-unsent"> Select all unsent </button></li>
                        <li><button class="btn btn-primary select-unpublish"> Select all unpublish </button></li>
                        <li><button class="btn btn-primary clear-selection"> Clear all </button></li>
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
            <div class="portlet-title">
                <div class="caption">
                    <i class="icon-social-dribbble font-green"></i>
                    <span class="caption-subject font-green bold uppercase">Distributed Events</span>
                </div>
            </div>
            <div class="portlet-body">

                <!-- main table -->
                <div class="table-content"></div>
                <script class="template-table-content" type="text/template7">
                    <div class="table-scrollable">
                        <table class="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th> # </th>
                                    <th> Country </th>
                                    <th> League </th>
                                    <th> Event </th>
                                    <th> Prediction </th>
                                    <th> Odd </th>
                                    <th> Score </th>
                                    <th> Status </th>
                                    <th> Sent At </th>
                                    <th> Status </th>
                                </tr>
                            </thead>
                            <tbody>
                                {{#each sites}}
                                    <tr class="website_tr">
                                        <td> <input class="select-group-site" type="checkbox" value="{{siteId}}"> </td>
                                        <td colspan="9">{{name}}</td>
                                    </tr>
                                    {{#each packages}}
                                        <tr class="pack_tr">
                                            <td></td>
                                            <td>{{name}} - {{eventsNumber}}/{{tipsPerDay}}</td>
                                            <td colspan="8">
                                            {{#if customerNotEnoughTips}}
                                                Manage users: <strong>{{customerNotEnoughTips}}</strong>
                                            {{/if}}
                                            </td>
                                        </tr>
                                        {{#each events}}
                                            <tr>
                                                <td>
                                                    <input class="use"
                                                    email-sent=
                                                    "{{#if isEmailSend}}sent{{else}}not-sent{{/if}}"
                                                    event-publish=
                                                    "{{#if isPublish}}publish{{else}}not-publish{{/if}}"
                                                    type="checkbox" data-site-id="{{siteId}}" data-event-id="{{id}}"/>
                                                </td>
                                                {{#if isNoTip}}
                                                    <td colspan="7">NO TIP</td>
                                                {{else}}
                                                    <td>{{country}}</td>
                                                    <td>{{league}}</td>
                                                    <td>{{homeTeam}} - {{awayTeam}}</td>
                                                    <td>{{predictionName}}</td>
                                                    <td>{{odd}}</td>
                                                    <td>{{result}}</td>
                                                    <td>{{#if status}}{{status.name}}{{else}}???{{/if}}</td>
                                                {{/if}}
                                                {{#if isEmailSend}}
                                                    <td><span class="label label-sm label-success">{{mailingDate}}</span></td>
                                                {{else}}
                                                    <td><span class="label label-sm label-danger">{{mailingDate}}</span></td>
                                                {{/if}}
                                                {{#if isPublish}}
                                                    <td><span class="label label-sm label-success"> Published </span></td>
                                                {{else}}
                                                    <td><span class="label label-sm label-danger"> Unpublished </span></td>
                                                {{/if}}
                                            </tr>
                                            {{else}}
                                            <tr>
                                                <td> </td>
                                                <td colspan="9">--- No events distributed in package ---</td>
                                            </tr>
                                        {{/each}}
                                    {{/each}}
                                {{/each}}
                            </tbody>
                        </table>
                    </div>
                </script>

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
        <script class="template-modal-content" type="text/template7">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">Preview and Send</h4>
            </div>
            <div class="modal-body row">
                <label class="control-label col-md-12">Pack: {{siteName}} - {{packageName}}</label>
                <div class="form-group col-md-4">
                    <label>Subject</label>
                    <input class="form-control"/>
                </div>
                <div class="form-group col-md-12">
                    <div class="summernote">{{template}}</div>
                </div>
                <br/>
                <div class="preview-template col-md-12"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
                <button type="button" class="btn green show-preview-template">Preview Template</button>
                <button type="button" class="btn green send">Send</button>
            </div>
        </script>
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
