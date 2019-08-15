var mongoose = require('mongoose')
var environment = require('./../common/environment')

let { Segmento, SegmentoSchema } = require('./segmento.model')

var SerieSchema = new mongoose.Schema({
    nome: String,
    segmento: { type: mongoose.Schema.Types.ObjectId, ref: 'Segmento', required: true  }
},
    environment.mongoose.config
);

var Serie =  mongoose.model('Serie', SerieSchema, 'serie');

module.exports = {Serie, SerieSchema};