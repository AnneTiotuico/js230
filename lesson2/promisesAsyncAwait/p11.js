// Without running the following code, what will it log to the console?

const testPromise = () => Promise.resolve("1");

function test1() {
  testPromise().then((result) => console.log(result));
  console.log("2");
}

async function test2() {
  console.log(await testPromise());
  console.log("2");
}

test1();
test2();

// My guess: 2 then 1 (from test1) then 1 then 2 (from test 2)

// LS Solution:
/*
2
1
1
2

The key to this problem is to realize that test1 invokes testPromise on line 4 but doesn't wait around for it to resolve. Instead, it logs a value of 2 on line 5 then returns to the program's top level. Even though testPromise returns a resolved Promise, the then callback won't be called until all of the synchronous code has run. That happens after the asynchronous test2 is called. test2 returns a pending Promise immediately, so the callback in test1 gets called afterward. It prints 1.

Next, the await on line 9 notices that the Promise returned by testPromise has resolved to a value of 1, so test2 logs 1 and then 2.
*/