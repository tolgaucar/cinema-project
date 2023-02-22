const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {type: String, require: true},
    image: {type: String, require:true},
    time: {type:String, require:true},
    description: {type:String, require:true}
});

module.exports = mongoose.model('Movie', MovieSchema);