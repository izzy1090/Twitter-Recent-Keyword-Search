// required for earlier versions of node
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// dependencies needed to run script
const fs = require('fs')
const { get } = require('http');
const { resolve } = require('path');
const config = require('dotenv').config()
const bearerToken = process.env.BEARER_TOKEN

// start-up message
console.log('Searching Twitter from the last 7 days...')

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
            // converts returned searchfinalResults promise into a .JSON
            .then( searchfinalResults => searchfinalResults.json() )
            .then( data => {
                // subsequent JSON is converted into usable JSON of strings
                const textDoc = JSON.stringify(data)


                // // used to test between files - possibly delete later
                // console.log(`generated upon initial search: ${textDoc}`)


                // exports final JSON as a .txt file with user provided filename
                return fs.writeFile(filename, textDoc, function(err){
                    if (err){
                        console.log(err) }
                })    
            })
        } catch(err) {
            console.log(err) 
        }
}

module.exports = {
    getRecentTweets
}