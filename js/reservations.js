/*global WildRydes _config*/

var WildRydes = window.WildRydes || {};
WildRydes.map = WildRydes.map || {};

(function reservationScopeWrapper($) {
    function requestReservation(day,hour,full_name,phone,persons) {
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/reservations',
            data: JSON.stringify({
                Reservation:{
                    FullName: full_name,
                    PhoneNumber: phone,
                    PartySize: persons,
                    Day: day,
                    Hour: hour
                }
            }),
            contentType: 'application/json',
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
            }
        });
    }

    function completeRequest(result) {
        console.log('Response received from API: ', result);
    }

    // Register click handler for #request button
    $(function onDocReady() {
        $('#submit').click(handleRequestClick);
    });

    function handleRequestClick(event) {
        event.preventDefault();
        requestReservation(day,hour,full_name,phone,persons);
    }

}(jQuery));
