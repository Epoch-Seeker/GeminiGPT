const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load env variables

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();

app.use(bodyParser.json());
app.use(cors()); // Allow frontend to fetch data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3080; // Fixed variable name

//Fetching model list  
app.get("/models", async (req, res) => {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse response as JSON
        res.json({ models: data.models }); // Send models list
    } catch (error) {
        console.error("Error fetching models:", error);
        res.status(500).json({ error: "Failed to fetch models" });
    }
});

//response handling
app.post("/", async (req, res) => {
    const { message ,currentModel} = req.body;
    // console.log(currentModel, "currentModel")
    const model = genAI.getGenerativeModel({ model: currentModel });
    try {
        
        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [{ text: message }]
                }
            ],
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.5
            }
        });

        const response = result.response.candidates[0].content.parts[0].text;

        res.json({ message: response }); // Fixed variable
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
