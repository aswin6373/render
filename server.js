const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend requests

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database.");
    }
});

// Route: Insert user
app.post("/api/users", (req, res) => {
    const { name, email, password } = req.body;
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(query, [name, email, password], (err, result) => {
        if (err) {
            res.status(500).json({ status: "error", message: "Error inserting data" });
        } else {
            res.json({ status: "success", message: "User added" });
        }
    });
});

// Route: Get users
app.get("/api/users", (req, res) => {
    db.query("SELECT id, name, email FROM users", (err, results) => {
        if (err) {
            res.status(500).json({ status: "error", message: "Error fetching data" });
        } else {
            res.json({ status: "success", users: results });
        }
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
