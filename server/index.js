const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const connection = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  user: "sql6689510",
  password: "GbzXHblbJ2",
  database: "sql6689510",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as id " + connection.threadId);
});

const app = express();
app.use(cors()); // Enable CORS for all routes

// Middleware to parse JSON request bodies
app.use(express.json());

app.get("/products", (req, res) => {
  connection.query("SELECT * FROM products", (error, results, fields) => {
    if (error) {
      console.error("Error querying database: " + error.stack);
      return res.status(500).json({ error: "Changed db" });
    }
    res.json(results);
  });
});

app.listen(process.env.API_PORT, () => {
  console.log("Server running");
});
