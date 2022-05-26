/*
Let's build a simple arithmetic calculator. It will have two inputs for numbers, a selection list that controls which arithmetic operation the calculator performs, and a button that performs the calculation. It will display the result above the inputs. This assignment combines your ability to interact with the DOM with your understanding of event listeners.
*/

/*
Notes:
- need to grab h1 #id to update value once the '=' submit button is pressed
- need to grab input #first-number's value 
  grab input #second-number's value 
  grab selected option value from select #operator
- perform the calculation and save that value
- when user clicks submit, then update the value of h1 to the result of the calculation
*/

document.addEventListener('DOMContentLoaded', () => {
  let result = document.querySelector('#result');
  let submit = document.querySelector("input[type='submit']");

  submit.addEventListener('click', event => {
    event.preventDefault();
    let firstNum = document.querySelector('#first-number').value;
    let secondNum = document.querySelector('#second-number').value;
    let operation = document.querySelector('#operator').value;
    firstNum = Number(firstNum);
    secondNum = Number(secondNum);
    let value;

    switch(operation) {
      case '+':
        value = firstNum + secondNum;
        break;
      case '-':
        value = firstNum - secondNum;
        break;
      case '*':
        value = firstNum * secondNum;
        break;
      case '/':
        value = firstNum / secondNum;
        break;
    }

    result.innerHTML = value; 
  });
});
