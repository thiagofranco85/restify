var mongoose = require('mongoose')

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
});

var Livro =  mongoose.model('Livro', LivroSchema);

module.exports = {Livro, LivroSchema};