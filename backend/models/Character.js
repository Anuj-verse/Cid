const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    poses: [String], // Array of image URLs
    image: String,
    dialogues: [String]
});

module.exports = mongoose.model('Character', characterSchema);
