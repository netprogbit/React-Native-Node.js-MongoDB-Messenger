const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const messageRoutes = require('./routes/message.routes');
const dbConfig = require('./configs/db-config');
const app = express();
const passportMidleware = require('./middlewares/passport');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const log4js = require("log4js");

// Configure logger
log4js.configure({
  appenders: { appError: { type: "file", filename: "error.log" } },
  categories: { default: { appenders: ["appError"], level: "error" } }
});

const logger = log4js.getLogger("appError");

// Connect DB
mongoose.connect(dbConfig.connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error));

mongoose.set('useCreateIndex', true);

app.set('socketIO', io);

// Routes guard midleware
app.use(passport.initialize());
passportMidleware(passport);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Setting routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);

// Error handling
app.use((error, req, res, next) => {

    let status = 500;    
    let message = 'Error will be fixed';

    if (error.status) {
        status = error.status;
        message = error.message;
    }
        
    logger.error(`Error. Status code: '${status}'. Message: '${error.message}'. Stack: '${error.stack}'`);    
    res.status(status);    
    res.json({ message: message });
});

module.exports = server;