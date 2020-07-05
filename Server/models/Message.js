const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    fromUserId: {
        type: String,
        required: true
    },
    toUserId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('messages', messageSchema);