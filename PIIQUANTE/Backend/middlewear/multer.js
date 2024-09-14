const multer = require ('multer')
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };

const stockage = multer.diskStorage({
    destination:(req, file, callback) => {
        callback(null, 'images')
    },
    filename:(req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extansion = MIME_TYPES[file.mimetype]
        const newName = name.replace('.' + extansion, '_')
        callback(null, newName + Date.now() + '.' + extansion)
    }
});

module.exports = multer({storage:stockage}).single('image');