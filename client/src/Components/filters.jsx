import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../redux/actions";
const Filters = ({show, setShow}) => {

    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [filters, setFilters] = useState({origin: 'default', type: 'default', order: 'default', descendent: false});
    const [cambios, setCambios] = useState({origin: 0, type: 0, order: 0});

    const handleOnChangeOrigin = (e) => {
        setFilters({...filters, origin: e.target.value});
    } 


    const handleOnChangeTypes = (e) => {
        setFilters({...filters, type: e.target.value})
    }

    const handleOnChangeOrder = (e) => {
        setFilters({...filters, order: e.target.value});
    }

    const handleOnChangeDescendent = (e) => {
        setFilters({...filters, descendent: e.target.checked})
    }

    useEffect(()=>{ // Trae los types de la db al estado global
        dispatch(getTypes());
    },[dispatch])

    useEffect(() => { // Filtra el arreglo a mostrar segun el origen

        
    if(state.pokemonsApi !== undefined && state.pokemonsDb !== undefined)

        {
            switch(filters.origin){

                case 'default':

                    setShow(oldState =>{return {...oldState, array: [...state.pokemonsApi,...state.pokemonsDb]}});
                    break;

                case 'pokemonsApi':

                    setShow(oldState =>{return {...oldState, array: state.pokemonsApi}});
                    break;

                case 'pokemonsDb':
                    setShow(oldState => {return {...oldState, array: state.pokemonsDb}});
                    break;

                default: 
                    break;

            }
            
            setCambios(oldState =>{return {...oldState, origin: oldState.origin+1}});

    } else {console.log(state)}

    },[filters,state,setShow]);

    useEffect(()=>{ // Filtra el arreglo segun el type del pokemon

        if(filters.type !== 'default')
        {

            let filtered = show.array.filter(poke => {

                for(let i = 0; i < poke.types.length; i++){

                    if(poke.types[i].name === filters.type) return true;

                }

                return false;

            })

           setShow(oldState =>{return {...oldState, array: filtered}})
    }

        setCambios(oldState => {return {...oldState, type: oldState.type+1}})

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ cambios.origin, setShow ])

    useEffect(() => { // Acomoda el arreglo a mostrar segun el order y el descendent

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
                    



                setShow(oldState => {return{...oldState, array: ordered}});
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


                setShow(oldState => {return{...oldState, array: ordered}});
                break;

            default:
                
                if(filters.descendent){

                    setShow(oldState => {return{...oldState, array: ordered.reverse()}});

                }

                break;

            }

            setCambios(oldState => {return{...oldState, order: oldState.order+1}})

            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ cambios.type , filters.descendent, filters.order, setShow]);

    useEffect(()=>{ // Reinicia el paginado cada vez que se modifica un filtro

        setShow(oldState => {return{...oldState, start: 0, end: 9}})

    },[cambios.order, setShow])

    return(

    
        
        <div>
            <select value={filters.origin} onChange={handleOnChangeOrigin}>
                <option value="default">Mostrar Todos</option>
                <option value="pokemonsApi">Pokemons Oficiales</option>
                <option value="pokemonsDb">Pokemons Creados</option>
            </select>
        
            <select value={filters.type} onChange={handleOnChangeTypes}>

                <option value='default'>Todos los tipos</option>

            {state.types
            ? state.types.map(type => {

                return <option key={type.id} value={type.name}>{type.name}</option>

            }) 

            :null}

            </select>

            <select value={filters.order} onChange={handleOnChangeOrder}>
                <option value="default">Fecha de Registro</option>
                <option value="name">Nombre</option>
                <option value="attack">Ataque</option>
            </select>

            <input type="checkbox" id="checkboxOrder" onChange={handleOnChangeDescendent} checked={filters.descendent}/>
            <label htmlFor="checkboxOrder">Descendente</label>

            <button onClick={() => {setFilters({...filters, origin: 'default',type:'default', order:'default',descendent:false})}}>Reset</button>

        </div>
        

    )

}

export default Filters;