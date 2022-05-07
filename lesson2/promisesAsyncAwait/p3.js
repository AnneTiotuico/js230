// Without running it, what will the following code log to the console?

const promise = new Promise(function (resolve, reject) {
  resolve("I am a Promise");
});
​
promise.then(value => console.log(value));
console.log("I am NOT a Promise");

// My guess: 
/*
this will first output 'I am NOT a Promise' then 'I am a Promise'
*/

// LS Solution
/*
I am NOT a Promise
I am a Promise

I am NOT a Promise is printed first since all synchronous code runs before any asynchronous code does.

*/
