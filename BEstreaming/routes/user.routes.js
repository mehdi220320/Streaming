const express=require('express')
const  User=require('../models/user');
const router=express.Router();
const { adminAuthorization,checkTokenExists } = require('../middlewares/authMiddleware');


router.get('/all',[adminAuthorization,checkTokenExists],async (req,res)=>{
    try {
        const  users = await User.find()
        res.send(users)
    }catch (e){
        res.send(e)
    }
})

router.get('/:email',adminAuthorization,async (req,res)=>{
    try {
        const  user = await User.findOne({email:req.params.email})
        if(!user){
            res.status(404).send({message:"user not found"})
        }
        res.send(user)
    }catch (error){
        res.send({error:error})
    }
})
router.put('/update/:id',async (req,res)=>
{
    try {
        await User.findByIdAndUpdate(req.params.id,res.body,{new:true})
        res.status(200).send({message:"user updated successfully"})
    }catch (error){
        res.status(400).send({error:error})
    }
})
router.delete('/delete/:id',async (req,res)=>
{
    try {
        await  User.deleteOne(req.params.id)
        res.status(200).send({message:"user deleted successfully"})
    } catch (error){
        res.status(400).send({error:error})
    }
})
module.exports=router