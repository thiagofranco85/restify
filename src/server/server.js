const restify = require('restify')
const environment = require('./../common/environment')
const Router = require('./../common/router')

module.exports = class Server{

    initRoutes( routers ){
        return new Promise( (resolve, reject) => {
            try {

                this.application = restify.createServer();

                this.application.use(restify.plugins.queryParser());
                
                //Routes 
                /*
                this.application.get('/hello/:nome', (req,res,next) => {
                    let nome = req.params.nome;
                    res.send('Hello ' + nome.toUpperCase());
                    return next();
                })
                */

                for (let router of routers) {
                    router.applyRoutes( this.application )                    
                }

                this.application.listen(environment.server.port, () => { 
                    resolve(this.application)
                  }); 
                
            } catch (error) {
                reject(error)
            }
        })
    }

    bootstrap( routers = [] ){
        return this.initRoutes( routers ).then( () => this );
    }
}