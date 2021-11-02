import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Filters = ({show, setShow}) => {

    const state = useSelector(state => state);

    const [filters, setFilters] = useState({origin: 'default', order: 'default', descendent: false});
    const [cambios, setCambios] = useState(0);

    const handleOnChangeOrigin = (e) => {
        setFilters({...filters, origin: e.target.value});
    }

    const handleOnChangeOrder = (e) => {
        setFilters({...filters, order: e.target.value});
    }

    const handleOnChangeDescendent = (e) => {
        setFilters({...filters, descendent: e.target.checked})
    }

    useEffect(() => {
        
        switch(filters.origin){

            case 'default':

                setShow({...show, array: [...state.pokemonsApi,...state.pokemonsDb]});
                break;

            case 'pokemonsApi':

                setShow({...show, array: state.pokemonsApi});
                break;

            case 'pokemonsDb':
                setShow({...show, array: state.pokemonsDb});
                break;

            default: 
                break;

        }

        setCambios(cambios+1);

    },[filters,state]);

    useEffect(() => {

        let ordered = [...show.array];
        
        switch(filters.order){

            
            case 'name': 

                    ordered.sort((a,b) => {
                        
                        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                        return 0;
                        
                    })

                    if(filters.descendent){

                        ordered = ordered.reverse();

                    }
                    



                setShow({...show, array: ordered});
                break;


            case 'attack':

                ordered.sort((a,b) => {

                    if(a.attack > b.attack) return 1;
                    if(a.attack < b.attack) return -1;
                    return 0;

                })

                if(filters.descendent){

                    ordered = ordered.reverse();

                }


                setShow({...show, array: ordered});
                break;

            default:
                
                if(filters.descendent){

                    setShow({...show, array: ordered.reverse()});

                }

                break;

            }

    },[cambios])


    return(

        
        <div>
            <select value={filters.origin} onChange={handleOnChangeOrigin}>
                <option value="default">Mostrar Todos</option>
                <option value="pokemonsApi">Pokemons Oficiales</option>
                <option value="pokemonsDb">Pokemons Creados</option>
            </select>

            <select value={filters.order} onChange={handleOnChangeOrder}>
                <option value="default">Fecha de Registro</option>
                <option value="name">Nombre</option>
                <option value="attack">Ataque</option>
            </select>

            <input type="checkbox" id="checkboxOrder" onChange={handleOnChangeDescendent} checked={filters.descendent}/>
            <label htmlFor="checkboxOrder">Descendente</label>

            <button onClick={() => setFilters({...filters, origin: 'default', order:'default',descendent:false})}>Reset</button>
        </div>
        

    )

}

export default Filters;