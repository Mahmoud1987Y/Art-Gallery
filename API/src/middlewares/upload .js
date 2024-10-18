const multer = require('multer');

// Set up multer to store uploaded files in the public/images directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req)
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    // Save the image with a unique name
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;