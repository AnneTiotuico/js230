/* eslint-disable max-len */
document.addEventListener("DOMContentLoaded", function () {
  const Calculate = {
    "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
    "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
    "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
    "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  };

  let form = document.querySelector("form");
  const getValueOf = (selector) => form.querySelector(selector).value;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let firstNumber = +getValueOf("#first-number");
    let secondNumber = +getValueOf("#second-number");
    let operator = getValueOf("#operator");

    let calculate = Calculate[operator];
    let answer = calculate(firstNumber, secondNumber);
    document.querySelector("#result").textContent = String(answer);
  });
});

/*
Our solution uses two event handlers: a DOMContentLoaded event handler that fires when the DOM is ready and a submit handler that fires when the user submits the form.

Examine the Calculate object declared on lines 2-7. This object is a dispatch table. It lets us perform the correct calculation based on the operator selected in the form's dropdown element. For instance, if the user selects the * operator, Calculate[operator] on line 19 returns a function that multiplies two numbers. We could also use a switch or if statement with a clause for each operator value in the submit handler. Dispatch tables like that shown here are a convenient way to perform operations based on some string value.

The event listener for the submit event on the form first calls preventDefault to disable the default behavior on this form; we don't want to send a request to a server. Next, we grab the values from the 3 input elements. Note that we're careful to coerce the number values to numbers with the unary + operator; without the coercion, firstNumber and secondNumber would be strings.

For a little extra clarity, we use a nested function, getValueOf, to extract the values we want from the form.

On line 19, as mentioned previously, we use the Calculate object to determine which function we need to perform the desired calculation. We call that function on line 20, and it returns the answer.

Finally, we replace the current result value (initially 0) with the string value corresponding to our answer.
*/