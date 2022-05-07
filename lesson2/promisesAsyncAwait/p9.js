// The following code is nearly identical to the code in the previous problem, except that line 12 introduces two additional awaits. Without running the code, what will it log to the console? When will the logged values appear on the console?

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
  return input * (await a) * (await b);
}

test(3).then((value) => console.log(value));

// My guess: 18 after 2 seconds

// LS Solution:
/*
18

The output will appear approximately 2 seconds after the program is invoked.

The only differences in this code are the additional awaits on line 12. Neither await has any effect on the result. Since a and b are assigned to 2 and 3, respectively, the awaits on line 12 have no effect.
*/
