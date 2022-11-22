// Dependencies needed to run script
const fs = require('fs')
const {readFileSync, promises: fsPromises} = require('fs');

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

module.exports = {
    asyncReadFile
}