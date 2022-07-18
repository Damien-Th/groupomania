const  multer = require('multer');
const fs = require('fs');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
};

const types = Object.values(MIME_TYPES);

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const userPath = `images/user_${req.body.user_id}`
        if(!fs.existsSync(userPath)) fs.mkdirSync(userPath);
        const imagePath = `images/user_${req.body.user_id}/${req.body.type}`
        if(!fs.existsSync(imagePath)) fs.mkdirSync(imagePath);
        callback(null, imagePath)
    },
    filename: (req, file, callback) => {
        // Remove space and the extension file and then transform everything into lowercase
        const name = file.originalname.split(' ').join('_').replace(/\.[^/.]+$/, "").toLowerCase();
        const extension = MIME_TYPES[file.mimetype];
        const isValid = types.some((type) => type === extension)
        if(isValid) callback(null, Date.now() + name + "." + extension);
    }
});

module.exports = multer ({ storage }).single('image');