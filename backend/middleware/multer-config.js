const  multer = require('multer');

// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpg',
//     'image/png': 'png'
// };

console.log('ok')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        // const extension = MIME_TYPES[file.mimetype];
        callback(null, Date.now() + name);
    }
});

module.exports = multer ({ storage }).single('image');