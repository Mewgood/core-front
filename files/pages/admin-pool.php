<!-- BEGIN CONTENT -->
<div class="page-content-wrapper admin-pool hidden">
    <!-- BEGIN CONTENT BODY -->
    <div class="page-content">

        <!-- BEGIN TABLE TITLE-->
        <h1 class="page-title">Admin Pool</h1>
        <!-- END TABLE TITLE-->

        <!-- BEGIN SELECT SITE AND TABLE PORTLET-->
        <div class="portlet light bordered">
            <div class="portlet-title">
                <ul class="table_import_filters_container">
                    <li>
                        <div class="form-group">
                            <label class="control-label">Date</label>
                            <input type="text" id="datepicker">
                        </div>
                    </li>
                    <li>
                        <div class="form-group">
                            <input type="checkbox" class="itm-checkbox" data-type="countries">
                            <label class="control-label">Countries</label>
                            <select class="form-control select2-countries" name="countryCodes"></select>
                            <script class="template-select-countries" type="text/template7">
                               {{#each countries}}
                                    <option value="{{code}}">{{name}} </option>
                               {{/each}}
                            </script>
                        </div>
                    </li>
                    <li>
                        <div class="form-group">
                            <input type="checkbox" class="itm-checkbox" title="Select All" data-type="leagues">
                            <label class="control-label">Leagues</label>
                            <select class="form-control select2-leagues" name="leagueIds"></select>
                            <script class="template-select-leagues" type="text/template7">
                               {{#each leagues}}
                                    <option value="{{id}}">{{name}} </option>
                               {{/each}}
                            </script>
                        </div>
                    </li>
                    <li>
                        <button type="button" class="btn btn-success admin-pool-add-matches">Add matches</button>
                    </li>
                    <li>
                        <button type="button" class="btn btn-danger admin-pool-remove-matches">Remove matches</button>
                    </li>
                </ul>
            </div>

            <div class="portlet-body">
                <!-- 
                    TO DO: ADD THE DATATABLES
                -->

                <table id="league-matches" class="table table-bordered">
                    <thead class="my-thead">
                      <tr>
                          <th>ID</th>
                          <th>League</th>
                          <th>Home Team</th>
                          <th>Away Team</th>
                          <th>Result</th>
                      </tr>
                    </thead>   
                </table>
                
                <hr>
                
                <table id="pool-matches" class="table table-bordered">
                    <thead class="my-thead">
                      <tr>
                          <th>ID</th>
                          <th>League</th>
                          <th>Home Team</th>
                          <th>Away Team</th>
                          <th>Result</th>
                      </tr>
                    </thead>   
                </table>
            </div>
        </div>
    </div>
    <!-- END CONTENT BODY -->
</div>
<!-- end content -->
