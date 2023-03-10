const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema({
    title: {type: String, required: true},
    homepageTitle: {type: String, required: true},
    homepageDescription: {type: String, required: true},
    announcement: {type: String, required: true},
    about:{type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    iframesrc: {type: String, required: true},
    fb: {type: String, required: true},
    ig: {type: String, required: true},
    tw: {type: String, required: true},
});

module.exports = mongoose.model('Config', ConfigSchema);


