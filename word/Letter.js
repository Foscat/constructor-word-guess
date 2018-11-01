

// Letter is the base constructor.
// It initally displays a underscore in place of the letters.
// If the user selects the correct letter then the underscore is replaced with that letter.

//setup for base function for letters
var Letter = function(letter){
    this.letter = letter;
    this.guess = false;
   
    //setup for turning the letters into underscores if they have not been guessed
    this.toString = function(){
        return this.guess ? this.letter : "_";

    }

    //takes the letter input from the user and makes it lowercase and assures that the guess word is in lowercase as well
    //when that happens the underscore that was previously the is replaced by the correct letter
    this.userInput = function(newGuess){
        if (this.letter.toLowerCase() === newGuess.toLowerCase()) {
            this.guess = true;
        }
    }
};



module.exports = Letter;