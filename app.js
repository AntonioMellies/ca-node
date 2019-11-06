const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Exceptions
const ApiException = require('./exceptions/ApiException')
const DataBaseException = require('./exceptions/DataBaseException')
// Routes Import
const auth = require('./routes/auth');
const user = require('./routes/user');

const app = express();

// Headers Security Configurations
// https://expressjs.com/pt-br/advanced/best-practice-security.html
app.use(helmet());


// Include Configuration
const config = require('./config');

// Connect to MongoDB
mongoose.connect(config.MONGO_URI,{ useNewUrlParser: true });
mongoose.connection.on('error', function(err) {
  throw new DataBaseException();
});

    
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/*
* Routes 
*/
app.get('/', 
    function(req, res){
        res.json({"CA-NODE" : "REST API - Automation Center with Node.js"});
    }
);

// public routes
app.use('/', auth);

// public && private routes
app.use('/user', user);

// private routes



// express doesn't consider not found 404 as an error so we need to handle 404 it explicitly
// handle 404 error
app.use(function(req, res, next) {
 throw new ApiException("Endpoint não encontrado", 404);
});

// handle errors
app.use(function(err, req, res, next) {
  console.log(err);
  if(err instanceof Error){
    res.status(err.status).json({
      class:err.class,
      message:err.message,
      status:err.status
    })
  }
});

// Start the server
app.listen(config.LISTEN_PORT, function(){
    console.log('listening on port ' + config.LISTEN_PORT);
});