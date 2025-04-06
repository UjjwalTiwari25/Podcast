const multer = require('multer');

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cd(null, `${Date.now()}-${file.originalname}`);
  },
})

//initializing multer
const upload = multer({
    storage:storage,
}).fields([
    { name: 'frontImage', maxCount: 1 },
    { name: 'audioFile', maxCount: 1 }
]);

module.exports = upload;