const restify = require('restify')
const fs = require('fs')
const path = require('path');
 
module.exports =  class Router{
     applyRoutes( application ){}

     static getFilesRoutes( directoryPath = path.join(__dirname, '../routes/') ) {

          let files = fs.readdirSync( directoryPath );

          let arr = files.map( file => Router.convertFileNameToClassName(file) );
          
          return arr;
          /*
          fs.readdirSync( directoryPath, (error, files ) =>{
               if (error) {
                    console.log( 'Unable to scan directory: ' + error )
               }  

               arr = files.map( file => Router.convertFileNameToClassName(file) );              
               
          }) 
          
          
          return new Promise((resolve, reject) => {
               fs.readdir( directoryPath, (error, files ) =>{
                    if (error) {
                         reject( 'Unable to scan directory: ' + error )
                    }  

                    let arrFileName = files.map( file => Router.convertFileNameToClassName(file) )
     
                    resolve ( arrFileName );
               }) 
          }) 
          */
     }


     static convertFileNameToClassName( fileName ){
          return fileName.replace('.js','').replace('.','').replace('routes', 'Routes');
     }
}