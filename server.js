const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");  // If calling Python ML model

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Route for homepage
app.get("/", (req, res) => {
    res.send("Crop Prediction API is running!");
});

// Route to handle predictions
app.post("/predict", async (req, res) => {
    try {
        const { nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall } = req.body;

        // OPTION 1: If using Python ML model, send data to Python API
        const response = await axios.post("http://127.0.0.1:5001/predict", {
            nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall
        });

        res.json({ prediction: response.data.prediction });

        // OPTION 2: If using TensorFlow.js, run the ML model directly in JavaScript here
    } catch (error) {
        res.status(500).json({ error: "Prediction failed" });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
