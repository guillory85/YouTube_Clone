export function makeApiCall() {
    gapi.client.request({
        'method': 'get',
        'path': '/youtube/v3/videos',
        'params': {
            'part': 'snippet,contentDetails,id,player',
            'chart': 'mostPopular',
            'maxResults': 48
        }
    }).then((res) => {

        try {
            let item = res.result.items;

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
                });
            });
        } catch (error) {
            let err = error.message;
            console.log(err);
        }      
    });
  }