var info

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
async function testing(){
info = await free2GameFetch("pc" , "shooter")
console.log(info)
}

testing()