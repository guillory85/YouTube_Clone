require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const {google} = require("googleapis");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.listen(3000, function() {
    console.log("Server started on port 3000.");
});