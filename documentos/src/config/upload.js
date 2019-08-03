const multer = require('multer');
const path = require('path');

module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'tmp/uploads'),
        filename: function (req, file, callback) {
            callback(null, file.originalname);
        },
    })
};