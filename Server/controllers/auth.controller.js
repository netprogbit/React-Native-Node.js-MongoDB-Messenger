const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtConfig = require('../configs/jwt-config');
const createError = require('http-errors');

// Registration
module.exports.register = async (req, res) => {
    
    // Check if the user exists with this email

    const candidate = await User.findOne({ email: req.body.email });

    if (candidate)
        throw createError(400, 'This email is already taken.');

    // User is created
    const salt = bcrypt.genSaltSync(10);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
    });

    await user.save();
    res.status(201).json({ message: 'Registration successfully completed.' });
};

// Signing in
module.exports.login = async function (req, res) {

    // Check if the user exists with this email

    const candidate = await User.findOne({ email: req.body.email });

    if (!candidate)        
        throw createError(400, 'The user with such a email does not found.');   

    // Check if the user exists with this password

    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

    if (!passwordResult)       
        throw createError(400, 'Passwords do not match. Try again.');  

    // Generate token;

    const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
    }, jwtConfig.key, { expiresIn: 60 * 60 });

    res.status(200).json({ userId: candidate._id.toString(), token: token });
};