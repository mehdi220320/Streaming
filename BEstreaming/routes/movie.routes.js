const express=require('express')
const  Movie=require('../models/movie');
const router=express.Router();
const { adminAuthorization,checkTokenExists } = require('../middlewares/authMiddleware');


router.get('/all',checkTokenExists,async (req,res)=>{
    try {
        const  movies = await Movie.find()
        res.send(movies)
    }catch (e){
        res.send(e)
    }
})

router.get('/:title',checkTokenExists,async (req,res)=>{
    try {
        const  movie = await Movie.findOne({title:req.params.title})
        if(!movie){
            res.status(404).send({message:"movie not found"})
        }
        res.send(movie)
    }catch (error){
        res.send({error:error})
    }
})
router.put('/update/:id', [adminAuthorization, checkTokenExists], async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body, // Changed from res.body to req.body
            {new: true}
        );
        if (!updatedMovie) {
            return res.status(404).send({message: "Movie not found"});
        }
        res.status(200).send({message: "Movie updated successfully", movie: updatedMovie});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});
router.delete('/delete/:id', [adminAuthorization, checkTokenExists], async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) {
            return res.status(404).send({message: "Movie not found"});
        }
        res.status(200).send({message: "Movie deleted successfully"});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});
router.post('/add',[adminAuthorization,checkTokenExists],async (req,res)=>{
    try {
        const { title, studio, description } = req.body;
        const movie = new Movie({ title, studio, description });
        await movie.save();
        res.status(200).send({message:"Movie added successfully",movie})

    }catch (error){
        res.status(400).send({error:error})
    }
})
module.exports=router