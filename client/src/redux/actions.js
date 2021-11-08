export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_TYPES = 'GET_TYPES';
export const POST_POKEMON = 'POST_POKEMON';

export const getPokemons = () => {

    
    return function(dispatch){
        
        
        return fetch("http://127.0.0.1:3001/pokemons")
        .then(r => r.json())
        .then(json => {
            dispatch({type: GET_POKEMONS, payload: json})
        })
        .catch(e =>  dispatch({type: GET_POKEMONS, payload: [[],[]]}))

    }

}

export const getTypes = () => {

    return function(dispatch){
    
        return fetch("http://127.0.0.1:3001/types")
        .then(r => r.json())
        .then(json => {
            dispatch({type: GET_TYPES, payload: json})
        }).catch(e =>  dispatch({type: GET_POKEMONS, payload: []}))
}

}

export const postPokemon = (pokemon) => {

    return {type: POST_POKEMON, payload: pokemon};

}