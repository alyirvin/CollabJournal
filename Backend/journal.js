// src/journal.js
const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
    userId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },    
    key: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    textPosition: {
        type: Number,
        required: true,
    },
    shape: {
        type: String,
        required: true,
    },
    shapes: {
        type: Array,
        required: true,
    },

});

const journalCollection = new mongoose.model("Journal", JournalSchema);
module.exports = journalCollection;
