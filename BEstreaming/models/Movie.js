const mongoose=require('mongoose')

const movieSchema=new mongoose.Schema({
    title:{required:true,unique:true,type:String},
    studio:String,
    description:String,
    saisons: [{ type: mongoose.Schema.Types.ObjectId, ref: "saison" }]
},{ timestamps: true });

module.exports=mongoose.model('movie',movieSchema)