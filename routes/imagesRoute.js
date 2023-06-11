const router = require('express').Router();
const multer  = require('multer');
const cloudniaryConfig = require('../config/cloudinaryConfig');
const authMiddleware = require('../middlewares/authMiddlewares');
// Multer configuration
const storage = multer.diskStorage({
  
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

router.post('/upload-image',authMiddleware, multer({storage}).single('image'), async(req, res)=>{
    try {
        const response = await cloudniaryConfig.uploader.upload(req.file.path,{
            folder:  'skg-movie-world',
        });
        const imageUrl = response.secure_url;
        res.status(200).json({message: 'Image uploaded successfully', data: imageUrl});
    } catch (error) {
        res.status(500).json({message: error.message, success: false})
    }
})

module.exports = router;