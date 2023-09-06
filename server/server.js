const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    res.json({ "objects" : ["objectOne", "objectTwo", "objectThree"] })
})

app.listen(5000, () => { console.log("Server started on port 5000.") })