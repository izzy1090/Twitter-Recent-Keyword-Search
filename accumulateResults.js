// scripts needed to run this script
const generatedTweets = require('./generateTweets')
const readInFile = require('./readFile')

// finalResults declaration to store filtered tweets when done
var finalResults;

// instantly getRecentTweets invocation with user gen. keyword and filename
    // promises to return that file to a variable and log results
function printOut() {
    return new Promise((resolve, reject)=> {
        // Creates text file instantly
        setTimeout(()=>{
            // getRecentTweets invocation, pass in keyword(s) and desired filename
            generatedTweets.getRecentTweets("Mother's Day", 'mothers_day.txt');
        },0);
        setTimeout( () => {
            // declared variable to store generated results of previous invocation
            const file = readInFile.asyncReadFile('mothers_day.txt')
            resolve(file) }, 1500)
    })
}
// then promises to format data for recursive filter below
printOut().then( (dataFromFile) => {
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