// required for earlier versions of node
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// dependencies needed
const fs = require('fs')
const {readFileSync, promises: fsPromises} = require('fs');
const { get } = require('http');
const { resolve } = require('path');
const config = require('dotenv').config()
const bearerToken = process.env.BEARER_TOKEN

// start-up message
console.log('Searching Twitter from the last 7 days...')

// Function returns Twitter results from last 7 days
// input: keyword and filename
// output: txt file of returned search results
const getRecentTweets = async (keyword, filename) => {
    try {
        await fetch(`https://api.twitter.com/2/tweets/search/recent?query=${keyword}`, {
            headers: {
                'Authorization': 'Bearer ' + bearerToken } })
            // converts return searchResults promise into a .json
            .then( searchResults => searchResults.json() )
            // allows for JSON to be converted into a text file and exports it
            .then( data => {
                const textDoc = JSON.stringify(data)
                return fs.writeFile(filename, textDoc, function(err){
                    if (err){
                        console.log(err) }
                })    
            })
        } catch(err) {
            console.log(err) 
        }
}

// function to accept a file and convert it to an array
// input: text file 
// output: array
const asyncReadFile = async (filename) => {
    try {
      const contents = await fsPromises.readFile(filename, 'utf-8');
        const backToJSON = JSON.parse(contents)
        return backToJSON;
    } catch (err) {
      console.log(err);
    }
}
// final results to store our filtered tweets when we're done
let results;

// function to invocate getRecentTweets with user generated keyword and filename instantly
    // then promises to return that file to a variable
function toVariable() {
    return new Promise((resolve, reject)=> {
        // Creates text file instantly
        setTimeout(()=>{
            // enter keyword you want to search and the file you want to save it as
            getRecentTweets('Elon Musk','Elon_Musk.txt')
        },0);
        setTimeout( () => {
            // declared variable to store returns results of the file
            const file = asyncReadFile('./Elon_Musk.txt')
            resolve(file) }, 1500)
    })
}

// continuation of promise in which file generated and stored on hard drive 
    // and is then formatted so a recursion can filter data later on
toVariable().then( (dataFromFile) => {
    // declared empty object to store latest tweets
    let currTweets = {};
    // move tweets out of their parent object and removes the word 'data'
    for (const key in dataFromFile) {
        if (key === "data" && Object.keys(currTweets).length === 0) {
            currTweets = dataFromFile[key] } 
    }
    return currTweets
})
    
// then take those formatted tweets and recurse through them to create a new object with the desired filters
.then ((tweets)=>{
    // use a recursive function to create and return an object
    // input: object and array of keywords
    // output: a new object
    function recurse (object, output = {}) {
        // Once object has been sliced down
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
        return recurse(object.splice(1), output);
    }
    const filteredTweets = recurse(tweets);
    results = filteredTweets
})

setTimeout(()=> {
    console.log(results)
}, 1550)