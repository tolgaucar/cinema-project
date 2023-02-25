const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    namesurname: {type: String, required: true},
    phone: {type: String, required: true},
    message: {type: String, required: true}
});

module.exports = mongoose.model('Contact', ContactSchema);