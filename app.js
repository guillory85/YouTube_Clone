require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const {google} = require("googleapis");

const app = express();

const oauth2Client = new google.auth.OAuth2(
    '442978217327-fdsftgtrgfu219s8n8rdkscqnbokj9r3.apps.googleusercontent.com',
    'Cn1rNn63oEODrTSHD5T2zpJh',
    'http://localhost:3000/oauth2callback'
);

const scopes = [
    'https://www.googleapis.com/auth/youtube.force-ssl'
];

const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
});

// const {tokens} = oauth2Client.getToken(code)
// oauth2Client.setCredentials(tokens);

// oauth2Client.on('token', (tokens) => {
//     if (tokens.refresh_token) {
//         console.log(tokens.refresh_token);
//     }
//     console.log(tokens.access_token);
// });

// oauth2Client.setCredentials({
//     refresh_token: `STORED_REFRESH_TOKEN`
// });



async function main() {
    const params = {
        'part': 'snippet,contentDetails,id,player',
        'chart': 'mostPopular',
        'maxResults': 6
    };

    const youTube = google.youtube({
        version: 'v3',
        auth: 'AIzaSyA6VoAruuA8T3mXQTVlmQ2qP6zzwCMO1ss'
    });

    youTube.videos.list(params).then(async function(res){
       
    })
};


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {
    let test = test;
    res.sendFile(__dirname + '/index.html', {name:test});
    let apiCall = main().then(async function(resp){
        let item = resp;
        return item;
    });
    
    console.log(apiCall);
});

app.post('/', function(req, res) {
// here is where we callback main function and try to post to html
let apiCall = main().then(async function(resp){
    let item = resp;
    return item;
});

console.log(apiCall);
res.send('Test');
});

app.listen(3000, function() {
    console.log("Server started on port 3000.");
});