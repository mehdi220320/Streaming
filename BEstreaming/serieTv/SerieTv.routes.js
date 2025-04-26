const express=require('express')
const router=express.Router();
const  SerieTvController=require('./SerieTvController');
const SerieTv=require('./SerieTv')
const path = require('path');

const { adminAuthorization,checkTokenExists } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get('/cover/:id', async (req, res) => {
    const serie = await SerieTv.findById(req.params.id);
    if (!serie.coverImage.path) return res.status(404).send("Image not found");

    res.sendFile(path.resolve(serie.coverImage.path));
});
router.post('/add',[adminAuthorization,checkTokenExists,upload.single('coverImage')],SerieTvController.addSerie)
router.post('/addSaison/:id', [adminAuthorization, checkTokenExists,upload.single('coverImage')], SerieTvController.addSaisonToSerieTv);
router.get('/all',checkTokenExists,SerieTvController.getAll)
router.get('/title/:title',checkTokenExists,SerieTvController.getByTitle)
router.get('/id/:id',checkTokenExists,SerieTvController.getById)

module.exports=router