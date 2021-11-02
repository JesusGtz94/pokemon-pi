const axios  = require("axios");
const { Router } = require("express");
const { Type } = require("../db.js");


const typesRouter = Router();

typesRouter.get('/',async (req,res) => {

    let instances;

    try{

        instances = await Type.findAll()

    }catch(e){
        res.send(e)
    }

    res.send(instances)

})

module.exports = typesRouter;