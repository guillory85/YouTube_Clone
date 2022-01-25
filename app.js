const express = require("express");

const app = express();

app.use(express.static('src'));

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/index.html');
})

app.get('/video', (req, res)=> {
    res.sendFile(__dirname + '/html/video.html');
})

app.listen(3000, ()=> {
    console.log("App is running on port 3000. Go drink a beer!");
});