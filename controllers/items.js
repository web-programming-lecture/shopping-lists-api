var Shopping = require('../models/shopping');

exports.create = (req, res, next) => {
    Shopping.List.findOne({ _id: req.params.listid }, (err, list) => {
        var item = new Shopping.Item({
            name: "TEST",
            bought: false
        })
        list.items.push(item);
        list.save().then((list) => {
            res.send(list)
        })
    });
};