

//Word is a constructor that requires the Letter.js file to work
//The function usues it to create the word the user is trying to guess


var Letter = require("./Letter");

var Word = function(wordString) {

    // holds the word that is split into individual letter array
    this.letterArray = [];

    // this is where the word is actually spilt and pushed into the array
    wordString.split("").forEach(element => {
        this.letterArray.push(new Letter(element));
    });

    // this goins the spilt word back into a string
    this.toString =function(){
        return this.letterArray.join(" ");
    }

    // function that takes in inputs and compares them to words
    this.inputGuess = function(guessedLetter){
        this.letterArray.forEach(element => {
            element.userInput(guessedLetter);
        })
    }

    // function that checks to see if the word has been solved
    this.allCorrect = function() {
        return this.letterArray.every((currentValue) => currentValue.guess);
    }
}
module.exports = Word;