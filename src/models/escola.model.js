var mongoose = require('mongoose')
var environment = require('./../common/environment')

var EscolaSchema = new mongoose.Schema({
    nome: {type: String},
    razaoSocial: {type: String, unique: true},
    logo: {type: String}
},
environment.mongoose.config
);

var Escola =  mongoose.model('Escola', EscolaSchema, 'escola');

module.exports = {Escola, EscolaSchema};