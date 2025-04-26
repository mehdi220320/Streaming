const mongoose=require('mongoose')

const serieTvSchema=new mongoose.Schema({
    title:{required:true,unique:true,type:String},
    studio:String,
    releaseDate: Date,
    description:String,
    number_Of_episodes:Number,
    coverImage: {
        path: String,
        contentType: String
    },
    genre:String,
    saisons: [{ type: mongoose.Schema.Types.ObjectId, ref: "saison" }]
},{ timestamps: true });

module.exports=mongoose.model('serieTv',serieTvSchema)