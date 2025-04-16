const express = require('express')
const jwt =require('jsonwebtoken')
const User = require('../models/user')
const Token = require('../models/Token');
const { authentication, checkTokenExists} = require('../middlewares/authMiddleware');
const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const {name, email, password,age} = req.body;
        const user = new User({name, email,age, password})
        await user.save();
        res.status(201).send({message: "user saved Successfully ",user});
    } catch (e) {
        res.status(500).send({message:e.message})
    }
});
router.post('/login',async (req,res)=>{
    try {

        const {email,password}=req.body
        const  user=await User.findOne({email:email})
        if(!user){
            res.status(404).send({message:'user not found'})
        }
        const isHavePassword=user.comparePassword(password)
        if(!isHavePassword){
            res.status(400).send({message:'invalid credentiels'})
        }
        const jwtExpiresIn = 60 *60;
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role: user.role
            },
            process.env.SECRET_KEY,
            { expiresIn: jwtExpiresIn }
        );
        const tokenDB = new Token({
            userId: user._id,
            token,
            expiresAt: new Date(Date.now() + jwtExpiresIn * 1000)
        });
        await tokenDB.save();
        res.send({
            message: 'User logged in successfully',
            token,
            expiresIn: jwtExpiresIn
        });
    }catch (e){
        res.status(500).send({message:e.message})
    }
})

module.exports = router;