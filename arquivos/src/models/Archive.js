const mongoose = require('mongoose');

const ArchiveSchema = new mongoose.Schema({
    hash: {
        type: String,
        max: 128
    },
    filename: String,
    mimetype: String,
    size: Number,
    file: Buffer,
}, {
        timestamps: true
    });

module.exports = mongoose.model('Archive', ArchiveSchema);