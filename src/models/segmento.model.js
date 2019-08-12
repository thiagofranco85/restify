var mongoose = require('mongoose')

var SegmentoSchema = new mongoose.Schema({
    nome: String 
});

var Segmento =  mongoose.model('Segmento', SegmentoSchema);

module.exports = {Segmento, SegmentoSchema};