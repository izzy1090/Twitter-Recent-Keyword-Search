// Dependencies needed to run script
const fs = require('fs')
const {readFileSync, promises: fsPromises} = require('fs');

// JavaScript files needed to run this script
const userParameters = require('./searchParameters-node')
const readingFile = require('./readFile')
const filter = require('./recursiveFilter')

// needed for the 'child process' module of nodejs to execute CLI commands
const {exec} = require('child_process');
const { exit } = require('process');

// declared variable to store info on the filepath
const fileDirectory = fs.readdirSync('../Twitter-Recent-Keyword-Search')
// generate today's date for folder directory
const today = new Date().toDateString().split(' ').join('_').toLowerCase();
// creates a unique filename to search during our iteration below
const searchTerm = userParameters.desiredFilename.split(' ').join('_').toLowerCase()

// iterate through file directory, if summary file exists, exit program
fileDirectory.forEach(el=>{
    if (el.includes(`summary_${searchTerm}`)){
        exit()
    } 
})

// else iterate over each file in our directory
fileDirectory.forEach(el=>{
    // if there is a .txt file with our search term included
    if (el.includes(`${searchTerm}`)){
        // create a variable to read in files matching search results
        const matchingFiles = readingFile.asyncReadFile(`${el}`)
        .then(dataFromFiles => {
            // remove data and meta, then initialize them to a new variable
            for (const key in dataFromFiles) {
                // if there is a kay matching "data", assign the corresponding value to an object
                if (key === "data") {
                    // use Object.assign to push each match to the back of the object and exclude duplicates
                    const output = Object.assign(dataFromFiles[key])
                    return output; }
            }
        })
        .then( outputObject => {
            // use recursive filter to filter tweets, leaving only user / corresponding tweets as a key/value pair
            const filteredObjects = filter.recursiveFilter(outputObject)
            // then return user / corresponding tweet as key/value pair
            return filteredObjects
        }).then( (filteredResults) => {
            // create new file using filtered results - make sure filename is unique
            const forSummary = JSON.stringify(filteredResults)
            // finally create a summary file to store search results
            return fs.writeFile(`summary_${today}_${searchTerm}`, forSummary, (err)=>{
                if (err){
                    // console any errors when trying to write the data to a file
                    console.log(err)
                } return;
            })
        }) 
    }
})