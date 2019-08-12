var restify = require('restify')
var Router = require('../common/router') 
var {Escola, EscolaSchema} = require('./../models/escola.model')
let {Segmento, SegmentoSchema} = require('./../models/segmento.model') 
let {Serie, SerieSchema} = require('./../models/serie.model')
let {Unidade, UnidadeSchema} = require('./../models/unidade.model')
let {Livro, LivroSchema} = require('./../models/livro.model')

class TesteRoutes extends Router {

    applyRoutes( application ){

        application.get('/testesync', (req, resp, next) => {
            function pegaSerie(serie){
                return serie
            }
            let serie =   Serie.findOne({}, (err, doc) => {
              
                pegaSerie(doc)
            });

            console.log( serie );
            
        });

        application.get('/criarbanco', (req, resp, next) => {

            //Removendo segmentos e series(casos existam)
            Segmento.deleteMany().then( x => console.log( x ));
            Serie.deleteMany().then( x => console.log( x ));
            
            let arrSegmentos = [
                {nome: 'Educação Infantil', series:['Maternal I', 'Maternal II', 'Pré-Escola I', 'Pré_escola II']},
                {nome: 'Ensino Fundamental I', series:['1º Ano', '2º Ano', '3º Ano', '4º Ano','5º Ano']},
                {nome: 'Ensino Fundamental II', series:['6º Ano', '7º Ano', '8º Ano', '9º Ano']},
                {nome: 'Ensino Médio', series:['1ª Ano', '2ª Ano', '3ª Ano']}
            ]
            //criando segmentos e series 
                   
            /*     
            arrSegmentos.map( (x,i) => {
                let segmento =  new Segmento({ nome: x.nome });
                segmento.save()
                .then( x => {
                    console.log(`O Segmento ${x.nome} foi salvo!`);
                    let arrSerie = arrSegmentos[i].series;
                    let idSeg = x._id;
                    arrSerie.map( (serie, indexSerie ) => {
  
                        let objSerie = new Serie({nome:serie, segmento: x._id });
                        objSerie.save()
                        .then( y => {
                            console.log(`A série ${y.nome} foi salva!`);
                        })
                        .catch( () => console.error('Ocorreu um erro ao inserir as series!') )
                    })

                })
                .catch( () => console.error('Ocorreu um erro ao inserir os segmentos!') );
            });
            */

           function createSegmentosSeries(arrSegmentos){
                return new Promise( (resolve, reject) => {

                })
            }    


            arrSegmentos.map( (x,i) => {
                let segmento =  new Segmento({ nome: x.nome });
                segmento.save() 
                .then( x => {
                    console.log(`O Segmento ${x.nome} foi salvo!`);
                    let arrSerie = arrSegmentos[i].series;
                    
                    return [x, arrSerie];

                })
                .then( (x, arrSerie) => { 
                    
                    arrSerie.map( (serie, indexSerie ) => {
                        console.log( [x, arrSerie])
                        let objSerie = new Serie({nome:serie, segmento: x._id });
                        objSerie.save()
                        .then( y => {
                            console.log(`A série ${y.nome} foi salva!`);
                        })
                        .catch( () => console.error('Ocorreu um erro ao inserir as series!') )
                    })
                    
                })
                .catch( () => console.error('Ocorreu um erro ao inserir os segmentos!') );
            });


            //removendo livros
            Livro.deleteMany().then( x => console.log( x ));
            /*
            let livro = new Livro({
                nome: 'Aprendendo com Alegria', 
                edicao: 13,
                valor: 59.90 
            });
 

            Serie.findOne().then( x => { 
                
                
            });
            

            livro.save();
            */


            
            //removendo escolas     
            Escola.deleteMany().then( x => console.log( x ));

            //criando escola
            let escola = new Escola({
                nome: "Lar dos Meninos",
                razaoSocial: 'Santa Mônica Centro Educacional',
                logo: 'logoSmce.jpg'
            });
            escola.save();

            //removendo unidades     
            Unidade.deleteMany().then( x => console.log( x ));

            let unidade = new Unidade({
                nome: 'Bento Ribeiro',
                endereco: {
                    logradouro: 'Rua Divisória',
                    numero: '79', 
                    cep: '21331-250',
                    bairro: 'Bento Ribeiro',
                    cidade: 'Rio de Janeiro',
                    estado: 'RJ'
                }, 
                contatos:{
                    email: 'contato@santamonicace.com.br',
                    ddd: 21,
                    telefone: ['2222-3333','4444-5555'],
                    celular: ['99999-8888'],
                    site: 'www.santamonicace.com.br' 
                },
                escola: escola._id   
            });

            Livro.findOne().then( x => {
                unidade.livros = [livro._id]
                //criando unidade
                unidade.save();
            })

            

            
 
             /*
            User.findById("5d4a098ecb695e4070b5c795")
            .populate('product')
            .then( (users) => {
                console.log(users)
                resp.json({message: 'List of Users', data: users})
            })
            */
            
        })
    }   
}

module.exports = new TesteRoutes();