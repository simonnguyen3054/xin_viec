const database = require("../model/dbconnection");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

exports.feed_get = (req, res) => {

  let feed_query =
    "SELECT * FROM posts LEFT JOIN jobs ON jobs.id = posts.job_id";

  database
    .query(feed_query)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      res.json(err);
      console.log(err);
    });
};

exports.post_create = (req, res) => {

  const {postContent, salary, experience, job_location, fullName, phoneNumber, job_id} = req.body;

  let feed_query =
    "SELECT * FROM posts LEFT JOIN jobs ON jobs.id = posts.job_id";

  database
    .query(feed_query)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      res.json(err);
      console.log(err);
    });
};