var mongoose = require('mongoose')
var environment = require('./../common/environment')

var SegmentoSchema = new mongoose.Schema({
    nome: {type: String, unique: true} 
},
    environment.mongoose.config
);

var Segmento =  mongoose.model('Segmento', SegmentoSchema, 'segmento');

module.exports = {Segmento, SegmentoSchema};