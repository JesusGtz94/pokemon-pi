import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { getPokemons } from "../redux/actions";
import Card from "./card";
import Filters from "./filters";

const Catalogo = () => {

    const [show, setShow] = useState({

        start: 0,
        end: 9,
        array: []

    });

    const dispatch = useDispatch();

    
    const handleClic = (e) => { // Control del boton actualizar

        e.preventDefault();
        dispatch(getPokemons())

    };

    useEffect(() => { // Cargar pokemons al estado de redux al iniciar el componente

        dispatch(getPokemons());
 
    },[])

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

        <div style = {{color: "yellow"}}> 

        <Filters show={show} setShow={setShow}/>
        
        <div>   <button onClick={handleClic}>Actualizar</button>    </div>

        {show.array
        ? show.array.slice(show.start,show.end)
            .map(poke => <Card key = {poke.id} {...poke}/>) 
        : null}

        <button disabled={show.start===0?true:false} onClick={backHandle}>Back</button>
        <button disabled={show.array[show.end] === undefined? true : false} onClick={nextHandle}>Next</button>

        </div>


    )

}

export default Catalogo;