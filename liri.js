//setting environment using require module and .env file (and dotenv module)
require("dotenv").config();

//require request module and moment module for usage in app
const request = require("request");
const moment = require("moment");
const spotify = require('node-spotify-api');
const keys = require("./keys");
const fs = require("fs");


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
        console.log("\nplease input a band name after the command\n");
    }

} else if (command === "spotify-this-song") {

    if (string) {
        spotifyThis();
    } else {
        spotifyDefault();
    }

} else if (command === "movie-this") {

    if (string) {
        movieTHis();
    } else {
        console.log(`\nIf you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/\nit's on Netflix also\n`);
    }

} else if (command === "do-what-it-says") {

    doAsSaid();

} else {

    console.log("please input one of the available commands:\nconcert-this\nspotify-this-song\nmovie-this\ndo-what-it-says");

}

function concertThis() {

    request(`https://rest.bandsintown.com/artists/${string}/events?app_id=codingbootcamp`, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let stringObj = JSON.parse(body);

            

                stringObj.forEach(element => {

                    let name = element.lineup[0];
                    let venue = element.venue.name;
                    let city = element.venue.city;
                    let date = element.datetime;
                    let format = moment(date).format("DD/MM/YYYY");
    
                    console.log(`\n${name} are playing a show in ${city}, at ${venue}, on ${format}.\n`);
                });

        } else {
            console.log(error);
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

            console.log(`\nTitle: ${title}\n\nYear: ${year}\n\nIMDB Rating: ${imdb}\n\nRotten Tomatoes Rating: ${rottent}\n\nCountry: ${country}\n\nLanguage: ${language}\n\nPlot: ${plot}\n\nActors: ${actors}\n`);

        } else {
            console.log("something's wrong, try again");
        }
    })

}

function spotifyThis() {

    let getKeys = new spotify(keys.spotify);

    getKeys.search({ type: 'track', query: `${string}`, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        let artist = data.tracks.items[0].artists[0].name;

        let song = data.tracks.items[0].name;

        let link = data.tracks.items[0].external_urls.spotify;

        let album = data.tracks.items[0].album.name;


        console.log(`\nArtist: ${artist}\n\nSong Name: ${song}\n\nLink to Spotify: ${link}\n\nAlbum name: ${album}\n`);
    });

}

function spotifyDefault() {
    
    let getKeys = new spotify(keys.spotify);

    getKeys.search({ type: 'track', query: 'the sign', limit: 10 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }


        let artist = data.tracks.items[7].artists[0].name;

        let song = data.tracks.items[7].name;

        let link = data.tracks.items[7].external_urls.spotify;

        let album = data.tracks.items[7].album.name;


        console.log(`\nArtist: ${artist}\n\nSong Name: ${song}\n\nLink to Spotify: ${link}\n\nAlbum name: ${album}\n`);

    });
}

function doAsSaid() {

    const concert = "concert-this";
    const movie = "movie-this";
    const spotify = "spotify-this-song";
    
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }
      
        console.log(data);

        if (data.includes(spotify)) {

            let input = data.replace(spotify, " ");
            let input1 = input.replace(",", " ");
            let input2 = input1.replace('"', ' ');
            let input3 = input2.replace('"', " ");
            let string = input3.trim();

            console.log(string);

            spotifyThis(string);

        } else if (data.includes(movie)) {

            console.log("check for movies--success");

        } else if (data.includes(concert)) {

            console.log("check for concerts--success");

        }
      
      });

}