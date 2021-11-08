import { useEffect, useState } from "react";
import { useParams , useHistory } from "react-router-dom";
import PokeDetail from "./pokeDetail";
import { HomeButton } from "./pokeDetail.styles";
import { NoFoundDiv } from "./searchPokemon.styles";


const SearchPokemon = () => {

    const {id, name} = useParams();
    const [pokemon, setPokemon] = useState({});
    const history = useHistory();

    const goHome = () => {
        history.push('/home')
    }

    useEffect(()=>{

        if(id !== 'pokemon'){

                fetch(`http://127.0.0.1:3001/pokemons/${id}`)
                .then(r => r.json())
                .then(json => setPokemon(json))
                .catch(e => setPokemon(false))

        } else {

                fetch(`http://127.0.0.1:3001/pokemons?name=${name}`)
                .then(r => r.json())
                .then(json => {setPokemon(json)})
                .catch(e => setPokemon(false))
        
        }
    },[id,name])

    return(
        <>
            {!pokemon || pokemon.message || pokemon.sql
            ? <>
                <br/>
                <NoFoundDiv>
                Pokémon no encontrado 
                <HomeButton onClick={goHome}>Home</HomeButton>
                </NoFoundDiv>
              </>
            : <PokeDetail {...pokemon}/>
            }
            
        </>
    )



}

export default SearchPokemon;