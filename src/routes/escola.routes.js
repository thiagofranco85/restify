var restify = require('restify')
var Router = require('../common/router') 
var {Escola, EscolaSchema} = require('../models/escola.model')
 

class EscolaRoutes extends Router {

    applyRoutes( application ){

        application.get('/escolas/:id?', (req, resp, next) => {

            let id = req.params.id;
            console.log(req.params)

            if( id ){
                let result = Escola.find({id:id}).then( escola =>{
                    resp.json ( escola );
                    next();
                });
            }else{
                let result = Escola.find().then( escolas =>{
                    resp.json ( escolas );
                    next();
                });
            }             
        })
    }   
}

module.exports = new EscolaRoutes();