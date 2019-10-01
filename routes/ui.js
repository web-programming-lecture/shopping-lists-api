var express = require('express'),
    User = require('../models/users'),
    Shopping = require('../models/shopping');

var router = express.Router();

function userMustBeAuthenticated(req, res, next) {
    if (!req.session.isAuthenticated) return res.redirect(301, "/login");
    next();
}

function userMustBeUnauthenticated(req, res, next) {
    if (req.session.isAuthenticated) return res.redirect(301, "/")
    next();
}

router.get('/', userMustBeAuthenticated, (req, res) => {
    Shopping.List.find({ userId: req.session.user.id }, (err, lists) => {
        return res.render('home', {
            username: req.session.user.username,
            lists: lists
        });
    });
});

router.get('/login', userMustBeUnauthenticated, (req, res) => {
    return res.render('login');
});

router.post('/login', userMustBeUnauthenticated, (req, res) => {
    if (!req.body.username) return res.status(400).render("login", { errors: ["Please provide a username."] });
    if (!req.body.password) return res.status(400).render("login", { errors: ["Please provide a password."] });
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) return res.status(401).render("login", { errors: ["Error while logging in."] });
        if (!user) return res.status(401).render("login", { errors: ["Wrong username and password."] });
        user.comparePassword(user.password, req.body.password, (err, isMatch) => {
            if (err) return res.status(401).render("login", { errors: ["Wrong username and password."] });
            if (isMatch) {
                const session = req.session;
                session.user = {
                    id: user._id,
                    username: user.username
                };
                session.isAuthenticated = true;
                return res.redirect(301, "/");
            } else {
                return res.status(401).render("login", { errors: ["Wrong username and password."] });
            }
        });
    });
});

router.get('/register', userMustBeUnauthenticated, (req, res) => {
    return res.render('register');
});

router.post('/register', userMustBeUnauthenticated, (req, res) => {
    if (!req.body.username) return res.status(400).render("register", { errors: ["Please provide a username."] });
    if (!req.body.password) return res.status(400).render("register", { errors: ["Please provide a password."] });
    if (!req.body.repeat) return res.status(400).render("register", { errors: ["Please repeat the password."] });
    if (req.body.password !== req.body.repeat) return res.status(400).render("register", { errors: ["The passwords do not match."] });

    var user = new User({
        username: req.body.username,
        password: req.body.password
    });
    user.save((err, user) => {
        if (err) return res.status(400).render('register', { errors: [err.message] });
        return res.redirect(301, '/login');
    });
});

router.get('/logout', (req, res) => {
    let session = req.session;
    session.user = undefined;
    session.isAuthenticated = false;
    return res.redirect(301, "/");
});

module.exports = router;