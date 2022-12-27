// promises to recursively iterate over tweets
    // creates new object with user + corresponding tweets as key/value pair
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
        output[`User ID: ${Object.values(object[0])[1]}`] = [`Tweet: ${Object.values(object[0])[2]}`] } 
    // otherwise push remaining key / value pairs after
    else {
        output[`User ID: ${Object.values(object[0])[1]}`].push(`Tweet: ${Object.values(object[0])[2]}`) }
    // begin our recursion
    return recursiveFilter(object.splice(1), output);
}

module.exports = {
    recursiveFilter
}