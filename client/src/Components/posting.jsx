import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { postPokemon } from "../redux/actions";
import Errors from "./errores";
import { HomeButton } from "./pokeDetail.styles";
import { PostingDiv } from "./posting.styles";

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

        <PostingDiv>
            <h2>Estado de la públicacion</h2>
        {response.hp
            ?   <div className="error"><Errors type="success" errors={["Pokémon publicado con éxito"]}/></div>
            :   response.errors
                ? <div className="error"><Errors type="error" errors={["Pokémon no publicado","Este pokémon ya se encuentra registrado ó existe otro con el mismo nombre","Intenta nuevamente con un nombre diferente"]}/></div>
                : <div className="error"><Errors type="warning" errors={["Publicando, espera un momento por favor","Si este mensaje dura demasiado por favor intentalo nuevamente"]}/></div>
        }

            <HomeButton onClick={backToHome}>Volver al Home</HomeButton>

        </PostingDiv>

    )

}

export default Posting;