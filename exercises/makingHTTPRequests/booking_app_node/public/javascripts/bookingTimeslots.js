/*
Implement the markup and JavaScript for booking a schedule. Be sure to check out the documentation on the requirements for a booking.

In the event that the student who's booking the appointment isn't in the database, you must provide a way for the user to create the student, and then automatically proceed with the booking once the student is successfully created.

Assume that only one schedule at a time can be booked.
*/

/*
NOTES:
- page has a header 'Schedules' at the very top
- under is a form with two inputs
  - 'Please select on schedule': dropdown 
    - seems like it is blank at first, but then loads and shows the Staff Name | Date | Time
    - first one is selected by default
  - 'Email': email textbox , then a submit button next to email textbox

- user enters an email and that email isn't included in the list of students at 'api/students'
  => alert('Student does not exist; booking_sequence: 515266')
    - user clicks OK on the alert
      => another form pops up that has a gray background
        - header 'Please provide new student details'
          - form with 3 inputs
          - 'Email:' email textbox
          - 'Name:' textbox
          - 'Booking Sequence:' textbox
          - submit button
        - the email should be autofilled with what the user tried to input in the email originally
        - name is blank
        - booking sequence matches the sequence from the alert message
      - if name is added, and submit is clicked
        => add the student to the database
          - alert('Successfully added student to the database.')
            - user clicks ok
            - name is cleared (email and sequence are left alone)
            - another alert('Booked')
            - click ok
              => gray form disappears
                  - page resets
                    - back to the Schedules form with 
*/

/*
Get schedule options
- create a GET request to '/api/schedules'
- iterate through the response which should be a collection of objects representing schedules
  - filter the collection to only include those that have `student_email` with a value of `null`
- using the filtered collection of open schedules
  - fill in the `select` tag options with the firstname of the staff | date | time

- to get firstname, we must create a GET request to 'api/staff_members'
  - then match the staff_id to the id to get the name
*/

/*
Submit with email that isn't associated w a student in the DB
- add a submit event listener to the schedule form
  - create a POST request to '/api/bookings'
  - send request with the id of the schedule and the input email
  - add a load event listener to request
    - if load response is StudentNotFound Error
      - alert the request.responseText
      - once user clicks OK
        - 

*/

/*
Alert pops up saying student doesn't exist; booking sequence
After user clicks OK:
- store the booking sequence
- render another form 
- 

*/

const domain = 'http://localhost:3000';
const main = document.querySelector('main');
const schedForm = document.querySelector('.schedules');
const selectedSchedule = document.querySelector('#schedule');
const inputEmail = document.querySelector('#email');

let openSchedules;
let staffMembers;
const getStaffName = (staff, staffId) => staff.find(({id}) => id === staffId).name;

async function populateSchedOptions() {
  openSchedules = await fetch(`${domain}/api/schedules`)
                            .then(response => response.json())
                            .then(schedules => schedules.filter(({student_email}) => !student_email));

  staffMembers = await fetch(`${domain}/api/staff_members`)
                            .then(response => response.json());

  const select = document.querySelector('select');
  let options = openSchedules.reduce((opt, sched) => {
    return `${opt}<option>${getStaffName(staffMembers, sched['staff_id'])} | ${sched['date']} | ${sched.time}</option>`
  }, '');

  select.innerHTML = options;
}

populateSchedOptions();

function getSchedId(schedOption) {
  return openSchedules.find(sched => {
    return schedOption.includes(getStaffName(staffMembers, sched['staff_id'])) &&
    schedOption.includes(sched['date']) &&
    schedOption.includes(sched['time']);
  }).id;
}

schedForm.addEventListener('submit', event =>{
  event.preventDefault();
  let request = new XMLHttpRequest();
  request.open('POST', `${domain}/api/bookings`);
  let selected = selectedSchedule.value;
  let schedId = getSchedId(selected);
  let email = inputEmail.value;
  request.setRequestHeader('Content-Type', 'application/json');
  let data = JSON.stringify({id: schedId, student_email: email});

  request.addEventListener('load', event => {
    let response = request.responseText;
    if (request.status === 204) {
      alert('Booked');
      if (main.children.length > 1) {
        main.removeChild(main.lastChild);
      }
      schedForm.reset();
      selectedSchedule.innerHTML = '';
      populateSchedOptions();
    } else if (request.status === 404) {
      alert(response);
      if (response.includes('Student')) {
        let sequence = Number(response.match(/[0-9]/g).join(''));
        addStudentForm(email, sequence);
        const studentForm = document.querySelector('.add-student');
        studentForm.addEventListener('submit', event => {
          event.preventDefault();
          const studentName = studentForm.querySelector('#name');
          addNewStudent(studentForm, email, studentName, sequence);
        });
      }
    }
  });

  request.send(data);
});

function addStudentForm(email, sequence) {
  let newForm = `<form class="add-student">
  <h1>Please provide new student details</h1>
  <div>
    <label for="email">Email: </label>
    <input type="email" id="email" value="${email}"/>
  </div>
  <div>
    <label for="name">Name: </label>
    <input type="text" id="name"/>
  </div>
  <div>
    <label for="sequence">Booking Sequence: </label>
    <input type="text" id="sequence" value="${sequence}"/>
  </div>
  <button type="submit">Submit</button>
  </form>`;
  main.insertAdjacentHTML('beforeend', newForm);
}

function addNewStudent(studentForm, email, studentName, sequence) {
  let request = new XMLHttpRequest();
  request.open('POST', `${domain}/api/students`);
  request.setRequestHeader('Content-Type', 'application/json');
  let data = JSON.stringify({'email': email, 'name': studentName.value, 'booking_sequence': sequence });

  request.addEventListener('load', event => {
    if (request.status === 201) {
      alert(request.responseText);
      console.log('resetting student form...')
      studentForm.reset();
      schedForm.dispatchEvent(new Event('submit'));
    } else if (request.status === 403 || request.status === 400) {
      alert(request.responseText);
    }
  })

  request.send(data);
}
