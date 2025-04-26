const fs = require('fs');
const path = require('path');
const SerieTvService = require("./SerieTvService");
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

class SerieTvController{
    static async addSerie(req,res){
        try {
            const { title, studio, description, releaseDate, number_Of_episodes, genre } = req.body;
            const coverImage = req.file;
            if (!coverImage) {
                return res.status(400).json({ error: 'Cover image is required' });
            }
            const serieTvData = { title, studio, description, releaseDate, number_Of_episodes, genre,
                coverImage: {
                    path: coverImage.path,
                    contentType: coverImage.mimetype
                }
            };
            const serie = await SerieTvService.addSerieTv(serieTvData,coverImage)
            res.status(201).json({
                message: "Serie added successfully",
                serie
            });
        }catch (e){
            res.status(400).send({ error: error.message });
        }
    }
    static async getAll(req,res){
        try {
            const series=await SerieTvService.getAllSerieTv();
            res.send(series)
        }catch (e){res.status(400).send({ error: error.message });}
    }
    static async getByTitle(req,res){
        try {
            const serie=await SerieTvService.getSerieByTitle(req.params.title);
            res.send(serie)
        }catch (e){res.status(400).send({ error: error.message });}
    }
    static async getById(req,res){
        try {
            const serie=await SerieTvService.getSerieById(req.params.id)
            res.send(serie)
        }catch (e){console.error(e.message)}
    }
    static async addSaisonToSerieTv(req,res){
        try {
            const {title,numberofepisodes,description}=req.body
            const serieUpdated=SerieTvService.addSaisonToSerieTv({title,numberofepisodes,description},req.params.id);
            res.send(serieUpdated)
        }catch (e){res.status(400).send({ error: error.message });
        }
    }
}
module.exports=SerieTvController