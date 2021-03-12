//WEBSOCKET
const ReconnectingWebSocket = require('reconnecting-websocket')
const WebSocket = require("ws")

//KEY-VALUE PAIRS TO SEND (IF THE KEY IS REPEATED, THE LAST VALUE WILL REPLACE ALL THE PREVIOUS ONES)
const pairsToSend = {
    brand: "BMW",
    color: "Red",
    model: "S 1000 RR"
} 

//WS URL AND PORT IS CONFIGURED
let ws_host = "localhost"
let ws_port = "3000"

//RECONNECTING OPTIONS
const options = {
    WebSocket,
    connectionTimeout: 1000,
    maxRetries: 5,
}

//RWS IS INITIALIZED
const rws = new ReconnectingWebSocket("ws://" + ws_host + ":" + ws_port + "/ws", undefined, options)

//EVENT LISTENERS
rws.addEventListener("open", () => {
    console.log("[Client] Connection to the WebSocket server has been opened.")
    try {
        rws.send(JSON.stringify(pairsToSend))
    } catch {
        console.log("[Client] Pairs could not be sent: %s", parsedPair)
    }
})

rws.addEventListener("message", (e) => {
    console.log("[Client] The server has stored or modified the pairs: ", e.data)
    rws.close()
})

rws.addEventListener("close", () => {
    console.log("[Client] Connection closed.")
})

rws.onerror = ( err ) => {
    if(err.error.code == "EHOSTDOWN" || err.error.code == "ECONNREFUSED"){
        console.log("[Client] Error: Server not responding.")
    }
}
