// Without running it, what will the following code log to the console?

const promise1 = new Promise((resolve, reject) => {
  console.log("foo");
  resolve();
  console.log("bar");
});

promise1.then(() => {
  console.log("baz");
});

console.log("qux");

// my guess: 'qux' then 'foo' then 'bar' then 'baz'

// LS Solution:
/*
foo
bar
qux
baz

This one is a little bit tricky.

First, the callback to Promise runs when the new Promise object is constructed, so foo is the first line of output seen. The resolve() invocation marks the Promise as resolved but doesn't do anything else since then hasn't been called yet. Thus, the second line of output is bar.

Next, we invoke promise1.then. Since then's callback runs asynchronously, nothing happens yet. Instead, we fall through to the console.log on line 11. Thus, qux gets printed.

Finally, the asynchronous callback for then runs, thus printing baz last.
*/