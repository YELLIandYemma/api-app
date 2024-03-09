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
      return res
        .status(500)
        .json({ error: "An error occurred while fetching products" });
    }
    res.json(results);
  });
});
app.post("/api/orders", (req, res) => {
  const { product_id, user_id, quantity, total_price } = req.body;

  const sql = `INSERT INTO orders (product_id, user_id, quantity, total_price) 
               VALUES (?, ?, ?, ?)`;
  const values = [product_id, user_id, quantity, total_price];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding order:", err);
      res.status(500).json({ error: "Error adding order" });
      return;
    }
    console.log("Order added successfully");
    res.status(200).json({ message: "Order added successfully" });
  });
});

const port = process.env.PORT || 5000; // Default port 3000 if not specified in environment variables
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
