// Dependencies needed to run script
const fs = require('fs')

// JavaScript files needed to run this script
const userParameters = require('./searchParameters-node')
const readingFile = require('./readFile')

// needed for the 'child process' module of nodejs to execute CLI commands
const { exit } = require('process');

// declared variable to store info on the filepath
const fileDirectory = fs.readdirSync('../searching-twitter')
// generate today's date for folder directory
const today = new Date().toDateString().split(' ').join('_').toLowerCase();
// creates a unique filename to search during our iteration below
const searchTerm = userParameters.desiredFilename.split(' ').join('_').toLowerCase()

// iterate through file directory, if summary file exists, exit program
for (let i = 0; i < fileDirectory.length; i++){
    if (fileDirectory[i] === `summary_${today}_${searchTerm}`){
        console.log('\nSummary file already exists...\n')
        exit()
    }
}

// else iterate over each file in our directory
fileDirectory.forEach(el=>{
    if (el.includes(`${searchTerm}`)) {
        // initializes a variable to all files matching the search term
        const matchingFiles = readingFile.asyncReadFile(`${el}`)
        .then((rawTweets)=>{           
            const forSummaryFile = JSON.stringify(rawTweets)
            // logs raw summarized tweets to the console
            console.log(rawTweets)
            return forSummaryFile
        }).then((summarizedTweets)=>{
            // then saves a copy of the past searches as a summarized .txt file
            return fs.appendFile(`summary_${today}_${searchTerm}`, summarizedTweets, (err)=>{
                if(err){
                    console.log(err)
                }
            })
        })
    }
})