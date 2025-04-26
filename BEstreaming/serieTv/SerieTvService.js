const SerieTv=require("./SerieTv")
const Saison=require("./Saison")
const fs = require('fs');

class SerieTvService{
    static async getAllSerieTv(){
        try {
            return await SerieTv.find();
        }catch (e){console.error('can t get SerieTv :'+e.message);throw e;}
    }
    static async getSerieById(id){
        try {
                return await SerieTv.findById(id);
        }catch (e){console.error('can t get SerieTv :'+e.message);throw e;}
    }
    static async getSerieByTitle(title){
        try {
            return await SerieTv.findOne({title:title})
        }catch (e){console.error('can t get SerieTv :'+e.message);throw e;}
    }
    static async addSerieTv(SerieData){
        try {

            const serie = new SerieTv(SerieData);
            return await serie.save();
        }catch(e){
            console.error('error in addSerie :'+e.message)
            throw  e;
        }
    }
    static async addSaisonToSerieTv(saisonData,id){
        try {
            const saison=new Saison(saisonData);
            const savedSaison=saison.save();
            return  await SerieTv.findByIdAndUpdate(
                serieId,
                { $push: { saisons: savedSaison._id } },
                { new: true }
            ).populate('saisons');
        }catch (e){ console.error(e.message);throw e;}
    }
}
module.exports=SerieTvService;