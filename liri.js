require("dotenv").config();

// const keys = require("./keys.js");
let request = require("request");
let moment = require("moment");

// const spotify = new Spotify(keys.spotify);

let args = process.argv;
let queryArray = [];

for (i=3; i < args.length; i++) {
    let toPush = args[i]
    queryArray.push(toPush);
}

let string = queryArray.join(" ");

console.log(args);
console.log(string);

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