$(document).ready(function() {
    config.autoUnit = $('.page-content-wrapper.admin-pool');
    $(".select2-countries, .select2-leagues").select2({
        multiple: true
    });
    
    let date = new Date();
    let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate(); // 2 digit day format
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    let today = `${year}-${month}-${day}`;
    
    initLeagueMatchesDatatable(today);
    initPoolMatchesDatatable(today);
    getCountries(today);
    
    $(".select2-countries").on("select2:select", function() {
        let countries = $(this).val();
        getLeagues(countries);
    });
    
    $(".select2-leagues").on("select2:select select2:unselect", function() {
        initLeagueMatchesDatatable(today);
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
        addMatchesToThePool(today);
    });
    
    function getCountries(date) {
        $.ajax({
            url: config.coreUrl + "/leagues/get-all-countries/?" + getToken(),
            type: "get",
            success: function (response) {
                var element = config.autoUnit;
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

    function getLeagues(countries = [0]) {
        $.ajax({
            url: config.coreUrl + "/leagues/get-country-list-leagues/?" + getToken(),
            type: "POST",
            data: {
                countryCodes: countries
            },
            success: function (response) {
                var element = config.autoUnit;
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

    function initLeagueMatchesDatatable(date) {
        if ( ! $.fn.DataTable.isDataTable( '#league-matches' ) ) {
            $('#league-matches').dataTable( {
                "processing": true,
                "serverSide": true,
                "ajax": {
                    "url": config.coreUrl + "/matches/get-league-list-matches/?" + getToken(),
                    "type": "POST",
                    "data": function(data) {
                        data.leagueIds = JSON.stringify($(".select2-leagues").val()) || [0];
                        data.date = date;
                        return data;
                    },
                    "dataSrc": ''
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

    function addMatchesToThePool(date) {
        let rows = $('#league-matches').DataTable().rows( {selected: true} ).data();
        let matchIds = [];

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
            },
            error: function (xhr, textStatus, errorTrown) {
                manageError(xhr, textStatus, errorTrown);
            }
        });
    }
    
    function initPoolMatchesDatatable(date) {
        if ( ! $.fn.DataTable.isDataTable( '#pool-matches' ) ) {
            $('#pool-matches').dataTable( {
                "processing": true,
                "serverSide": true,
                "ajax": {
                    "url": config.coreUrl + "/auto-unit/get-admin-pool/" + date + "?" + getToken(),
                    "type": "GET",
                    "dataSrc": ''
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
            $('#pool-matches').DataTable().ajax.reload();
        }
    }
});