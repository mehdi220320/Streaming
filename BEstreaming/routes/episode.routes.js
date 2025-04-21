const express = require('express');
const router = express.Router();
const Saison = require('../models/saison');
const { adminAuthorization, checkTokenExists } = require('../middlewares/authMiddleware');

router.post('/add', [adminAuthorization, checkTokenExists], async (req, res) => {
    try {
        const { movie, description } = req.body;

        if (!movie) {
            return res.status(400).send({ message: "Movie reference is required" });
        }

        const saison = new Saison({ movie, description });
        await saison.save();

        res.status(201).send({
            message: "Season created successfully",
            saison
        });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.get('/all', checkTokenExists, async (req, res) => {
    try {
        const saisons = await Saison.find().populate('movie').populate('episodes');
        res.send(saisons);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/movie/:movieId', checkTokenExists, async (req, res) => {
    try {
        const saisons = await Saison.find({ movie: req.params.movieId })
            .populate('movie')
            .populate('episodes');

        if (!saisons || saisons.length === 0) {
            return res.status(404).send({ message: "No seasons found for this movie" });
        }

        res.send(saisons);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/:id', checkTokenExists, async (req, res) => {
    try {
        const saison = await Saison.findById(req.params.id)
            .populate('movie')
            .populate('episodes');

        if (!saison) {
            return res.status(404).send({ message: "Season not found" });
        }

        res.send(saison);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.put('/update/:id', [adminAuthorization, checkTokenExists], async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['description', 'episodes'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({ error: "Invalid updates!" });
        }

        const saison = await Saison.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('movie').populate('episodes');

        if (!saison) {
            return res.status(404).send({ message: "Season not found" });
        }

        res.send({
            message: "Season updated successfully",
            saison
        });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.delete('/delete/:id', [adminAuthorization, checkTokenExists], async (req, res) => {
    try {
        const saison = await Saison.findByIdAndDelete(req.params.id);

        if (!saison) {
            return res.status(404).send({ message: "Season not found" });
        }

        res.send({
            message: "Season deleted successfully",
            saison
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.post('/:id/add-episode', [adminAuthorization, checkTokenExists], async (req, res) => {
    try {
        const { episodeId } = req.body;

        if (!episodeId) {
            return res.status(400).send({ message: "Episode ID is required" });
        }

        const saison = await Saison.findByIdAndUpdate(
            req.params.id,
            { $push: { episodes: episodeId } },
            { new: true }
        ).populate('episodes');

        if (!saison) {
            return res.status(404).send({ message: "Season not found" });
        }

        res.send({
            message: "Episode added to season successfully",
            saison
        });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.delete('/:id/remove-episode/:episodeId', [adminAuthorization, checkTokenExists], async (req, res) => {
    try {
        const saison = await Saison.findByIdAndUpdate(
            req.params.id,
            { $pull: { episodes: req.params.episodeId } },
            { new: true }
        ).populate('episodes');

        if (!saison) {
            return res.status(404).send({ message: "Season not found" });
        }

        res.send({
            message: "Episode removed from season successfully",
            saison
        });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;