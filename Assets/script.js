
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