const Message = require('../models/Message');

// Addition message to DB and senting it to pen pal
module.exports.addMessage = async function (req, res) {

    const message = new Message({
        fromUserId: req.body.fromUserId,
        toUserId: req.body.toUserId,
        text: req.body.message,
    });

    await message.save();
    const io = req.app.get('socketIO');
    io.emit(message.toUserId, message);
    res.status(201).json(message);
};

// Getting relevant messages
module.exports.getMessages = async function (req, res) {

    const messages = await Message.find({
        $or: [
            { fromUserId: req.body.fromUserId, toUserId: req.body.toUserId },
            { fromUserId: req.body.toUserId, toUserId: req.body.fromUserId }
        ]
    });
    
    res.status(200).json(messages);
};