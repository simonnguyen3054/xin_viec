INSERT INTO jobs (job_name, job_avatar)
VALUES ("Làm Nail", "https://s3-us-west-1.amazonaws.com/acceptmycrypto/dealsImages/acceptmycrypto/sample-deal-images/nail_avatar.jpeg");

INSERT INTO jobs (job_name, job_avatar)
VALUES ("Hầu Bàn", "https://s3-us-west-1.amazonaws.com/acceptmycrypto/dealsImages/acceptmycrypto/sample-deal-images/hau_ban.jpeg");

INSERT INTO jobs (job_name, job_avatar)
VALUES ("Phụ Bếp", "https://s3-us-west-1.amazonaws.com/acceptmycrypto/dealsImages/acceptmycrypto/sample-deal-images/cooking.jpeg");


INSERT INTO posts (job_id, username, phone_number, post_content, job_location, experience, salary)
VALUES
(1, "Simon Nguyen", "763-267-9359", "Em là thợ nail có kinh nghiệm 2 năm làm bột và chân tay nước. Vì chổ làm củ không phù hợp nửa, em đang tìm một tiệm mới. Em nói tiếng anh chuẩn, customer service tốt.", "San Mateo", "0-2 năm", "$3000-$5000/tháng");

INSERT INTO posts (job_id, username, phone_number, post_content, job_location, experience, salary, job_search)
VALUES
(1, "Mimi Nguyen", "763-923-9599", "Tiệm em mới mở đang cần thợ biết làm bột và chân tay nước.", "San Mateo", "0-2 năm", "$3000-$5000/tháng", FALSE);