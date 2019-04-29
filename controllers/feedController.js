const database = require("../model/dbconnection");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const fs = require('fs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

exports.feed_get = (req, res) => {

  let feed_query =
    "SELECT posts.id AS post_id, job_id, username, phone_number, post_content, job_location, experience, salary, post_date, job_name, job_avatar, job_search FROM posts LEFT JOIN jobs ON jobs.id = posts.job_id ORDER BY post_date DESC";

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
  const {fullName, job_id, phone_number, post_content, job_location, experience, salary, job_search} = req.body;

  let create_post = "INSERT INTO posts SET ?";
  let data = {
    username: fullName,
    job_id,
    phone_number,
    post_content,
    job_location,
    experience,
    salary,
    job_search
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

      // const filePath = path.resolve(__dirname, "../client", 'public', 'index.html')
      // console.log("file path", filePath);

      // read in the index.html file
      // fs.readFile(filePath, 'utf8', function (err,data) {
      //   if (err) {
      //     return console.log(err);
      //   }

      //   // replace the special strings with server generated strings
      //   data = data.replace(/\$OG_TITLE/g, results[0].username);
      //   data = data.replace(/\$OG_URL/g, `${process.env.FRONTEND_URL}/posts/${req.params.id}`);
      //   data = data.replace(/\$OG_DESCRIPTION/g, results[0].post_content);
      //   data = data.replace(/\$OG_IMAGE/g, results[0].job_avatar);
      //   console.log("replaced data", data);
      //   res.json(results);
      // });

    })
    .catch(err => {
      res.json(err);
      console.log(err);
    });
};