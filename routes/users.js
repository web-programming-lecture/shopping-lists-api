var express = require('express');
const pug = require('pug');

var router = express.Router();

var userController = require('../controllers/users');

router.post('/register', userController.register);

router.get('/info', userController.getCurrentUser);

router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.get('/login', (req, res, next) => {
    if (req.session.isAuthenticated && req.body.redirectUrl) {
        return res.redirect(301, req.body.redirectUrl);
    }
    return res.render('login', {
        redirectUrl: req.query.redirectUrl
    });
});

module.exports = router;