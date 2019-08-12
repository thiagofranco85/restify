var mongoose = require('mongoose')

let { Segmento, SegmentoSchema } = require('./segmento.model')

var SerieSchema = new mongoose.Schema({
    nome: String,
    segmento: { type: mongoose.Schema.Types.ObjectId, ref: 'Segmento', required: true  }
});

var Serie =  mongoose.model('Serie', SerieSchema);

module.exports = {Serie, SerieSchema};