<!-- BEGIN CONTENT -->
<div class="page-content-wrapper auto-unit hidden">
    <!-- BEGIN CONTENT BODY -->
    <div class="page-content">

        <!-- BEGIN TABLE TITLE-->
        <h1 class="page-title">Auto Unit</h1>
        <!-- END TABLE TITLE-->

        <!-- BEGIN SELECT SITE AND TABLE PORTLET-->
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
                            <label class="control-label">Month</label>
                            <select class="form-control select-date select2 table_import_filter_select">
                               <option value="default"> -- default-config -- </option>
                               <option value="<?php echo gmdate('Y-m'); ?>"> <?php echo gmdate('M Y'); ?></option>
                               <?php $dates = [1, 2, 3, 4, 5, 6] ?>
                               <?php foreach ($dates as $v) { ?>
                               <option value="<?php echo gmdate('Y-m', strtotime('+ ' . $v . ' month')); ?>"> <?php echo gmdate('M Y', strtotime('+ ' . $v . ' month')); ?></option>
                               <?php } ?>
                            </select>
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
                        <button type="button" class="btn btn-success new-schedule-event">Add New Entry</button>
                    </li>
                </ul>
            </div>

            <div class="portlet-body">

                <div class="panel-group accordion content-tip" id="accordion3"></div>
                <script class="template-content-tip" type="text/template7">
                    {{#each tips}}
                    <div class="panel panel-default">
                        <input type="hidden" class="tip-identifier" value="{{tipIdentifier}}">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a class="accordion-toggle accordion-toggle-styled collapsed" data-toggle="collapse" href="#collapse_3_{{@index}}"> {{tipIdentifier}} | {{configType}} configuration</a>
                            </h4>
                        </div>
                        <div id="collapse_3_{{@index}}" class="panel-collapse collapse">
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Ligi</label>
                                            <select class="mt-multiselect btn btn-default leagues" multiple="multiple" data-filter="true" data-width="100%">
                                                {{#each leagues}}
                                                <option value="{{id}}" {{#if isAssociated}} selected="selected" {{/if}}>{{name}}</option>
                                                {{/each}}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Min Odd</label>
                                            <input type="text" class="form-control min-odd" value="{{minOdd}}">
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Max Odd</label>
                                            <input type="text" class="form-control max-odd" value="{{maxOdd}}">
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        {{#if isDefaultConf}}
                                            <!-- default configuration -->
                                            {{#if isTips}}
                                                <div class="form-group">
                                                    <label>Min Tips</label>
                                                    <input type="text" class="form-control min-tips" value="{{minTips}}">
                                                </div>
                                                <div class="form-group">
                                                    <label>Max Tips</label>
                                                    <input type="text" class="form-control max-tips" value="{{maxTips}}">
                                                </div>
                                                <input type="hidden" class="config-type" value="tips">
                                            {{/if}}
                                            {{#if isDays}}
                                                <div class="form-group">
                                                    <label>Tips per Day</label>
                                                    <input type="text" class="form-control tips-per-day" value="{{tipsPerDay}}">
                                                </div>
                                                <input type="hidden" class="config-type" value="days">
                                            {{/if}}
                                        {{else}}
                                            <!-- monthly configuration -->
                                            {{#if isTips}}
                                                <div class="form-group">
                                                    <label>Tips Number</label>
                                                    <input type="text" class="form-control tips-number" value="{{tipsNumber}}">
                                                </div>
                                                <input type="hidden" class="config-type" value="tips">
                                            {{/if}}
                                            {{#if isDays}}
                                                <div class="form-group">
                                                    <label>Tips per Day</label>
                                                    <input type="text" class="form-control tips-per-day" value="{{tipsPerDay}}">
                                                </div>
                                                <input type="hidden" class="config-type" value="days">
                                            {{/if}}
                                        {{/if}}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>1x2</label>
                                            <select class="form-control group-1x2">
                                                <?php for ($i = 0; $i <= 100; $i += 5) { ?>
                                                <option value="<?php echo $i; ?>"
                                                {{#js_compare "this.prediction1x2 == <?php echo $i; ?>"}}
                                                    selected="selected"
                                                {{/js_compare}}
                                                ><?php echo $i; ?>%</option>
                                                <?php  } ?>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Over/Under</label>
                                            <select class="form-control group-ou">
                                                <?php for ($i = 0; $i <= 100; $i += 5) { ?>
                                                <option value="<?php echo $i; ?>"
                                                {{#js_compare "this.predictionOU == <?php echo $i; ?>"}}
                                                    selected="selected"
                                                {{/js_compare}}
                                                ><?php echo $i; ?>%</option>
                                                <?php  } ?>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>AH</label>
                                            <select class="form-control group-ah">
                                                <?php for ($i = 0; $i <= 100; $i += 5) { ?>
                                                <option value="<?php echo $i; ?>"
                                                {{#js_compare "this.predictionAH == <?php echo $i; ?>"}}
                                                    selected="selected"
                                                {{/js_compare}}
                                                ><?php echo $i; ?>%</option>
                                                <?php  } ?>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>BTS</label>
                                            <select class="form-control group-gg">
                                                <?php for ($i = 0; $i <= 100; $i += 5) { ?>
                                                <option value="<?php echo $i; ?>"
                                                {{#js_compare "this.predictionGG == <?php echo $i; ?>"}}
                                                    selected="selected"
                                                {{/js_compare}}
                                                ><?php echo $i; ?>%</option>
                                                <?php  } ?>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-md-offset-4 text-center">
                                        <label>Total: <span class="prediction-percentage"></span>%</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Wins</label>
                                            <input type="text" class="form-control win" value="{{win}}">
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Loss</label>
                                            <input type="text" class="form-control loss" value="{{loss}}">
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Draw</label>
                                            <input type="text" class="form-control draw" value="{{draw}}">
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Win Rate</label>
                                            <input type="text" class="form-control winrate" value="{{winrate}}">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-2 col-md-offset-5">
                                        <button type="button" class="btn btn-success save-tip-settings">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {{/each}}
                </script>

                <div class="panel panel-default table-schedule"></div>
                <script class="template-table-schedule" type="text/template7">
                    <hr>
                    <div class="row">
                        <div class="col-md-6 col-md-offset-3">
                            <ul class="text-center inline-list nostyle-list">
                                <li class="text-center"><span class="label bg-blue"> WIN RATE: {{winrate}}% </span></li>
                                <li class="text-center"><span class="label bg-green-jungle"> WINS: {{win}} </span></li>
                                <li class="text-center"><span class="label bg-red-thunderbird"> LOSS: {{loss}} </span></li>
                                <li class="text-center"><span class="label bg-yellow-gold"> DRAW: {{draw}} </span></li>
                            </ul>
                        </div>
                    </div>
                    <hr>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th> Date </th>
                                    <th> League </th>
                                    <th> Teams </th>
                                    <th> Prediction </th>
                                    <th> Odd </th>
                                    <th> Result </th>
                                    <th> Status </th>
                                    <th> Source </th>
                                    <th> Action </th>
                                    <th> Info </th>
                                </tr>
                            </thead>
                            <tbody>
                                {{#each events}}
                                    <tr {{#if isRealUser}} class="subscription-entry" {{/if}}>
                                        <td> {{systemDate}} </td>
                                        <td>{{league}}</td>
                                        <td>{{homeTeam}} vs {{awayTeam}}</td>
                                        <td>
                                            {{#if isPosted}} {{predictionName}} {{/if}}
                                            {{#if isScheduled}} {{predictionGroup}} {{/if}}
                                        <td>{{odd}}</td>
                                        <td>
                                            {{#js_compare "this.statusId == 1"}}
                                            <span class="label bg-green-jungle"> WIN </span>
                                            {{/js_compare}}
                                            {{#js_compare "this.statusId == 2"}}
                                            <span class="label bg-red-thunderbird"> LOSS </span>
                                            {{/js_compare}}
                                            {{#js_compare "this.statusId == 3"}}
                                            <span class="label bg-yellow-gold"> DRAW </span>
                                            {{/js_compare}}
                                            {{#js_compare "this.statusId == 4"}}
                                            <span class="label bg-yellow-gold"> POSTP. </span>
                                            {{/js_compare}}
                                        </td>
                                        <td>
                                            {{#if isPosted}} <span class="font-green-jungle">Posted</span> {{/if}}
                                            {{#if isScheduled}} Scheduled {{/if}}
                                        </td>
                                        <td>
                                            {{#if isAutoUnit}} Auto Unit {{/if}}
                                            {{#if isRealUser}} Subscription {{/if}}
                                            {{#if isNoUser}} Manual {{/if}}
                                        </td>
                                        <td>
                                            <button type="button" class="btn red btn-xs delete-event"
                                            {{#if isAutoUnit}}data-type="auto-unit" data-id="{{id}}"{{/if}}
                                            {{#if isRealUser}}data-type="archive-big" data-id="{{distributionId}}"{{/if}}
                                            {{#if isNoUser}}data-type="archive-big" data-id="{{distributionId}}"{{/if}}
                                            ">Delete</button>
                                        </td>
                                        <td>{{status}} - {{info}}</td>
                                    </tr>
                                {{/each}}

                            </tbody>
                        </table>
                     </div>
                 </script>
            </div>
        </div>
        <!-- END SELECT SITE AND TABLE PORTLET-->
        <div class="modal fade" id="auto-unit-new-schedule-event" tabindex="-1" role="auto-unit-new-schedule-event" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                        <h4 class="modal-title">Add New Entry</h4>
                    </div>
                    <div class="modal-body new-event"></div>
                    <script class="template-new-event" type="text/template7">
                        <ul class="inline-list nostyle-list">
                            <li>
                                <div class="form-group">
                                    <label class="control-label">Date</label>
                                    <input class="form-control input-medium system-date" type="text" value="" />
                                </div>
                            </li>
                            <li>
                                <div class="form-group">
                                    <label>Tip</label>
                                    <select class="form-control tip-identifier">
                                        <option value=""> -- select -- </option>
                                        {{#each tips}}
                                        <option value="{{this}}">{{this}}</option>
                                        {{/each}}
                                    </select>
                                </div>
                            </li>
                            <li>
                                <div class="form-group">
                                    <label for="single" class="control-label">Prediction</label>
                                    <select id="single" class="form-control prediction-group">
                                        <option value=""> -- select -- </option>
                                        <option value="1x2">1x2</option>
                                        <option value="ah">AH</option>
                                        <option value="gg">GG</option>
                                        <option value="o/u">O/U</option>
                                        <option value="ah">AH</option>
                                    </select>
                                </div>
                            </li>
                            <li>
                                <div class="form-group">
                                    <label>Result</label>
                                    <select class="form-control status">
                                        <option value=""> -- select -- </option>
                                        <option value="1">WIN</option>
                                        <option value="2">LOSS</option>
                                        <option value="3">DRAW</option>
                                    </select>
                                </div>
                            </li>
                        </ul>
                    </script>

                    <div class="modal-footer">
                        <button type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
                        <button type="button" class="btn green save">Save</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->
    </div>
    <!-- END CONTENT BODY -->
</div>
<!-- end content -->
