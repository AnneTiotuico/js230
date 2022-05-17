/*
Implement a function that retrieves all the schedules that are available. If one or more schedules are available, tally the count of schedules for each staff and alert the user of result as "key: value" pairs with the staff id as key (in the format of 'staff {id}'; e.g, 'staff 1') and the count of schedules as the value. If there are no schedules, alert the user that there are currently no schedules available for booking.

When implementing the function, keep in mind that server has been known to slow down when there are more than 7 schedules to retrieve. It doesn't always happen, but be sure to handle it accordingly. Once 5 seconds have passed, cancel the retrieval and inform the user to try again.

Finally, inform the user about the completion of the request regardless of the success or failure (timeout) of the request.

Note: Server slow down for when there are more than 7 schedules to retrieve is manufactured only. For reference, the manufactured time is 7 seconds.
*/

// const domain = 'http://localhost:3000/';
console.log('hi testing')

function countSchedules(data) {
  let tally = {};
  [...data].forEach(({staff_id}) => {
    tally[staff_id] ? tally[staff_id] += 1 : tally[staff_id] = 1;
  });
  return tally;
}

function getAllSchedules() {
  let request = new XMLHttpRequest();
  request.timeout = 5000;
  request.open('GET', 'http://localhost:3000/api/schedules');
  request.responseType = 'json';

  request.addEventListener('load' , event => {
    let data = request.response;
    if (data.length > 0) {
      let counts = countSchedules(data);
      let message = '';
      Object.keys(counts).forEach(id => {
        message += `staff ${id}: ${counts[id]}\n`;
      });
      alert(message);
    } else {
      alert('Sorry, there are currently no schedules available for booking.');
    }
  });

  request.addEventListener('timeout', event => {
    alert("The request wasn't able to retrieve the data on time. Please try again.");
  });

  request.addEventListener('loadend', event => {
    alert('Your request has been completed.');
  })

  request.send();
}

// LS Solution:
/*
function retrieveSchedules() {
  const request = new XMLHttpRequest();

  // Be sure to change your host and port number accordingly
  request.open('GET','http://localhost:3000/api/schedules')
  request.timeout = 5000;
  request.responseType = 'json';

  request.addEventListener('load', event => {
    const schedules = request.response;
    const staffs = [];
    const tally = [];

    if (schedules.length > 0) {
      schedules.forEach(({staff_id}) => {
        const key = `staff ${String(staff_id)}`;
        if (!staffs.includes(key)) {
          staffs.push(key);
          tally.push(1);
        } else {
          tally[staffs.indexOf(key)] += 1;
        }
      });

      alert(tally.map((_, index) => `${staffs[index]}: ${tally[index]}`).join("\n"));
    } else {
      alert('There are currently no schedules available for booking');
    }
  });

  request.addEventListener('timeout', event => {
    alert('It is taking longer than usual, please try again later.')
  });

  request.addEventListener('loadend', event => {
    alert('The request has completed.');
  });

  request.send();
}
*/