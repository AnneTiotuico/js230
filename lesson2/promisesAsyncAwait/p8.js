// Without running the following code, what will it log to the console? When will the logged values appear on the console?

function after1s(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 1000);
  });
}

async function test(input) {
  const a = await after1s(2);
  const b = await after1s(3);
  return input * a * b;
}

test(3).then((value) => console.log(value));

// My guess: 18 and it will be logged after 2 seconds once both promises are resolved

// LS Solution:
/*
18

The output will appear approximately 2 seconds after the program is invoked.

The key to this problem is that the synchronous code on line 15 will run first. That is, the test function will be executed almost immediately. It will return a pending Promise, so the callback to then won't run until that Promise resolves.

When the asynchronous code in a test runs, it will first call after1s line 10. after1s returns a pending Promise which, after one second, will resolve to the value of the argument passed to after1s: 2. The await keyword on line 10 tells JavaScript to wait for the Promise to be resolved. Once it is resolved, a is assigned to the resolved value (2).

A similar process occurs on line 11, leaving b assigned to 3. Thus, the Promise returned by test resolves to a value of 3 * 2 * 3 or 18.
*/