const path = require('path');
const multer=require('multer');

// Set up custom storage configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,path.join(__dirname, '../uploads') ); 
        // path.join(__dirname, 'uploads')
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

 exports.upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Optional: Set file size limit (e.g., 1MB)
}).array('imageUrls', 4);

