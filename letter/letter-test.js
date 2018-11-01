var Letter = require("./Letter.js");

// make letter inputs for test
var  newLetter = new Letter("a");
var newLetterCap = new Letter("A");
var newLetterCapB = new Letter("B");

// test that differant letters work and capital letters are matched with lowercase

// control log to check that letters start as underscores
console.log("Control")
console.log(newLetter + "");
console.log(newLetterCap + "");
console.log(newLetterCapB + "");

// testing what happens when you select b
console.log("Gussing b for all");
newLetter.userInput("b");
newLetterCap.userInput("b");
newLetterCapB.userInput("b");

// testing log
console.log(newLetter + "");
console.log(newLetterCap + "");
console.log(newLetterCapB + "");

// testing what happens when you select A
console.log("Gussing A for all");
newLetter.userInput("A");
newLetterCap.userInput("A");
newLetterCapB.userInput("A");

// testing log
console.log(newLetter + "");
console.log(newLetterCap + "");
console.log(newLetterCapB + "");

