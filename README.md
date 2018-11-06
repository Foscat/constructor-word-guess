# constructor-word-guess

## What it is

This is a command line js game.

## How to play

At the start a new game. You will be given a row of underscores, 9 guesses, and a empty list of guessed letters.

The underscores represent the letters in the word that the user is trying to solve.

When a user inputs a letter it is ran through through the list of accepted inputs once that clears the input is ran trough the 
letters in the word.

If any match with the input the underscore is replaced with the input letter.

If it does not match any letters in the word the # of guesses left goes down by 1 and the input letter is put into the guess letter list.

If the user selects that same letter again during that word guess round the user will be told they have already selected that letter and it will not cause guess score to go down.

If the user completes the word before they run out of guesses they will get a congrats and move on to the next word to solve.

If the user does not solve the word before they run out of guesses the game will end by telling you that you are out of guesses.

The it will ask you if you want to start a new game or exit.

If you choose to N the game will stop. If you choose Y a new game will start.

## Concepts and technologies

* Node.js, command-line applications
* NPM for JS library management
* Inquirer.js for interactive prompting
* Require for linking file function foundations
