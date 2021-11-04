import { useState } from "react";
import { useHistory } from "react-router-dom";



const SearchBar = () => {

   const [inputs, setInputs] = useState({select: 'name', input: ''}); 
   const history = useHistory();

   const handleOnChangeInput = (e) => {

        setInputs(old => {return {...old, input: e.target.value}})

   }

   const handleOnChangeSelect = (e) => {

        setInputs(old => {return {...old, select: e.target.value}})

    }

    const handleSearch = () => {

        if(inputs.select === 'name'){

            history.push(`/home/details/pokemon/${inputs.input.toLowerCase()}`)
            setInputs(old => {return {...old, input: ''}});

        } else {

            history.push(`/home/details/${inputs.input}/pokemon`)
            setInputs(old => {return {...old, input: ''}});

        }

    }

    return(

        <div>
    
            <label htmlFor="inputSearchBar">Selecciona el tipo de búsqueda</label>

            <select value={inputs.select} onChange={handleOnChangeSelect}>
                <option value="name">Nombre</option>
                <option value="id">Id</option>
            </select>

            <input onChange={handleOnChangeInput} value={inputs.input} type="text" placeholder="Ingresa el nombre ó el id..." id="inputSearchBar"/>

            <button disabled={inputs.input === ''} onClick={handleSearch}>Buscar</button>
        </div>

    )

}

export default SearchBar;