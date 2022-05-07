// Without running it, what will the following code log to the console? This problem may be a bit challenging.

const promise = new Promise(res => res(1));
promise
  .then((num) => {
    console.log(num);
    return num + 2;
  })
  .then((num) => {
    console.log(num);
    return num + 3;
  })
  .then((num) => {
    console.log(num);
    return num + 4;
  })
  .finally((num) => {
    console.log(num);
    return num + 5;
  });

// My guess: 1 then 3 then 6 then undefined

// LS Solution:
/*
1
3
6
undefined

The trickiest part of this code is that you may be unfamiliar with finally. Fortunately, it is described in the MDN Documentation. For our purposes, finally is invoked when a Promise is settled (when it is either resolved or rejected). The callback for finally takes no arguments. Thus, in this code, num will be set to undefined regardless of what happens in the then clauses.

Another tricky aspect of this code is that there are 3 then callbacks. These callbacks are invoked in the order shown. Each one passes its return value to the next callback in the chain. Thus, 1 is the argument for the first then callback, 3 is passed to the second, and 6 is given to the third.

Thus, the 3 then callbacks print 1, 3, and 6, respectively. Finally, the finally callback prints undefined.
*/
