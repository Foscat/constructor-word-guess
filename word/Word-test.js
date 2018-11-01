var Word = require("./Word");

//test word
var newWord = new Word("neckbeard");

//check to see if all correct function is working
console.log("Boolean function check")
console.log(newWord.allCorrect());

//check to see the underscores is all that shoes up in place of letters
console.log("Underscore check")
console.log(newWord + "");
// check to see that the word has been split into individual letters
console.log("Array check")
console.log(newWord.letterArray);

//hard input letters to test system is converting correctly
newWord.inputGuess("n");
newWord.inputGuess("e");
newWord.inputGuess("c");
newWord.inputGuess("k");

//check to see word status so far
console.log(newWord + "");
newWord.inputGuess("b");
newWord.inputGuess("a");
newWord.inputGuess("r");
newWord.inputGuess("d");

//check to see completed word
console.log("Completed spelled word check")
console.log(newWord + "");

//check to see if all correct function is working
console.log("Boolean function check")
console.log(newWord.allCorrect());