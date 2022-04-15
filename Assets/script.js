var gamesArray = []

//global hooks

const gameImageEl = document.querySelector("#gameImage");
const topTwitch = $("#top5");
const infoC = document.querySelector("#gameInfo");
const olEl = $("#games");
const formEl = $("#gameFind")

//global variables for the twitch authorization
const twitchClientId = "ddg5ztvzrbtcgwze0t9jbb6wqn5dj0";
const twitchSecretId = "axxonlvfp1hw6c4omorwefqwjno7o0";
var twitchUrl = "https://api.twitch.tv/helix/";

async function free2GameFetch(platform, category,){
    var url;
    if(!platform && !category){
        url= "https://floating-headland-95050.herokuapp.com/https://www.freetogame.com/api/games";
    }else{
        url = `https://floating-headland-95050.herokuapp.com/https://www.freetogame.com/api/games?platform=${platform}&category=${category}&sort-by=popularity`;
    }

    return fetch(url)
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        return data
    })
}

//put any side effects dealing with the stream information here!!!!!!!
async function getStreamInfo(id) {
    var streamersArr= [];
    var fullEndpoint = `streams?first=3&game_id=${id}`
    var twitchData = await twitchGrab(fullEndpoint);

    for (var i = 0; i < 3; i++) {
        var currSData= []
        currSData.push(twitchData.data[i].user_name);
        currSData.push(twitchData.data[i].type);
        currSData.push(twitchData.data[i].viewer_count);
        streamersArr.push(currSData);
    }
    return streamersArr;
}

//this function makes the access token that is recquired each time we fetch from twitch
function getTwitchAuthorization() {
    let url = `https://id.twitch.tv/oauth2/token?client_id=${twitchClientId}&client_secret=${twitchSecretId}&grant_type=client_credentials`;
    return fetch(url, { method: "POST" })
        .then(function (respond) {
            return respond.json()
        })
        .then(function (data) {
            return data;
        });
}


async function fetchGameId(gameTitle) {
    var fullEndpoint = `games?name=${gameTitle}`
    var twitchData = await twitchGrab(fullEndpoint);
    console.log(twitchData);
    if(twitchData.data.length==0){
        return "Sorry there's no twitch info for this game :(";
    } else {
        var gameId = twitchData.data[0].id;
        return gameId;
    }
}

async function twitchGrab(endpoint) {

    let tokenObject = await getTwitchAuthorization();
    console.log(tokenObject)

    let accesToken = tokenObject.access_token;
    let bearer = tokenObject.token_type;

    console.log(accesToken);
    console.log(bearer)

    bearer = bearer.substring(0, 1).toUpperCase() + bearer.substring(1, bearer.length);

    let authorization = `${bearer} ${accesToken}`

    let headers = {
        authorization, "client-Id": twitchClientId
    };

    twitchEndpoint = twitchUrl + endpoint

    return fetch(twitchEndpoint, { headers })
        .then(function (respond) {
            return respond.json()
        })
        .then(function (data) {
            return data;
        });
}

async function gameInfoGrab(raw ,chosenGame){
    var infoArr= []
    for(i=0;i<raw.length;i++){
        if(raw[i].title==chosenGame){
            infoArr.push(raw[i].platform)
            infoArr.push(raw[i].short_description);
            infoArr.push(raw[i].release_date);
            infoArr.push(raw[i].developer);
            infoArr.push(raw[i].publisher);
            return infoArr;
        }
    }
}

async function clickHandler(gameTitle){
    var gameID= await fetchGameId(gameTitle);
    var gameInfo= await gameInfoGrab(await free2GameFetch() ,gameTitle);
    var streamInfo= await getStreamInfo(gameID);
    toggle();
    generateContent(gameTitle, gameID, gameInfo, streamInfo);
}

formEl.on("submit", function(event){
    event.preventDefault();
    var pSelected = $('#sPlat').find(":selected");
    var gSelected = $('#sGenre').find(":selected");
    var platform = pSelected[0].dataset.platform;
    var genre = gSelected[0].dataset.genre;
    createGameList(platform, genre);
});

//makes list of games using fetch from free2Game
async function createGameList(x, y) {
    gamesArray = [];
    olEl.empty();
    gameFetch = await free2GameFetch(x, y);

    for (i = 0; i < 10; i++) {
        gamesArray.push(gameFetch[i].title)
        var listItem = $("<li>");
        var gameB = $("<button>")
        gameB.addClass("gameBtn");
        gameB.text(gameFetch[i].title);
        olEl.append(listItem);
        listItem.append(gameB);
        gameB.on("click", async function (event) {
            event.preventDefault();
            clickHandler(event.target.innerHTML);
        });
    }
}

//function for assembling all necessary data into page elements (need to add pass variables to assemble carousel)
async function generateContent(gameTitle, gameID, gameInfo, streamInfo){
    console.log(streamInfo);
    var platform= gameInfo[0];
    var des= gameInfo[1];
    var releaseD= gameInfo[2];
    var dev= gameInfo[3];
    var publisher= gameInfo[4];
    
    if(gameID==="Sorry there's no twitch info for this game :("){
        var gamePic = "./Assets/img/istockphoto-1285591330-170667a.jpg";
    } else{
        var gamePic = "https://static-cdn.jtvnw.net/ttv-boxart/" + gameID + "-300x400.jpg";
    }
    
    var infoTemplate=`
    <div class="heading">
        <h3> ${gameTitle}</h3>
    </div>
    <ul class ="ul">
        <li class="info" > ${platform}</li> 
        <li class="info" > ${des}</li>
        <li class="info"> ${releaseD}</li>
        <li class="info"> ${dev}</li>
        <li class="info"> ${publisher}</li>   
    </ul>`;
    
    infoC.innerHTML= infoTemplate;
    gameImageEl.setAttribute("src", gamePic);

    for (var i = 0; i < 3; i++) {
        var userN= streamInfo[i][0];
        var lStatus= streamInfo[i][1];
        var vCount= streamInfo[i][2];
        console.log(userN, lStatus, vCount);

        var streamerTemp= `
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">Username: ${userN}</p>
            </header>
            <div class="card-content">
                <div class="content">
                    <iframe 
                    class="thumbnail"
                    src="https://player.twitch.tv/?channel=${userN}&parent=canro2b.github.io&muted=true"
                    height="200"
                    width="300"
                    allowFullscreen="true"
                    >
                </iframe>
                    <a target="_blank" href="https://www.twitch.tv/${userN}">Click Here to See Stream</a>
                    <p>${lStatus}</p>
                    <p>Viewers: ${vCount}</p>
                </div>
            </div>
        </div>`;
        topTwitch.children().eq(i).html(streamerTemp);
    }
}
  
function toggle(){
    var hidden= document.querySelectorAll(".is-hidden");
    console.log(hidden);
    for(i=0;i<hidden.length;i++){
        var cSec= hidden[i];
        console.log(cSec);
        cSec.classList.remove("is-hidden");
    }
}