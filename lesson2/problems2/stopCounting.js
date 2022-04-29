// Extend the code from the previous problem with a stopCounting function that stops the logger when called.

function startCounting() {
  let count = 1;
  return setInterval(() => { 
    console.log(count); 
    count += 1;
  }, count * 1000);
}

let id = startCounting();

function stopCounting() {
  clearInterval(id);
}

stopCounting();

// LS Solution:

// let counterId;

// function startCounting() {
//   let count = 0;
//   counterId = setInterval(() => {
//     count += 1;
//     console.log(count);
//   }, 1000);
// }

// function stopCounting() {
//   clearInterval(counterId);
// }