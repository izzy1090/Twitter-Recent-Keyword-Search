// Dependencies needed to run script
const fs = require('fs')
const {readFileSync, promises: fsPromises} = require('fs');

// JavaScript files needed to run this script
const userParameters = require('./userParameters')

// needed for the 'child process' module of nodejs to execute shell commands
const {exec} = require('child_process');

var currTweets;

// Important Note: I might not be grabbing tweets from the same user consecutively, because 
// Object.assign combines results into one object and overwrites duplicate keys. It might be worth
// assigning recursive filter to target edit_history_ids as key return instead. Need to confirm.

// declared func declares accepts an object and declares an inner func that takes passed-in object(s) 
    // and combines each consecutive passed-arg into one object
// input: object(s)
// output: object
function summarizeOutput (object){
    let output = {};
    return function inner() {
        // if object exists, add it to the output object
        if (object) {
            output = Object.assign(object); } 
        // else if (typeof object !== 'object'){
        //     console.log('Error, passed arg is not an object.') }
        // else return output
        return output; 
    }
}

// // use returned result of invoking combiner func to build .txt file

// let finalSummary
// // logs final results of recursive filter after 1.55 seconds
// const repeating = setInterval(()=>{
//     // declare a variable to initialize results of invoking outer func w/passed arg
//     const summaryPrintOut = summarizeOutput(userParameters.finalTweets)
//     // declare variable to store results of invoking inner w/no arg
//     currTweets = summaryPrintOut();
//     exec('node searchTwitter.js')   
// }, 1500);

// setTimeout( () => { 
//     clearInterval(repeating)
//     console.log(currTweets)
// }, 30000)


// // every time a search is generated
// // function checks to see if a search result has been created
// // input: unknown
// // output: Summary JSON file saved to local drive
//     // if not it creates a new search result
//     // if not it creates a new summary file
// // if true, then it merges current search results with existing summary file