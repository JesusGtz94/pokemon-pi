const axios  = require("axios");
const { Router } = require("express");
const { Type } = require("../db.js");


const typesRouter = Router();

typesRouter.get('/',async (req,res) => {

    let instances;

    try{

        instances = await Type.findAll()

        instances.forEach(e => {console.log(e.toJSON())}) 

    }catch(e){
        res.send(e)
    }
    console.log("*******************************************************************************")
    if(instances.length < 1) {
    console.log("Oh no entre el if!!")
        let allTypes = await axios.get("https://pokeapi.co/api/v2/type")
        allTypes = allTypes.data.results;

        console.log(allTypes)

        for(let i = 0 ; i< allTypes.length ; i++)
        {   
            try{
            let newType = await Type.create({

                name: allTypes[i].name

            })
            }catch(e){
                console.log(e)
            }

        }

        instances = await Type.findAll()

    }


    res.send(instances)

})

module.exports = typesRouter;