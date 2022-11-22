// required for earlier versions of node
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// dependencies needed to run script
const fs = require('fs')
const {readFileSync, promises: fsPromises} = require('fs');
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

// function declaration asyncReadFile to read in a file 
    // and convert contents from file into an array of objects
// input: text file 
// output: array
const asyncReadFile = async (filename) => {
    try {
        // awaits promise for 'fs' to read in file
        const contents = await fsPromises.readFile(filename, 'utf-8');
        // then parse it out to an array of objects
        const backToJSON = JSON.parse(contents)
        // then returns it back to func
        return backToJSON;
    } catch (err) {
      console.log(err);
    }
}
// finalResults declaration to store filtered tweets when we're done
var finalResults;

// instant getRecentTweets invocation with user gen. keyword and filename
    // promises to return that file to a variable
function toVariable() {
    return new Promise((resolve, reject)=> {
        // Creates text file instantly
        setTimeout(()=>{
            // getRecentTweets invocation, pass in keyword(s) and desired filename
            getRecentTweets('Elon Musk','Elon_Musk.txt')
        },0);
        setTimeout( () => {
            // declared variable to store generated results of previous invocation
            const file = asyncReadFile('./Elon_Musk.txt')
            resolve(file) }, 1500)
    })
}
// then promises to format data for recursive filter below
toVariable().then( (dataFromFile) => {
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
    // pass to finalResults variable from earlier to use in global memory
    finalResults = filteredTweets
})

setTimeout(()=> {
    console.log(finalResults)
}, 1550)