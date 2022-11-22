// Dependency required to run script
const fs = require('fs');

// needed for the 'child process' module of nodejs to execute shell commands
const {exec} = require('child_process');

// use fs to point to appropriate directory to search for filenames
const fileDirectory = fs.readdirSync('../recent-searches');

// iterate over files and search for strings containing .txt 
fileDirectory.forEach(el=>{
    // if fileDirectory has .txt files
    if (el.includes('.txt')) {
        // run a CLI command to move them into a specified directory below
        exec(`mv ${el} elden_ring`, 
            (error, stdout, stderr) => {
                console.log(stdout)
                console.log(stderr)
            // if there is an error, log it to the console
            if (error !== null){
                console.log('execution error: ${error}')
            }
        })
    }
})