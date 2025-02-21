const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

// GET Route
app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// POST Route
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;

        // Ensure `data` is an array
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format: data must be an array" });
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
        const highest_alphabet = alphabets.length > 0 ? [alphabets.sort().pop()] : [];

        res.json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers,
            alphabets,
            highest_alphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});