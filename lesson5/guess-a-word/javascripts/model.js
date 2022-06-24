class Model {
  constructor() {
    this.wordBank = ['apple', 'banana', 'orange', 'pear'];
    this.playedWords = [];
    this.incorrectLimit = 6;
    this.currentWord;
    this.guesses = [];
    this.incorrectGuesses = 0;
  }

  randomWord() {
    let randomIdx = [Math.floor(Math.random() * this.wordBank.length)];
    let currentWord = this.wordBank.splice(randomIdx, 1)[0];
    this.playedWords.push(currentWord);
    this.currentWord = currentWord;
  }

  resetGame() {
    this.randomWord();
    this.guesses = [];
    this.incorrectGuesses = 0;
  }
}

export default Model;