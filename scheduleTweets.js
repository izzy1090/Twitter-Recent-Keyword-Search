// Dependencies needed to run this script
const cron = require('node-cron')

// needed for the 'child process' module of nodejs to execute shell commands
const {exec} = require('child_process');

// instructions for node are at: https://www.npmjs.com/package/node-cron
/* 
    field   value
    second	0-59 - minimum is every 30 seconds 
    minute	0-59
    hour	0-23
    day of month	1-31
    month	1-12 (or names)
    day of week	0-7 (or names, 0 or 7 are sunday) 
*/

// invoke cron function .schedule to invoke filterTweet script every nth times
cron.schedule('01 * * * * *', () => {
  console.log('Searching Twitter every minute');
    // declared a function to run JS script 'searchTwitter.js'
    // input: accepts a node command callback, error, stdout, and stderr messages
    // output: logs returned results of invoking 'node searchTwitter.js'
    exec('node searchTwitter.js', 
        (error, stdout, stderr) => {
            console.log(stdout)
            console.log(stderr)
            // if there is an error, log it to the console
            if (error !== null){
                console.log('execution error: ${error}')
            }
    });
});