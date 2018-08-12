/*
 *  RAI based Musical Strings Store
 *  Written in Express/Node.js
 *  Author: --
 *  Created: 7-Aug-2018
 *  Modified: --
 */

 // ********************
 // include dependencies
 // ********************
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config');
//const pug = require('pug');

// ********************
// Middlewares
// ********************
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const productController = require('./controllers/products');
const shopController = require('./controllers/shops');
const homeController = require('./controllers/home');

// ********************
// Routes
// ********************
app.use('/', productController);
app.use('/', shopController);
app.use('/', homeController);


// ********************
// Error Catching
// ********************
// handle 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(err);
        if(err.status == 404)
            return res.render('error',{msg:'The Page you are looking is not available here.'})
        else
            return res.render('error',{msg:'Something happened.'})
    });
}

// production error handler
app.use(function(err, req, res, next) {
    if(err.status == 404)
        return res.render('error',{msg:'The Page you are looking is not available here.'})
    else
       return res.render('error',{msg:'Something happened.'})
});


// ********************
// Server Configuration
// ********************
app.listen(config.port, () => console.log('Server is running on port:'+config.port))