var express = require('express');
var router = express.Router();

var listController = require('../controllers/lists'),
    itemController = require('../controllers/items');

function isAuthenticated(req, res, next) {
    if (!req.session.isAuthenticated) return res.sendStatus(401);
    next();
}

// Private Actions
router.get('/', isAuthenticated, listController.readAll);

router.post('/', isAuthenticated, listController.create);

router.delete('/:id', isAuthenticated, listController.delete);

// Public Actions

router.get('/:id', listController.read);

router.post('/:listid/items', itemController.create);

// router.put('/:listid/items/:itemid', listController.update);

// router.delete('/:listid/items/:itemid', itemController.delete)

module.exports = router;