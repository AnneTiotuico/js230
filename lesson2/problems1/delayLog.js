// Write a JavaScript function named delayLog that loops through the numbers from 1 to 10, and logs each number after that number of seconds. It should log 1 after 1 second, 2 after 2 seconds, etc. Note that the computation of the time is not dependent on when a previous number was logged. This means that for 10 numbers a total of 10 seconds would have passed.

//> delayLog();
// 1  // 1 second later
// 2  // 2 seconds later
// 3  // 3 seconds later
// 4  // etc...
// 5
// 6
// 7
// 8
// 9
// 10



// function delayLog() {
//   for (let count = 1; count <= 10; count++) {
//     setTimeout(() => { console.log(count) }, count * 1000);
//   }
// }

// delayLog();


// using bind
function delayLog() {
  for (let count = 1; count <= 10; count++) {
    setTimeout((() => { console.log(count) }).bind(count), count * 1000);
  }
}

delayLog();



// LS Student answer using 3rd arg
// function delayLog() {
//   for (var i = 1; i <= 10; i++) {
//     setTimeout(console.log, i*1000, i);  // console.log will be invoked and will be passed the current value of i as as an argument (i's value when setTimeout was invoked since primitives are pass by value)
//   }
// }

// delayLog();

// LS Solution:
function makeLogger(number) {
  return function() {
    console.log(number);
  }
}

function delayLog() {
  for (let index = 1; index <= 10; index += 1) {
    let logger = makeLogger(index);
    setTimeout(logger, index * 1000);
  }
}