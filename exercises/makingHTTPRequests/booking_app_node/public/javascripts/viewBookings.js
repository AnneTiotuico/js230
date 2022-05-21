/*
Implement the markup and JavaScript to view bookings made by students. The view for bookings should have two levels of detail. The first level shows only a list of dates that have bookings. the second level becomes visible only when a date is clicked and shows a nested list of booking details for the data. Details include the staff name, student email address, and the time booked.
*/

/*
- GET all bookings from 'api/bookings'
  => returns collection all booked dates
- populate all the dates onto the page
  - should be displayed as a bulleted list
- when the user clicks a date
  => a secondary bullet is added below that date to show the staff name | student email | time
      - add an event listener to each bullet and create a GET request to http://localhost:3000/api/bookings/:date; where date is the value of what was clicked
      - create a nested li under the li that was clicked with the staffname, student email, time from the response
*/

const list = document.querySelector('ul');
let bookings;

function handleDateClick() {
  list.addEventListener('click', event => {
    event.preventDefault();
    let request = new XMLHttpRequest();
    let target = event.target;
    let parentEl = target.parentElement;

    if (parentEl.children.length <= 1) {
      request.open('GET', `http://localhost:3000/api/bookings/${target.innerText}`);
      request.responseType = 'json'; 
      
      request.addEventListener('load', event => {
        let response = request.response;
    
        response.forEach(detail => {
          parentEl.insertAdjacentHTML('beforeend',`<ul class="details"><li>${detail.join(' | ')}</li></ul>`);
        });
      });
      request.send();
    }
  });
}

function getBookings() {
  let request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:3000/api/bookings');
  request.responseType = 'json';

  request.addEventListener('load', event => {
    let bookingEls = request.response.reduce((result, booking) => {
      return `${result}<li class="${booking}"><a href="#">${booking}</a></li>`;
    }, '');
    list.innerHTML = bookingEls;
    handleDateClick();
  });
  
  request.send();
}

getBookings();

