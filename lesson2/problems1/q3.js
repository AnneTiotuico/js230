// In what sequence does the JavaScript runtime run the functions q, d, n, z, s, f, and g in the following code?

setTimeout(() => {    // 1
  setTimeout(() => {  // 6
    q();              // 11
  }, 15);

  d();                // 7

  setTimeout(() => {  // 8
    n();              // 10
  }, 5);

  z();                // 9
}, 10);

setTimeout(() => {    // 2
  s();                // 12
}, 20);

setTimeout(() => {    // 3
  f();                // 5
});

g();                  // 4

// my guess: g, f, d, z, n, q, s
// correction: s runs before q because the outermost settimeout that encloses q has a delay of 10ms, then the inner setTimeout has a delay of 15 ms which is 25 ms total while s only have a delay of 20 ms


// LS Solution:
// g, f, d, z, n, s, q

// Notice that g still comes before f even though the timeout duration defaults to 0. The reason for this behavior is that while the function can execute immediately already, it isn't until the next event cycle that it will execute.

// Another thing of note is that setTimeout's behavior can be unpredictable when the differences in duration are tiny. Consequently, the sequence you get may be different than the solutions.