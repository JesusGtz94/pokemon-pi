//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const axios  = require('axios');
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {Type} = require('./src/db.js');

axios

// Syncing all the models at once.
conn.sync({ force: false }) 
 
// Este then agrega los Types de la API en la base de datos al iniciar el servidor
.then(() => {

  try{

  Type.findAll().then(r => {
    
    // Este almacenamiento se genera solo si los types de nuestra base de datos estan vacíos

    if(r.length === 0) {

      axios.get("https://pokeapi.co/api/v2/type")
      .then(r => {
    
        r = r.data.results;
        let promises = [];
        for(let i = 0 ; i< r.length ; i++)
        {   
            try{
                
                promises.push(Type.create({
      
                name: r[i].name
      
            }))
            }catch(e){
                console.log(e)
            }
      
        }
    
        Promise.all(promises)
    
    
      })
    
    }
  }
  )

  } catch(e){
    console.log(e)
  }

  }).then(() => {
    
    server.listen(3001, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });

  });
