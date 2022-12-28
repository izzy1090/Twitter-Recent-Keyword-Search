// JavaScript files needed to run this script
const generateTweets = require('./twitterApiCall-node')
const readingFile = require('./readFile')
const userParameters = require('./searchParameters-node')
const filter = require('./recursiveFilter')

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
            // reads and returns .txt created from Twitter's API response
            return readingFile.asyncReadFile(`${today}${uniqueFilename}`)
        })
        .then((rawTweets)=>{
            // then recursively filters rawTweets to log to the console the desired data from JSON
            const filteredTweets = filter.recursiveFilter(rawTweets)
            console.log(filteredTweets)      
        })
    } catch (err) {
        console.log(err)
    }
}

runScript()