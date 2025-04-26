const MovieService = require("./MovieService");
const path = require('path');



class MovieController{
    static async getAll(req,res){
        try {
            const  movies = await MovieService.getAllMovies();
            const moviesWithImageUrls = movies.map(movie => ({
                ...movie.toObject(),
                coverImage: {
                    ...movie.coverImage,
                    path: `http://${req.get('host')}/uploads/${path.basename(movie.coverImage.path)}`
                }
            }));
            res.send(moviesWithImageUrls)
        }catch (e){
            res.send(e)
        }
    }
    static async addMovie(req, res) {
        try {
            const { title, studio, description, releaseDate, genre, duration } = req.body;
            const coverImage = req.file;

            if (!coverImage) {
                return res.status(400).json({ error: 'Cover image is required' });
            }
            const movieData = {title, studio, description, releaseDate, genre, duration,
                coverImage: {
                    path: coverImage.path,
                    contentType: coverImage.mimetype
                }
            };
            const movie = await MovieService.addMovie(movieData);
            res.status(201).json({
                message: "Movie added successfully",
                movie
            });
        } catch (error) {
            console.error('Error adding movie:', error);
            res.status(500).json({
                error: error.message
            });
        }
    }
    static  async getMovieByTitle(req,res){
        try {
            const  movie = await MovieService.getMovieByTitle(req.params.title)
            if(!movie){
                res.status(404).send({message:"movie not found"})
            }
            movie.coverImage.path=`http://${req.get('host')}/uploads/${path.basename(movie.coverImage.path)}`;
            res.send(movie)
        }catch (error){
            res.send({error:error})
        }
    }
    static async getMovieById(req,res){
        try {
            const  movie = await MovieService.getMovieById(req.params.id)
            if(!movie){
                res.status(404).send({message:"movie not found"})
            }
            res.send(movie)
        }catch (error){
            res.send({error:error})
        }
    }
    static async deleteMovie(req,res){
        try {
            const deletedMovie = await MovieService.removeMovieById(req.params.id);
            if (!deletedMovie) {
                return res.status(404).send({message: "Movie not found"});
            }
            res.status(200).send({message: "Movie "+deletedMovie+" deleted successfully"});
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }
    static async updateMovieById(req,res){
        try {
            const updatedMovie=await MovieService.updateMovieById(req.params.id,req.body);
            if (!updatedMovie) {
                return res.status(404).send({message: "Movie not found"});
            }
            res.status(200).send({message: "Movie updated successfully", movie: updatedMovie});
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }
    static async addSaisonToSerieTv(req,res){
        try {
            const { title, studio, description, releaseDate, genre, duration } = req.body;
        }catch (error){
            res.send({error:error})
        }
    }
}
module.exports=MovieController