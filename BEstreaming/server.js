const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
const userRoutes = require('./routes/user.routes')
const AuthRoutes = require('./routes/auth.routes')
const MovieRoutes = require('./routes/movie.routes')
const SaisonRoutes = require('./routes/saison.routes')
const EpisodeRoutes = require('./routes/episode.routes')
mongoose.connect(process.env.Mongo_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));
app.use(express.json());
app.use('/users', userRoutes);
app.use('/auth', AuthRoutes)
app.use('/movie', MovieRoutes)
app.use('/saison', SaisonRoutes)
app.use('/episode', EpisodeRoutes)

app.listen(process.env.PORT, () => {
    console.log("Listening on port " + process.env.PORT);
});