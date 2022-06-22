const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/assignments/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '_') + 'num' + Math.floor(Math.random() * 1000) + '-' + file.originalname)
  }
});

var upload = multer({ storage: storage }).single('file');

module.exports = upload;
