const imgC= $("#gameImg");
const carouselEl= $("#top5");
const infoC= $("#gameInfo");
const olEl= $("#games");

var gamesArray =[]
//global variables for the twitch authorization
const twitchClientId = "ddg5ztvzrbtcgwze0t9jbb6wqn5dj0";
const twitchSecretId= "axxonlvfp1hw6c4omorwefqwjno7o0";
var twitchUrl = "https://api.twitch.tv/helix/"

//placeholder variables until user input is hooked up
let platformVar = "pc";
let categoryVar = "shooter";

var formEl= $("#gameFind");


function free2GameFetch(platform, category,){
    var url = `https://floating-headland-95050.herokuapp.com/https://www.freetogame.com/api/games?platform=${platform}&category=${category}&sort-by=popularity`

    return fetch(url)
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        //console.log(data)
        return data
    })
}

async function createGameList(x,y){
    gamesArray=[];
    olEl.empty();
    gameFetch = await free2GameFetch(x , y);
  
    for (i = 0; i < 10; i++){
        gamesArray.push(gameFetch[i].title)
        var listItem= $("<li>");
        var gameB= $("<button>")
        gameB.addClass("gameBtn");
        gameB.text(gameFetch[i].title);
        olEl.append(listItem);
        listItem.append(gameB);
    }
    
}

//this function makes the access token that is recquired each time we fetch from twitch
function getTwitchAuthorization(){
    let url = `https://id.twitch.tv/oauth2/token?client_id=${twitchClientId}&client_secret=${twitchSecretId}&grant_type=client_credentials`;
    return fetch(url , {method: "POST"})
    .then(function(respond){
        return respond.json()
    })
    .then(function(data){
        return data;
    });
}


//these variables are to test the twitchGrab function.
var streamEndpoint = "streams?first=5&game_id"
var gameEndpoint = "games?name=Fortnite"

async function twitchGrab(endpoint){
    
    let tokenObject = await getTwitchAuthorization();
    console.log(tokenObject)
    
    let accesToken = tokenObject.access_token;
    let bearer = tokenObject.token_type;

    console.log(accesToken);
    console.log(bearer)
    
    bearer = bearer.substring(0,1).toUpperCase() + bearer.substring(1,bearer.length);

    let authorization = `${bearer} ${accesToken}`

    let headers = {
        authorization, "client-Id": twitchClientId
    };

    twitchEndpoint = twitchUrl + endpoint

    return fetch(twitchEndpoint , {headers})
    .then(function(respond){
        return respond.json()
    })
    .then(function(data){
        return data;
    });
}

async function fetchGameId(){
    var twitchData = await twitchGrab(gameEndpoint)
    console.log(twitchData)
    gameId = twitchData.data[0].id
    console.log(gameId)
}

fetchGameId()

formEl.on("submit", function(event){
    event.preventDefault();
    var pSelected= $('#sPlat').find(":selected");
    var gSelected= $('#sGenre').find(":selected");
    var platform= pSelected[0].dataset.platform;
    var genre= gSelected[0].dataset.genre;
    createGameList(platform, genre);
});


