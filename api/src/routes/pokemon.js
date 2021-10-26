const { Router } = require("express");
const { Pokemon } = require('../db.js');
const axios = require('axios');

const pokeRouter = Router();

pokeRouter.get("/",async (req,res) => {

    const {name} = req.query;
    if(name) {
        
        try {

            const busquedaNombre = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)

            if(busquedaNombre.data) {

                let pokemon = {

                    id : busquedaNombre.data.id,
                    name: busquedaNombre.data.name,
                    img: busquedaNombre.data.sprites.other['official-artwork'].front_default,
                    hp: busquedaNombre.data.stats[0].base_stat,
                    attack: busquedaNombre.data.stats[1].base_stat,  
                    defense: busquedaNombre.data.stats[2].base_stat,  
                    speed: busquedaNombre.data.stats[5].base_stat,
                    height: busquedaNombre.data.height,
                    weight: busquedaNombre.data.weight

                }

                return res.json(pokemon);
                
            }

            
        } catch(e){console.log(e)}
        
        try {
            
            let instance = await Pokemon.findOne({
                where: {
                    name: name
                }
            })   
            
            if(instance) return res.json(instance)

        } catch{}
        
        return res.send("No se encontro el pokemon")
        
    }

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
            return {
                    id : instance.data.id,
                    name: instance.data.name,
                    img: instance.data.sprites.other['official-artwork'].front_default,
                    hp: instance.data.stats[0].base_stat,
                    attack: instance.data.stats[1].base_stat,  
                    defense: instance.data.stats[2].base_stat,  
                    speed: instance.data.stats[5].base_stat,
                    height: instance.data.height,
                    weight: instance.data.weight
            }
        });

    } catch(e){

        res.send(e);
        
    }


    try{

     instances = await Pokemon.findAll();

    } catch(e){

        res.send(e);

    }
    
    res.json([resultado,instances]);

})

pokeRouter.get("/:id",async (req,res) => {
    
    const {id} = req.params
    let instance;

    if(id.length < 15)
    {   
        try{
            
            instance = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            instance = instance.data
            
            let pokemon = {
                id : instance.id,
                name: instance.name,
                img: instance.sprites.other['official-artwork'].front_default,
                hp: instance.stats[0].base_stat,
                attack: instance.stats[1].base_stat,  
                defense: instance.stats[2].base_stat,  
                speed: instance.stats[5].base_stat,
                height: instance.height,
                weight: instance.weight
            }
         
            res.json(pokemon);

        } catch(e){
             res.send(e);
        }

    } else{

        try{

            instance = await Pokemon.findOne({
            where: {
                id: id
            }
            });

            res.json(instance);

        }catch(e){
            res.send(e);
        }
    }

})

pokeRouter.post("/", async (req,res) => {

    const {name,img,hp,attack,defense,speed,height,weight} = req.body;

    if(name.length === 0) return res.send("El nombre del pokemon no puede estar vacío")

    try{
    
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        return res.send("ERROR: Ya existe un pokemon con este nombre")

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

        return res.json(newPokemon);

    } catch(e){

        res.send(e);

    }

})

module.exports = pokeRouter;