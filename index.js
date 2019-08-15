var restify = require('restify');
var Server = require('./src/server/server')
//var mongoose = require('mongoose');
var Conexao = require('./src/db/conexao'); 
var Router = require('./src/common/router')
var testeRoutes = require('./src/routes/teste.routes')
var escolaRoutes = require('./src/routes/escola.routes')

//Conexao
Conexao.conectar('localhost', '27017', 'livro_pratico');

const server = new Server() 

server.bootstrap([testeRoutes, escolaRoutes]).then( server => {
  console.log( "Server Listening On " + JSON.stringify( server.application.address() ) ) 
}).catch(error =>{
  console.log("Server Failed: "+ error)
  console.error(error)
  process.exit(1)
});


 
//var userRoutes = require('./src/routes/userRoutes');

 
 /*

let product1 = new Product({name: 'Radio', price: 39.90});
let product2 = new Product({name: 'Celular', price: 2999.90});
let product3 = new Product({name: 'PC', price: 1999.90});


 
product1.save().then( salvo =>{
  let user = new User({ name:'Fabricio', cpf:'10826839738', product: [salvo._id] });
  user.save().then( userSalvo => {
    console.log(userSalvo)
  })
})
 
 

User.findById("5d4a098ecb695e4070b5c795").populate('product').then( x => {
    console.log(x)
})
 

/*
User.find().then( lista => {
    lista.map( usuario => console.log(usuario.products[0] + '\n'))
})
*/
 /*
var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

 */