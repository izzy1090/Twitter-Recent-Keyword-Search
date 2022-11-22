// Dependencies required to run script
const fs = require('fs');
const userParameters = require('./userParameters')

// needed for the 'child process' module of nodejs to execute shell commands
const {exec} = require('child_process');
const { stderr } = require('process');

// declare variable to format passed filename from userParameters.js
// to be an acceptable format for creating file directories
const folderName = userParameters.desiredFilename.split(' ').join('_').replace('.txt','').toLowerCase()

// use fs to point to appropriate directory to search for filenames
const fileDirectory = fs.readdirSync('../Twitter-Recent-Keyword-Search');

// checks to see if folder associated with search exists
    
if (!fs.existsSync(`${folderName}`)){
    console.log('Directory does not exist, creating a new one now...')
    // if not create a new directory
    exec(`mkdir ${folderName}`, 
        (error, stdout, stderr) => {
            console.log(stdout)
            console.log(stderr)
        // if there is an error, log it to the console
        if (error){
            console.log(`execution error: ${error}`) }
    }) 
} 

// otherwise iterate over files and search for strings containing .txt 
fileDirectory.forEach(el=>{
    // if fileDirectory has .txt files
    if (el.includes('.txt')) {
        // move it to existing directory
        exec(`mv ${el} ${folderName}`, 
            (error, stdout, stderr) => {
                console.log(stdout)
                console.log(stderr)
            // if there is an error, log it to the console
            if (error !== null){
                console.log(`execution error: ${error}`) }
        })
    }
})