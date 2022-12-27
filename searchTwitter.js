// JavaScript files needed to run this script
const generateTweets = require('./twitterApiCall')
const readingFile = require('./readFile')
const userParameters = require('./searchParameters')
const filter = require('./recursiveFilter')

// needed for the 'child process' module of nodejs to execute shell commands
const {exec} = require('child_process');
const { builtinModules } = require('module');

// return the exact time by mins.
const exactMinute = new Date().getMinutes();
// generate a unique filename
const uniqueFilename = exactMinute + userParameters.desiredFilename.split(' ').join('_').toLowerCase()
// generate today's date for folder directory
const today = new Date().toDateString().split(' ').join('_').toLowerCase();

// func runScript grabs tweets and saves data as a file as well as a variable,
    // it then grabs the  variable and returns the filtered results to the console log 
async function runScript(){
    try {
        generateTweets.getRecentTweets(userParameters.searchBy, `${today}${uniqueFilename}`)
        .then(()=>{
            // saves returned tweets from Twitter API as a file for future use
            const file = readingFile.asyncReadFile(`${today}${uniqueFilename}`)
            return file
        })
        .then((rawData)=>{
            // declared empty object to store returned tweets from API
            let tweets = {};
            // move tweets out of its parent object / array and removes word 'data'
                for (const key in rawData) {
                    if (key === "data" && Object.keys(tweets).length === 0) {
                        tweets = rawData[key] 
                    } 
                }
            // use recursive filter script to only return the desired data from JSON
            const filteredTweets = filter.recursiveFilter(tweets)
            console.log(filteredTweets)
        })
    } catch (err) {
        console.log(err)
    }
}

runScript()