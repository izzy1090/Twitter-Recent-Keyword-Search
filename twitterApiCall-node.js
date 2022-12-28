// fetch declaration required for earlier versions of node
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Dependencies needed to run script
const fs = require('fs')
const config = require('dotenv').config()
const bearerToken = process.env.BEARER_TOKEN

// start-up message
console.log('Results are from the last 7 days...\n')

// Function declaration for getRecentTweets 
    // func fetches tweets based on keyword(s) from last 7 days
// input: keyword and filename
// output: txt file of returned search finalResults
const getRecentTweets = async (keyword, filename) => {
    try {
        // Grabs tweets from Twitter's API V2 (only have access to V2 currently)
        await fetch(`https://api.twitter.com/2/tweets/search/recent?query=${keyword}`, {
            headers: {
                'Authorization': 'Bearer ' + bearerToken } })
            // converts returned searchFinalResults promise into a .JSON
            .then( response => response.json() )
            .then( rawTweets => {
                // refers to 'data' key by value and moves tweets out of parent object
                if ('data' in rawTweets){
                    const cleanedTweets = Object.assign(rawTweets['data'])
                    // subsequent JSON is converted into usable JSON of strings
                    const textDoc = JSON.stringify(cleanedTweets)
                    // exports final JSON as a .txt file with user provided filename
                    fs.writeFile(filename, textDoc, function(err){
                        if (err){
                            console.log(err) }
                    }) 
                return {textDoc} 
                }      
            })
        } catch(err) {
            console.log(err) 
        }
}

module.exports = {
    getRecentTweets
}