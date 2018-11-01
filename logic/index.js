var Word = require("./Word");
var inquirer = require("inquirer");
//var prompt = require("prompt")


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

// random math to provide varity in the game
randomWord = function(movieNames){
    var index = Math.floor(Math.random() * movieNames.length);
    return movieNames[index];

};

// randomWord function testing and setting of global currentWord object
currentWord = randomWord(movieNames);
    console.log("Current Word: " + currentWord);


//The questions are objects that contain functions in an array
var gameQuestions = [
    //first question aka start
    {
        name: "GuessLetter",
        message: "Guess a letter",
        check: function(value) {

            // this var allows only letters to be accepted inputs and converst all inputs to lowercase
            // The indexOf() method returns the index within the calling String object of the first occurrence
            // of the specified value, starting the search at fromIndex. Returns -1 if the value is not found.
            var acceptedInputs = ('abcdefghijklmnopqrstuvwxyz'.indexOf(value.charAt(0).toLowerCase()) !== -1)

            // does the comparison of user input to the accepted inputs index
            var checked = (value.length === 1) && acceptedInputs;
            return checked || "Type a letter"
            },

            // when it it checked it returns the whole thing if you still have guesses left
            when: function () {
                return (current.allCorrect() && guessesLeft > 0);
            }

    },
    //second question aka restart
    {
        type: "confirm",
        name: "newGame",
        message: "Play Again?",

        when: function() {   
            // 
            return(current.allCorrect() || guessesLeft <= 0); 
        }

    }
];// end of game question array

///////////////////////////////////////////////

// resets the game to defaults
var restartGame = function(){

    currentWord = randomWord(movieNames);
    current = new Word(currentWord);
    current.inputGuess(" ");
    guesses = [];
    guessesLeft = 9;
    askQuestion();
    // check that a new word has gone through
    console.log(currentWord);
};
///////////////////////////////////////////////

// start of total game flow function
var askQuestion = function(){
    
    // if the new Word  is not all correct display underscores for unsolved letters
    if(!current.allCorrect() && guessesLeft > 0) {
        console.log(current + "");
         
    }
    
    // ask the user the questions using the inquierer npm to start or end a game session
    inquirer.prompt(gameQuestions).then(answers => {

        // if a user chooses to not play a new game give response and end the game
        if("newGame" in answers && !answers.newGame) {
            console.log("Smell ya later!");
            process.exit();
        }

        // if user chooses to play a new game 
        if(answers.newGame) {
            restartGame();
        }

        //The hasOwnProperty() method returns a boolean indicating whether the object has 
        //the specified property as its own property (as opposed to inheriting it). **ends at  line 121
        if (answers.hasOwnProperty("GuessLetter")) {

            var input = answers.GuessLetter.toLowerCase();

            if(guesses.indexOf(input) === -1) {
                // for correct inputs
                guesses.push(input);
                current.inputGuess(input);
                // for wrong inputs
                if (currentWord.toLowerCase().indexOf(input.toLowerCase()) === -1) {
                    guessesLeft--;
                }
                // for repeat inputs
            }else{
                console.log("You already guessed that one!", input);
            }
        }

        // if allCorrect() is false
        if(!current.allCorrect()) {
            // and if your total guesses is less than 1 you get this response
            if(guessesLeft < 1) {
                console.log("You are outta guesses Buccko!!!");
                console.log(currentWord, " was the word you needed to spell.")

             // otherwise update guesses clientside of what happened in input function above
            }else {
                console.log("Total guesses: ", guesses.join(" "));
                console.log("Guesses remaining: ", guessesLeft);
            }

         // if allCorrect() is true before you run out of guesses    
        }else {
            console.log("Congratulations!!!");
            console.log(currentWord + " was the correct answer!");
        }

        // call to ask a new random word to spell
        askQuestion();

    });// end of inquirer prompt function

}// end of general game flow function
 
  restartGame();
  

