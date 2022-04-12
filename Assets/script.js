
const gamesArray =[]

//placeholder variables until user input is hooked up
let platformVar = "pc";
let categoryVar = "shooter";

var formEl= $("#gameFind");


function free2GameFetch(platform, category,){
    var url = `https://floating-headland-95050.herokuapp.com/https://www.freetogame.com/api/games?platform=${platform}&tags=${category}&sort-by=popularity`

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
gameFetch = await free2GameFetch(x , y);
for (i = 0; i < 10; i++){
    gamesArray.push(gameFetch[i].title)
}
console.log(gamesArray)
}

formEl.on("submit", function(event){
    event.preventDefault();
    var pSelected= $('#sPlat').find(":selected");
    var gSelected= $('#sGenre').find(":selected");
    var platform= pSelected[0].dataset.platform;
    var genre= gSelected[0].dataset.genre;
    createGameList(platform, genre);
});


const gamesArray =[]

//placeholder variables until user input is hooked up
let platformVar = "pc"
let categoryVar = "shooter"


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

async function createGameList(){
gameFetch = await free2GameFetch(platformVar , categoryVar)
for (i = 0; i < 10; i++){
    gamesArray.push(gameFetch[i].title)
}
console.log(gamesArray)
}

createGameList();
