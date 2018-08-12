const express = require('express');
const router = express.Router();

router.get('/' , (req, res, next) => {
    return res.render('home', {title:'Home'});
});

router.get('/contact-us', (req, res, next) => {
    return res.render('contact-us', {title:'Contact Us'});
});

module.exports = router;
