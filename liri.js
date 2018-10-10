//setting environment using require module and .env file (and dotenv module)
require("dotenv").config();

//require request module and moment module for usage in app
const request = require("request");
const moment = require("moment");
const spotify = require('node-spotify-api');
const keys = require("./keys");


//var for process.argv array
let args = process.argv;
//empty array to use to build search query string
let queryArray = [];

//for loop to get each word of user input and then push it to the queryArray string
for (i = 3; i < args.length; i++) {
    let toPush = args[i]
    queryArray.push(toPush);
}

//this var 'stringifies' the user's input
let string = queryArray.join(" ");

//this var is for the command
let command = process.argv[2];

if (command === "concert-this") {

    if (string) {
        concertThis();
    } else {
        console.log("please input a band name after the command");
    }

} else if (command === "spotify-this-song") {

    if (string) {
        spotifyThis();
    } else {
        console.log("please input a song name after the command");
    }

} else if (command === "movie-this") {

    if (string) {
        movieTHis();
    } else {
        console.log(`If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/\nit's on Netflix also`);
    }

} else if (command === "do-what-it-says") {

    console.log("do-what-it-says");

} else {

    console.log("please input one of the available commands:\nconcert-this\nspotify-this-song\nmovie-this\ndo-what-it-says");

}

function concertThis() {

    request(`https://rest.bandsintown.com/artists/${string}/events?app_id=codingbootcamp`, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let stringObj = JSON.parse(body);

            stringObj.forEach(element => {

                let venue = element.venue.name;
                let city = element.venue.city;
                let date = element.datetime;
                let format = moment(date).format("DD/MM/YYYY");

                console.log(`${string} are playing a show in ${city}, at ${venue}, on ${format}.`);
            });

        } else {
            console.log("something's wrong, try again");
        }
    });
}

function movieTHis() {
    request(`http://www.omdbapi.com/?t=${string}&y=&plot=short&apikey=trilogy`, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let stringObj = JSON.parse(body);

            let title = stringObj.Title;
            let year = stringObj.Year;
            let imdb = stringObj.Ratings[0].Value;
            let rottent = stringObj.Ratings[1].Value;
            let country = stringObj.Country;
            let language = stringObj.Language;
            let plot = stringObj.Plot;
            let actors = stringObj.Actors;

            console.log(`\nTitle: ${title}\n\nYear: ${year}\n\nIMDB Rating: ${imdb}\n\nRotten Tomatoes Rating: ${rottent}\n\nCountry: ${country}\n\nLanguage: ${language}\n\nPlot: ${plot}\n\nActors: ${actors}`);

        } else {
            console.log("something's wrong, try again");
        }
    })

}

function spotifyThis() {

    let getKeys = new spotify(keys.spotify);

    console.log(getKeys);

    getKeys.search({ type: 'track', query: `${string}`, limit: 3 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //This will show the following information about the song in your terminal/bash window:
        // Artist(s)
        // The song's name
        // A preview link of the song from Spotify
        // The album that the song is from

        //name of artist
        console.log(data.tracks.items[0].artists[0].name);

        //song name
        console.log(data.tracks.items[0].name);

        //album
        console.log(data.tracks.items[0].album.name);

        //preview
        console.log(data.tracks.items[0].external_urls.spotify);
    });

}