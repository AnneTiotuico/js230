// Without running it, what will the following code log to the console? This problem may be a bit challenging.

const promise = new Promise((resolve, reject) => {
  resolve("Got it!");
  reject("Oops.");
  resolve("Again!");
});

promise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// My guess: 'Got it'

// LS Solution:
/*
Got it!

Once a Promise is resolved or rejected, any additional attempts to settle it will fail silently. Thus, this Promise resolves to a value of "Got it!", while the reject and resolve invocations on lines 3 and 4 are ignored.

*/