// JavaScript files needed to run this script
const test = require('./filterTweets')

// IMPORTANT NOTE!
// Variables declared here are shared in filterTweets.js currently. Changing variable titles here
// affects other scripts. Make sure to change the variable declarations in the above scripts to ensure
// program works properly. 

// declared global variable to display tweet results
var finalTweets;

// declared global variables to change with userInput
var searchBy = "";
var desiredFilename = '';

// In the future, add code that turns the searchTerm into a txt file name

// declared func accepts a searchTerm and filename to change globally declared variables 
// input: userSearch and userFilename
// output: none or error message 
function userInput(userSearch, userFilename) {
    // would like to have the function assign to global variables
    // if search and filename exist
    if (userSearch && userFilename){
        // change global variables to be passed-in args
        searchBy = userSearch;
        desiredFilename = userFilename; }
    // else print an error message 
    else {
        console.log("An error occurred...")
    }
}

// invoke the function with your intended search term(s)
userInput("Father's Day", 'fathers_day.txt');

module.exports = {
    finalTweets,
    searchBy, 
    desiredFilename
}