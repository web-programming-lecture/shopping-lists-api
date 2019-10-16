const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShoppingItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 200
    },
    bought: {
        type: Boolean,
        required: false,
        default: false
    },
});

const ShoppingListSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        maxlength: 200
    },
    items: [ShoppingItemSchema]
}, { versionKey: false });

module.exports = {
    Item: mongoose.model('Item', ShoppingItemSchema),
    List: mongoose.model('List', ShoppingListSchema)
}