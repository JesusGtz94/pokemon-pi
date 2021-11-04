import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokeDetail from "./pokeDetail";


const SearchPokemon = () => {

    const {id, name} = useParams();
    const [pokemon, setPokemon] = useState({});
    
    useEffect(()=>{

        if(id !== 'pokemon'){

                fetch(`http://127.0.0.1:3001/pokemons/${id}`)
                .then(r => r.json())
                .then(json => setPokemon(json))

        } else {

                fetch(`http://127.0.0.1:3001/pokemons?name=${name}`)
                .then(r => r.json())
                .then(json => {setPokemon(json)})

        
        }
    },[id,name])

    return(
        <>
            {pokemon.message || pokemon.sql
            ? <><br/><div>Pokemon no encontrado</div></>
            : <PokeDetail {...pokemon}/>
            }
            
        </>
    )



}

export default SearchPokemon;