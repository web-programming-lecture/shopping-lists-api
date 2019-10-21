const express = require('express'),
    User = require('../models/users'),
    Shopping = require('../models/shopping'),
    uuidv4 = require('uuid/v4');

const router = express.Router();

// Ensure user is authenticated, redirect to login if not.
function isAuthenticated(req, res, next) {
    if (!req.session.isAuthenticated) return res.redirect(301, "/login");
    next();
}

// Ensure user is not authenticated, redirect to home if user is authenticated.
function isUnauthenticated(req, res, next) {
    if (req.session.isAuthenticated) return res.redirect(301, "/");
    next();
}

router.get('/', isAuthenticated, (req, res) => {
    Promise.all([
        User.findById(req.session.user.id),
        Shopping.List.find({ userId: req.session.user.id })
      ]).then( ([ user, lists ]) => {
        return res.render('home', {
            username: req.session.user.username,
            apiKey: user.apiKey,
            lists: lists
        });
      });
});

router.get('/login', isUnauthenticated, (req, res) => {
    return res.render('login');
});

router.post('/login', isUnauthenticated, (req, res) => {
    if (!req.body.username) return res.status(400).render("login", { errors: ["Please provide a username."] });
    if (!req.body.password) return res.status(400).render("login", { errors: ["Please provide a password."] });

    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) return res.status(401).render("login", { errors: ["Error while logging in."] });
        if (!user) return res.status(401).render("login", { errors: ["Wrong username or password."] });

        user.comparePassword(user.password, req.body.password, (err, isMatch) => {
            if (err || !isMatch) return res.status(401).render("login", { errors: ["Wrong username or password."] });

            const session = req.session;
            session.user = {
                id: user._id,
                username: user.username
            };
            session.isAuthenticated = true;
            return res.redirect(301, "/");
        });
    });
});

router.get('/register', isUnauthenticated, (req, res) => {
    return res.render('register');
});

router.post('/register', isUnauthenticated, (req, res) => {
    if (!req.body.username) return res.status(400).render("register", { errors: ["Please provide a username."] });
    if (!req.body.password) return res.status(400).render("register", { errors: ["Please provide a password."] });
    if (!req.body.repeat) return res.status(400).render("register", { errors: ["Please repeat the password."] });
    if (req.body.password !== req.body.repeat) return res.status(400).render("register", { errors: ["The passwords do not match."] });

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save((err, user) => {
        if (err) return res.status(400).render('register', { errors: [err.message] });
        return res.redirect(301, '/login');
    });
});


router.post('/updateApiKey', isAuthenticated, (req, res) => {
    let set = {
        'apiKey': uuidv4()
    };
    User.findOneAndUpdate(
        { _id: req.session.user.id },
        { $set: set },
        { new: true },
        (err, user) => {
            if (err) return next(err);
            if (!user) return res.status(404).json({ error: "Can not generate new API Key." });
            return res.send();
        }
    );
});

router.get('/logout', (req, res) => {
    let session = req.session;
    session.user = undefined;
    session.isAuthenticated = false;
    return res.redirect(301, "/");
});

module.exports = router;