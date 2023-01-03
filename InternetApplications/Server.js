//express is used as a framework.
const express = require("express")
const request = require("request")
const app = express()
const port = 8008
// gets the name of the city
app.get("/:city", retrieveFunction)
app.listen(port, () => console.log("server.js - hosted on port " + port))
function Typeofweather(weather) {
 let total = 0;
 for (let i = 0; i < 32; i++) {
 total = total+ weather.list[i].main.temp;
 }
 if (typeof weather.list != "undefined" && total / 32 < 12)
 {
 return "Recommendation: Pack for cold weather ☃"}
 else if (
 typeof weather.list != "undefined" &&
 total / 32 >= 12 &&
 total / 32 <= 24
 )
 return "Recommendation: Pack for mild temperature";
 else if (typeof weather.list != "undefined" && total / 32 > 24)
 return "Recommendation: Pack for warm temperature #";
}
// checks whether user needs to pack umbrella or not
function UmbrellaorNot(weather)
{
 for (let i = 0; i < 32; i++) {
 if (
 typeof weather.list != "undefined" &&
 weather.list[i].weather[0].main === "Rain"
 )
 return "Pack your Umbrella ☔";
 }
 return "No need to pack mbrella";
}
function retrieveFunction(req, res) {
 console.log("Forecast request for place: " + req.params.city)
 let city = req.params.city;
 const response = request("https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=metric&APPID=91cdbdd5993171dd3aedee7a67b69ee4",
function(err, response, body) {
 if (err) {
 console.log("Error occurred: ", err)
 } else {
 let weather = JSON.parse(body)
 weather.checkRain = UmbrellaorNot(weather);
 weather.clothes = Typeofweather(weather);
 weather = JSON.stringify(weather)
 res.header("Access-Control-Allow-Origin", "*");
 res.send(weather);
 }
 })
}