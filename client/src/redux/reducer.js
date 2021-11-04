import { GET_POKEMONS, GET_TYPES, POST_POKEMON } from "./actions";

const initialState = {

    pokemonsApi: [],
    pokemonsDb: [],
    types: [],
    postPokemon: []

}

const reducer = (state = initialState, action) => {

    switch(action.type){

        case GET_POKEMONS:
            return {
                ...state,
                pokemonsApi: action.payload[0],
                pokemonsDb: action.payload[1]
            }

        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }

        case POST_POKEMON:
            return {
                ...state,
                postPokemon: action.payload
            }

        default: 
            return state; 

    }

}

export default reducer;