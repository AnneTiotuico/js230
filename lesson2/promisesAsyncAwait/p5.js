// Without running it, what will the following code log to the console?

const promise = new Promise((resolve, reject) => {
  console.log("foo");
  reject();
  console.log("bar");
});

promise
  .then(() => {
    console.log("baz");
  })
  .catch(() => {
    console.log("qux");
  });

console.log("abc");

// My guess: 'foo' 'bar' 'abc' 'qux'

// LS Solution:
/*
foo
bar
abc
qux

This problem is similar to the previous one. The main difference is that the callback for catch gets called instead of then's callback, so qux is the final output.

*/