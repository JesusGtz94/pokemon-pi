import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { getPokemons } from "../redux/actions";
import Card from "./card";
import { ButtonPage, CardContainer } from "./cataloge.styles";
import Filters from "./filters";

const Catalogo = () => {

    const [show, setShow] = useState({

        start: 0,
        end: 9,
        array: []

    });

    const dispatch = useDispatch();

    useEffect(() => { // Cargar pokemons al estado de redux al iniciar el componente

        dispatch(getPokemons());
 
    },[dispatch])

    const nextHandle = (e) => { // Control del boton next

        e.preventDefault();
        setShow({...show, start: show.end, end: show.end + 12});
        

    }

    const backHandle = (e) => { // Control del boton back

        e.preventDefault();

        if(show.start !== 9)
        {   
            setShow({...show, start: show.start - 12, end: show.end - 12})   

        } else {

            setShow({...show, start: 0, end: 9})

        }
    }


    return (

            <CardContainer>

                <section>

                    <Filters show={show} setShow={setShow}/>

                    <br/>
                <ButtonPage>
                        <button disabled={ show.start===0
                                ? true
                                : false
                            } onClick={backHandle}>Back</button>

                        <button disabled={ show.array 
                                ? show.array[show.end] === undefined
                                    ? true 
                                    : false
                                : true
                        } onClick={nextHandle}>Next</button>
                </ButtonPage>

                <div className="card-container">

                    {show.array.length > 0
                    ? show.array.slice(show.start,show.end)
                        .map(poke => <Card key = {poke.id} {...poke}/>) 
                    : <div className="alert"><h2>No hay pokemons para mostrar</h2></div>}

                </div>

                <ButtonPage className="down">
                        <button disabled={ show.start===0
                                ? true
                                : false
                            } onClick={backHandle}>Back</button>

                        <button disabled={ show.array 
                                ? show.array[show.end] === undefined
                                    ? true 
                                    : false
                                : true
                        } onClick={nextHandle}>Next</button>
                </ButtonPage>

                </section>

            </CardContainer>
    )

}

export default Catalogo;