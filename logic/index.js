var Word = require('./Word.js');
var inquirer = require('inquirer');


// global empty placeholder objects
var current;
var currentWord;
var guesses;
var guessesLeft;


    // array of unique names from differant movies
var movieNames = [
    "Breathless Mahoney", "Steve Stifler", "Dirk Diggler",
    "Honey Rider", "Gaylord Focker", "Flipper Purify",
    "Santanico Pandemonium", "Allota Fagina", "Bonanza Jellybean",
    "McLovin", "Slartiblartfast", "Biggus Dickus", "Pussy Galore",
    "Pressure Maxwell", "Archer Maggot", "Sy Snootles", "Mister Shhh",
    "Donnie Darko", "Indiana Jones", "Snake Plissken", "Luke Skywalker",
    "Buckaroo Banzai", "Blackagar Boltagon", "Jubilation Lee",
    "Horatio Magellan Crunch", "Gordon Shumway", "Aloysius Snuffleupagus",
    "Norville Roberts", "Taco Macarthur", "Steve and Doug Butabi"
];

    // random math that chooses a rondom word each time to provide varity in the game
    function randomWord(movieNames) {
        var index = Math.floor(Math.random() * movieNames.length);
        return movieNames[index];
    }

    //The questions are objects that contain functions in an array
var gameQuestions = [

    {//first question aka gameplay

        name: 'GuessLetter',
        message: 'Guess a letter',
        validate: function (value) {

            // The indexOf() method returns the index within the calling String object of the first occurrence
            // of the specified value, starting the search at fromIndex. Returns -1 if the value is not found.
            // This var does the comparison of user input to the accepted inputs index and allowing only one input at a time
            var valid = (value.length === 1) && ('abcdefghijklmnopqrstuvwxyz'.indexOf(value.charAt(0).toLowerCase()) !== -1);
            return valid || 'Please enter only a single letter at a time.';

        },// when it is checked it returns the whole thing if you still have guesses left
        when: function () {
            return (!current.allCorrect() && guessesLeft > 0);
        }

    },

    {//second question aka restart
        type: 'confirm',
        name: 'newGame',
        message: 'Play again?',
        // default: true,
        when: function () {
            return (current.allCorrect() || guessesLeft <= 0);
        }
    }
];

///////////////////////////////////////////////

// resets the game to defaults
var resetGame = function() {
    currentWord = randomWord(movieNames);
    // console.log(currentWord); //for cheating and debugging
    current = new Word(currentWord);
    current.inputGuess(' ');
    guesses = [];
    guessesLeft = 7;
}
///////////////////////////////////////////////

// start of total game flow function
var askQuestion = function() {

    // underscores in place of unguessed letters are dispalyed if the users still has guesses left
    if (!current.allCorrect() && guessesLeft > 0) {
        console.log(current + '');
    }
    
    // ask the user the questions using the inquierer npm to start a new game or end a game session
    inquirer.prompt(gameQuestions).then(answers => {

        // if a user chooses to not play a new game give response and end the game
        // The in operator returns true if the specified property is in the specified object or its prototype chain.
        if ('newGame' in answers && !answers.newGame) {
            console.log("Smell ya later!");
            process.exit();
        }
        // if user chooses to play a new game
        if (answers.newGame) {
            resetGame();
        }

        //The hasOwnProperty() method returns a boolean indicating whether the object has 
        //the specified property as its own property (as opposed to inheriting it).
        if (answers.hasOwnProperty('GuessLetter')) {
            var input = answers.GuessLetter.toLowerCase();
            
            // for correct inputs
            if (guesses.indexOf(input) === -1) {
                // push input into guessed letters array
                guesses.push(input);
                current.inputGuess(input);

                // for wrong inputs
                if (currentWord.toLowerCase().indexOf(input.toLowerCase()) === -1) {
                    guessesLeft--;
                }

                // for repeat inputs
            } else {
                console.log("You already guessed that one!", input);
                
            }
        }

        // if allCorrect() is false
        if (!current.allCorrect()) {

            // and if your total guesses is less than 1 you get this response
            if (guessesLeft < 1) {
                console.log("You are outta guesses Buccko!!!");
                console.log(currentWord, "was the word you needed to spell.");

            // otherwise update guesses clientside of what happened in input function above
            } else {
                console.log("Total guessed letters: ", guesses.join(' '));
                console.log('Guesses remaining:', guessesLeft);
            }

        // if allCorrect() is true before you run out of guesses
        } else {
            console.log("Congratulations!!!");
            console.log(currentWord + " was the correct answer!");
            
        }

        // call to ask you to input another letter
        askQuestion();

    });// end of inquirer prompt function

}// end of general game flow function

resetGame();
askQuestion();
// console.log(currentWord); //for cheating and debugging