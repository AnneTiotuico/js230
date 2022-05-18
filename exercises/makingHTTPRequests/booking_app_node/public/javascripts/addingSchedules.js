// Implement the markup and JavaScript to add one or more schedules. You should handle and inform the user of the different possible responses of the server.

/* Notes:
- page should have a button at the very top 'Add more schedules'
  - when clicked, should add another fieldset 'Schedule #' with the same 3 input fields
    - same rules for each input field below

- page should have at least one schedule
  - fieldset? with title 'Schedule 1'
  - 3 inputs, staff name, date, time
    - staff name is a drop down with all the available staff members' names
      - default selected is the first staff in the list (Fae in this case)
    - date (string?) mm-dd-yy format  
      - overlay should show 'mm-dd-yy'

- page should have a 'Submit' button at the very bottom of each schedule fieldset
  - it should always be at the most bottom
    - it should move down if we add more schedules
  - clicking submit without filling in date and time fields,
    without filling date and time fields for all schedules
    => alert 'Please check your inputs'
  - clicking submit with all fields filled out
    => alert 'Schedules added'
    - clicking 'ok' on the alert 
      => clear input fields
*/

/*
Staff Name:
- when the dom content loads, fill the staff name select inner html with option tags with the value being the staff names gotten from  /apis/staff_members 
*/

const domain = 'http://localhost:3000/';
const schedulesDiv = document.querySelector('.schedules');
let scheduleCount = 1;
let staffData;

function addSchedule() {
  (function populateStaffNames() {
    let request = new XMLHttpRequest();
    request.open('GET', `${domain}api/staff_members`);
    request.responseType = 'json';
  
    request.addEventListener('load', event => {
      staffData = request.response;
      let options = staffData.reduce((opt, {name}) =>
        `${opt}<option value="${name}">${name}</option>`,'');
      schedulesDiv.insertAdjacentHTML('beforeend', `<fieldset>
        <legend>Schedule ${scheduleCount++}</legend>
        <div>
          <label for="staff-name">Staff Name:</label>
          <select class="staff-name">${options}
          </select>
        </div>
        <div>
          <label for="date">Date:</label>
          <input type="text" name="date" id="date" placeholder="mm-dd-yy"/>
        </div>
        <div>
          <label for="time">Time:</label>
          <input type="text" name="time" id="time" placeholder="hh:mm"/>
        </div>
      </fieldset>`);
    });
  
    request.send();
  })();
}

document.addEventListener('DOMContentLoaded', event => {
  addSchedule();
});

const addBtn = document.querySelector('.add');

addBtn.addEventListener('click', event => {
  addSchedule();
});

const form = document.querySelector('form');

function getStaffId(staffName) {
  return staffData.find(staff =>  staff.name === staffName).id;
};

form.addEventListener('submit', event => {
  event.preventDefault();
  const fieldsets = document.querySelectorAll('form fieldset');
  let schedules = [];
  let schedule = {};
  [...fieldsets].forEach(fieldset => {
    [...fieldset.elements].forEach(el => {
      if (el.tagName === 'SELECT') {
        let staffId = getStaffId(el.value);
        schedule['staff_id'] = staffId;
      }
      if (el.tagName === 'INPUT') {
        schedule[el.name] = el.value;
      }
    });
    schedules.push(schedule);
    schedule = {};
  });
  
  let data = {'schedules': schedules};
  let jsonSchedules = JSON.stringify(data);

  let request = new XMLHttpRequest();
  request.open('POST', `${domain}api/schedules`);
  request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

  request.addEventListener('load', event => {
    if (request.status === 201) {
      alert(request.responseText);
      form.reset();
    } else if (request.status === 400) {
      alert(request.responseText);
    }
  });

  request.send(jsonSchedules);
});
