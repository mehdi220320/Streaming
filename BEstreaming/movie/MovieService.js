const Movie=require('./Movie')
const fs = require('fs');

class MovieService{
    static async addMovie(movieData){
        try {
            const movie = new Movie(movieData);
            return await movie.save();
        }catch(e){
            console.error('error in addMovie :'+e.message)
            throw  e;
        }
    }
    static async getAllMovies(){
        try {
            const movies = await Movie.find()
            return movies;
        }catch (e){console.error('can t get movies :'+e.message);throw e;}
    }
    static async getMovieById(id){
        try {
            const movieData= await Movie.findById(id);

            const buffer = Buffer.from(movieData.coverImage.data);
            fs.writeFile('output.jpg', buffer, (err) => {
                if (err) throw err;
                console.log('Image saved as output.jpg',movieData.coverImage.data);
            });
            return movieData;
        }catch (e)
        {
            console.error('Movie not found :'+e.message)
        }
    }
    static async getMovieByTitle(title){
        try {
           return await Movie.findOne({title:title});
        }catch (e)
        {
            console.error('Movie not found :'+e.message)
        }
    }
    static async removeMovieById(id){
        try {
            return await Movie.findByIdAndDelete(id);
        }catch (e){
            console.error('Movie not found'+e.message)
        }
    }
    static async updateMovieById(id,MovieData){
        try {
            return  await Movie.findByIdAndUpdate(id, MovieData, {new: true});
        }catch (e){
            console.error('Movie not found'+e.message)
        }
    }
}
module.exports=MovieService;