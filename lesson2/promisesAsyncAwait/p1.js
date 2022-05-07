// Create a Promise that resolves with a value of "Launch School" after a delay of 2000ms, using setTimeout. Print the Promise's resolved value by using the then method.

let prom1 = new Promise(resolve => {
  setTimeout(() => {
    resolve('Launch School');
  }, 2000);
});

prom1.then(val => { console.log(val) });

// LS Solution:
/*
const promise = new Promise(function(resolve, reject) {
  setTimeout(function() {
      resolve('Launch School');
  }, 2000);
});

promise.then(function(value) {
  console.log(value)
});
*/