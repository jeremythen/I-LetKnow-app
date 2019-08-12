const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;