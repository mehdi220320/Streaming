const express = require('express')
const MovieController = require('./MovieController');
const router = express.Router();

const { adminAuthorization, checkTokenExists } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');


router.post('/add', [adminAuthorization, checkTokenExists, upload.single('coverImage')], MovieController.addMovie)
router.delete('/delete/:id', [adminAuthorization, checkTokenExists], MovieController.deleteMovie);
router.put('/update/:id', [adminAuthorization, checkTokenExists], MovieController.updateMovieById);
router.get('/all', checkTokenExists, MovieController.getAll)
router.get('/title/:title', checkTokenExists, MovieController.getMovieByTitle)
router.get('/id/:id', checkTokenExists, MovieController.getMovieById)

module.exports = router