const express = require('express'),
    User = require('../models/users'),
    listController = require('../controllers/lists'),
    itemController = require('../controllers/items');

const router = express.Router();

function isAuthenticated(req, res, next) {
    if (req.headers.authorization) {
        User.findOne(
            { apiKey: req.headers.authorization },
            (err, user) => {
                if (err) return res.sendStatus(401);
                req.session.isAuthenticated = true;
                req.session.user = {
                    id: user.id,
                    username: user.username
                };
                next();
            }
        );
    } else {
        if (!req.session.isAuthenticated) return res.sendStatus(401);
        next();
    }
}

// Private Actions (Session Cookie or API Key in Authorization Header)
router.get('/', isAuthenticated, listController.readAll);

router.post('/', isAuthenticated, listController.create);

router.delete('/:id', isAuthenticated, listController.delete);

// Public Actions
router.get('/:id', listController.read);

router.post('/:listid/items', itemController.create);

router.put('/:listid/items/:itemid', itemController.update);

router.delete('/:listid/items/:itemid', itemController.delete)

module.exports = router;