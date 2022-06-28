const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded({extended: true}));
app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/" ,function(req,res){
  //live data url
  const query = req.body.cityName;
  const apikey = "1b9978eda328e93702b6c1f8620a13ca"
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apikey;
  // Using https to get the data from the api website
  https.get(url, function(response){
    // when we get the data callback funtion inside response.on will execute.
   response.on("data", function(data){
     //Converting data into JSON
    const weatherData = JSON.parse(data);
    //Accessing property of object
    const temp = weatherData.main.temp
    const icon = weatherData.weather[0].icon
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    const weatherDescription = weatherData.weather[0].description;
    res.write("<h1>The Weather Currently is " + weatherDescription + "</h1>");
    res.write("<h2>The Temperature in "+query+" is " + temp + " in Degree Celcuis</h2>");
    res.write("<img src="+imageURL+">");
      res.send();
  });
  });
});
app.listen(3000, function(){
  console.log("Started at 3000");
});
