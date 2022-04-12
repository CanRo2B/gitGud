const gamesArray =[]

//placeholder variables until user input is hooked up
let platformVar = "pc"
let categoryVar = "shooter"

categoryOptions= ["shooter.first-person" , "shooter.battle-royale" , "open-world" , "mmorpg" , "mmofps" , "fighting" , "strategy" , "tower-defense"]

function free2GameFetch(platform, category,){
    var url = `https://floating-headland-95050.herokuapp.com/https://www.freetogame.com/api/games?platform=${platform}&tag=${category}&sort-by=popularity`

    return fetch(url)
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        //console.log(data)
        return data
    })
}

// function chooseGenre(event){
//     var genre = event.${"event"}
// }

async function createGameList(){
gameFetch = await free2GameFetch(platformVar , categoryVar)
for (i = 0; i < 10; i++){
    gamesArray.push(gameFetch[i].title)
}
console.log(gamesArray)
}

createGameList();

//var language = event.target.getAttribute('data-language');


const twitchClientId = "ddg5ztvzrbtcgwze0t9jbb6wqn5dj0";
const twitchSecretId= "axxonlvfp1hw6c4omorwefqwjno7o0";
var twitchUrl = "https://api.twitch.tv/helix/"


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