const mongoose=require('mongoose')

const saisonSchema=new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "movie" },
    episodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "episode" }],
    description:String
},{ timestamps: true });

module.exports=mongoose.model('saison',saisonSchema)