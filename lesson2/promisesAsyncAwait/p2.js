// Create a Promise that rejects with a value of "Error: Not Launch School" after a delay of 2000ms, using setTimeout. Print the Promise's rejected value by using the .catch method.​

const prom1 = new Promise((_, reject) => {
  setTimeout(() => {
    reject('Error: Not Launch School');
  }, 2000);
});

promise.catch((val) => { console.log(val) });

//  LS Solution:
/*
const promise = new Promise(function(resolve, reject) {
  setTimeout(function() {
      reject('Error: Not Launch School');
  }, 2000);
})

promise.catch(function(value) {
  console.log(value);
});
*/