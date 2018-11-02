
<!-- BEGIN CONTENT -->
<div class="page-content-wrapper association hidden">
    <!-- BEGIN CONTENT BODY -->
    <div class="page-content">
        <!-- BEGIN PAGE HEADER-->
        <!-- BEGIN PAGE BAR-->
        <div class="page-bar">
            <div class="date-selector">
                <select id="association-system-date" class="form-control input-sm">
                    <option value="<?php echo gmdate('Y-m-d', strtotime('+3day')); ?>">+3 Days: <?php echo gmdate('Y-m-d', strtotime('+3day')); ?></option>
                    <option value="<?php echo gmdate('Y-m-d', strtotime('+2day')); ?>">+2 Days: <?php echo gmdate('Y-m-d', strtotime('+2day')); ?></option>
                    <option value="<?php echo gmdate('Y-m-d', strtotime('+1day')); ?>">+1 Day: <?php echo gmdate('Y-m-d', strtotime('+1day')); ?></option>
                    <option value="<?php echo gmdate('Y-m-d'); ?>" selected="selected">Today: <?php echo gmdate('Y-m-d'); ?></option>
                    <option value="<?php echo gmdate('Y-m-d', strtotime('-1day')); ?>">-1 Day: <?php echo gmdate('Y-m-d', strtotime('-1day')); ?></option>
                    <option value="<?php echo gmdate('Y-m-d', strtotime('-2day')); ?>">-2 Days: <?php echo gmdate('Y-m-d', strtotime('-2day')); ?></option>
                    <option value="<?php echo gmdate('Y-m-d', strtotime('-3day')); ?>">-3 Days: <?php echo gmdate('Y-m-d', strtotime('-3day')); ?></option>
                </select>
            </div>
            <a class="btn green btn-outline add-event-btn add-manual-event">Add Event</a>
        </div>
        <!-- END PAGE BAR-->
        <!-- END PAGE HEADER-->

        <!-- BEGIN ASSOCIATION TABLE RUN -->
        <!-- BEGIN TABLE TITLE-->
        <h1 class="page-title">Real Users Normal</h1>
        <!-- END TABLE TITLE-->

        <div class="row">
            <div class="col-md-12">
                <div id="table-association-run" class="table-association" data-table="run">

                    <!-- TODO founded events -->
                    <span class="events-number"></span>
                    <script class="template-events-number" type="text/template7">
                        <small class="pull-right">{{number}} events found</small>
                    </script>

                    <!-- BEGIN EXAMPLE TABLE PORTLET-->
                    <div class="portlet light bordered">
                        <div class="portlet-title">
                            <div class="selection-param">
                                <ul class="table_import_filters_container">
                                    <li>
                                        <div class="form-group">
                                            <label class="control-label">Tipster</label>
                                            <select class="form-control select-provider select2 table_import_filter_select"></select>
                                            <script class="template-select-provider" type="text/template7">
                                               <option value=""> -- all -- </option>
                                               {{#each tipsters}}
                                               <option value="{{provider}}">{{provider}} </option>
                                               {{/each}}
                                            </script>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="form-group">
                                            <label class="control-label">League</label>
                                            <select class="form-control select-league select2 table_import_filter_select"></select>
                                            <script class="template-select-league" type="text/template7">
                                               <option value=""> -- all -- </option>
                                               {{#each leagues}}
                                               <option value="{{league}}">{{league}} </option>
                                               {{/each}}
                                            </script>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="form-group">
                                            <label class="control-label">Odds From</label>
                                            <select class="form-control select-minOdd select2 table_import_filter_select">
                                                <option value=""> -- all -- </option>
                                                <option value="1"> >= 1 </option>
                                                <option value="1.5"> >= 1.5 </option>
                                                <option value="2"> >= 2 </option>
                                                <option value="2.5"> >= 2.5 </option>
                                                <option value="3"> >= 3 </option>
                                                <option value="3.5"> >= 3.5 </option>
                                                <option value="4"> >= 4 </option>
                                            </select>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="form-group">
                                            <label class="control-label">Odds To</label>
                                            <select class="form-control select-maxOdd select2 table_import_filter_select">
                                                <option value=""> -- all -- </option>
                                                <option value="1.5"> <= 1.5 </option>
                                                <option value="2"> <= 2 </option>
                                                <option value="2.5"> <= 2.5 </option>
                                                <option value="3"> <= 3 </option>
                                                <option value="3.5"> <= 3.5 </option>
                                                <option value="4"> <= 4 </option>
                                                <option value="4.5"> <= 4.5 </option>
                                                <option value="5"> <= 5 </option>
                                                <option value="5.5"> <= 5.5 </option>
                                                <option value="6"> <= 6 </option>
                                                <option value="10"> <= 10 </option>
                                            </select>
                                        </div>
                                    </li>

                                    <li>
                                        <button type="button" class="btn green btn-outline search-events-btn modal-get-event">Search</button>
                                    </li>

                                    <li>
                                        <button type="button" class="btn green refresh-events-btn refresh-event-info">Refresh</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="portlet-body">

                            <!-- content of association table -->
                            <table class="table table-striped table-bordered table-hover table-checkable order-column association-table-datatable">
                                <thead>
                                    <tr>
                                        <th>Country</th>
                                        <th>League</th>
                                        <th>Home Team</th>
                                        <th>Away Team</th>
                                        <th>Odd</th>
                                        <th>Prediction</th>
                                        <th>Result</th>
                                        <th>Status</th>
                                        <th>Event Date</th>
                                        <th>System Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>

                        </div>
                    </div>
                    <!-- END EXAMPLE TABLE PORTLET-->
                </div>
            </div>
        </div>
        <!-- END ASSOCIATION TABLE -->


        <!-- BEGIN ASSOCIATION TABLE -->

        <!-- BEGIN TABLE TITLE-->
        <h1 class="page-title">Real Users VIP</h1>
        <!-- END TABLE TITLE-->

       <div class="row">
            <div class="col-md-12">
                <div id="table-association-ruv" class="table-association" data-table="ruv">

                    <!-- TODO founded events -->
                    <span class="events-number"></span>
                    <script class="template-events-number" type="text/template7">
                        <small class="pull-right">{{number}} events found</small>
                    </script>

                    <!-- BEGIN EXAMPLE TABLE PORTLET-->
                    <div class="portlet light bordered">
                        <div class="portlet-title">
                            <div class="selection-param">
                                <ul class="table_import_filters_container">
                                    <li>
                                        <div class="form-group">
                                            <label class="control-label">Tipster</label>
                                            <select class="form-control select-provider select2 table_import_filter_select"></select>
                                            <script class="template-select-provider" type="text/template7">
                                               <option value=""> -- all -- </option>
                                               {{#each tipsters}}
                                               <option value="{{provider}}">{{provider}} </option>
                                               {{/each}}
                                            </script>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="form-group">
                                            <label class="control-label">League</label>
                                            <select class="form-control select-league select2 table_import_filter_select"></select>
                                            <script class="template-select-league" type="text/template7">
                                               <option value=""> -- all -- </option>
                                               {{#each leagues}}
                                               <option value="{{league}}">{{league}} </option>
                                               {{/each}}
                                            </script>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="form-group">
                                            <label class="control-label">Odds From</label>
                                            <select class="form-control select-minOdd select2 table_import_filter_select">
                                                <option value=""> -- all -- </option>
                                                <option value="1"> >= 1 </option>
                                                <option value="1.5"> >= 1.5 </option>
                                                <option value="2"> >= 2 </option>
                                                <option value="2.5"> >= 2.5 </option>
                                                <option value="3"> >= 3 </option>
                                                <option value="3.5"> >= 3.5 </option>
                                                <option value="4"> >= 4 </option>
                                            </select>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="form-group">
                                            <label class="control-label">Odds To</label>
                                            <select class="form-control select-maxOdd select2 table_import_filter_select">
                                                <option value=""> -- all -- </option>
                                                <option value="1.5"> <= 1.5 </option>
                                                <option value="2"> <= 2 </option>
                                                <option value="2.5"> <= 2.5 </option>
                                                <option value="3"> <= 3 </option>
                                                <option value="3.5"> <= 3.5 </option>
                                                <option value="4"> <= 4 </option>
                                                <option value="4.5"> <= 4.5 </option>
                                                <option value="5"> <= 5 </option>
                                                <option value="5.5"> <= 5.5 </option>
                                                <option value="6"> <= 6 </option>
                                                <option value="10"> <= 10 </option>
                                            </select>
                                        </div>
                                    </li>

                                    <li>
                                        <button type="button" class="btn green btn-outline search-events-btn modal-get-event">Search</button>
                                    </li>

                                    <li>
                                        <button type="button" class="btn green refresh-events-btn refresh-event-info">Refresh</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="portlet-body">

                            <!-- content of association table -->
                            <table class="table table-striped table-bordered table-hover table-checkable order-column association-table-datatable">
                                <thead>
                                    <tr>
                                        <th>Country</th>
                                        <th>League</th>
                                        <th>Home Team</th>
                                        <th>Away Team</th>
                                        <th>Odd</th>
                                        <th>Prediction</th>
                                        <th>Result</th>
                                        <th>Status</th>
                                        <th>Event Date</th>
                                        <th>System Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>

                        </div>
                    </div>
                    <!-- END EXAMPLE TABLE PORTLET-->
                </div>
            </div>
        </div>
        <!-- END ASSOCIATION TABLE -->


        <!-- BEGIN ASSOCIATION TABLE -->

        <!-- BEGIN TABLE TITLE-->
        <h1 class="page-title">No Users Normal</h1>
        <!-- END TABLE TITLE-->

       <div class="row">
            <div class="col-md-12">
                <div id="table-association-nun" class="table-association" data-table="nun">

                    <!-- TODO founded events -->
                    <span class="events-number"></span>
                    <script class="template-events-number" type="text/template7">
                        <small class="pull-right">{{number}} events found</small>
                    </script>

                    <!-- BEGIN EXAMPLE TABLE PORTLET-->
                    <div class="portlet light bordered">
                        <div class="portlet-title">
                            <div class="selection-param">
                                <ul class="table_import_filters_container">
                                    <li>
                                        <div class="form-group">
                                            <label class="control-label">Tipster</label>
                                            <select class="form-control select-provider select2 table_import_filter_select"></select>
                                            <script class="template-select-provider" type="text/template7">
                                               <option value=""> -- all -- </option>
                                               {{#each tipsters}}
                                               <option value="{{provider}}">{{provider}} </option>
                                               {{/each}}
                                            </script>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="form-group">
                                            <label class="control-label">League</label>
                                            <select class="form-control select-league select2 table_import_filter_select"></select>
                                            <script class="template-select-league" type="text/template7">
                                               <option value=""> -- all -- </option>
                                               {{#each leagues}}
                                               <option value="{{league}}">{{league}} </option>
                                               {{/each}}
                                            </script>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="form-group">
                                            <label class="control-label">Odds From</label>
                                            <select class="form-control select-minOdd select2 table_import_filter_select">
                                                <option value=""> -- all -- </option>
                                                <option value="1"> >= 1 </option>
                                                <option value="1.5"> >= 1.5 </option>
                                                <option value="2"> >= 2 </option>
                                                <option value="2.5"> >= 2.5 </option>
                                                <option value="3"> >= 3 </option>
                                                <option value="3.5"> >= 3.5 </option>
                                                <option value="4"> >= 4 </option>
                                            </select>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="form-group">
                                            <label class="control-label">Odds To</label>
                                            <select class="form-control select-maxOdd select2 table_import_filter_select">
                                                <option value=""> -- all -- </option>
                                                <option value="1.5"> <= 1.5 </option>
                                                <option value="2"> <= 2 </option>
                                                <option value="2.5"> <= 2.5 </option>
                                                <option value="3"> <= 3 </option>
                                                <option value="3.5"> <= 3.5 </option>
                                                <option value="4"> <= 4 </option>
                                                <option value="4.5"> <= 4.5 </option>
                                                <option value="5"> <= 5 </option>
                                                <option value="5.5"> <= 5.5 </option>
                                                <option value="6"> <= 6 </option>
                                                <option value="10"> <= 10 </option>
                                            </select>
                                        </div>
                                    </li>

                                    <li>
                                        <button type="button" class="btn green btn-outline search-events-btn modal-get-event">Search</button>
                                    </li>

                                    <li>
                                        <button type="button" class="btn green refresh-events-btn refresh-event-info">Refresh</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="portlet-body">

                            <!-- content of association table -->
                            <table class="table table-striped table-bordered table-hover table-checkable order-column association-table-datatable">
                                <thead>
                                    <tr>
                                        <th>Country</th>
                                        <th>League</th>
                                        <th>Home Team</th>
                                        <th>Away Team</th>
                                        <th>Odd</th>
                                        <th>Prediction</th>
                                        <th>Result</th>
                                        <th>Status</th>
                                        <th>Event Date</th>
                                        <th>System Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>

                        </div>
                    </div>
                    <!-- END EXAMPLE TABLE PORTLET-->
                </div>
            </div>
        </div>
        <!-- END ASSOCIATION TABLE -->


        <!-- BEGIN ASSOCIATION TABLE -->

        <!-- BEGIN TABLE TITLE-->
        <h1 class="page-title">No Users VIP</h1>
        <!-- END TABLE TITLE-->

       <div class="row">
            <div class="col-md-12">
                <div id="table-association-nuv" class="table-association" data-table="nuv">

                    <!-- TODO founded events -->
                    <span class="events-number"></span>
                    <script class="template-events-number" type="text/template7">
                        <small class="pull-right">{{number}} events found</small>
                    </script>

                    <!-- BEGIN EXAMPLE TABLE PORTLET-->
                    <div class="portlet light bordered">
                        <div class="portlet-title">
                            <div class="selection-param">
                                <ul class="table_import_filters_container">
                                    <li>
                                        <div class="form-group">
                                            <label class="control-label">Tipster</label>
                                            <select class="form-control select-provider select2 table_import_filter_select"></select>
                                            <script class="template-select-provider" type="text/template7">
                                               <option value=""> -- all -- </option>
                                               {{#each tipsters}}
                                               <option value="{{provider}}">{{provider}} </option>
                                               {{/each}}
                                            </script>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="form-group">
                                            <label class="control-label">League</label>
                                            <select class="form-control select-league select2 table_import_filter_select"></select>
                                            <script class="template-select-league" type="text/template7">
                                               <option value=""> -- all -- </option>
                                               {{#each leagues}}
                                               <option value="{{league}}">{{league}} </option>
                                               {{/each}}
                                            </script>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="form-group">
                                            <label class="control-label">Odds From</label>
                                            <select class="form-control select-minOdd select2 table_import_filter_select">
                                                <option value=""> -- all -- </option>
                                                <option value="1"> >= 1 </option>
                                                <option value="1.5"> >= 1.5 </option>
                                                <option value="2"> >= 2 </option>
                                                <option value="2.5"> >= 2.5 </option>
                                                <option value="3"> >= 3 </option>
                                                <option value="3.5"> >= 3.5 </option>
                                                <option value="4"> >= 4 </option>
                                            </select>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="form-group">
                                            <label class="control-label">Odds To</label>
                                            <select class="form-control select-maxOdd select2 table_import_filter_select">
                                                <option value=""> -- all -- </option>
                                                <option value="1.5"> <= 1.5 </option>
                                                <option value="2"> <= 2 </option>
                                                <option value="2.5"> <= 2.5 </option>
                                                <option value="3"> <= 3 </option>
                                                <option value="3.5"> <= 3.5 </option>
                                                <option value="4"> <= 4 </option>
                                                <option value="4.5"> <= 4.5 </option>
                                                <option value="5"> <= 5 </option>
                                                <option value="5.5"> <= 5.5 </option>
                                                <option value="6"> <= 6 </option>
                                                <option value="10"> <= 10 </option>
                                            </select>
                                        </div>
                                    </li>

                                    <li>
                                        <button type="button" class="btn green btn-outline search-events-btn modal-get-event">Search</button>
                                    </li>

                                    <li>
                                        <button type="button" class="btn green refresh-events-btn refresh-event-info">Refresh</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="portlet-body">

                            <!-- content of association table -->
                            <table class="table table-striped table-bordered table-hover table-checkable order-column association-table-datatable">
                                <thead>
                                    <tr>
                                        <th>Country</th>
                                        <th>League</th>
                                        <th>Home Team</th>
                                        <th>Away Team</th>
                                        <th>Odd</th>
                                        <th>Prediction</th>
                                        <th>Result</th>
                                        <th>Status</th>
                                        <th>Event Date</th>
                                        <th>System Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>

                        </div>
                    </div>
                    <!-- END EXAMPLE TABLE PORTLET-->
                </div>
            </div>
        </div>
        <!-- END ASSOCIATION TABLE -->


    </div>
    <!-- END CONTENT BODY -->
</div>
<!-- END CONTENT -->

<!-- START MODAL AVAILABLE EVENTS -->
<div class="modal fade" id="modal-available-events" tabindex="-1" role="basic" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content"></div>
        <script class="template-modal-content" type="text/template7">
            <div class="modal-header">
                <div class="col-xs-12">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 class="modal-title import_modal_title">Import Events - {{table}} System date: {{systemDate}}</h4>
                    
                    <select class="form-control import_events_sys_date input-small">
                        <option value="AK">Alaska</option>
                        <option value="HI" disabled="disabled">Hawaii</option>
                    </select>
                </div>

                <div class="col-xs-12">
                    <label class="control-label">Date:</label>
                    <input type="text" id="association-event-datepicker">
                </div>
            </div>
            <div class="modal-body">
                <input class="table-identifier" type="hidden" value="{{table}}"/>
                <table class="table table-striped table-bordered table-hover table-checkable order-column">
                    <thead>
                        <tr>
                            <th>
                                <label class="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                    <input type="checkbox" class="group-checkable" data-set=".checkboxes" />
                                    <span></span>
                                </label>
                            </th>
                            <th>Id</th>
                            <th>Country</th>
                            <th>League</th>
                            <th>Home Team</th>
                            <th>Away Team</th>
                            <th>Odd</th>
                            <th>Prediction</th>
                            <th>Result</th>
                            <th>Status</th>
                            <th>Event Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {{#each events}}
                        <tr class="odd gradeX">
                            <td>
                                <label class="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                    <input class="use" type="checkbox" class="checkboxes" data-id="{{id}}" />
                                    <span></span>
                                </label>
                            </td>
                            <td>{{id}}</td>
                            <td>{{country}}</td>
                            <td>{{league}}</td>
                            <td>{{homeTeam}}</td>
                            <td>{{awayTeam}}</td>
                            <td>{{odd}}</td>
                            <td>{{predictionId}}</td>
                            <td>{{result}}</td>
                            <td>{{statusId}}</td>
                            <td>{{eventDate}}</td>
                        </tr>
                    {{/each}}
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
                <button type="button" class="btn green import">Import</button>
            </div>
            <!-- /.modal-content -->
        </script>
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- END MODAL AVAILABLE EVENTS -->

<!-- START MODAL ASSOCIATE EVENT-PACKAGE  -->
<div class="modal fade" id="modal-associate-events" tabindex="-1" role="basic" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content"></div>
        <script class="template-modal-content" type="text/template7">
            <input class="event-id" type="hidden" value="{{event.id}}">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <div class="assoc_modal_titles col-md-9">
                    <h4 class="modal-title">Associate Event: {{table}}</h4>
                    <h6>
                        {{#if event.isNoTip}}
                            No Tip
                        {{else}}
                            {{event.country}}:
                            {{event.league}},
                            {{event.homeTeam}} - {{event.awayTeam}},
                            {{event.predictionId}}
                        {{/if}}
                    </h6>
                </div>
            </div>
            <div class="modal-body">
                <div class="itm-table">
                    {{#each sites}}
                    <div class="col-md-4 assoc_website itm-table-cell">
                        <div class="form-group row">
                            <div class="col-md-12">
                                <div class="mt-checkbox-list">
                                    {{#js_if "@index === 0"}}
                                        <h1 class="text-center">Unfilled</h1>
                                    {{/js_if}}
                                    {{#js_if "@index === 1"}}
                                        <h1 class="text-center">Filled</h1>
                                    {{/js_if}}
                                    {{#js_if "@index === 2"}}
                                        <h1 class="text-center">Ineligible</h1>
                                    {{/js_if}}
                                    <!-- sites keys -->
                                    {{#each this}}
                                        <!-- unfilled / filled / not eligible indexes -->
                                        {{#each this}}
                                            <!-- tipIdentifier keys -->
                                            {{#each this}}
                                            <label for={{@key}}{{siteName}}>
                                                <div class="site-container text-center test">
                                                    <div>
                                                        <input 
                                                            id={{@key}}{{siteName}}
                                                            class="check-site-packages" 
                                                            type="checkbox"
                                                            {{#unless eligible}} disabled="disabled"{{/unless}}
                                                        />
                                                        <span class="assoc_website_name">{{siteName}} |</span>
                                                        <span>
                                                            {{@key}} |
                                                            {{#js_if "this.tipsDifference >= 0"}}
                                                                +
                                                            {{/js_if}}
                                                            {{tipsDifference}}
                                                        </span>
                                                    </div>
                                                </label>
                                                    <!-- tip packages keys -->
                                                    {{#each packages}}
                                                        <small>
                                                            {{name}}
                                                                {{#unless @last}}
                                                                    |
                                                                {{/unless}}
                                                        </small>
                                                        <div class="site-packages hidden"> 
                                                            <label class="mt-checkbox mt-checkbox-outline">
                                                                <input 
                                                                    class="use" 
                                                                    type="checkbox" 
                                                                    {{#if eventIsAssociated}}checked="checked"{{/if}}
                                                                    data-id="{{id}}"/> 
                                                                {{name}}
                                                            </label>
                                                        </div>
                                                    {{/each}}
                                                </div>
                                            {{/each}}
                                        {{/each}}
                                    {{/each}}
                                </div>
                            </div>
                        </div>
                    </div>
                    {{/each}}
                </div>
            </div>
            <div class="modal-footer">
                <input type="hidden" class="table-identifier" value="{{table}}"/>
                <button type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
                <button type="button" class="btn green associate-event">Import</button>
            </div>
        </script>
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- END MODAL ASSOCIATE EVENT-PACKAGE -->

<!-- MULTIPLE ADD EVENT DEFAULT PANEL TEMPLATE -->
<div id="multiple-add-panel-template" class="hidden">
    <div class="panel panel-primary itm-panel">
        <a data-toggle="collapse" data-parent="#accordion" href="#default" aria-expanded="false" class="panel-heading with-border collapsed itm-block">
            <span class="badge badge-light itm-panel-counter">1</span>
            <h4 class="panel-title">
                Choose table and event type
            </h4>
        </a>
        <div id="default" class="panel-collapse collapse in" aria-expanded="false">
            <div class="panel-body multiple-panel">
                <div class="container-multiple">
                    <div class="add_tip_automatically row">
                        <!-- table selection -->
                        <div class="form-group col-md-6">
                            <label class="control-label">Select Table</label>
                            <select class="form-control select-table" name="table[]">
                                <option value="run" selected="selected">Real Users Normal</option>
                                <option value="ruv">Real Users Vip</option>
                                <option value="nun">No Users Normal</option>
                                <option value="nuv">No Users Vip</option>
                            </select>
                        </div>

                        <!-- event type selection -->
                        <div class="form-group col-md-6">
                            <label>Select event type</label>
                            <select class="form-control" name="association-modal-event-type[]">
                                <option value="add" selected="selected">Add Event</option>
                                <option value="create">Create Event</option>
                                <option value="noTip">Add No Tip</option>
                            </select>
                        </div>

                        <!-- hidden input to persist matchId -->
                        <input type="hidden" class="match-id" name="match_id[]">
                        <!-- hidden input to persist leagueId -->
                        <input type="hidden" class="league-id" name="league_id[]">

                        <!-- content based on event type selection  noTip -->
                        <div class="col-md-12">
                            <div class="add-event-option option-no-tip">
                                <h3>You chose to add no tip</h3>
                            </div>
                        </div>

                        <!-- content based on event type selection  add -->
                        <div class="col-md-12">
                            <div class="add-event-option option-add hidden">
                                <h3>Search event</h3>
                                
                                <!-- GDM Placeholder START -->
                                <div class="row">
                                    <div class="date-selector col-md-4">
                                        <select class="match_date_filter" class="form-control input-sm" name="search_date">
                                            <option value="none" >No date filter</option>
                                            <option value="<?php echo gmdate('Y-m-d', strtotime('+3day')); ?>">+3 Days: <?php echo gmdate('Y-m-d', strtotime('+3day')); ?></option>
                                            <option value="<?php echo gmdate('Y-m-d', strtotime('+2day')); ?>">+2 Days: <?php echo gmdate('Y-m-d', strtotime('+2day')); ?></option>
                                            <option value="<?php echo gmdate('Y-m-d', strtotime('+1day')); ?>">+1 Day: <?php echo gmdate('Y-m-d', strtotime('+1day')); ?></option>
                                            <option value="<?php echo gmdate('Y-m-d'); ?>" selected="selected" >Today: <?php echo gmdate('Y-m-d'); ?></option>
                                            <option value="<?php echo gmdate('Y-m-d', strtotime('-1day')); ?>">-1 Day: <?php echo gmdate('Y-m-d', strtotime('-1day')); ?></option>
                                            <option value="<?php echo gmdate('Y-m-d', strtotime('-2day')); ?>">-2 Days: <?php echo gmdate('Y-m-d', strtotime('-2day')); ?></option>
                                            <option value="<?php echo gmdate('Y-m-d', strtotime('-3day')); ?>">-3 Days: <?php echo gmdate('Y-m-d', strtotime('-3day')); ?></option>
                                        </select>
                                    </div>													
                                </div>
                                <!-- GDM Placeholder END -->
                                
                                <div class="row">
                                    <!-- search event -->
                                    <div class="form-group col-md-12">
                                        <label class="control-label">Search Event</label>
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="fa fa-cogs"></i>
                                            </span>
                                            <input type="text" class="form-control search-match"/>
                                        </div>
                                    </div>

                                    <!-- div for founded events -->
                                    <div class="col-md-12">
                                        <div class="selectable-block"></div>
                                        <script class="template-selectable-block" type="text/template7">
                                            {{#each matches}}
                                            <div class="selectable-row" data-id="{{id}}"    data-league-id="{{leagueId}}">{{country}}: {{league}} {{homeTeam}} --- {{awayTeam}} {{result}} {{eventDate}}</div>
                                            {{else}}
                                            <div class="selectable">No Events Available</div>
                                            {{/each}}
                                        </script>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <!-- content based on event type selection  create -->
                        <div class="col-md-12">
                            <div class="add-event-option option-create hidden">
                                <h3>Create Event Manually</h3>
                                
                                <!-- GDM Placeholder START -->
                                <div class="row">
                                    <div class="date-selector col-md-4">
                                        <select class="manual_event_date" class="form-control input-sm" name="event_date[]">
                                            <option value="<?php echo gmdate('Y-m-d', strtotime('+3day')); ?>">+3 Days: <?php echo gmdate('Y-m-d', strtotime('+3day')); ?></option>
                                            <option value="<?php echo gmdate('Y-m-d', strtotime('+2day')); ?>">+2 Days: <?php echo gmdate('Y-m-d', strtotime('+2day')); ?></option>
                                            <option value="<?php echo gmdate('Y-m-d', strtotime('+1day')); ?>">+1 Day: <?php echo gmdate('Y-m-d', strtotime('+1day')); ?></option>
                                            <option value="<?php echo gmdate('Y-m-d'); ?>" selected="selected" >Today: <?php echo gmdate('Y-m-d'); ?></option>
                                            <option value="<?php echo gmdate('Y-m-d', strtotime('-1day')); ?>">-1 Day: <?php echo gmdate('Y-m-d', strtotime('-1day')); ?></option>
                                            <option value="<?php echo gmdate('Y-m-d', strtotime('-2day')); ?>">-2 Days: <?php echo gmdate('Y-m-d', strtotime('-2day')); ?></option>
                                            <option value="<?php echo gmdate('Y-m-d', strtotime('-3day')); ?>">-3 Days: <?php echo gmdate('Y-m-d', strtotime('-3day')); ?></option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="input-group">
                                            <input type="text" class="form-control timepicker timepicker-24" name="event_time[]">
                                            <span class="input-group-btn">
                                                <button class="btn default" type="button">
                                                    <i class="fa fa-clock-o"></i>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <!-- GDM Placeholder END -->
                                
                                <ul class="add_event_manually row">
                                    <li class="col-md-3">
                                        <div class="form-group">
                                            <label class="control-label">Select Country</label>
                                            <select class="form-control select-provider manual_event_country_sel" name="country[]">
                                            </select>
                                        </div>
                                    </li>
                                    <li class="col-md-3">
                                        <div class="form-group">
                                            <label class="control-label">Select League</label>
                                            <select class="form-control select-provider manual_event_league_sel" name="league[]">
                                            </select>
                                        </div>
                                    </li>
                                    <li class="col-md-3">
                                        <div class="form-group">
                                            <label class="control-label">Home Team</label>
                                            <select class="form-control select-provider manual_event_home_sel" name="home_team[]">
                                            </select>
                                        </div>
                                    </li>
                                    <li class="col-md-3">
                                        <div class="form-group">
                                            <label class="control-label">Away Team</label>
                                            <select class="form-control select-prediction-manual manual_event_away_sel" name="away_team[]">
                                            </select>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- content based on event type selection  add or create -->
                        <div class="col-md-12">
                            <div class="row add-event-option option-add-create hidden">
                                <!-- select prediction -->
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="control-label">Select Prediction</label>
                                        <select class="form-control select-prediction" name="prediction[]"></select>
                                        <script class="template-select-prediction" type="text/template7">
                                            <option value="-">- Select -</option>
                                            {{#each predictions}}
                                                {{#each predictions}}
                                                <option value="{{identifier}}">{{name}}</option>
                                                {{/each}}
                                            {{/each}}
                                        </script>
                                    </div>
                                </div>

                                <!-- odd -->
                                <div class="col-md-5">
                                    <label class="control-label">Odd</label>
                                    <input type="text" class="form-control odd" name="odd[]">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- START MODAL ADD EVENT -->
<div class="modal fade" id="modal-add-manual-event" role="basic" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title import_modal_title">Add Event</h4>
            </div>
            <div class="modal-body" id="form_wizard_1">
                <form class="form-horizontal add_event_form" action="#" id="submit_form" method="POST">
                    <div class="form-wizard">
                        <div class="form-body">
                            <ul class="nav nav-pills nav-justified steps">
                                <li>
                                    <a href="#tab1" data-toggle="tab" class="step active">
                                        <span class="number"> 1 </span>
                                        <span class="desc">
                                            <i class="fa fa-check"></i> Select Event </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#tab2" data-toggle="tab" class="step">
                                        <span class="number"> 4 </span>
                                        <span class="desc">
                                            <i class="fa fa-check"></i> Confirm Event </span>
                                    </a>
                                </li>
                            </ul>
                            <div id="bar" class="progress progress-striped" role="progressbar">
                                <div class="progress-bar progress-bar-success"> </div>
                            </div>
                            <div class="tab-content">
                                <div class="alert alert-danger display-none">
                                    <button class="close" data-dismiss="alert"></button> You have some form errors. Please check below. </div>
                                <div class="alert alert-success display-none">
                                    <button class="close" data-dismiss="alert"></button> Your form validation is successful! </div>
                                
                                <div class="box-group" id="accordion">
                                    <!-- MULTIPLE PANELS WILL BE INSERTED HERE -->
                                    
                                    <!-- ************************************* -->
                                    <div class="text-right">
                                        <button class="btn btn-success add-multiple" type="button"><i class="fa fa-plus"></i>&nbsp; Add multiple</button>
                                        <button class="btn btn-primary save-events" type="button"><i class="fa fa-check"></i>&nbsp; Save</button>
                                    </div>
                                </div>

                                <!-- confirm section -->
                                <div class="tab-pane" id="tab2">
                                    <div class="confirm-event">
                                        <h3 class="block">Confirm the event
                                            - table: <span class="table"></span>
                                            system date: <span class="systemDate"></span>
                                        </h3>

                                        <!-- add no tip -->
                                        <div class="add-event-option option-no-tip">
                                            <h4 class="block">Tou will add no tip</h4>
                                        </div>

                                        <!-- add event ot create event -->
                                        <div class="add-event-option option-add-create">
                                            <div class="form-group">
                                                <label class="control-label col-md-3">Country:</label>
                                                <div class="col-md-4">
                                                    <p class="form-control-static country">-</p>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-md-3">League:</label>
                                                <div class="col-md-4">
                                                    <p class="form-control-static league">-</p>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-md-3">Event:</label>
                                                <div class="col-md-4">
                                                    <p class="form-control-static teams">-</p>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-md-3">Prediction:</label>
                                                <div class="col-md-4">
                                                    <p class="form-control-static prediction">-</p>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-md-3">Odd</label>
                                                <div class="col-md-4">
                                                    <p class="form-control-static odd">-</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--
                        <div class="form-actions">
                            <div class="row">
                                <div class="col-md-offset-3 col-md-9">
                                    <a href="javascript:;" class="btn default button-previous">
                                        <i class="fa fa-angle-left"></i> Back </a>
                                    <a href="javascript:;" class="btn btn-outline green button-next"> Continue
                                        <i class="fa fa-angle-right"></i>
                                    </a>
                                    <a class="btn green button-submit"> Submit
                                        <i class="fa fa-check"></i>
                                    </a>
                                </div>
                                <hr>
                            </div>
                        </div>
                        -->
                    </div>
                </form>
            </div>
            <!-- /.modal-content -->
        </div>
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- END MODAL ADD EVENT -->
