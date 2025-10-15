const express = require('express');
const mysql = require('mysql2');
const port = process.env.PORT || 3001;

const app = express();

// 👉 Middleware penting agar req.body bisa dibaca (wajib untuk POST/PUT)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Koneksi database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: 'Superhero02', // sesuaikan password kamu
  database: 'mahasiswa',
});

// Cek koneksi
db.connect((err) => {
  if (err) {
    console.log('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('MySQL Connected Successfully');
});

// GET /mahasiswa - ambil semua data
app.get('/mahasiswa', (req, res) => {
  const sql = 'SELECT * FROM biodata';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('DB error on SELECT:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

