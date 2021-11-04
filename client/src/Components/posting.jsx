import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { postPokemon } from "../redux/actions";
import Errors from "./errores";

const Posting = () => {

    const pokemon = useSelector(state => state.postPokemon);
    const dispatch = useDispatch();
    const history = useHistory();

    const [response, setResponse] = useState({});

    const backToHome = () => {

        history.push('/home')

    }
    
    useEffect(()=>{

        if(pokemon.name){

            fetch('http://127.0.0.1:3001/pokemons', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                  'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(pokemon)
            })
            .then(r => r.json())
            .then(r => setResponse(r));
            
            dispatch(postPokemon({}));

        }

    },[pokemon,dispatch])    


    return (
        <div>
            <h2>Estado de la públicacion</h2>
        {response.hp
            ?   <div>Pokemon publicado con éxito!!</div>
            :   response.errors
                ? <Errors errors={["Pokémon no publicado","Este pokémon ya se encuentra registrado ó existe otro con el mismo nombre","Intenta nuevamente con un nombre diferente"]}/>
                : <Errors errors={["No hay un pókemon para publicar"]}/>
        }

            <button onClick={backToHome}>Volver al Home</button>

        </div>

    )

}

export default Posting;