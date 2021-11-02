import { GET_POKEMONS } from "./actions";

const initialState = {

    pokemonsApi: [],
    pokemonsDb: [],
    allPokemons: []

}

const reducer = (state = initialState, action) => {

    switch(action.type){

        case GET_POKEMONS:
            return {
                ...state,
                pokemonsApi: action.payload[0],
                pokemonsDb: action.payload[1],
                allPokemons: [...action.payload[0],...action.payload[1]]
            }

        default: 
            return state; 

    }

}

export default reducer;