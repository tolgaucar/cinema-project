const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true}
});

module.exports = mongoose.model('Campaign', CampaignSchema);


