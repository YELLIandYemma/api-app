const express = require("express");
const mysql = require("mysql2"); // Use mysql2 instead of mysql
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as id " + connection.threadId);
});

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

app.get("/products", (req, res) => {
  connection.query("SELECT * FROM products", (error, results, fields) => {
    if (error) {
      console.error("Error querying database: " + error.stack);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

app.listen(process.env.API_PORT, () => {
  console.log("Server running");
});
