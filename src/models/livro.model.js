var mongoose = require('mongoose')
var environment = require('./../common/environment')
let {Serie, SerieSchema} = require('./serie.model');
let { Unidade, UnidadeSchema } = require('./unidade.model')

var LivroSchema = new mongoose.Schema({
    nome: String, 
    tipo: String,
    materia: String,
    edicao: Number,
    valor: Number, 
    serie: { type: mongoose.Schema.Types.ObjectId, ref: 'Serie', required: true},
    unidades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Unidade'}]   
},
environment.mongoose.config
);

 
var Livro =  mongoose.model('Livro', LivroSchema, 'livro');
 
module.exports = {Livro, LivroSchema};