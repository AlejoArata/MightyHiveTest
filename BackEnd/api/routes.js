const express = require("express")
const router = express.Router()

// GET KEY-VALUE PAIR FUNCTION
const getKeyValuePair = require('./endpoints/keyValuePair/get')

//ENDPOINT ROUTING
router.get("/keyValuePair/:key", getKeyValuePair)

module.exports = router