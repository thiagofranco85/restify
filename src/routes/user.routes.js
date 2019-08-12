var restify = require('restify')
var Router = require('../common/router')
var {User, UserSchema} = require('../models/user.model')
var {Product, ProductSchema} = require('../models/product.model')

class UserRoutes extends Router {

    applyRoutes( application ){
        application.get('/users', (req, resp, next) => {
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

module.exports = new UserRoutes();