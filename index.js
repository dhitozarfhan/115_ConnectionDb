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


