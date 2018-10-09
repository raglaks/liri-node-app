require("dotenv").config();

const keys = require("./keys.js");
let request = require("request");
let moment = require("moment");

// const spotify = new Spotify(keys.spotify);

let command = process.argv[2];
let input = process.argv[3];

if (command === "concert-this") {
    if (input) {
        concertThis();
    } else {
        console.log("please input a band name after the command");
    }
} else if (command === "spotify-this-song") {
    console.log("spotify-this-song");
} else if (command === "movie-this") {
    console.log("movie-this");
} else if (command === "do-what-it-says") {
    console.log("do-what-it-says");
} else {
    console.log("please input one of the available commands:\nconcert-this\nspotify-this-song\nmovie-this\ndo-what-it-says");
}

function concertThis() {
    console.log(input);

    request(`https://rest.bandsintown.com/artists/${input}/events?app_id=codingbootcamp`, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let stringObj = JSON.parse(body);

            stringObj.forEach(element => {
                
                let venue = element.venue.name;
                let city = element.venue.city;
                let date = element.datetime;
                let format = moment(date).format("DD/MM/YYYY");

                console.log(`${input} is playing a show in ${city}, at the ${venue}, on ${format}.`);
            });

        } else {
            console.log("something's wrong");
        }
    });
}