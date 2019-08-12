var mongoose = require('mongoose')

let {Escola, EscolaSchema} = require('./escola.model');
let {Livro, LivroSchema} = require('./livro.model');

var UnidadeSchema = new mongoose.Schema({
    nome: String,
    endereco: {
        logradouro: String,
        numero: String,
        complemento: String,
        cep: String,
        bairro: String,
        cidade: String,
        estado: String
    }, 
    contatos:{
        email: String,
        ddd: String,
        telefone: [String],
        celular: [String],
        site: String,
        facebook: String,
        instagram: String,
        twitter: String
    },
    escola: { type: mongoose.Schema.Types.ObjectId, ref: 'Escola', required: true  },
    livros: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Livro' }]    
});

var Unidade =  mongoose.model('Unidade', UnidadeSchema);

module.exports = {Unidade, UnidadeSchema};