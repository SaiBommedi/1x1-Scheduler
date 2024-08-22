const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mock_interview_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Routes

// Get all users
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Schedule a new interview
app.post('/api/interviews', (req, res) => {
  const { student_id, mentor_id, scheduled_at } = req.body;
  const sql = 'INSERT INTO interviews (student_id, mentor_id, scheduled_at) VALUES (?, ?, ?)';
  db.query(sql, [student_id, mentor_id, scheduled_at], (err, result) => {
    if (err) throw err;
    res.send({ id: result.insertId });
  });
});

// Get interviews for a student
app.get('/api/interviews/student/:id', (req, res) => {
  const sql = 'SELECT * FROM interviews WHERE student_id = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
