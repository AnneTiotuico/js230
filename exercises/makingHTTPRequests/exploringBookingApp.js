// You'll be using a booking app throughout the exercise group, "Making HTTP Requests." To help you explore the documentation, try answering the following questions by running the server, opening your browser, visiting /doc, and carefully reading the documentation available for each route in the app. The app has seed data, so you can freely test out the different routes. You should only need to visit one route to determine the answer; if you'll need to visit more than one route, then the answer is "There is no route that will provide this information."

// How many staff are there?
// => 5 staff

// How many students are there?
// => 5 students

// How many schedules exist?
// => 9 schedules

// How many schedules have bookings?
// => 3

// Do all staff have schedules?
// => There is no route that will provide this information.
 // (No, only Fae, Aaron, and Gia)

// Did all students book a schedule?
// => There is no route that will provide this information.
// (No, only Bettie, Madaline and Julius)

// LS Solution:
/*
There are 5 staffs. You can get this by accessing the /api/staff_members route.
There are 5 students. You can get this by accessing the /api/students route.
There are 9 schedules. You can get this by accessing the /api/schedules route.
There are 3 schedules with bookings. You can get this by counting the number of schedules with emails when using the returned data by accessing the /api/schedules route.
There is no route that will provide this information.
There is no route that will provide this information.
*/