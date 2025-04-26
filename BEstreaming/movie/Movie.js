const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { required: true, unique: true, type: String },
    studio: String,
    description: String,
    releaseDate: Date,
    genre: String,
    duration: Number,
    coverImage: {
        path: String,
        contentType: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);