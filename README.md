# searching-twitter
The purpose of this project was to utilize Twitter's API to generate search results and log them to your preferred IDE's console. The program also saves a record of each search to your local harddrive so you can utilize the data as you see fit.

To use the program via Node JS, create a folder in your desired directory where the repo will live locally and clone the main branch into the main directory.

Create a separate .env file and use the .env_sample to format your .env file.

Before performing a search, you will need to create a Twitter Developer account to generate an API Key, API Secret, Bearer Token, Access Token, and Access Token Secret for authentication with Twitter's API.

To sign up for a developer account:

1) Log-in to Twitter and verify your email address. (Note that the email and phone number verification from your Twitter account may be needed to apply for a developer account, review on the Twitter help center: email address confirmation or add phone number.)

2) Click sign up at developer.twitter.com to enter your developer account name, location and use case details

3) Review and accept the developer agreement and submit

4) Check your email to verify your developer account. Look for an email from developer-accounts@twitter.com that has the subject line: "Verify your Twitter Developer Account" Note: the developer-accounts@twitter.com email is not available for inbound requests.

5) You should now have access to the Developer Portal to create a new App and Project with Essential access (Essential access is all that's required for this program currently).

After you've created your developer account, you'll need to generate the necessary keys and tokens as mentioned above. From the same developer.twitter.com URL, navigate to the Project dashboard and create a new app by clicking "Add App". 

Add a name for the app (the name does not affect the program's functionality) and after a unique name has been accepted by Twitter, you'll recieve the required authentication keys / tokens. Make sure to save these somewhere safe and secret before navigating off the web page or you'll have to generate a new set. 

Copy your API key, 
