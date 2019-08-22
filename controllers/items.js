var Shopping = require('../models/shopping');

exports.create = (req, res, next) => {
    Shopping.List.findOne({ _id: req.params.listid }, (err, list) => {
        if (err) return res.status(400).json({error: err.message});
        var item = new Shopping.Item({
            name: req.body.name,
            bought: req.body.bought
        })
        list.items.push(item);
        list.save((err, list) => {
            if (err) return res.status(400).json({error: err.message});
            return res.send(list)
        });
    });
};

exports.delete = (req, res, next) => {
    Shopping.List.findOne({ _id: req.params.listid }, (err, list) => {
        if (err) return res.status(400).json({error: err.message});

        let item = list.items.id(req.params.itemid);
        if (!item) return res.status(400).json({error: "Can not find item"});

        item.remove();
        
        list.save((err, list) => {
            if (err) return res.status(400).json({error: err.message});
            return res.send(list)
        });
    });
};