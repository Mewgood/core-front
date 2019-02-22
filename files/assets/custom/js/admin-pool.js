$(document).ready(function() {
    config.adminPool = $('.page-content-wrapper.admin-pool');
    $(".select2-countries, .select2-leagues").select2({
        multiple: true
    });
    
    $("#datepicker").datepicker({ dateFormat: 'yy-mm-dd' });

    $("#datepicker").on("change", function() {
        initLeagueMatchesDatatable();
        initPoolMatchesDatatable();
    });

    initLeagueMatchesDatatable();
    initPoolMatchesDatatable();
    getCountries();
    
    $(".select2-countries").on("select2:select", function() {
        let countries = $(this).val();
        getLeagues(countries);
    });
    
    $(".select2-leagues").on("select2:select select2:unselect", function() {
        initLeagueMatchesDatatable();
    });
    
    $(".itm-checkbox").click( function() {
        let type = $(this).data("type");
        let container = type === "countries" ? ".select2-countries" : ".select2-leagues";

        if( $(this).is(':checked') ){
            $(`${container} > option`).prop("selected","selected");
            $(`${container}`).trigger("change");
            $(`${container}`).trigger("select2:select");
        } else{
            $(`${container} > option`).removeAttr("selected");
            $(`${container}`).trigger("change");
            $(`${container}`).trigger("select2:unselect");
         }
    });
    
    $(".admin-pool-add-matches").click( function() {
        addMatchesToThePool();
    });
    
    $(".admin-pool-remove-matches").click( function() {
        deleteMatchesFromPool();
    });

    function getCountries() {
        $.ajax({
            url: config.coreUrl + "/leagues/get-all-countries/?" + getToken(),
            type: "get",
            success: function (response) {
                var element = config.adminPool;
                var data = {};
                data["countries"] = response;
                var template = element.find('.template-select-countries').html();
                var compiledTemplate = Template7.compile(template);
                var html = compiledTemplate(data);
                element.find('.select2-countries').html(html).change();
            },
            error: function (xhr, textStatus, errorTrown) {
                manageError(xhr, textStatus, errorTrown);
            }
        });
    }

    function getLeagues(countries) {
        $.ajax({
            url: config.coreUrl + "/leagues/get-country-list-leagues/?" + getToken(),
            type: "POST",
            data: {
                countryCodes: countries
            },
            success: function (response) {
                var element = config.adminPool;
                var data = {};
                data["leagues"] = response;
                var template = element.find('.template-select-leagues').html();
                var compiledTemplate = Template7.compile(template);
                var html = compiledTemplate(data);
                element.find('.select2-leagues').append(html).change();
            },
            error: function (xhr, textStatus, errorTrown) {
                manageError(xhr, textStatus, errorTrown);
            }
        });
    }

    function initLeagueMatchesDatatable() {
        if ( ! $.fn.DataTable.isDataTable( '#league-matches' ) ) {
            var table = $('#league-matches').dataTable( {
                "serverSide": true,
                "processing": true,
                "deferLoading": 0,
                "ajax": {
                    "url": config.coreUrl + "/matches/get-league-list-matches/?" + getToken(),
                    "type": "POST",
                    "data": function(data) {
                        data.leagueIds = JSON.stringify($(".select2-leagues").val());
                        data.date = $('#datepicker').val();;
                        data.offset = $('#league-matches').DataTable().page.info().start;
                        data.limit = $('#league-matches').DataTable().page.info().length;
                        return data;
                    },
                    "dataSrc": function(data) {
                       return data.data;
                    }
                },
                "columns": [
                    { "data": "primaryId", "name": "primaryId" },
                    { "data": "league", "name": "league" },
                    { "data": "homeTeam", "name": "homeTeam" },
                    { "data": "awayTeam", "name": "awayTeam" },
                    { "data": "result", "name": "result" }
                ],
                "columnDefs": [
                    {
                        orderable: false,
                        className: 'select-checkbox',
                        targets:   0
                    }
                ],
                "select": {
                    style:    'os',
                    selector: 'td:first-child'
                }
            });
        } else {
            $('#league-matches').DataTable().ajax.reload();
        }
    }

    function addMatchesToThePool() {
        let rows = $('#league-matches').DataTable().rows( {selected: true} ).data();
        let matchIds = [];
        let date = $('#datepicker').val();

        for (let key in rows) {
            if (parseInt(key) == NaN) {
                console.log("break");
                break;
            }
            matchIds.push(rows[key].primaryId);
        }
        
        $.ajax({
            url: config.coreUrl + "/auto-unit/create-admin-pool/?" + getToken(),
            type: "POST",
            data: {
                "matches": matchIds,
                "date": date
            },
            success: function (response) {
                console.log(response);
                initPoolMatchesDatatable();
                getAdminPoolNotification();
            },
            error: function (xhr, textStatus, errorTrown) {
                manageError(xhr, textStatus, errorTrown);
            }
        });
    }
    
    function deleteMatchesFromPool() {
        let rows = $('#pool-matches').DataTable().rows( {selected: true} ).data();
        let matchIds = [];

        for (let key in rows) {
            if (parseInt(key) == NaN) {
                console.log("break");
                break;
            }
            matchIds.push(rows[key].id);
        }
        
        $.ajax({
            url: config.coreUrl + "/auto-unit/remove-admin-pool-matches/?" + getToken(),
            type: "POST",
            data: {
                "matches": matchIds
            },
            success: function (response) {
                console.log(response);
                initPoolMatchesDatatable();
            },
            error: function (xhr, textStatus, errorTrown) {
                manageError(xhr, textStatus, errorTrown);
            }
        });
    }
    
    function initPoolMatchesDatatable() {
        let date = $('#datepicker').val();

        if ( ! $.fn.DataTable.isDataTable( '#pool-matches' ) ) {
            $('#pool-matches').dataTable( {
                "processing": true,
                "serverSide": true,
                "deferLoading": 0,
                "ajax": {
                    "url": config.coreUrl + "/auto-unit/get-admin-pool/" + date + "?" + getToken(),
                    "type": "GET",
                    "data": function(data) {
                        data.offset = $('#pool-matches').DataTable().page.info().start;
                        data.limit = $('#pool-matches').DataTable().page.info().length;
                        return data;
                    },
                    "dataSrc": function(data) {
                       return data.data;
                    }
                },
                "columns": [
                    { "data": "primaryId", "name": "primaryId" },
                    { "data": "league", "name": "league" },
                    { "data": "homeTeam", "name": "homeTeam" },
                    { "data": "awayTeam", "name": "awayTeam" },
                    { "data": "result", "name": "result" }
                ],
                "columnDefs": [
                    {
                        orderable: false,
                        className: 'select-checkbox',
                        targets:   0
                    }
                ],
                "select": {
                    style:    'os',
                    selector: 'td:first-child'
                }
            });
        } else {
            $('#pool-matches').DataTable().ajax.url(config.coreUrl + "/auto-unit/get-admin-pool/" + date + "?" + getToken()).load();
        }
    }
});