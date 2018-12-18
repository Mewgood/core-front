<?php 
    $dates = [0, 1, 2, 3, 4, 5, 6];
?>


<div class="page-content-wrapper auto-unit-site-configuration hidden">
    <div class="page-content">
        <h1 class="page-title">Auto Unit site configuration statistics</h1>

        <div class="portlet light bordered">
            <div class="portlet-body">
                <div class="panel panel-default table-auto-unit-site-configuration"></div>
                    <script class="template-table-auto-unit-site-statistics" type="text/template7">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <?php
                                            $html = "";
                                            foreach ($dates as $date) {
                                                $html .= "<th>" . gmdate('F Y', strtotime('+ ' . $date . ' month')) . "</th>"; 
                                            }
                                            echo $html;
                                        ?>
                                    </tr>
                                </thead>
                                <tbody>
                                    {{#each this}}
                                        <tr>

                                        {{#each this}}
                                            {{#js_compare "this.@key != 'display'"}}
                                                {{#js_if "this.display"}}
                                                    <td>{{this.name}}</td>
                                                {{/js_if}}
                                                <td>
                                                    {{#js_compare "this.configurationStatus == 1"}}
                                                        <span class="label bg-green-jungle config-label" data-site="{{this.id}}" data-date="{{this.date}}">
                                                            <i class="fa fa-check"></i>
                                                        </span>
                                                    {{/js_compare}}
                                                    {{#js_compare "!this.configurationStatus"}}
                                                        <span class="label bg-red-thunderbird config-label" data-site="{{this.id}}" data-date="{{this.date}}">
                                                            <i class="fa fa-times"></i>
                                                        </span>
                                                    {{/js_compare}}
                                                    {{#js_compare "this.configurationStatus == 2"}}
                                                        <span class="label bg-yellow-gold config-label" data-site="{{this.id}}" data-date="{{this.date}}">
                                                            <i class="fa fa-warning"></i>
                                                        </span>
                                                    {{/js_compare}}
                                                </td>
                                            {{/js_compare}}
                                        {{/each}}
                                        </tr>
                                    {{/each}}
                                </tbody>
                            </table>
                        </script>
                     </div>
                 </div>
            </div>
        </div>
    </div>
</div>