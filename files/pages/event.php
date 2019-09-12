<!-- BEGIN CONTENT -->
<div class="page-content-wrapper event hidden">
    <!-- BEGIN CONTENT BODY -->
    <div class="page-content">
        <!-- BEGIN EVENT -->
        <div class="page-bar">
            <div class="date-selector">
                <div class="form-group">
                    <label class="control-label">Date:</label>
                    <input type="text" id="event-datepicker">
                </div>
            </div>
        </div>
        
        <!-- BEGIN PAGE TITLE-->
        <h1 class="page-title">Events</h1>
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
                                    <th>Result</th>
                                    <th> Actions </th>
                                </tr>
                            </thead>
                            <tbody>
                                {{#each events}}
                                <tr 
                                    data-id="{{id}}" 
                                    data-homeTeamId="{{homeTeamId}}" 
                                    data-awayTeamId="{{awayTeamId}}"
                                    data-eventDate="{{eventDate}}"
                                >
                                    <td>{{id}}</td>
                                    <td>{{country}}</td>
                                    <td>{{league}}</td>
                                    <td>{{homeTeam}} - {{awayTeam}}</td>
                                    {{#js_compare "this.statusId == 4"}}
                                        <td> - </td>
                                    {{/js_compare}}
                                    {{#js_compare "this.statusId != 4"}}
                                        <td>{{result}}</td>
                                    {{/js_compare}}
                                    <td>
                                        <button class="btn blue edit">Edit</button>
                                    </td>
                                </tr>
                                {{else}}
                                <tr>
                                    <td colspan="9">--- No events distributed in packages ---</td>
                                </tr>
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

<!-- START MODAL EDIT RESULT-STATUS -->
<div class="modal fade" id="event-modal-edit-result-status" tabindex="-1" role="basic" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">Edit Result and Status</h4>
            </div>
            <div class="modal-body">

                <div class="event-info row"></div>
                <script class="template-event-info" type="text/template7">
                    <input type="hidden" class="event-id" value="{{id}}"/>
                    <input type="hidden" class="event-homeTeamId" value="{{homeTeamId}}"/>
                    <input type="hidden" class="event-awayTeamId" value="{{awayTeamId}}"/>
                    <input type="hidden" class="event-eventDate" value="{{eventDate}}"/>
                    <h4>
                        {{country}}
                        {{league}}
                        {{homeTeam}} - {{awayTeam}}
                        {{eventDate}}
                    </h4>
                </script>

                <!-- status and prediction -->
                <div class="row">

                    <!-- hidden input for event id -->
                    <input type="hidden" class="event-id">
                    <div class="col-md-6">
                        <div class="input-group">
                            <input type="text" class="form-control result">
                            <span class="input-group-btn">
                                <button class="btn btn-danger postpone" type="button">Postpone</button>
                            </span>
                        </div>
                    </div>
                    <div class="col-md-2">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
                <button type="button" class="btn green save">Save</button>
            </div>
        </div>
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- END MODAL EDIT RESULT-STATUS -->
