// Write a randomizer function that accepts n callbacks and calls each callback at some random point in time between now and 2 * n seconds from now. For instance, if the caller provides 5 callbacks, the function should run them all sometime within 10 seconds.

// While running, randomizer should log the elapsed time every second: 1, 2, 3, ..., 2 * n.

// Expect the output to change with each run due to the random execution times.

function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function randomizer(...callbacks) {
  let max = callbacks.length * 2;
  let delay = () =>  Math.floor(Math.random() * max * 1000);

  let seconds = 0;
  let secondsId = setInterval(() => {
    seconds += 1;
    console.log(seconds);
    if (seconds >= max) {
      clearInterval(secondsId);
    }
  }, 1000);

  [...callbacks].forEach(callback => { 
    setTimeout(() => {
      callback();
    }, delay());
  });
}

randomizer(callback1, callback2, callback3);

// Output:
// 1
// 2
// "callback2"
// 3
// "callback3"
// 4
// 5
// "callback1"
// 6

// LS Solution:

/*
function randomizer(...callbacks) {
  if (callbacks.length < 1) {
    return;
  }

  const secondsEnd = 2 * callbacks.length;
  let secondsElapsed = 0;

  const timeLogger = setInterval(() => {
    secondsElapsed += 1;
    console.log(secondsElapsed);

    if (secondsElapsed >= secondsEnd) {
      clearInterval(timeLogger);
    }
  }, 1000);

  callbacks.forEach(callback => {
    const executeTime = Math.floor(Math.random() * secondsEnd * 1000);
    setTimeout(callback, executeTime);
  });
}

Our solution leverages setTimeout and setInterval. We use setTimeout to set execute the callbacks at random times, and setInterval to log the elapsed time every second.

*/