const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    image: {type: String, required:true},
    time: {type:String, required:true},
    description: {type:String, required:true}
});

module.exports = mongoose.model('Movie', MovieSchema);