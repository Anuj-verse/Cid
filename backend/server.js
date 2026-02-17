const express = require("express");
const cors = require("cors");

const acpDialogs = require("./ACP_Pradyuman");
const abhijeetDialogues = require("./abhijeet");

require('dotenv').config();
const mongoose = require('mongoose');
const Character = require('./models/Character');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.get("/api", (req, res) => {
    res.send("Welcome to CID Meme API!");
});

// Get all characters
app.get("/api/characters", async (req, res) => {
    try {
        const characters = await Character.find();
        res.json(characters);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const Meme = require('./models/Meme');

// ... (existing code)

// Get random dialogue for a specific character
app.get("/api/character/:name/random", async (req, res) => {
    try {
        const character = await Character.findOne({ name: new RegExp('^' + req.params.name + '$', "i") });
        if (!character) {
            return res.status(404).json({ error: "Character not found" });
        }
        const randomDialogue = character.dialogues[Math.floor(Math.random() * character.dialogues.length)];
        res.json({
            character: character.name,
            dialogue: randomDialogue,
            image: character.image,
            poses: character.poses
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// ... (existing code)

// MEME ROUTES

// Generate AI Caption
app.post("/api/generate-caption", async (req, res) => {
    try {
        const { character, context } = req.body;
        if (!context) {
            return res.status(400).json({ error: "Context is required" });
        }
        const caption = await generateMemeCaption(character, context);
        res.json(caption);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to generate caption. Check server logs or API key." });
    }
});

// Save a new meme
app.post("/api/memes", async (req, res) => {
    // ...
    try {
        const { character, imageUrl, topText, bottomText } = req.body;
        const newMeme = new Meme({ character, imageUrl, topText, bottomText });
        await newMeme.save();
        res.status(201).json(newMeme);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all memes (newest first)
app.get("/api/memes", async (req, res) => {
    try {
        const memes = await Meme.find().sort({ createdAt: -1 });
        res.json(memes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Like a meme
app.post("/api/memes/:id/like", async (req, res) => {
    try {
        const meme = await Meme.findById(req.params.id);
        if (!meme) return res.status(404).json({ error: "Meme not found" });

        meme.likes += 1;
        await meme.save();
        res.json(meme);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});