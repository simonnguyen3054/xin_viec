DROP DATABASE IF EXISTS xin_viec_db;
CREATE DATABASE xin_viec_db;

USE xin_viec_db;

CREATE TABLE jobs (
	id INT NOT NULL AUTO_INCREMENT,
	job_name VARCHAR(100) NOT NULL,
  job_avatar VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE posts(
	id INT NOT NULL AUTO_INCREMENT,
  job_id INT NOT NULL,
	username VARCHAR(255) NOT NULL,
	phone_number TEXT NOT NULL,
  post_content TEXT NOT NULL,
  job_location TEXT NULL,
  experience TEXT NULL,
  salary TEXT NULL,
	post_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  job_search BOOLEAN NOT NULL DEFAULT TRUE,
	PRIMARY KEY (id),
  FOREIGN KEY (job_id) REFERENCES jobs(id)
);

-- job_search stands for post that's posted by the ones who looking for a job to work. It is default to true.

