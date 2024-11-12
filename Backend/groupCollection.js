const mongoose = require('mongoose');   
const GroupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
    },
    groupKey: {
        type: String,
        required: true,
    }
})
const groupCollection = mongoose.model('Gruop', GroupSchema);
module.exports = groupCollection;