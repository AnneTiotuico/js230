import Model from './model.js';
import View from './view.js';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.displayStartState();

    this.view.userGuess(this.handleGuess);
    this.view.resetGame(this.handleReset, this.model.wordBank);
  }

  displayStartState = () => {
    this.model.randomWord();
    let word = this.model.currentWord;
    this.view.createBlanks(word);
    this.view.displayPage(false, false);
  }

  handleGuess = (guess) =>  {
    let word = this.model.currentWord;

    if (this.model.guesses.includes(guess)) return;
    
    this.view.addGuess(guess);

    if (word.includes(guess)) {
      this.handleCorrectGuess(word, guess);
    } else if (!this.model.guesses.includes(guess)) {
      this.handleIncorrectGuess(word);
    }

    this.model.guesses.push(guess);
    this.handleWinLose(word);
  }

  handleCorrectGuess = (word, guess) => {
    let indexes = [];
    word.split('').forEach((char, idx) => {
      if (char === guess) indexes.push(idx);
    });
    this.view.revealLetter(guess, indexes);
  }

  handleIncorrectGuess = () => {
    this.model.incorrectGuesses += 1;
    this.view.removeApple(this.model.incorrectGuesses);
  }

  handleWinLose = (word) => {
    if ([...word].every(char => this.model.guesses.includes(char))) {
      this.view.displayPage(true, true);
    } else if (this.model.incorrectGuesses === this.model.incorrectLimit) {
      this.view.displayPage(true, false);
    }
  }

  handleReset = () => {
    this.model.resetGame();
    let word = this.model.currentWord;
    
    if (word) {
      this.view.createBlanks(word);
      this.view.displayPage(false, false);
    } else {
      this.view.displayNoMoreWords();
    }
  }


// left off:
/*
figure out how to reset game state only if there are words left.
if no more words left when play again is
*/

}

const game = new Controller(new Model(), new View());
