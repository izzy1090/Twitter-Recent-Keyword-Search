// JavaScript files needed to run this script
const generateTweets = require('./generateTweets')
const readingFile = require('./readFile')
const userParameters = require('./userParameters')

// needed for the 'child process' module of nodejs to execute shell commands
const {exec} = require('child_process');
const { builtinModules } = require('module');

// // variable declaration to return the exact time by mins.
const exactMinute = new Date().getMinutes();
// // variable declaration to generate a unique filename
const uniqueFilename = exactMinute + userParameters.desiredFilename.split(' ').join('_').toLowerCase()
// variable declaration to generate today's date for folder directory
const today = new Date().toDateString().split(' ').join('_').toLowerCase();

// declared func filterResults which grabs tweets and saves data as a file.
    // Func then grabs file and returns filtered results 
// input: no args
// output: object with users as keys and tweets as corresponding values
function filterResults() {
    return new Promise((resolve, reject)=> {
        // Creates text file instantly
        setTimeout(()=>{
            // getRecentTweets invocation, pass in keyword(s) and desired filename
            generateTweets.getRecentTweets(userParameters.searchBy, `${today}${uniqueFilename}`);
        },0);
        setTimeout( () => {
            // declared variable to store generated results of previous invocation
            const file = readingFile.asyncReadFile(`${today}${uniqueFilename}`)
            resolve(file) }, 1500)
    })
}
// then promises to format data for recursive filter below
filterResults().then( (dataFromFile) => {
    // declared empty object to store tweets
    let currTweets = {};
    // move tweet JSON out of its parent object / array and removes word 'data'
    for (const key in dataFromFile) {
        if (key === "data" && Object.keys(currTweets).length === 0) {
            currTweets = dataFromFile[key] } 
    }
    return currTweets
})
    
// promises to recursively iterate over tweets
    // creates new object with user + corresponding tweets as key/value pair
.then ((tweets)=>{
    // function declaration of recursiveFilter
    // input: object and array of keywords
    // output: a new object
    function recursiveFilter (object, output = {}) {
        // Once object has been sliced down - base case
        if (object[0] === undefined) {
            // return our newly declared object
            return output; }
        // if output object is empty and first keyword matches key of first passed-in object
        else if (!output[Object.values(object[0])[1]]) {
            // key for new object is id # of user
            // value is the tweet itself
            output[Object.values(object[0])[1]] = [Object.values(object[0])[2]] } 
        // otherwise push remaining key / value pairs after
        else {
            output[Object.values(object[0])[1]].push(Object.values(object[0])[2]) }
        // begin our recursion
        return recursiveFilter(object.splice(1), output);
    }
    // declared variable to store evaluated results of invoking recursion
    const filteredTweets = recursiveFilter(tweets);
    // pass to finalTweets variable from earlier to use in global memory
    userParameters.finalTweets = filteredTweets;
})

// logging final results of recursive filter after 1.55 seconds
setTimeout(()=>{
    console.log(userParameters.finalTweets)
}, 1600)

module.exports = {
    uniqueFilename
}