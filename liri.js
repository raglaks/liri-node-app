// require("dotenv").config();

// const keys = require("keys");

// const spotify = new Spotify(keys.spotify);

let command = process.argv[2];

if (command === "concert-this") {
    console.log("concert-this");
} else if (command === "spotify-this-song") {
    console.log("spotify-this-song");
} else if (command === "movie-this") {
    console.log("movie-this");
} else if (command === "do-what-it-says") {
    console.log("do-what-it-says");
} else {
    console.log("please input one of the available commands:\nconcert-this\nspotify-this-song\nmovie-this\ndo-what-it-says");
}