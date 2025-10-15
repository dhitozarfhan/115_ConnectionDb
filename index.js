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

// POST /mahasiswa - tambah data baru
app.post('/mahasiswa', (req, res) => {
  console.log('Body yang diterima:', req.body);

  const { nama, alamat, agama } = req.body;

  if (!nama || !alamat || !agama) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  const sql = 'INSERT INTO biodata (nama, alamat, agama) VALUES (?, ?, ?)';
  db.query(sql, [nama, alamat, agama], (err, result) => {
    if (err) {
      console.error('Gagal menambahkan data:', err);
      return res.status(500).json({ message: 'Gagal menambahkan data', error: err });
    }

    res.json({
      message: 'Data berhasil ditambahkan',
      insertedId: result.insertId,
    });
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
