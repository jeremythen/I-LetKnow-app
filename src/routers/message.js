const express = require('express');
const Message = require('../models/message');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/message', auth, async (req, res) => {

    const message = new Message({
        ...req.body,
        owner: req.user._id      
    });

    try {
        await message.save();
        res.status(201).send({
                message: message,
                successMessage: 'Success sending message anonymously.',
                success: true
            }
        );
    }catch(e) {
        res.status(400).send(e);
    }
});

router.post('/messageAnonymous', async (req, res) => {
    const message = new Message({
        ...req.body,
        owner: 'Anonymous'
    });

    try {
        await message.save();
        res.status(201).send({
                message: message,
                successMessage: 'Success sending message anonymously.',
                success: true
            }
        );
    }catch(e) {
        res.status(400).send(e);
    }

});

router.get('/message', auth, async (req, res) => {

    let allMessagesSentByMe  = await Message.find({ owner: req.user._id });
    let allMessagesSentToMe  = await Message.find({ to_user: req.user._id });

    const allMessages = {allMessagesSentByMe, allMessagesSentToMe};

    try {

        res.status(200).send(allMessages);

    }catch(e) {
        res.status(500).send(e);
    }

});

router.delete('/message', auth, async (req, res) => {

    const messageId = req.body.message_id;

    try {
        await Message.deleteOne( { _id: messageId } );

        res.status(201).send({
                message: `Message with id: ${messageId} deleted successfully`,
                success: true
            }
        );

    }catch(e) {
        res.status(500).send(e);
    }
    
});

module.exports = router;