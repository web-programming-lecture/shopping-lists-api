var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShoppingItemSchema = new Schema({
    name:   { type: String, required: true, maxlength: 200 },
    bought: { type: Boolean, required: false, default: false },
})

var ShoppingListSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    items:  [ ShoppingItemSchema ]
}, { versionKey: false });

// Export the model
module.exports = mongoose.model('List', ShoppingListSchema);