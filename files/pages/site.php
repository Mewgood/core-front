!-- BEGIN CONTENT -->
<div class="page-content-wrapper site hidden">
    <!-- BEGIN CONTENT BODY -->
    <div class="page-content">

        <div class="row">
            <div class="col-sm-12">
                <div class="col-sm-6">
                    <select class="form-control site-selection select2"></select>
                    <script class="template-site-selection" type="text/template7">
                        <option value="new"> -- New Website -- </option>
                        {{#each sites}}
                        <option value="{{id}}">{{name}}</option>
                        {{/each}}
                    </script>
                </div>
                <div class="col-sm-6">
                    <div class="actions pull-right">
                        <button class="btn green add-new-site">Add New</button>
                        <button class="btn red delete-site">Delete</button>
                        <button class="btn green save-site">Save</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="site-name"></div>
        <script class="template-site-name" type="text/template7">
        <h1 class="page-title">{{name}}</h1>
        </script>

        <div class="row">

            <!-- site general configuration -->
            <div class="col-md-8">
                <!-- BEGIN Portlet PORTLET-->
                <div class="portlet light bordered">
                    <div class="portlet-title">
                        <div class="caption">
                            <i class="icon-speech"></i>
                            <span class="caption-subject bold uppercase"> General Settings</span>
                        </div>
                        <div class="actions site-token"></div>
                        <script class="template-site-token" type="text/template7">
                            Token: <span>{{token}}</span> &nbsp;&nbsp;
                            {{#js_compare "this.isConnect === 0"}}
                            <button class="btn red connection-update">Connect</button>
                            {{/js_compare}}
                            {{#js_compare "this.isConnect === 1"}}
                            <button class="btn green connection-update">Update</button>
                            {{/js_compare}}
                            <button class="btn green connection-reset">Reset</button>
                        </script>
                    </div>
                    <div class="portlet-body">

                        <!-- div and script for populate site general configuration -->
                        <div class="row site-general"></div>
                        <script class="template-site-general" type="text/template7">
                        <div class="col-md-4">
                            <h4>General</h4>
                            <div class="form-group">
                                <label>Website name</label>
                                <input type="text" class="form-control name" value="{{name}}">
                            </div>

                            <div class="form-group">
                                <label>Website email</label>
                                <input type="text" class="form-control email" value="{{email}}">
                            </div>

                            <div class="form-group">
                                <label>Website URL</label>
                                <input type="text" class="form-control url" value="{{url}}">
                            </div>

                            <?php
                                $dateFormats = [

                                    'm/d',
                                    'm-d',
                                    'm.d',
                                    'm:d',
                                    'm d',
                                    'm|d',

                                    'M/d',
                                    'M-d',
                                    'M.d',
                                    'M:d',
                                    'M d',
                                    'M|d',

                                    'F/d',
                                    'F-d',
                                    'F.d',
                                    'F:d',
                                    'F d',
                                    'F|d',

                                    'd/m',
                                    'd-m',
                                    'd.m',
                                    'd:m',
                                    'd m',
                                    'd|m',

                                    'd/M',
                                    'd-M',
                                    'd.M',
                                    'd:M',
                                    'd M',
                                    'd|M',

                                    'd/F',
                                    'd-F',
                                    'd.F',
                                    'd:F',
                                    'd F',
                                    'd|F',

                                    'd/m/Y',
                                    'd/m/y',
                                    'd-m-Y',
                                    'd-m-y',
                                    'd.m.Y',
                                    'd.m.y',
                                    'd:m:Y',
                                    'd:m:y',
                                    'd m Y',
                                    'd m y',
                                    'd|m|Y',
                                    'd|m|y',

                                    'Y/m/d',
                                    'y/m/d',
                                    'Y-m-d',
                                    'y-m-d',
                                    'Y.m.d',
                                    'y.m.d',
                                    'Y:m:d',
                                    'y:m:d',
                                    'Y m d',
                                    'y m d',
                                    'Y|m|d',
                                    'y|m|d',

                                    'd/M/Y',
                                    'd/M/y',
                                    'd-M-Y',
                                    'd-M-y',
                                    'd.M.Y',
                                    'd.M.y',
                                    'd:M:Y',
                                    'd:M:y',
                                    'd M Y',
                                    'd M y',
                                    'd|M|Y',
                                    'd|M|y',

                                    'Y/M/d',
                                    'y/M/d',
                                    'Y-M-d',
                                    'y-M-d',
                                    'Y.M.d',
                                    'y.M.d',
                                    'Y:M:d',
                                    'y:M:d',
                                    'Y M d',
                                    'y M d',
                                    'Y|M|d',
                                    'y|M|d',

                                    'd/F/Y',
                                    'd/F/y',
                                    'd-F-Y',
                                    'd-F-y',
                                    'd.F.Y',
                                    'd.F.y',
                                    'd:F:Y',
                                    'd:F:y',
                                    'd F Y',
                                    'd F y',
                                    'd|F|Y',
                                    'd|F|y',

                                    'Y/F/d',
                                    'y/F/d',
                                    'Y-F-d',
                                    'y-F-d',
                                    'Y.F.d',
                                    'y.F.d',
                                    'Y:F:d',
                                    'y:F:d',
                                    'Y F d',
                                    'y F d',
                                    'Y|F|d',
                                    'y|F|d',
                                ];
                            ?>

                            <div class="form-group">
                                <label>Date Format</label>
                                <select class="form-control date-format">
                                    <option value="">- Select -</option>

                                    <?php foreach($dateFormats as $format) { ?>
                                    <option value="<?php echo $format; ?>"><?php echo gmdate($format); ?></option>
                                    <?php } ?>

                                </select>
                            </div>

                            <div class="form-group">
                                <label>Thank you page parameter</label>
                                <input type="text" class="form-control" readonly="readonly">
                            </div>
                            
                            <div class="form-group">
                                <label>Type</label>
                                <select class="form-control type">
                                    <option value=""> - None -</option>
                                    <option value="static"
                                    {{#js_compare "this.type === 'static'"}}selected="selected"{{/js_compare}}>
                                    Static</option>
                                    <option value="cms"
                                    {{#js_compare "this.type === 'cms'"}}selected="selected"{{/js_compare}}>
                                    CMS</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <h4>SMTP</h4>
                            <div class="form-group">
                                <label>Host</label>
                                <input type="text" class="form-control smtp-host" value="{{smtpHost}}">
                            </div>

                            <div class="form-group">
                                <label>Port</label>
                                <input type="text" class="form-control smtp-port" value="{{smtpPort}}">
                            </div>

                            <div class="form-group">
                                <label>User</label>
                                <input type="text" class="form-control smtp-user" value="{{smtpUser}}">
                            </div>

                            <div class="form-group">
                                <label>Password</label>
                                <input type="text" class="form-control smtp-password" value="{{smtpPassword}}">
                            </div>

                            <div class="form-group">
                                <label>Encryption</label>
                                <select class="form-control smtp-encryption">
                                    <option value=""> - None -</option>
                                    <option value="ssl"
                                    {{#js_compare "this.smtpEncryption === 'ssl'"}}selected="selected"{{/js_compare}}>
                                    SSL</option>
                                    <option value="tls"
                                    {{#js_compare "this.smtpEncryption === 'tls'"}}selected="selected"{{/js_compare}}>
                                    TLS</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Send a test email at:</label>
                                <input type="text" class="form-control test-email" value="">
                            </div>

                            <div class="form-group">
                                <button class="btn green btn-block send-test-email">Send teest Email</button>
                            </div>

                        </div>

                        <div class="col-md-4">
                            <h4>IMAP</h4>
                            <div class="form-group">
                                <label>Host</label>
                                <input type="text" class="form-control imap-host" value="{{imapHost}}">
                            </div>

                            <div class="form-group">
                                <label>Port</label>
                                <input type="text" class="form-control imap-port" value="{{imapPort}}">
                            </div>

                            <div class="form-group">
                                <label>User</label>
                                <input type="text" class="form-control imap-user" value="{{imapUser}}">
                            </div>

                            <div class="form-group">
                                <label>Password</label>
                                <input type="text" class="form-control imap-password" value="{{imapPassword}}">
                            </div>

                            <div class="form-group">
                                <label>Encryption</label>
                                <select class="form-control imap-encryption">
                                    <option value=""> - None -</option>
                                    <option value="ssl"
                                    {{#js_compare "this.imapEncryption === 'ssl'"}}selected="selected"{{/js_compare}}>
                                    SSL</option>
                                    <option value="tls"
                                    {{#js_compare "this.imapEncryption === 'tls'"}}selected="selected"{{/js_compare}}>
                                    TLS</option>
                                </select>
                            </div>
                        </div>
                        </script>
                    </div>
                </div>
                <!-- END Portlet PORTLET-->
            </div>

            <!-- site result and status class -->
            <div class="col-md-4">
                <!-- BEGIN Portlet PORTLET-->
                <div class="portlet light bordered">
                    <div class="portlet-title">
                        <div class="caption">
                            <i class="icon-speech"></i>
                            <span class="caption-subject bold uppercase">Result Status And Class</span>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="row">
                            <div class="col-md-12">
                                <h4>Results </h4>

                                <!-- show results status name and class for site -->
                                <div class="site-result-status"></div>
                                <script class="template-site-result-status" type="text/template7">

                                <!-- Win -->
                                <div class="row" data-status-id="1">
                                    <div class="col-md-2"><h4>Win</h4></div>
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label>Text</label>
                                            <input type="text" class="form-control statusName"
                                            value="{{#if status[1].statusName}}{{status[1].statusName}}{{/if}}">
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                         <div class="form-group">
                                            <label>Class</label>
                                            <input type="text" class="form-control statusClass"
                                            value="{{#if status[1].statusClass}}{{status[1].statusClass}}{{/if}}">
                                        </div>
                                    </div>
                                </div>

                                <!-- Loss -->
                                <div class="row" data-status-id="2">
                                    <div class="col-md-2"><h4>Loss</h4></div>
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label>Text</label>
                                            <input type="text" class="form-control statusName"
                                            value="{{#if status[2].statusName}}{{status[2].statusName}}{{/if}}">
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                         <div class="form-group">
                                            <label>Class</label>
                                            <input type="text" class="form-control statusClass"
                                            value="{{#if status[2].statusClass}}{{status[2].statusClass}}{{/if}}">
                                        </div>
                                    </div>
                                </div>

                                <!-- Draw -->
                                <div class="row" data-status-id="3">
                                    <div class="col-md-2"><h4>Draw</h4></div>
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label>Text</label>
                                            <input type="text" class="form-control statusName"
                                            value="{{#if status[3].statusName}}{{status[3].statusName}}{{/if}}">
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                         <div class="form-group">
                                            <label>Class</label>
                                            <input type="text" class="form-control statusClass"
                                            value="{{#if status[3].statusClass}}{{status[3].statusClass}}{{/if}}">
                                        </div>
                                    </div>
                                </div>

                                <!-- Postp. -->
                                <div class="row" data-status-id="4">
                                    <div class="col-md-2"><h4>Postp</h4></div>
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label>Text</label>
                                            <input type="text" class="form-control statusName"
                                            value="{{#if status[4].statusName}}{{status[4].statusName}}{{/if}}">
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                         <div class="form-group">
                                            <label>Class</label>
                                            <input type="text" class="form-control statusClass"
                                            value="{{#if status[4].statusClass}}{{status[4].statusClass}}{{/if}}">
                                        </div>
                                    </div>
                                </div>
                                </script>

                            </div>
                        </div>
                    </div>
                </div>
                <!-- END Portlet PORTLET-->
            </div>

        </div>

        <!-- package section -->
        <div class="row">
            <div class="col-md-12">
                <div class="portlet light bordered">
                    <div class="portlet-title">
                        <div class="caption">
                            <i class="icon-social-dribbble font-purple-soft"></i>
                            <span class="caption-subject font-purple-soft bold uppercase">Packages</span>
                        </div>
                        <div class="actions">
                            <button class="btn green add-new-package">Add New</button>
                            <button class="btn red delete-package">Delete</button>
                        </div>
                    </div>
                    <div class="portlet-body">

                        <!-- script for package tabs -->
                        <ul class="nav nav-tabs package-tab"></ul>
                        <script class="template-package-tab" type="text/template7">
                            {{#each packages}}
                            <li data-id="{{id}}">
                                <a href="#package-tab_{{id}}" data-toggle="tab">{{name}}</a>
                            </li>
                            {{/each}}
                        </script>

                        <!-- script for package tab contents -->
                        <div class="tab-content package-tab-content"></div>
                        <script class="template-package-tab-content" type="text/template7">
                            {{#each packages}}
                            <div class="tab-pane fade" id="package-tab_{{id}}">

                                <div class="package-wrapper">
                                    <!-- general package information -->
                                    <div class="row general-info" data-package-id="{{id}}">
                                        <div class="col-md-8">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label>Normal/Vip</label>
                                                    <div class="mt-radio-inline">
                                                        <label class="mt-radio">
                                                        <input type="radio" name="isVip_{{id}}" value="0"
                                                            {{#js_compare "this.isVip === 0"}}checked="checked"{{/js_compare}}> Normal
                                                            <span></span>
                                                        </label>
                                                        <label class="mt-radio">
                                                            <input type="radio" name="isVip_{{id}}" value="1"
                                                            {{#js_compare "this.isVip === 1"}}checked="checked"{{/js_compare}}> Vip
                                                            <span></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label>Subscription Type</label>
                                                    <div class="mt-radio-inline">
                                                        <label class="mt-radio">
                                                            <input type="radio" name="subscriptionType_{{id}}" value="tips"
                                                            {{#js_compare "this.subscriptionType === 'tips'"}}checked="checked"{{/js_compare}}> Tips
                                                            <span></span>
                                                        </label>
                                                        <label class="mt-radio">
                                                        <input type="radio" name="subscriptionType_{{id}}" value="days"
                                                            {{#js_compare "this.subscriptionType === 'days'"}}checked="checked"{{/js_compare}}> Days
                                                            <span></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label>Is recurring</label>
                                                    <div class="mt-radio-inline">
                                                        <label class="mt-radio">
                                                            <input type="radio" name="isRecurring_{{id}}" value="0"
                                                            {{#js_compare "this.isRecurring === 0"}}checked="checked"{{/js_compare}}> No
                                                            <span></span>
                                                        </label>
                                                        <label class="mt-radio">
                                                            <input type="radio" name="isRecurring_{{id}}" value="1"
                                                            {{#js_compare "this.isRecurring === 1"}}checked="checked"{{/js_compare}}> Yes
                                                            <span></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- text inputs -->
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Name</label>
                                                    <input type="text" class="form-control name" value="{{name}}">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Package Identifier</label>
                                                    <select class="form-control identifier">
                                                        <option value="normal_1" {{#js_compare "this.identifier === 'normal_1'"}} selected="selected"{{/js_compare}}>normal_1</option>
                                                        <option value="normal_2" {{#js_compare "this.identifier === 'normal_2'"}} selected="selected"{{/js_compare}}>normal_2</optioh>
                                                        <option value="normal_3" {{#js_compare "this.identifier === 'normal_3'"}} selected="selected"{{/js_compare}}>normal_3</optioh>
                                                        <option value="normal_4" {{#js_compare "this.identifier === 'normal_4'"}} selected="selected"{{/js_compare}}>normal_4</optioh>
                                                        <option value="normal_5" {{#js_compare "this.identifier === 'normal_5'"}} selected="selected"{{/js_compare}}>normal_5</optioh>
                                                        <option value="vip_1" {{#js_compare "this.identifier === 'vip_1'"}} selected="selected"{{/js_compare}}>vip_1</optioh>
                                                        <option value="vip_2" {{#js_compare "this.identifier === 'vip_2'"}} selected="selected"{{/js_compare}}>vip_2</optioh>
                                                        <option value="vip_3" {{#js_compare "this.identifier === 'vip_3'"}} selected="selected"{{/js_compare}}>vip_3</optioh>
                                                        <option value="vip_4" {{#js_compare "this.identifier === 'vip_4'"}} selected="selected"{{/js_compare}}>vip_4</optioh>
                                                        <option value="vip_5" {{#js_compare "this.identifier === 'vip_5'"}} selected="selected"{{/js_compare}}>vip_5</optioh>
                                                        <option value="special_1" {{#js_compare "this.identifier === 'special_1'"}} selected="selected"{{/js_compare}}>special_1</optioh>
                                                        <option value="special_2" {{#js_compare "this.identifier === 'special_2'"}} selected="selected"{{/js_compare}}>special_2</optioh>
                                                        <option value="special_3" {{#js_compare "this.identifier === 'special_3'"}} selected="selected"{{/js_compare}}>special_3</optioh>
                                                        <option value="special_4" {{#js_compare "this.identifier === 'special_4'"}} selected="selected"{{/js_compare}}>special_4</optioh>
                                                        <option value="special_5" {{#js_compare "this.identifier === 'special_5'"}} selected="selected"{{/js_compare}}>special_5</optioh>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Tip Identifier</label>
                                                    <select type="text" class="form-control tipIdentifier">
                                                        <option value="tip_1" {{#js_compare "this.tipIdentifier === 'tip_1'"}} selected="selected"{{/js_compare}}>tip_1</option>
                                                        <option value="tip_2" {{#js_compare "this.tipIdentifier === 'tip_2'"}} selected="selected"{{/js_compare}}>tip_2</optioh>
                                                        <option value="tip_3" {{#js_compare "this.tipIdentifier === 'tip_3'"}} selected="selected"{{/js_compare}}>tip_3</optioh>
                                                        <option value="tip_4" {{#js_compare "this.tipIdentifier === 'tip_4'"}} selected="selected"{{/js_compare}}>tip_4</optioh>
                                                        <option value="tip_5" {{#js_compare "this.tipIdentifier === 'tip_5'"}} selected="selected"{{/js_compare}}>tip_5</optioh>
                                                        <option value="tip_6" {{#js_compare "this.tipIdentifier === 'tip_6'"}} selected="selected"{{/js_compare}}>tip_6</optioh>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Table Identifier</label>
                                                    <select type="text" class="form-control tableIdentifier">
                                                        <option value="table_1" {{#js_compare "this.tableIdentifier === 'table_1'"}} selected="selected"{{/js_compare}}>table_1</option>
                                                        <option value="table_2" {{#js_compare "this.tableIdentifier === 'table_2'"}} selected="selected"{{/js_compare}}>table_2</optioh>
                                                        <option value="table_3" {{#js_compare "this.tableIdentifier === 'table_3'"}} selected="selected"{{/js_compare}}>table_3</optioh>
                                                        <option value="table_4" {{#js_compare "this.tableIdentifier === 'table_4'"}} selected="selected"{{/js_compare}}>table_4</optioh>
                                                        <option value="table_5" {{#js_compare "this.tableIdentifier === 'table_5'"}} selected="selected"{{/js_compare}}>table_5</optioh>
                                                        <option value="table_6" {{#js_compare "this.tableIdentifier === 'table_6'"}} selected="selected"{{/js_compare}}>table_6</optioh>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Payment Name</label>
                                                    <input type="text" class="form-control paymentName" value="{{paymentName}}">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Vip Flag</label>
                                                    <input type="text" class="form-control vipFlag" value="{{vipFlag}}">
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label>Total Tips(Days)</label>
                                                    <input type="text" class="form-control subscription" value="{{subscription}}">
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label>Tips per day</label>
                                                    <input type="text" class="form-control tipsPerDay" value="{{tipsPerDay}}">
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label>Price</label>
                                                    <input type="text" class="form-control price" value="{{price}}">
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label>Old Price</label>
                                                    <input type="text" class="form-control oldPrice" value="{{oldPrice}}">
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label>Alias Subs. Type</label>
                                                    <input type="text" class="form-control aliasSubscriptionType" value="{{aliasSubscriptionType}}">
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label>Alias tips/day</label>
                                                    <input type="text" class="form-control aliasTipsPerDay" value="{{aliasTipsPerDay}}">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Discount</label>
                                                    <input type="text" class="form-control discount" value="{{discount}}">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Payment Code Paypal</label>
                                                    <input type="text" class="form-control paymentCodePaypal" value="{{paymentCodePaypal}}">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Payment Code Hipay</label>
                                                    <input type="text" class="form-control paymentCodeHipay" value="{{paymentCodeHipay}}">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <h4>Accepted Bets</h4>
                                    <br/>

                                    {{#each associatedPredictions}}
                                    <div class="row associated-predictions">
                                        <!-- bet group checkbox -->
                                        <div class="col-md-12">
                                            <label class="mt-checkbox mt-checkbox-outline">{{@key}} - Group
                                                <input type="checkbox" class="use" data-group-id="{{@key}}">
                                                <span></span>
                                            </label>
                                        </div>

                                        <!-- sub elemts for same subgroup -->
                                        {{#each predictions}}
                                        <div class="col-md-3">
                                            <label class="mt-checkbox"> {{name}}
                                                <input type="checkbox" class="prediction" data-group="{{group}}" value="{{identifier}}" {{#if isAssociated}}checked="checked"{{/if}}>
                                                <span></span>
                                            </label>
                                        </div>
                                        {{/each}}
                                    </div>
                                    {{/each}}

                                    <h4>Email Configuration</h4>
                                    <br/>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>From</label>
                                                <input type="text" class="form-control fromName" value="{{fromName}}">
                                            </div>
                                            <div class="form-group">
                                                <label>Subject</label>
                                                <input type="text" class="form-control subject" value="{{subject}}">
                                            </div>
                                        </div>
                                        <div class="col-md-8">
                                            <label>Template</label>
                                            <div class="package-summernote">{{template}}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {{/each}}
                            </script>

                        <div class="clearfix margin-bottom-20"> </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bet Types -->
        <div class="row">
            <div class="col-md-12">
                <div class="portlet light bordered">
                    <div class="portlet-title">
                        <div class="caption">
                            <i class="icon-social-dribbble font-purple-soft"></i>
                            <span class="caption-subject font-purple-soft bold uppercase">Predictions Names</span>
                        </div>
                    </div>
                    <div class="portlet-body">

                        <!-- iterate all site prediciton name -->
                        <div class="site-prediction-name"></div>
                        <script class="template-site-prediction-name" type="text/template7">
                            {{#each predictionGroup}}
                            <div class="row">

                                <!-- bet group checkbox -->
                                <div class="col-md-12"><p>{{@key}}</p></div>

                                {{#each predictions}}
                                <!-- sub elemts for same subgroup -->
                                <div class="col-md-4">
                                    <div class="row">
                                        <div class="col-md-5">
                                            <label class="mt-checkbox">{{name}}</label>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="form-group">
                                                <input type="text" class="form-control input-sm prediction" name="{{identifier}}" value="{{siteName}}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {{/each}}
                            </div>
                            {{/each}}
                        </script>

                        <div class="clearfix margin-bottom-20"> </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <!-- END CONTENT BODY -->
</div>
<!-- END CONTENT -->
