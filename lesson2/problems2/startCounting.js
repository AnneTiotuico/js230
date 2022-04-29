// Write a function named startCounting that logs a number to the console every second, starting with 1. Each number should be one greater than the previous number.

// function delayLog() {
//   for (let count = 1; count <= 10; count++) {
//     setTimeout(() => { console.log(count) }, count * 1000);
//   }
// }

function startCounting() {
  let count = 1;
  setInterval(() => { 
    console.log(count); 
    count += 1;
  }, 1000);
}

startCounting();

// LS Solution:
// function startCounting() {
//   let count = 0;
//   setInterval(() => {
//     count += 1;
//     console.log(count);
//   }, 1000);
// }