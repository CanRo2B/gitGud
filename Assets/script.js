    //game picture 
    gamePic = "https://static-cdn.jtvnw.net/ttv-boxart/" + gameId + "-300x400.jpg";
    console.log(gamePic);
    gameImageEl.src = gamePic; //gameImageEl = document.getElementId("gameImage") 

    // for loop to pull Streamer Data 
    for (var i = 0; i < 5; i++) {
        var userName = document.createElement('h3'); //Element creation subject to change
        var liveStatus = document.createElement('p'); //Element creation subject to change
        var viewercount = document.createElement('p'); //Element creation subject to change
        var link = document.createElement('a'); //Element creation subject to change
        userName.textContent = "Username: " + twitchData.data[i].user_name;
        liveStatus.textContent = twitchData.data[i].type.toUpperCase();
        viewercount.textContent = "Viewers: " + twitchData.data[i].viewer_count;
        link.setAttribute('href', "https://www.twitch.tv/" + twitchData.data[i].user_name);
        link.setAttribute("target", "_blank");
        link.innerHTML = "https://www.twitch.tv/" + twitchData.data[i].user_name
        // thumbnail.frameBorder = 0;
        // thumbnail.allowFullscreen = "true";
        // // thumbnail.scrolling = "no";
        // thumbnail.style.height = 300;
        // thumbnail.style.width = 400;
        topTwitch.append(userName); // topTwitch will change via HTML id
        topTwitch.append(liveStatus);
        topTwitch.append(viewercount);
        topTwitch.append(link);
      }