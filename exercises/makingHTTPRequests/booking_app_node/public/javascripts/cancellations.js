// Implement two functions: one for cancelling schedules and the other for cancelling of bookings. The functions take a scheduleId and a bookingId as arguments respectively.

/*
NOTES:
cancel schedule
- scheduleId is required 
- DELETE request to '/api/schedules/:schedule_id'
- 204 success response
- 403 error
  => there is a booking on the schedule to cancel (student email is not null)
- 404 error
  => schedule id doesn't exist in database

- retrieve 
*/
/*
cancel booking
- bookingId required
- PUT request to '/api/bookings/:booking_id'
- 204 success
- 404 error
  => booking id doesn't exist in database
*/

const domain = 'http://localhost:3000/';

function cancelSchedule(scheduleId) {
  let request = new XMLHttpRequest();
  request.open('DELETE', domain + `api/schedules/${scheduleId}`);

  request.addEventListener('load', () => {
    switch (request.status) {
      case 204:
        alert(`Deleted schedule ${scheduleId}.`);
        break;
      case 403:
      case 404:
        alert(request.response);
    }
  });

  request.send();
}

function cancelBooking(bookingId) {
  let request = new XMLHttpRequest();
  request.open('PUT', domain + `api/bookings/${bookingId}`);

  request.addEventListener('load', () => {
    switch (request.status) {
      case 204:
        alert(`Deleted booking ${scheduleId}.`);
        break;
      case 404:
        alert(request.response);
    }
  });

  request.send();
}
