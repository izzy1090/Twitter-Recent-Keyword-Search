# searching-twitter
The purpose of this project was to utilize Twitter's API to generate search results and log them to your preferred IDE's console. In addition to other features, the program saves a record of each search to your local hard drive so you can utilize the data as you see fit.

There is a possibility I'll have time to edit the program to work by prompting a user to enter search results into your console and then making api calls via that. I'll tack it on to a list of things I want to do. 

To use the program via Node JS, create a folder in your desired directory where the repo will live locally and clone the main branch into the directory.

Create a separate .env file and use the .env_sample to format your .env file.

Before performing a search, you will need to create a Twitter Developer account to generate an API Key, API Secret, Bearer Token, Access Token, and Access Token Secret for authentication with Twitter's API.

To sign up for a developer account:

1) Log-in to Twitter and verify your email address. (Note that the email and phone number verification from your Twitter account may be needed to apply for a developer account, review on the Twitter help center: email address confirmation or add phone number.)

2) Click sign up at developer.twitter.com to enter your developer account name, location and use case details

3) Review and accept the developer agreement and submit

4) Check your email to verify your developer account. Look for an email from developer-accounts@twitter.com that has the subject line: "Verify your Twitter Developer Account" Note: the developer-accounts@twitter.com email is not available for inbound requests.

5) You should now have access to the Developer Portal to create a new App and 'Project' with Essential access (Essential access is all that's required for this program currently).

After you've created your developer account, you'll need to generate the necessary keys and tokens as mentioned above. From the same developer.twitter.com URL, navigate to the Project dashboard and create a new app by clicking "Add App". 

Add a name for the app (the name does not affect the program's functionality) and after a unique name has been accepted by Twitter, you'll receive the required authentication keys / tokens. Make sure to save these somewhere safe and secret before navigating off the web page or you'll have to generate a new set. 

Create a .env file in your directory using the .env_sample file as a template and replace the placeholder text with your newly generated keys / tokens.

Finally install all the required node modules using the below command in your CLI: 
```
npm install
```

To generate your desired search results, navigate to the 'searchParameters-node.js' script and change the passed-arguments for the userInput function (don't forget to save your JavaScript file afterwards). Now you should be ready to pull tweets from Twitter's API!

**List of available CLI commands / program features are below.**

Searches Twitter for relevant tweets from the past 7 days:
```
node searchTwitter-node.js
```

Utilizes node Cron to schedule tweets to run _n_ number of times. Please refer to the documentation below for more information on how Cron works:

https://www.npmjs.com/package/node-cron

You can also use the URL below to generate the required syntax for scheduling Cron to run your desired _n_ number of times (make sure to update the 'scheduleTwitterSearch-node.js' and save your script): 

https://crontab.guru/

```
node scheduleTwitterSearch-node.js
```

Creates a summary document which compiles your past .txt searches into one document. It's important to note that this function evaluates .txt files in your directory, so please run 'node cleanDirectory.js' before changing your search parameters to prevent different keyword search results from compiling into your summary file.
```
node combineTweets-node.js
```

Cleans up the file directory and moves recent searches into a folder using search parameters as a folder name.
```
node cleanDirectory-node.js
```
f
