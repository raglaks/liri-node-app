//setting environment using require module and .env file (and dotenv module)
require("dotenv").config();

// const keys = require("./keys.js");

//require request module and moment module for usage in app
let request = require("request");
let moment = require("moment");

// const spotify = new Spotify(keys.spotify);

//var for process.argv array
let args = process.argv;
//empty array to use to build search query string
let queryArray = [];

//for loop to get each word of user input and then push it to the queryArray string
for (i=3; i < args.length; i++) {
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
    console.log("spotify-this-song");
} else if (command === "movie-this") {
    if (string) {
        movieTHis();
    } else {
        console.log("please input a movie name after the command");
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
            console.log("something's wrong");
        }
    });
}

function movieTHis() {

}