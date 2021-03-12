# MightyHiveTest

## Start-up
#### PC Prerequisites:
 1. Node
 2. Git
 3. NPM
   
#### Step by step:
 1. Open a console terminal and move into the directory you want to clone the repository into.
 2. Write `git clone https://github.com/AlejoArata/MightyHiveTest` in console and press enter.
 3. Now move inside the root folder of the repository and run `npm install` in the console.
 4. Inside the "/Backend" folder, run `node server.js` to start the server on port 3000.
## Testing
#### WebSocket
 1. Go to "/Client" folder.
 2. Set the key-value pairs to send to server in "index.js"
 3. Run `node index.js`
#### REST Endpoint
1. Open any web browser you prefer.
2. Go to http://localhost:3000/api/keyValuePair/ + "key to search" 
 e.g. http://localhost:3000/api/keyValuePair/brand
## Comments

#### Key-Value Parameters
I added to the server functionality the ability to receive a JSON with more than 1 key-value pair.
#### Folder Structure
I made the folder structure a little bit more elaborated than needed for this test on purpose. This way debugging is a lot easier. Also, this structure allows to organize folders better in the case of a functional growth of the server.
#### Automated Testing
Personally, i have never worked with automated testing in projects before, so I'm looking forward to learn it!
