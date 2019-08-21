var User = require('../models/users');

exports.register = (req, res, next) => {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });
    user.save((err, user) => {
        if (err) return next(err);
        return res.send(`User '${user.username}' created.`);
    });
};

exports.login = (req, res, next) => {
    if (!req.body.username) return res.status(400).json({ message: 'Please provide a username.'});
    if (!req.body.password) return res.status(400).json({ message: 'Please provide a password.'});
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: 'Username or Password wrong.'});
        user.comparePassword(user.password, req.body.password, (err, isMatch) => {
            if (err) return next(err);
            if (isMatch) {
                const session = req.session;
                session.user = {
                  id: user._id,
                  username: user.username
                };
                session.isAuthenticated = true;
                if (req.body.redirectUrl) {
                    return res.redirect(301, req.body.redirectUrl);
                } else {
                    return res.status(200).json({
                        id: user._id,
                        username: user.username
                    });
                }
            } else {
                return res.status(401).json({ message: 'Username or Password wrong.'});
            }
        });
    });
};

exports.getCurrentUser = (req, res) => {
    const session = req.session;
    if (session.isAuthenticated) {
      return res.status(200).json(session.user);
    }
    return res.status(401).json({ message: "You are not logged in!" });
};

exports.logout = (req, res) => {
    let session = req.session;
    session.user = undefined;
    session.isAuthenticated = false;
    return res.status(200).json({ message: 'Your are logged out.'});
};