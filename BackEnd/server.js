//DEPENDENCIES
const express = require("express")
const app = express()
const SocketServer = require("ws").Server
const fs = require('fs') //FILE SYSTEM
const apiRoutes = require("./api/routes")//ROUTES FOR EXPRESS

//INITIALIZE SERVER IN PORT 3000
const server = app.listen(3000, () => {
	console.log('Server is running in port', 3000)
})

//INITIALIZE WEBSOCKET
const wss = new SocketServer({ server })

wss.on("connection", (ws) => {
	console.log("[Server] A client has connected")

	ws.on("close", () => { console.log("[Server] A client has disconnected") })

	ws.on("message", ( message ) => {
		console.log("[Server] Pairs recieved: %s", message)
		//READ STORED PAIRS
		let storedPairs = fs.readFileSync("./keyValuePairs.json", 'utf-8')
		storedPairs = storedPairs ? JSON.parse(storedPairs) : {}
		
		//CLIENT MESSAGE IS PARSED TO OBJECT TO OBTAIN KEY-VALUE PAIRS
		const parsedMessage = JSON.parse(message)
		const keys = Object.keys(parsedMessage)

		keys.forEach(key => {
			const value = parsedMessage[key]
			storedPairs[key] = value
		})

		//KEY-VALUE PAIRS ARE STORED AS A JSON
		fs.writeFileSync("./keyValuePairs.json", JSON.stringify(storedPairs, null , 2))
		//RESPOND TO CLIENT
		ws.send(message)
	})
})

//FROM /API USE ROUTES FROM "apiRoutes"
app.use('/api', apiRoutes)

//IF ROUTE IS NOT FOUND BEFORE THIS POINT, THROW AN ERROR
app.use((req, res, next) => {
	let err = new Error('Not Found')
	err.status = 404
	next(err)
});

app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.json({
		"error": {
			message: err.message
		}
	});
});
 
