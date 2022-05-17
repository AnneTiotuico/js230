// Implement a form for adding new staff, and then use the booking app API to add the staff to the database. Your implementation should handle the different possible responses of the server and inform the user of the outcome.

/*
Notes:
- clicking submit button without any text in the two input boxes 
  => alert "Staff can not be created. Check your inputs"
- having value in email but not name then clicking submit
  => alert "Staff can not be created. Check your inputs"
- having values for both email and name then clicking submit
  => alert "Successfully created staff with id: 14"
    * where 14 is the next available (unique) id
*/
// console.log('adding staff')
// const staffMemsDomain = 'http://localhost:3000/api/staff_members';

// function addStaff(event) {
//   event.preventDefault();
//   let request = new XMLHttpRequest();
//   request.responseType = 'json';
//   let newStaffData = new FormData(form);

//   if (newStaffData.get('email').length < 1 || newStaffData.get('name').length < 1) {
//     alert('Staff can not be created. Check your inputs');
//   } else {
//     request.open('POST', staffMemsDomain);
//     request.send(newStaffData);
//     request.addEventListener('load', event => {
//       let assignedID = request.response.id;
//       alert(`Successfully created staff with id: ${assignedID}`);
//     });
//   }
// }

// let form = document.querySelector('form');

// form.addEventListener('submit', event => addStaff(event));
  

// refactored; using the API: 
const staffMemsDomain = 'http://localhost:3000/api/staff_members';

function addStaff(event) {
  event.preventDefault();

  let request = new XMLHttpRequest();
  request.open('POST', staffMemsDomain);
  request.responseType = 'json';

  let newStaffData = new FormData(form);

  request.addEventListener('load', event => {
    if (request.status === 201) {
      let assignedID = request.response.id;
      alert(`Successfully created staff with id: ${assignedID}`);
    } else if (request.status === 400) {
      alert('Staff can not be created. Check your inputs');
    }
  });

  request.send(newStaffData);
}

let form = document.querySelector('form');

form.addEventListener('submit', event => addStaff(event));

// LS Solution:
/*
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8">
    <title>Exercise 3</title>
    <style>
     dl {
         border: 3px double #ccc;
         padding: 0.5em;
     }
     dt {
         float: left;
         clear: left;
         width: 100px;
         text-align: right;
         font-weight: bold;
         color: #f0595b;
     }
     dt::after {
         content: ":";
     }
     dd {
         margin: 0 0 0 110px;
         padding: 0 0 0.5em 0;
     }

     input[type="submit"] {
         color: #fff;
         background: #f0595b;
         border-color: #f0595b;
         border-radius: 5px;
         width: 100px;
         height: 50px;
     }
    </style>
  </head>
  <body>
    <form method="post" action="/api/staff_members">
      <dl>
        <dt>
          <label for="email">Email</label>
        </dt>
        <dd>
          <input type="email" id="email" name="email">
        </dd>
        <dt>
          <label for="name">Name</label>
        </dt>
        <dd>
          <input type="text" id="name" name="name">
        </dd>
      </dl>
      <input type="submit">
    </form>
    <script>
      function formDataToJson(formData) {
        const json = {};
        for (const pair of formData.entries()) {
            json[pair[0]] = pair[1];
        }

        return json;
      }

      const form = document.querySelector('form');
      form.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(form);
        const json = JSON.stringify(formDataToJson(formData));
        const xhr = new XMLHttpRequest();

        xhr.open('POST', form.action);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(json);

        xhr.addEventListener('load', event => {
            switch(xhr.status) {
                case 201:
                    const data = JSON.parse(xhr.response);
                    alert(`Successfully created staff with id: ${data.id}`);
                    form.reset();
                    break;
                case 400:
                    alert(xhr.responseText);
            }
        });
      });
    </script>
  </body>
</html>

Discussion
The solution is straight-forward, but be sure you DON'T set the responseType of the xhr object to json. If you do set it to json, the case for status 400 won't work because xhr isn't a JSON object.
*/
  
