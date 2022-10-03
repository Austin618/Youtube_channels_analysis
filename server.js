const path = require('path')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import the mongoose models
const { Tests } = require("./models/test")

// Starting the express server
const app = express();

// MongoDB URI, set up connection
const URI = "mongodb+srv://1281784448yeqiming:ming98xin@assignments.os7jj8s.mongodb.net/test?retryWrites=true&w=majority";

// // Set up MongoDB connection and check whether it is connected
mongoose.connect(URI, {useNewUrlParser:true, useUnifiedTopology:true}).then(
	(result)=>{console.log('connected to db')}
).catch(err=>console.log("not connected"))

// Middleware
// body-parser: middleware for parsing HTTP JSON body into a usable object
app.use(bodyParser.json()) // parsing JSON body
app.use(bodyParser.urlencoded({ extended: true })); // parsing URL-encoded form data (from form POST requests)

app.use(cors())

app.use(express.static(path.join(__dirname, "/client/build")));


app.get('/api/tests', (req, res) => {
    try {
        Tests.find({}, {__v:0}).then((result) => {
            console.log(result)
            res.status(200).json(result)
        }).catch((error) => {
            res.status(500).send(error)
        })
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})


// Others
app.get('*', (req, res) => {
    // console.log("invalid address")
    res.status(404).send("404 Error: We cannot find the page you are looking for.");
    // you could also send back a fancy 404 webpage here.
});


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})


function isMongoError(error) {
    // checks for first error returned by promise rejection
    // if Mongo database suddenly disconnects
    return typeof error === 'object' &&
        error !== null && error.name === "MongoNetworkError"
}

module.exports = app;
