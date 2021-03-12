//FILE SYSTEM
const fs = require('fs')

//SEARCH KEY IN STORED JSON THEN RETURN KEY-VALUE
function getKeyValuePair(req, res) {
    const storedPairs = JSON.parse(fs.readFileSync("./keyValuePairs.json", 'utf-8'))
	const key = req.params.key
    const value = storedPairs[key]

    if(value) res.json({[key]: value})
    else res.json({ error: "Key not found." });
}

module.exports = getKeyValuePair
