//authorization keys needed to create the actual access token
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

testing()
async function testing(){
var gameArray = twitchGrab(gameEndpoint)
gameId = await gameArray[0].id;
console.log(gameId)
};

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

    fetch(twitchEndpoint , {headers})
    .then(function(respond){
        return respond.json()
    })
    .then(function(data){
        console.log(data);
    });
}

