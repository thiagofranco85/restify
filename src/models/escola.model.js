var mongoose = require('mongoose')

var EscolaSchema = new mongoose.Schema({
    nome: String,
    razaoSocial: String,
    logo: String
});

var Escola =  mongoose.model('Escola', EscolaSchema);

module.exports = {Escola, EscolaSchema};