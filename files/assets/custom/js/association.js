config.association = $('.page-content-wrapper.association');

/*
 *  Clickable acctions
 */

/*
* refresh provider, leagues and available events number
*/
$('.table-association').on('click', '.refresh-event-info', function() {
    var table = $(this).parents('.table-association').attr('data-table');

    getTableAvailableFiltersValues(table);
    getAvailableEventsNumber({ table: table });
});

/*
 *  show available events when change provider, league, odds selection
 */
$('.table-association').on('change', '.select-provider, .select-league, .select-minOdd, .select-maxOdd', function() {
    var parrentTable = $(this).parents('.table-association');

    getAvailableEventsNumber({
        table: parrentTable.attr('data-table'),
        provider: parrentTable.find('.select-provider').val(),
        league: parrentTable.find('.select-league').val(),
        minOdd: parrentTable.find('.select-minOdd').val(),
        maxOdd: parrentTable.find('.select-maxOdd').val()
    });
});

/*
 *  get events filtered by selection and launch modal
 */
$('.table-association').on('click', '.modal-get-event', function() {
    var parrentTable = $(this).parents('.table-association');

    getAvailableEvents({
        table: parrentTable.attr('data-table'),
        provider: parrentTable.find('.select-provider').val(),
        league: parrentTable.find('.select-league').val(),
        minOdd: parrentTable.find('.select-minOdd').val(),
        maxOdd: parrentTable.find('.select-maxOdd').val()
    });
});

/*
 *  Check event on modal row click
 */
$('#modal-available-events').on('click', '.event', function() {
    var c = $(this).find('.use');
    (c.is(':checked')) ?  c.prop('checked', false) : c.prop('checked', true);
});

/*
 * Button click for import events
 */
$('#modal-available-events').on('click', '.import', function() {

    var ids = [];
    var table = $('#modal-available-events .table-identifier').val();

    // get events ids for association
    $('#modal-available-events .use:checked').each(function() {
        ids.push($(this).attr('data-id'));
    });

    $.ajax({
        url: config.coreUrl + "/association",
        type: "post",
        dataType: "json",
        data: {
            eventsIds: ids,
            table : table,
            systemDate: $('#association-system-date').val(),
        },
        beforeSend: function() {},
        success: function (response) {

            alert("Type: --- " + response.type + " --- \r\n" + response.message);

            $('#modal-available-events').modal('hide');
            getEventsAssociations(table);
        },
        error: function () {}
    });
});

/*
*  launch modal for associate event with package
*  on click table row event
 */
$('.table-association').on('click', '.modal-available-packages', function() {

    var associateEventId = $(this).parents('tr').attr('data-id');
    var table = $(this).parents('.table-association').attr('data-table');
    $.ajax({
        url: config.coreUrl + "/association/package/available/" + table + "/" + associateEventId,
        type: "get",
        success: function (response) {

            if (response.type === "error") {
                alert("Type: --- " + response.type + " --- \r\n" + response.message);
                return;
            }

            // add table to show in front
            var data = response;
            data.table = table;

            var element = $('#modal-associate-events');

            var template = element.find('.template-modal-content').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
            element.find('.modal-content').html(html);

            element.modal();
        },
        error: function () {}
    });
});

/*
*  delete event associate with table
 */
$('.table-association').on('click', '.delete-event', function() {

    var $this = $(this);
    var id = $this.parents('tr').attr('data-id');

    $.ajax({
        url: config.coreUrl + "/association/delete/" + id,
        type: "get",
        success: function (response) {

            alert("Type: --- " + response.type + " --- \r\n" + response.message);

            getEventsAssociations($this.parents('.table-association').attr('data-table'));
        },
        error: function () {}
    });
});

/*
 * Associtate event with packages
 */
$('#modal-associate-events').on('click', '.associate-event', function() {

    // get events ids for association
    var packagesIds = [];
    $('#modal-associate-events .use:checked').each(function() {
        packagesIds.push($(this).attr('data-id'));
    });

    $.ajax({
        url: config.coreUrl + "/distribution",
        type: "post",
        dataType: "json",
        data: {
            packagesIds: packagesIds,
            eventId : $('#modal-associate-events .event-id').val(),
        },
        success: function (response) {

            alert("Type: --- " + response.type + " --- \r\n" + response.message);
            if (response.type == "success")
                $('#modal-associate-events').modal('hide');
        },
        error: function () {}
    });
});

/*
*  This method will retrive events info
*  object args {table}
*  will retribe like tipsters, leagues
*/
function getTableAvailableFiltersValues(tableIdentifier) {

    $.ajax({
        url: config.coreUrl + "/event/available-filters-values/" + tableIdentifier,
        type: "get",
        //        dataType: "json",
        //        data: {},
        //        beforeSend: function() {},
        success: function (response) {

            var table = $('#table-association-' + tableIdentifier);

            // autocomplete provider select
            var template = table.find('.template-select-provider').html();
            // compile it with Template7
            var compiledTemplate = Template7.compile(template);
            // Now we may render our compiled template by passing required context
            var html = compiledTemplate(response);
            table.find('.select-provider').html(html);

            // autocomplete league select
            var template = table.find('.template-select-league').html();
            // compile it with Template7
            var compiledTemplate = Template7.compile(template);
            // Now we may render our compiled template by passing required context
            var html = compiledTemplate(response);
            table.find('.select-league').html(html);

        },
        error: function () {}
    });
}

/*
* this function will retrive and show available events number
* object filters: table, provider, league, minOdd, maxOdd
*/
function getAvailableEventsNumber(filters) {

    $.ajax({
        url: config.coreUrl + "/event/available/number?" + $.param(filters),
        type: "get",
        success: function (response) {

            var data = {number: response};
            var element = $('#table-association-' + filters.table);

            var template = element.find('.template-events-number').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
            element.find('.events-number').html(html);

        },
        error: function () {}
    });
}

/*
* this function will retribe available events based on selection
* object args: table, provider, league, minOdd, maxOdd
*/
function getAvailableEvents(filters) {

    $.ajax({
        url: config.coreUrl + "/event/available?" + $.param(filters),
        type: "get",
        success: function (response) {

            var element = $('#modal-available-events');
            var data = {
                table: filters.table,
                events: response,
                systemDate: $('#association-system-date').val(),
            };

            var template = element.find('.template-modal-content').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
            element.find('.modal-content').html(html);

            element.modal();
        },
        error: function () {}
    });

}

/*
* get association and populate table
*  arg = table
*/
function getEventsAssociations(table) {

    $.ajax({
        url: config.coreUrl + "/association/" + table,
        type: "get",
        success: function (response) {

            var element = $('#table-association-' + arg);
            var table = element.find('.association-table-datatable').DataTable();
            var buttons = '<button type="button" class="btn green btn-outline search-events-btn modal-available-packages">Associate</button>';
            buttons += '<button type="button" class="btn red btn-outline search-events-btn delete-event">Del</button>';

            // clear table
            table.clear().draw();

            $.each(response, function(i, e) {

                var node = table.row.add( [
                    e.country,
                    e.league,
                    e.homeTeam,
                    e.awayTeam,
                    e.odd,
                    e.predictionId,
                    e.result,
                    e.statusId,
                    e.eventDate,
                    e.systemDate,
                    buttons,
                ] ).draw(false).node();

                // add data-id attribute to inserted row
                $(node).attr('data-id', e.id);

            });
        },
        error: function () {}
    });

}










