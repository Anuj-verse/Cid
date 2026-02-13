const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
    character: String,
    imageUrl: String,
    topText: String,
    bottomText: String,
    likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Meme', memeSchema);
