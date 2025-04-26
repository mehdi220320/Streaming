const mongoose=require('mongoose')

const episodeSchema=new mongoose.Schema({
    Title:String,
    description:String,
    url:String,
    movie:{type:mongoose.Schema.Types.ObjectId,ref:"movie"},
    saison: { type: mongoose.Schema.Types.ObjectId, ref: "saison" },
},{ timestamps: true });

module.exports=mongoose.model('episode',episodeSchema)