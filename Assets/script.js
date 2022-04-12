// let clinetId = "CLIENT_ID_HERE";
// let clinetSecret = "CLINET_SECRET_HERE";

// function getTwitchAuthorization() {
//     let url = `https://id.twitch.tv/oauth2/token?client_id=${clinetId}&client_secret=${clinetSecret}&grant_type=client_credentials`;

//     fetch(url, {
//     method: "POST",
//     })
//     .then((res) => res.json())
//     .then((data) => handleAuthorization(data));
// }

// function handleAuthorization(data) {
//     let { access_token, expires_in, token_type } = data;
//     document.write(`${token_type} ${access_token}`);
// }
//getTwitchAuthorization();