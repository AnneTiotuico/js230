// Without running the following code, what will it log to the console? When will the logged values appear on the console?

function after1s(x, ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, ms);
  });
}

async function test1(input) {
  const a = await after1s(2, 2000);
  const b = await after1s(3, 2000);
  return input * a * b;
}

async function test2(input) {
  const a = await after1s(2, 1000);
  const b = await after1s(3, 1000);
  return input * a * b;
}

test1(2).then((value) => console.log(value));
test2(3).then((value) => console.log(value));

// My guess: 18 after 2 seconds then 12 after 4 seconds

// LS Solution:
/*
18
12

The program will print 18 approximately 2 seconds after the program is invoked, then 12 about 2 seconds later. Note that 18 is the resolved result of calling test2 on line 22, while 12 is that of test1 on line 21. The test2 result is logged first since test2 calls after1s with a delay of 1000ms, while test1 calls after1s with a delay of 2000ms. Thus, test2 resolves first, so its resolved value is printed first.
*/