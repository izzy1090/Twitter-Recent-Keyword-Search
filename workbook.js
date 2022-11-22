// Dependencies required to run script
const fs = require('fs');
const userParameters = require('./userParameters')
const readingFile = require('./readFile');

function combineAndFilter() {
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

