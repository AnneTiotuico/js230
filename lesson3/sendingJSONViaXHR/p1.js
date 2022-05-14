
let request = new XMLHttpRequest();
request.open('POST', 'https://ls-230-book-catalog.herokuapp.com/books');

request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

let data = { title: 'Eloquent JavaScript', author: 'Marijn Haverbeke' };
let json = JSON.stringify(data);

request.send(json);

//Write out the raw text of the HTTP request the last example above will send to the server.

// POST /books HTTP/1.1
// Host: ls-230-book-catalog.herokuapp.com
// Content-Type: application/json; charset=utf-8
// Accept: */*

// {"title": "Eloquent JavaScript", "author": "Marijn Haverbeke"}


// LS Solution:
// POST /books HTTP/1.1
// Host: ls-230-book-catalog.herokuapp.com
// Content-Type: application/json; charset=utf-8
// Accept: */*

// {"title": "Eloquent JavaScript", "author": "Marijn Haverbeke"}

// The browser will likely add additional headers, but you should expect to see the headers shown above.






   
  