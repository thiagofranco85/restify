
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({ 
    name: String,
    cpf: String,
    product:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true  }]
},
{ collection: 'user' }
);

var User = mongoose.model('User', UserSchema) 

module.exports = {User, UserSchema}