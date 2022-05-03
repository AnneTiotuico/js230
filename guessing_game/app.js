document.addEventListener('DOMContentLoaded', () => {
  let submitButton = document.querySelector('[type="submit"]');
  let p = document.querySelector('p');

  let generateNewRandNum = () => Math.floor(Math.random() * 100 + 1);
  let setStartMessage = () => p.textContent = 'Guess a number from 1 to 100!';
  let disableSubmit = () => {
    submitButton.disabled = true;
    submitButton.style.background = 'linear-gradient(to bottom, #4e4b4b61 0%, #7272724a 100%)';
    submitButton.style.border = 'none';
    submitButton.style.color = '#808080';
    submitButton.style.textShadow = 'none';
    submitButton.style.boxShadow = '0 0 1px 1px #aeabac';
  };

  let answer = generateNewRandNum();
  setStartMessage();
  
  submitButton.addEventListener('click', event => {
    event.preventDefault();
    let guess = document.querySelector('#guess').value;
    guess = parseInt(guess, 10);
    let message;
    if (!Number.isFinite(guess) || guess < 1 || guess > 100) {
      message = 'Please enter a whole number between 1 and 100';
    } else if (guess === answer) {
      message = `You're correct! The number is ${guess}.`;
      disableSubmit();
    } else if (guess < answer) {
      message = `The correct number is higher than ${guess}.`;
    } else if (guess > answer) {
      message = `The correct number is lower than ${guess}.`;
    } 

    p.textContent = message;
  });

  document.querySelector('a').addEventListener('click', event => {
    let form = document.querySelector('form');
    form.reset();
    answer = generateNewRandNum();
    setStartMessage();
  });
});

