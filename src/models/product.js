var mongoose = require('mongoose');

var { User, UserSchema } = require("./user")

var ProductSchema = new mongoose.Schema({ 
    name: String,
    price: Number,
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }]
    
    //[{name:'TV', price: 999.99 }, {name:'PC', price: 2999.99 }]
},
{ collection: 'product' }
);

var Product = mongoose.model('Product', ProductSchema) 

module.exports = {Product, ProductSchema}