CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  role ENUM('student', 'mentor'),
  password VARCHAR(255)
);

CREATE TABLE interviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  mentor_id INT,
  scheduled_at DATETIME,
  feedback TEXT,
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (mentor_id) REFERENCES users(id)
);
