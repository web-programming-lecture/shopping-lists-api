const Shopping = require('../models/shopping');

exports.read = (req, res, next) => {
    Shopping.List.findOne({ _id: req.params.id }, (err, list) => {
        if (err) return next(err);
        return res.send(list);
    });
};

exports.create = (req, res, next) => {
    const list = new Shopping.List({
        userId: req.session.user.id,
        name: req.body.name
    });
    list.save((err, list) => {
        if (err) return next(err);
        return res.send(list);
    });
};

exports.readAll = (req, res, next) => {
    Shopping.List.find({ userId: req.session.user.id }, (err, lists) => {
        if (err) return next(err);
        return res.send(lists);
    });
};

exports.delete = (req, res, next) => {
    Shopping.List.findOneAndRemove({ _id: req.params.id, userId: req.session.user.id }, (err) => {
        if (err) return next(err);
        return res.status(200).json({ message: 'Deleted successfully!' });
    });
};