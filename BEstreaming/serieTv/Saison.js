const mongoose=require('mongoose')

const saisonSchema=new mongoose.Schema({
    title:String,
    // movie: { type: mongoose.Schema.Types.ObjectId, ref: "movie" },
    serieTv:{type:mongoose.Schema.Types.ObjectId,ref:"serieTv"},
    episodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "episode" }],
    numberofepisodes:Number,
    description:String
},{ timestamps: true });

module.exports=mongoose.model('saison',saisonSchema)