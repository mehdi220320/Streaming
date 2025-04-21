const express = require('express');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');
const Token = require('../models/Token');
const router = express.Router();

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateAuthToken = async (user) => {
    const jwtExpiresIn = 60 * 60;
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
    return { token, expiresIn: jwtExpiresIn };
};

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
        const user = new User({ name, email, age, password });
        await user.save();
        res.status(201).send({ message: "User saved successfully", user });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }

        const { token, expiresIn } = await generateAuthToken(user);
        res.send({
            message: 'User logged in successfully',
            token,
            expiresIn,
            role: user.role
        });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
});

router.post('/google-auth', async (req, res) => {
    try {
        const { credential } = req.body;

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                name,
                email,
                password: 'google-auth',
                isGoogleAuth: true
            });
            await user.save();
        }

        const { token, expiresIn } = await generateAuthToken(user);

        res.send({
            message: 'Google authentication successful',
            token,
            expiresIn,
            role: user.role
        });
    } catch (e) {
        console.error('Google auth error:', e);
        res.status(500).send({ message: 'Google authentication failed' });
    }
});

router.get("/tokenExpired/:token",async (req,res)=>{
    try{
        token = await Token.findOne(req.params.token);


    }catch (e){
        res.status(500).send({ message: 'error : ',e });
    }
});
module.exports = router;