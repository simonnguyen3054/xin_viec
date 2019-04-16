// require and configure dotenv at the top of the app
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const path = require("path");
// Express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//support parsing of application/json type post data
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  app.use(express.static("client/build"));
} else app.use(express.static("public"));

//allow the api to be accessed by other apps
//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Cache-Control"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

//routers go here
const feedRoute = require("./routes/feed.js");
app.use("/", feedRoute);

//important! must be placed after routes
//Use for react routers
if (process.env.NODE_ENV === "production") {
  // catch all routes
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


//Heroku tells us which port our app to use. For production, we use Heroku port. For development, we use 3001
app.listen(PORT, function() {
  console.log("Backend server is listening on 3001");
});
