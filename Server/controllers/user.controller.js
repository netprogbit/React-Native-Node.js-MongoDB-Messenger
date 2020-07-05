const User = require('../models/User');

// Getting all users without owner
module.exports.getUsers = async function (req, res) {
    
    const users = await User.find({ _id: {$ne : req.body.ownerId} });
    res.status(200).json(users);
};