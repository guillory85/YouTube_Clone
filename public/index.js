const API_key = 'AIzaSyA6VoAruuA8T3mXQTVlmQ2qP6zzwCMO1ss';
const CLIENT_ID = '442978217327-fdsftgtrgfu219s8n8rdkscqnbokj9r3.apps.googleusercontent.com';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/youtube.force-ssl';

const signIn = document.querySelector('#signIn');
const signOut = document.querySelector('#signOut');

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }

function initClient() {
    gapi.client.init({
        'apiKey': API_key,
        'clientId': CLIENT_ID,
        'scope': SCOPES,
        'discoveryDocs': DISCOVERY_DOCS
    }).then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        signIn.onclick = handleInClick;
        signOut.onclick = handleOutClick;
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        isAuthorized = true;
        signIn.style.display = "none";
        signOut.style.display = "block";
        makeApiCall();
    } else {
        isAuthorized = false;
        signIn.style.display = "block";
        signOut.style.display = "none";
    }
}

function handleInClick() {
    gapi.auth2.getAuthInstance().signIn();
    console.log("You are signed in!");
}

function handleOutClick() {
    gapi.auth2.getAuthInstance().signOut();
    reset();
    console.log("You have signed out!");
}

function makeApiCall() {
    gapi.client.request({
        'method': 'get',
        'path': '/youtube/v3/videos',
        'params': {
            'part': 'snippet,contentDetails,id,player',
            'chart': 'mostPopular',
            'maxResults': 48
        }
    }).then(async function(resp) {

        try {
            let item = await resp.result.items;

            item.forEach(items => {
                let player = items.player;
                let embedHtml = player.embedHtml;
                let snippet = items.snippet;
                let thumbnails = snippet.thumbnails;
                let image = thumbnails.medium;
                let url = image.url;
                let title = snippet.title;
                let channelTitle = snippet.channelTitle;
                let divTag = document.createElement('div');
                divTag.setAttribute('class', 'imgStyle');
                let imgTag = document.createElement('img');
                let hTag = document.createElement('h3');
                let aTag = document.createElement('a');
                let tiltText = document.createTextNode(title);
                let channelTitleText = document.createTextNode(channelTitle);
                Object.assign(imgTag, {
                    src: url,
                    alt: title
                });
                hTag.appendChild(tiltText);
                aTag.appendChild(channelTitleText);
                divTag.appendChild(imgTag);
                divTag.appendChild(hTag);
                divTag.appendChild(aTag);
                document.querySelector('#output').appendChild(divTag);
                divTag.addEventListener('click', () => {
                    document.querySelector('#videoOutput').innerHTML = embedHtml;
                    document.querySelector('#output').style.display = 'none';
                })
            });
        } catch (error) {
            let err = error.message;
            console.log(err);
        }      
        console.log(resp);
    });
  }

function reset() {
    document.querySelector('#output').style.display = "none";
    document.querySelector('#videoOutput').style.display = "none";
}