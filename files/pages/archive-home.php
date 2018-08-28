<!-- BEGIN CONTENT -->
<div class="page-content-wrapper archive-home hidden">
    <!-- BEGIN CONTENT BODY -->
    <div class="page-content">

        <!-- BEGIN PAGE HEADER-->
        <!-- BEGIN PAGE BAR-->
        <!-- END PAGE BAR-->
        <!-- END PAGE HEADER-->

        <!-- BEGIN TABLE TITLE-->
        <h1 class="page-title">Home archives</h1>
        <!-- END TABLE TITLE-->

        <!-- BEGIN MONTH TABLE PORTLET-->
        <div class="portlet light bordered">
            <div class="portlet-title">
                <ul class="table_import_filters_container">
                    <li>
                        <div class="form-group">
                            <label class="control-label">Site</label>
                            <select class="form-control select-site select2 table_import_filter_select"></select>
                            <script class="template-select-site" type="text/template7">
                               <option value="-"> -- select -- </option>
                               {{#each sites}}
                               <option value="{{id}}">{{name}} </option>
                               {{/each}}
                            </script>
                        </div>
                    </li>
                    <li>
                        <div class="form-group">
                            <label class="control-label">Table</label>
                            <select class="form-control select-table select2 table_import_filter_select">
                               <option value="-"> -- select -- </option>
                            </select>
                            <script class="template-select-table" type="text/template7">
                               <option value="-"> -- select -- </option>
                               {{#each tables}}
                               <option value="{{tableIdentifier}}">{{tableIdentifier}} </option>
                               {{/each}}
                            </script>
                        </div>
                    </li>
                    <li>
                        <button type="button" class="btn green btn-outline publishInSite">Update in site</button>
                    </li>
                    <li>
                        <button type="button" class="btn green btn-outline save-configuration">Save configuration.</button>
                    </li>
                </ul>
            </div>
            <div class="portlet-body">



                <!-- month table -->
                <div class="table-content"></div>
                <script class="template-table-content" type="text/template7">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label class="control-label">Events Number</label>
                            <input type="text" class="form-control events-number" value="{{conf.eventsNumber}}">
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="control-label">Start Date</label>
                            <input type="text" class="form-control date-start" value="{{conf.dateStart}}">
                        </div>
                    </div>
                    <ul class="sortable">
                        {{#each events}}
                        <li data-id="{{id}}">
                            {{isVip}} ###
                            {{publishDate}} ---
                            {{#if stringEventDate}} {{stringEventDate}} {{else}} No Custom Date {{/if}}
                            {{systemDate}}
                            {{#if isNoTip}}
                                NO TIP
                            {{else}}
                                {{country}}
                                {{league}}
                                {{homeTeam}} - {{awayTeam}}
                                {{predictionName}}
                                {{odd}}
                                {{result}}
                                {{statusId}}
                            {{/if}}
                            {{#if isNoTip}}
                            {{else}}
                            <button class="btn blue edit">Edit</button>
                            {{/if}}
                            {{#if isVisible}}
                                <button class="btn red show-hide">Hide</button>
                            {{else}}
                                <button class="btn green show-hide">Show</button>
                            {{/if}}
                        </li>
                        {{else}}
                            <li>No events available</li>
                        {{/each}}
                    </ul>
                </script>

            </div>
        </div>
        <!-- END MONTH TABLE PORTLET-->
    </div>
    <!-- END CONTENT BODY -->
</div>
<!-- end content -->

<!-- START MODAL EDIT -->
<div class="modal fade" id="archive-home-modal-edit" tabindex="-1" role="basic" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">Change Prediction and Status</h4>
            </div>
            <div class="modal-body">

                <div class="event row"></div>
                <script class="template-event" type="text/template7">
                    <input type="hidden" class="event-id" value="{{id}}"/>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="control-label">Country</label>
                            <input class="form-control country" type="text" value="{{country}}">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="control-label">League</label>
                            <input class="form-control league" type="text" value="{{league}}">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="control-label">System Date: {{systemDate}}</label>
                            <input class="form-control string-event-date" type="text" value="{{stringEventDate}}" placeholder="Custom date">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label">Home Team</label>
                            <input class="form-control home-team" type="text" value="{{homeTeam}}">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label">Away Team</label>
                            <input class="form-control away-team" type="text" value="{{awayTeam}}">
                        </div>
                    </div>
                </script>

                <!-- status and prediction -->
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label">Prediction</label>
                            <select class="form-control prediction select2"></select>
                            <script class="template-prediction" type="text/template7">
                               {{#each groups}}
                                   {{#each predictions}}
                                       <option value="{{identifier}}">{{name}} </option>
                                   {{/each}}
                               {{/each}}
                            </script>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label">Status</label>
                            <select class="form-control status select2">
                               <option value="1">Win</option>
                               <option value="2">Loss</option>
                               <option value="3">Draw</option>
                               <option value="4">PostP.</option>
                            </select>
                        </div>
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
<!-- END MODAL EDIT -->













