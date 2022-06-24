class View {
  constructor() {
    this.body = this.getElement('body');
    this.replay = this.getElement('#replay');
    this.spaces = this.getElement('#spaces');
    this.guesses = this.getElement('#guesses');
    this.apples = this.getElement('#apples');
    this.message = this.getElement('#message');
  }

  getElement(selector) {
    return document.querySelector(selector);
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);

    return element;
  }

  toggleReplayLink(show) {
    if (show) {
      this.replay.hidden = false;
    } else {
      this.replay.hidden = true;
    }  
  }

  displayPage(gameover, win) {
    this.toggleReplayLink(gameover);
    if (gameover && !win) {
      this.message.innerText = 'Sorry! You\'re out of guesses';
      this.body.className = 'lose';
    } else if (gameover && win) {
      this.message.innerText = 'You win!'
      this.body.className = 'win';
    } 
  }

  displayNoMoreWords() {
    this.message.innerText = 'Sorry, I\'ve run out of words!';
    this.toggleReplayLink(false);
  }

  createBlanks(word) {
    let length = word.length;
    for (let count = 0; count < length; count++) {
      let blank = this.createElement('span');
      blank.dataset.index = count;
      this.spaces.appendChild(blank);
    }
  }

  userGuess(handler) {
    document.addEventListener('keyup', e => {
      let key = e.key.toLowerCase();
      console.log
      if (!this.body.className && key >= 'a' && key <= 'z' && key.length === 1) {
        handler(key);
      }
    });
  }

  addGuess(guess) {
    let letter = this.createElement('span');
    letter.innerText = guess;
    this.guesses.appendChild(letter);
  }

  revealLetter(guess, indexes) {
    indexes.forEach(idx => {
      let space = this.getElement(`span[data-index="${idx}"]`);
      space.innerText = guess;
    });
  }

  removeApple(incorrectGuesses) {
    this.apples.className = `guess_${incorrectGuesses}`;
  }

  resetGame(handler, wordBank) {
    document.querySelector('a').addEventListener('click', e => {
      e.preventDefault();
      if (wordBank.length >= 1) {
        $(this.spaces).children().not(':first-child').remove();
        $(this.guesses).children().not(':first-child').remove();
        this.message.innerText = '';
        this.apples.className = '';
        this.body.className = '';
      }
      handler();
    });
  }
}

export default View;