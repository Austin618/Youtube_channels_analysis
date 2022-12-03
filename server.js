const path = require('path')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const apiKey = "AIzaSyDNsbyAt5gnYvEtYnZKPBT8k1p2XMNpFjI";
const baseApiUrl = "https://youtube.googleapis.com/youtube/v3";
// https://youtube.googleapis.com/youtube/v3
// /channels?part=snippet%2CcontentDetails%2Cstatistics
// &id=UC_x5XG1OV2P6uZZ5FSM9Ttw
// &key=AIzaSyBputQWh3CtT1A70zw5WToqBWcARjpyaNQ

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

// https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=AIzaSyBputQWh3CtT1A70zw5WToqBWcARjpyaNQ
// /api/channels/UC_x5XG1OV2P6uZZ5FSM9Ttw
/*
API to get channel info by channelId
*/
app.get("/api/channels/:channel_id", async(req, res) => {
    const channelId = req.params.channel_id;
    const url = `${baseApiUrl}/channels?key=${apiKey}&part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}`
    const response = await axios.get(url);
    // console.log(response)
    // console.log(channelId)
    res.send(response.data.items);
})

/*
API to get playlists info by channelId
*/
// https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw&maxResults=50&key=AIzaSyBputQWh3CtT1A70zw5WToqBWcARjpyaNQ
// /api/playlists/UC_x5XG1OV2P6uZZ5FSM9Ttw
app.get("/api/playlists/:channel_id", async(req, res) => {
    const channelId = req.params.channel_id;
    const url = `${baseApiUrl}/playlists?key=${apiKey}&part=snippet%2CcontentDetails&channelId=${channelId}&maxResults=50`
    const response = await axios.get(url);
    // console.log(response)
    // console.log(channelId)
    res.send(response.data.items);
})

/*
API to get videos info by channelId
*/
// https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw&maxResults=50&key=AIzaSyBputQWh3CtT1A70zw5WToqBWcARjpyaNQ
// https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=htG27DW5ju4%2CrDZ1AjDJjFI%2CogfYd705cRs&key=AIzaSyBputQWh3CtT1A70zw5WToqBWcARjpyaNQ
// /api/videos/UC_x5XG1OV2P6uZZ5FSM9Ttw
app.get("/api/videos/:channel_id", async(req, res) => {
    const channelId = req.params.channel_id;
    const url = `${baseApiUrl}/search?key=${apiKey}&part=snippet&order=viewCount&id=${channelId}&maxResults=50`
    const response = await axios.get(url);
    // res.send(response.data.items);
    // console.log(response.data.items);
    if (response.data.items.length === 0) {
        return res.status(404).send(response.data.items);
    }
    let videoIdUrls = "";
    for (let i = 0; i < response.data.items.length; i++) {
        videoIdUrls = videoIdUrls.concat(response.data.items[i].id.videoId);
        videoIdUrls = videoIdUrls.concat("%2C");
    }
    // console.log(videoIdUrls);
    const url2 = `${baseApiUrl}/videos?key=${apiKey}&part=snippet%2CcontentDetails%2Cstatistics&id=${videoIdUrls.slice(0, -3)}`;
    // console.log(url2);
    const response2 = await axios.get(url2);
    res.send(response2.data.items);
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
