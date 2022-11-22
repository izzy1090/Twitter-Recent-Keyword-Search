// JavaScript files needed to run this script
const filterTweets = require('./searchTwitter')

// IMPORTANT NOTE!
// Variables declared here are shared in filterTweets.js currently. Changing variable titles here
// affects other scripts. Make sure to change the variable declarations in the above scripts to ensure
// program works properly. 

// To run script change the passed-in input for userInput below and run node searchTwitter.js
// After, create a folder you want to store your results and run node cleanDirectory.js

// declared global variable to display tweet results
var finalTweets;

// declared global variables to change with userInput
var searchBy = "";
var desiredFilename = '';

// In the future, add code that turns the searchTerm into a txt file name

// declared func accepts a search term to reinitialize it globally 
// input: userSearch
// output: none or error message 
function userInput(userSearch) {
    // if user search exists
    if (userSearch){
        // change searchBy to be passed-in arg
        searchBy = userSearch;
        // convert userSearch to be an accepted .txt file format
        desiredFilename = `${userSearch}.txt`; }
    // else print an error message 
    else {
        console.log("An error occurred...")
    }
}

// invoke the function with your intended search term(s)
userInput("Elden Ring");

module.exports = {
    searchBy, 
    desiredFilename,
    finalTweets
}