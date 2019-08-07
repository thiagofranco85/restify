var mongoose = require('mongoose');


class Conexao{

    static conectar(  host, port, banco ){ 
      mongoose.connect(`mongodb://${host}:${port}/${banco}`, {useNewUrlParser: true});

      var db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      return db.once('open', function() {
        console.log("Conexão feita")
      });    
    }

}



module.exports = Conexao