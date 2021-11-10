const { Router } = require("express");
const { Pokemon, Type } = require('../db.js');
const axios = require('axios');
const { portalSuspended } = require("pg-protocol/dist/messages");

const pokeRouter = Router();

pokeRouter.get("/",async (req,res) => { // Peticion de todos los pokemons o pokemons por nombre (cuando se manda name por query)

    const {name} = req.query;

    // ►►►►►►►►►►►►►►►►►►►►Inicio de busqueda si se reciben Query Params
    if(name) {
        
        try {

            const busquedaNombre = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)

            if(busquedaNombre.data) {

                let types = busquedaNombre.data.types.map(type => {
                    return {name: type.type.name}
                })

                let pokemon = {

                    id : busquedaNombre.data.id,
                    name: busquedaNombre.data.name,
                    img: busquedaNombre.data.sprites.other['official-artwork'].front_default,
                    hp: busquedaNombre.data.stats[0].base_stat,
                    attack: busquedaNombre.data.stats[1].base_stat,  
                    defense: busquedaNombre.data.stats[2].base_stat,  
                    speed: busquedaNombre.data.stats[5].base_stat,
                    height: busquedaNombre.data.height,
                    weight: busquedaNombre.data.weight,
                    types

                }

                return res.json(pokemon);
                
            }

            
        } catch{}
        
        try {
            
            let instance = await Pokemon.findOne({
                
                where: {
                    name: name
                },

                include: [{
                    model: Type, attributes:['name'], 
                    through: { 
                        attributes: []
                    }
               }] 
            })   
            
            if(instance) return res.json(instance)

        } catch(e){

            return res.json(e)

        }
        
        return res.status(404).send({message: "Pokemón no encontrado"})
        
    }
    // Fin de la búsqueda con Query Params ◄◄◄◄◄◄◄◄◄◄◄◄◄◄◄◄◄◄◄◄

    let resultado, instances;

    try{
    
        let arrayPokemons = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40'); 
        
        // *******************  Las líneas de código comentadas en esta sección sirven para traer 40 pokemons sin necesidad de usar limit en los query params *******************

        // let arrayPokemons2 = await axios.get(arrayPokemons.data.next);
        
        arrayPokemons = arrayPokemons.data.results;
        // arrayPokemons2 = arrayPokemons2.data.results;
        
        
        let promises = arrayPokemons.map(poke => axios.get(poke.url));

        // arrayPokemons2.forEach(poke => promises.push(axios.get(poke.url)))


        resultado = await Promise.all(promises);

        resultado = await resultado.map(instance => {

            let types = instance.data.types.map(type => {
                return {name: type.type.name}
            })

            return {
                    id : instance.data.id,
                    name: instance.data.name,
                    img: instance.data.sprites.other['official-artwork'].front_default,
                    hp: instance.data.stats[0].base_stat,
                    attack: instance.data.stats[1].base_stat,  
                    defense: instance.data.stats[2].base_stat,  
                    speed: instance.data.stats[5].base_stat,
                    height: instance.data.height,
                    weight: instance.data.weight,
                    types
            }
        });

    } catch(e){

        console.log("Hubo un error en la api");
        console.log(e);
        return res.send(e);
        
    }


    try{

     instances = await Pokemon.findAll({
         include: [{
             model: Type, attributes:['name'], 
             through: { 
                 attributes: []
             }
        }] 
    });  

    } catch(e){

        console.log("Hubo un error en la db");
        console.log(e);
        return res.send(e);

    }
    
    res.json([resultado,instances]);

})

pokeRouter.get("/:id",async (req,res) => { // Peticion de pokemon por id
    
    const {id} = req.params
    let instance;

    if(id.length < 15)
    {   
        try{
            
            instance = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            instance = instance.data

            let types = instance.types.map(type => {
                return {name: type.type.name}
            })
            
            let pokemon = {
                id : instance.id,
                name: instance.name,
                img: instance.sprites.other['official-artwork'].front_default,
                hp: instance.stats[0].base_stat,
                attack: instance.stats[1].base_stat,  
                defense: instance.stats[2].base_stat,  
                speed: instance.stats[5].base_stat,
                height: instance.height,
                weight: instance.weight,
                types
            }
            res.json(pokemon);

        } catch(e){
             res.status(404).send(e);
        }

    } else{

        try{

            instance = await Pokemon.findOne({
            where: {
                id: id
            },
            include: [{model: Type, attributes:['name'], through: {attributes: []}}] 
            });

            res.json(instance);

        }catch(e){
            res.status(404).send(e);
        }
    }

})

pokeRouter.post("/", async (req,res) => { // Publicar un pokemon

    const {name,img,hp,attack,defense,speed,height,weight,type} = req.body;

    if(!req.body.name || name.length === 0 ) return res.status(422).json({message: "El nombre del pokemon no puede estar vacío"}) 
    try{
    
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        return res.json({errors: [{message: "name must be unique"}]});

    } catch{}

    try{

        const newPokemon = await Pokemon.create({
            name,
            img,
            hp,
            attack,
            defense,
            speed,
            height,
            weight

        })

        await newPokemon.setTypes(type) 

        return res.json(newPokemon);

    } catch(e){
        console.log(e)
        res.send(e);

    }

})

module.exports = pokeRouter;