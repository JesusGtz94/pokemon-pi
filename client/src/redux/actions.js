export const GET_POKEMONS = 'GET_POKEMONS';

export const getPokemons = () => {

    
    return function(dispatch){
        
        
        return fetch("http://127.0.0.1:3001/pokemons")
        .then(r => r.json())
        .then(json => {
            dispatch({type: GET_POKEMONS, payload: json})
        })

    }

}