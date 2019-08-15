var restify = require('restify')
var Router = require('../common/router') 
var {Escola, EscolaSchema} = require('./../models/escola.model')
let {Segmento, SegmentoSchema} = require('./../models/segmento.model') 
let {Serie, SerieSchema} = require('./../models/serie.model')
let {Unidade, UnidadeSchema} = require('./../models/unidade.model')
let {Livro, LivroSchema} = require('./../models/livro.model')

class TesteRoutes extends Router {

    applyRoutes( application ){

        application.get('/testeimasters', (req, resp, next) => {
            function retornarUsuarioBanco1() {
                return new Promise((resolve, reject) => {
                    const usuarioBancoOracle = { 'nome': 'Erick Wendel' };
                    return resolve(usuarioBancoOracle);
            
                });
            }
            
            function retornarUsuarioBanco2() {
                return new Promise((resolve, reject) => {
                    const usuarioBancoMySql = { 'nome': 'Zina da Silva' };
                    return resolve(usuarioBancoMySql);
                });
            }
            
            function retornarUsuarioBanco3() {
                return new Promise((resolve, reject) => {
                    const usuarioBancoSqlServer = { 'nome': 'Xuxa de Souza' };
                    console.log('Esperar 3 segundos');
                    return setTimeout( () => resolve(usuarioBancoSqlServer), 3000);
                });
            }
            //enviamos em um array, a chamada de cada função que deve ser executada
            Promise.all([
                retornarUsuarioBanco1(),                
                retornarUsuarioBanco3(),
                retornarUsuarioBanco2(),
            ])
            // na função THEN recuperamos o resultado de cada uma em um array. 
            // os valores sao retornados na ordem em que foram chamados
                .then(
                    (resultados) => {
            
                        let usuarioOracle = resultados[0];
                        let usuarioMySql = resultados[1];
                        let usuarioSqlServer = resultados[2];
                        let mensagem = `
                                        Oracle: ${usuarioOracle.nome},
                                        MySQL: ${usuarioMySql.nome},
                                        SQLServer: ${usuarioSqlServer.nome}
                                        `;
            
                        console.log(mensagem);
                    },
                    (erro) => {
                        console.log(`deu zica!! [ ${erro} ]`);
                    }
                   );        
        });

         

        application.get('/criarbanco', (req, resp, next) => {

            let arrSegmentos = [
                {nome: 'Educação Infantil', series:['Maternal I', 'Maternal II', 'Pré-Escola I', 'Pré_escola II']},
                {nome: 'Ensino Fundamental I', series:['1º Ano', '2º Ano', '3º Ano', '4º Ano','5º Ano']},
                {nome: 'Ensino Fundamental II', series:['6º Ano', '7º Ano', '8º Ano', '9º Ano']},
                {nome: 'Ensino Médio', series:['1ª Ano', '2ª Ano', '3ª Ano']}
            ];


            function createSegmentos(arrSegmentos){
                Segmento.deleteMany().exec();

                return new Promise( (resolve, reject) => {
                    let  result = arrSegmentos.map( segmento => Segmento.create( {nome:segmento.nome} ) ) 
                    //result.map(x => console.log(x))
                     
                    resolve( Promise.all(result) );
                })
            }

            function createSeries( segmentos, arrSegmentos ){
                Serie.deleteMany().exec();

                return new Promise( (resolve, reject ) => {
                    let result = segmentos.map( (segmento, i) => {
                        let id = segmento._id;
                        let nome = segmento.nome;
                        let series = arrSegmentos[i].nome == nome ? arrSegmentos[i].series : null;
    
                        let result = series.map( serie => {
                            return Serie.create({nome: serie, segmento:id})
                        })
                        return Promise.all(result)
                    });                   
                    
                    resolve( Promise.all(result) )
                })
            }

            function createLivro(serie){
                Livro.deleteMany().exec();

                return new Promise( (resolve, reject) => {
                    let result = Livro.create({
                        nome: 'Aprendendo com Alegria', 
                        edicao: 13,
                        valor: 59.90,
                        serie: serie
                    });

                    resolve(result);
                })
            }

            function createEscola(){
                Escola.deleteMany().exec();

                return new Promise( (resolve, reject) => {
                    let result = Escola.create({
                        nome: "Lar dos Meninos",
                        razaoSocial: 'Santa Mônica Centro Educacional',
                        logo: 'logoSmce.jpg'
                    });

                    resolve(result);
                })
            }

            function createUnidade(escola, livros){
                Unidade.deleteMany().then();
                return new Promise( (resolve, reject) => {
                    let result = Unidade.create({
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
                        livros: livros,
                        escola: escola._id   
                    });

                    resolve(result);
                })
            }

            //console.log( createSegmentos(arrSegmentos).then(x => console.log(x)) )
             
            createSegmentos(arrSegmentos)
            .then( segmentos => {
                 return createSeries(segmentos,arrSegmentos);
            })
            .then( () => { 
                let livro = Serie.findOne()
                .then( serie => createLivro(serie) );   
                           
                return livro;
            })
            .then( () => createEscola() )
            .then( escola => {
                let unidade = Livro.findOne()
                .then( livro => createUnidade(escola, livro) )
                
                return unidade;
                
            })
            .catch(err => console.error( "Entrou no catch: " + err))      
        })
    }   
}

module.exports = new TesteRoutes();