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
                            <select id="autounit-table-select" class="form-control select-table select2 table_import_filter_select">
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
                    <li>
                        <a href="<?php echo $config['coreUrl'] . '/autounit'; ?>" target="_blank" class="btn btn-success run-autounit">Run Autounit Now</a>
                    </li>
                    <li>
                        <a href="<?php echo $config['coreUrl'] . '/autounit-reset'; ?>" target="_blank" class="btn btn-success reset-autounit">Reset Autounit</a>
                    </li>
                    <li>
                        <button type="button" class="btn btn-success show-admin-pool">Create pool</button>
                    </li>
                    <li>
                        <button type="button" class="btn btn-success show-site-configurations">View site configurations</button>
                    </li>
                    <li>
                        <button 
                            type="button" 
                            class="btn toggle-autounit-all-sites-state"
                            data-state=""
                        >
                        </button>
                    </li>
                    <li>
                        <button type="button" class="btn btn-success toggle-empty-matches">Toggle empty matches</button>
                    </li>
                </ul>
            </div>

            <div class="portlet-body auto-unit-container">

                <div class="panel-group accordion content-tip" id="accordion3"></div>
                <script class="template-content-tip" type="text/template7">
                    {{#each tips}}
                    <div class="panel panel-default">
                        <input type="hidden" class="tip-identifier" value="{{tipIdentifier}}">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a class="accordion-toggle accordion-toggle-styled collapsed" data-toggle="collapse" href="#collapse_3_{{@index}}"> 
                                    {{tipIdentifier}} | {{scheduleType}} configuration
                                    {{#each this.packages}}
                                        | {{this.name}}
                                    {{/each}}
                                    |
                                    {{#js_compare "this.paused == 1 || this.paused == null"}}
                                        <span class="label label-danger autounit-status {{#if this.hasSubscription}}has-subscription{{/if}}">Paused</span>
                                    {{/js_compare}}
                                    {{#js_compare "this.paused == 0"}}
                                        <span class="label label-primary autounit-status">Active</span>
                                    {{/js_compare}}
                                    {{#if this.hasAlert}}
                                        <span 
                                            class="label label-danger clear-alert" 
                                            data-tip-identifier="{{this.tipIdentifier}}"
                                            data-table-identifier="{{this.tableIdentifier}}"
                                            data-site-id="{{this.siteId}}"
                                        >
                                            <i class="fa fa-trash"></i> Clear alerts
                                        </span>
                                    {{/if}}
                                </a>
                            </h4>
                        </div>
                        <div id="collapse_3_{{@index}}" class="panel-collapse collapse">
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Ligi</label>
                                            <select class="mt-multiselect btn btn-default autounit leagues" multiple="multiple" data-filter="true" data-width="100%">
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
                                            <input type="hidden" class="configuration-type" value="default">
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
                                            <input type="hidden" class="configuration-type" value="monthly">
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
                                    {{#if isDefaultConf}}
                                    {{else}}
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
                                    {{/if}}
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Draw</label>
                                            <input type="text" class="form-control draw" value="{{draw}}">
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        {{#if isDefaultConf}}
                                            <div class="form-group">
                                                <label>Min Win Rate</label>
                                                <input type="text" class="form-control min-winrate" value="{{minWinrate}}">
                                            </div>
                                            <div class="form-group">
                                                <label>Max Win Rate</label>
                                                <input type="text" class="form-control max-winrate" value="{{maxWinrate}}">
                                            </div>
                                        {{else}}
                                            <div class="form-group">
                                                <label>Win Rate</label>
                                                <input type="text" class="form-control winrate" value="{{winrate}}">
                                            </div>
                                        {{/if}}
                                    </div>
                                </div>

                                <input type="hidden" class="tips-total" value="{{tipsNumber}}"/>
                                <input type="hidden" class="days-in-month" value="{{daysInMonth}}"/>

                                <div class="row">
                                    <div class="col-md-2 col-md-offset-5">
                                        <button type="button" class="btn btn-success save-tip-settings">Save</button>
                                        <button 
                                            type="button" 
                                            class="btn {{#if this.paused}}btn-primary {{else}} btn-danger {{/if}} toggle-autounit-state" 
                                            data-tip-Identifier="{{this.tipIdentifier}}"
                                            data-site="{{this.siteId}}"
                                            data-state="{{this.paused}}"
                                            data-has-subscription="{{this.hasSubscription}}"
                                        >
                                            {{#if this.paused}}
                                                Activate autounit
                                            {{else}}
                                                Pause autounit
                                            {{/if}}
                                        </button>
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
                            <ul class="text-center inline-list nostyle-list itm-autounit-statistics">
                                <li class="text-center"><span class="label bg-blue"> WIN RATE: <span class="winrate">{{winrate}}</span>% </span></li>
                                <li class="text-center"><span class="label bg-green-jungle"> WINS: <span class="win-counter">{{win}}<span> </span></li>
                                <li class="text-center"><span class="label bg-red-thunderbird"> LOSS: <span class="loss-counter">{{loss}}<span> </span></li>
                                <li class="text-center"><span class="label bg-yellow-gold"> DRAW: <span class="draw-counter">{{draw}}<span> </span></li>
                                <li class="text-center"><span class="label bg-purple"> VIP: <span class="draw-counter">{{vip}}<span> </span></li>
                                <li class="text-center statistics-container"><span class="badge badge-secondary" data-toggle="popover" data-loaded="false"><i class="fa fa-question-circle"></i></span></li>
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
                                    <th> Match result </th>
                                    <th> Info </th>
                                    <th> Prediction </th>
                                    <th> Odd </th>
                                    <th> Result </th>
                                    <th title="This match is from the Admin Pool Config"> AP </th>
                                    <th> Status </th>
                                    <th> Source </th>
                                    <th> Action </th>
                                    <th> Distributed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {{#each events}}
                                    <tr class="
                                        {{#if isRealUser}} subscription-entry {{/if}} 
                                        {{#if this.isVip}} is-vip bg-yellow-gold {{/if}}
                                        {{#if this.isVip}} is-vip bg-yellow-gold {{/if}}
                                        {{#js_if "this.league === '?'"}}
                                            itm-display-empty-match
                                        {{/js_if}}
                                    "
                                        data-date="{{systemDate}}"
                                    >
                                        <td> {{systemDate}} - {{tipIdentifier}} </td>
                                        <td>{{league}}</td>
                                        <td>{{homeTeam}} vs {{awayTeam}}</td>
                                        <td>{{result}}</td>
                                        <td class="auto-unit-info" data-toggle="popover" data-matches="{{invalidMatches}}">
                                            <span>{{status}} - {{info}}</span>
                                        </td>
                                        <td>
                                            {{#if isPosted}} {{predictionName}} {{/if}}
                                            {{#if isScheduled}} 
                                                <span class="itm-current-prediction">{{predictionGroup}}</span>

                                                <div class="btn-group">
                                                {{#js_if "this.league === '?'"}}
                                                    <button type="button" class="btn btn-info dropdown-toggle btn-sm" data-toggle="dropdown" aria-expanded="true">
                                                        <span class="caret"></span>
                                                        <span class="sr-only">Toggle Dropdown</span>
                                                    </button>
                                                    <ul class="dropdown-menu" role="menu">
                                                        {{#js_compare "this.prediction1x2 > 0"}}
                                                            <li class="itm-autounit-match-prediction bg-green-jungle" data-schedule="{{this.scheduleId}}" data-prediction-group="1x2">
                                                                <a href="#"><i class="fa fa-check-circle bg-green-jungle"></i>1x2</a>
                                                            </li>
                                                        {{/js_compare}}
                                                        {{#js_compare "this.predictionOU > 0"}}
                                                            <li class="itm-autounit-match-prediction bg-green-jungle" data-schedule="{{this.scheduleId}}" data-prediction-group="OU">
                                                                <a href="#"><i class="fa fa-check-circle bg-green-jungle"></i>O/U</a>
                                                            </li>
                                                        {{/js_compare}}
                                                        {{#js_compare "this.predictionAH > 0"}}
                                                            <li class="itm-autounit-match-prediction bg-green-jungle" data-schedule="{{this.scheduleId}}" data-prediction-group="AH">
                                                                <a href="#"><i class="fa fa-check-circle bg-green-jungle"></i>AH</a>
                                                            </li>
                                                        {{/js_compare}}
                                                        {{#js_compare "this.predictionGG > 0"}}
                                                            <li class="itm-autounit-match-prediction bg-green-jungle" data-schedule="{{this.scheduleId}}" data-prediction-group="GG">
                                                                <a href="#"><i class="fa fa-check-circle bg-green-jungle"></i>GG</a>
                                                            </li>
                                                        {{/js_compare}}
                                                    </ul>
                                                {{/js_if}}
                                                </div>
                                            {{/if}}
                                        </td>
                                        <td>
                                            {{odd}}
                                        
                                            {{#if initial_odd}}
                                                {{#js_compare "this.odd > this.initial_odd"}}
                                                    <span class="text-success odd-status" data-odd="{{odd}}" data-initial-odd="{{initial_odd}}"><i class="fa fa-arrow-up"></i></span>
                                                {{/js_compare}}
                                                {{#js_compare "this.odd < this.initial_odd"}}
                                                    <span class="text-danger odd-status" data-odd="{{odd}}" data-initial-odd="{{initial_odd}}"><i class="fa fa-arrow-down"></i></span>
                                                {{/js_compare}}
                                            {{else}}
                                                <span class="text-danger"><i class="fa fa-times"></i></span>
                                            {{/if}}
                                        </td>
                                        <td>
                                        
                                            <div class="btn-group">
                                                {{#js_compare "this.statusId == 1"}}
                                                    <button class="btn btn-info btn-sm bg-green-jungle itm-current-status" data-status-id="{{this.statusId}}"> WIN </button>
                                                {{/js_compare}}
                                                {{#js_compare "this.statusId == 2"}}
                                                    <button class="btn btn-sm bg-red-thunderbird itm-current-status" data-status-id="{{this.statusId}}"> LOSS </button>
                                                {{/js_compare}}
                                                {{#js_compare "this.statusId == 3"}}
                                                    <button class="btn btn-sm bg-yellow-gold itm-current-status" data-status-id="{{this.statusId}}"> DRAW </button>
                                                {{/js_compare}}
                                                {{#js_compare "this.statusId == 4"}}
                                                    <button class="btn btn-sm bg-yellow-gold itm-current-status" data-status-id="{{this.statusId}}"> POSTP. </button>
                                                {{/js_compare}}
                                                
                                                {{#js_if "this.league === '?'"}}
                                                    <button type="button" class="btn btn-info dropdown-toggle btn-sm" data-toggle="dropdown" aria-expanded="true">
                                                        <span class="caret"></span>
                                                        <span class="sr-only">Toggle Dropdown</span>
                                                    </button>
                                                    <ul class="dropdown-menu" role="menu">
                                                        <li class="itm-autounit-match-status bg-green-jungle" data-schedule="{{this.scheduleId}}" data-status-id="1">
                                                            <a href="#"><i class="fa fa-check-circle bg-green-jungle"></i>WIN</a>
                                                        </li>
                                                        <li class="itm-autounit-match-status bg-red-thunderbird" data-schedule="{{this.scheduleId}}" data-status-id="2">
                                                            <a href="#"><i class="fa fa-exclamation bg-red-thunderbird"></i>LOSS</a>
                                                        </li>
                                                        <li class="itm-autounit-match-status bg-yellow-gold" data-schedule="{{this.scheduleId}}" data-status-id="3">
                                                            <a href="#"><i class="fa fa-equals bg-yellow-gold"></i>DRAW</a>
                                                        </li>
                                                        <li class="itm-autounit-match-status bg-yellow-gold" data-schedule="{{this.scheduleId}}" data-status-id="4">
                                                            <a href="#"><i class="fa fa-ban bg-yellow-gold"></i>POSTP.</a>
                                                        </li>
                                                    </ul>
                                                {{/js_if}}
                                            </div>
                                        </td>
                                        <td class="{{this.is_from_admin_pool}}">
                                            {{#js_compare "this.is_from_admin_pool == 1"}}
                                                <i class="fa fa-star"></i>
                                            {{/js_compare}}
                                            
                                            {{#js_compare "this.is_from_admin_pool == 0"}}
                                                <i class="fa fa-star-o"></i>
                                            {{/js_compare}}
                                        </td>
                                        <td>
                                            {{#if isPosted}} <span class="font-green-jungle">Published</span> {{/if}}
                                            {{#if isScheduled}} Waiting {{/if}}
                                        </td>
                                        <td>
                                            {{#if isAutoUnit}} Auto Unit {{/if}}
                                            {{#if isRealUser}} Subscription {{/if}}
                                            {{#if isNoUser}} Manual {{/if}}
                                        </td>
                                        <td>
                                            <button type="button" class="btn red btn-xs delete-event"
                                            {{#if isAutoUnit}}data-type="auto-unit"{{/if}}
                                            {{#if isRealUser}}data-type="archive-big"{{/if}}
                                            {{#if isNoUser}}data-type="archive-big"{{/if}}
                                            {{#if distributionId}}
                                                data-id="{{distributionId}}"
                                            {{else}}
                                                data-scheduleId="{{id}}
                                            {{/if}}
                                            ">Delete</button>
                                            
                                            <span class="itm-add-autounit-match" data-date="{{systemDate}}" data-tip-identifier="{{tipIdentifier}}"><i class="fa fa-plus-circle"></i></span>
                                        </td>
                                        <td>{{sites_distributed_counter}} sites</td>
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
                                        <option 
                                            value="{{this}}"
                                            {{#js_compare "this == ../selectedTip"}}
                                                selected
                                            {{/js_compare}}
                                        >
                                            {{this}}
                                        </option>
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
                                        <option value="g/g">GG</option>
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