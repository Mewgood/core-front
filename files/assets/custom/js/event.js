config.event = $('.page-content-wrapper.event');

var today = new Date().toISOString().slice(0,10);
$("#event-datepicker").datepicker({ dateFormat: 'yy-mm-dd' });
$("#event-datepicker").val(today);

    /*
     *  ----- CLICKABLE ACTIONS -----
    ----------------------------------------------------------------------*/

$("#event-modal-edit-result-status").on("click", ".postpone", function() {
    var element = $('#event-modal-edit-result-status');
    var eventId = $(element).find('.event-id').val();

    $.ajax({
        url: config.coreUrl + "/event/" + eventId + "/postpone?" + getToken(),
        type: "get",
        success: function (response) {
            alert("Type: --- " + response.type + " --- \r\n" + response.message);

            if (response.type === 'success') {
                eventGetEvents();
                element.modal('hide');
            }
        },
        error: function (xhr, textStatus, errorTrown) {
            //manageError(xhr, textStatus, errorTrown);
        }
    });
});

    /*
     *  ----- Modal edit result-status -----
    ----------------------------------------------------------------------*/

// Modal - edit result-status
// get selected event
// launch modal to change result and status
config.event.on('click', '.edit', function() {
    var $this = $(this);
    $.ajax({
        url: config.coreUrl + "/event/by-id/" + $this.closest('tr').attr('data-id') + "?" + getToken(),
        type: "get",
        success: function (response) {

            if (!response) {
                alert('Maybe this event will not exists anymore.');
                return;
            }

            var data = response;
            var element = $('#event-modal-edit-result-status');

            var template = element.find('.template-event-info').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
            element.find('.event-info').html(html);

            // set result if exists.
            element.find('.result').val(data.result);

            // set status selected
            element.find('.status option[value="' + data.statusId + '"]').prop('selected', true).change();

            element.modal();
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// Modal - edit result-status
// get predeiction for specified result
$('#event-modal-edit-result-status .result').keyup(function() {
    var element = $('#event-modal-edit-result-status');
    var result = $(this).val();
    var eventId = element.find('.event-id').val();

    if (result.length < 3) {
        element.find('.status').val('').change();
        return;
    }

    $.ajax({
        url: config.coreUrl + "/prediction/status-by-result/" + eventId + "?" + getToken(),
        type: "post",
        data: {
            result: result,
        },
        success: function (response) {
            if (response.type == 'error') {
                element.find('.status').val('').change();
                return;
            }
            element.find('.status').val(response.statusId).change();
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

// Modal - edit result-status
// save edit result and status
$('#event-modal-edit-result-status').on('click', '.save', function() {
    var element = $('#event-modal-edit-result-status');

    $.ajax({
        url: config.coreUrl + "/event/update-result-status" + "?" + getToken(),
        type: "post",
        data: {
            result: element.find('.result').val(),
            homeTeamId: element.find('.event-homeTeamId').val(),
            awayTeamId: element.find('.event-awayTeamId').val(),
            eventDate: element.find('.event-eventDate').val()
        },
        success: function (response) {

            alert("Type: --- " + response.type + " --- \r\n" + response.message);

            if (response.type === 'success') {
                eventGetEvents();
                element.modal('hide');
            }
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
});

$("#event-datepicker").on("change", function() {
    var date = $(this).val();
    eventGetEvents(date);

    getEventsAssociations('run', date);
    getEventsAssociations('ruv', date);
    getEventsAssociations('nun', date);
    getEventsAssociations('nuv', date);

    getDistributedEvents(date);

    $(".select-system-date").val(date);
    $("#association-system-date").val(date);

    sessionStorage.setItem("date", date);
});

    /*
     *  ----- Functions -----
    ----------------------------------------------------------------------*/

// Functions
// this execute on page start.
// get all distributed events and show in table
function eventGetEvents(date = null) {
    if (!date) {
        date = new Date().toISOString().slice(0,10);
    }
    $.ajax({
        url: config.coreUrl + "/event/associated-events/" + date + "?" + getToken(),
        type: "get",
        success: function (response) {

            var data = {events: response};
            var element = config.event;

            var template = element.find('.template-table-content').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(data);
            element.find('.table-content').html(html);
        },
        error: function (xhr, textStatus, errorTrown) {
            manageError(xhr, textStatus, errorTrown);
        }
    });
}

