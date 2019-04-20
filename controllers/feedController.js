const database = require("../model/dbconnection");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

exports.feed_get = (req, res) => {

  let feed_query =
    "SELECT * FROM posts LEFT JOIN jobs ON jobs.id = posts.job_id ORDER BY post_date DESC";

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

  console.log(req.body);
  const {fullName, job_id, phone_number, post_content, job_location, experience, salary} = req.body;

  let create_post = "INSERT INTO posts SET ?";
  let data = {
    username: fullName,
    job_id,
    phone_number,
    post_content,
    job_location,
    experience,
    salary
  }

  database
    .query(create_post, data)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      res.json(err);
      console.log(err);
    });
};

exports.post_get = (req, res) => {

  let post_query =
    "SELECT * FROM posts LEFT JOIN jobs ON jobs.id = posts.job_id WHERE posts.id = ?";

  database
    .query(post_query, [req.params.id])
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      res.json(err);
      console.log(err);
    });
};