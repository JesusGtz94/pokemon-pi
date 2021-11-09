import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../redux/actions";
import { FiltersDiv, LabelInput, SelectStyle } from "./filters.styles";

const Filters = ({setShow}) => {

    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [filters, setFilters] = useState({origin: 'default', type: 'default', order: 'default', descendent: false});
    
    const handleOnChangeOrigin = (e) => { //Control de cambios filtro de origen
        setFilters({...filters, origin: e.target.value});
    } 
    
    const handleOnChangeTypes = (e) => { //Control de cambios filtro de tipos
        setFilters({...filters, type: e.target.value})
    }
    
    const handleOnChangeOrder = (e) => { //Control de cambios filtro de orden
        setFilters({...filters, order: e.target.value});
    }
    
    const handleOnChangeDescendent = (e) => { //Control de cambios filtro ascendente o descendente
        setFilters({...filters, descendent: e.target.checked})
    }
    
    useEffect(()=>{ // Trae los types de la db al estado global
        dispatch(getTypes());
    },[dispatch])

    useEffect(()=>{ // Filtrado de los pokemon

        if(state.pokemonsApi !== undefined && state.pokemonsDb !== undefined)
        {
                let filtered = [...state.pokemonsApi,...state.pokemonsDb];

                switch(filters.origin){ // Filtro de origen (db o api)

                    case 'pokemonsApi':

                        filtered = [...state.pokemonsApi];
                        break;

                    case 'pokemonsDb':

                        filtered = [...state.pokemonsDb];
                        break;

                    default: 
                        break;
                }


                if(filters.type !== 'default') // Filtro de tipo
                {
        
                    filtered = filtered.filter(poke => {
        
                        for(let i = 0; i < poke.types.length; i++){
        
                            if(poke.types[i].name === filters.type) return true;
        
                        }
        
                        return false;
        
                    })
                }
        

                switch(filters.order){ // Acomodo del array

                    case 'name': 
        
                            filtered.sort((a,b) => {
                                
                                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                                return 0;
                                
                            })  
                            
                            break;
        
        
                    case 'attack':
        
                        filtered.sort((a,b) => {
        
                            if(a.attack > b.attack) return 1;
                            if(a.attack < b.attack) return -1;
                            return 0;
        
                        })
        
                        break;
        
                        default:
                        break;
        
                }

                if(filters.descendent){ //Descendente o ascendente
        
                    filtered = filtered.reverse();

                }
    
                setShow(oldState => {return {...oldState, array: filtered}});
        }
    },[filters,state,setShow]);

    useEffect(()=>{ // Reinicia el paginado cada vez que se modifica un filtro

        setShow(oldState => {return{...oldState, start: 0, end: 9}})

    },[filters, setShow])

    return(
        
        <FiltersDiv>

            <LabelInput>

                <label htmlFor="origen">Origen: </label>

                <SelectStyle id= "origen"value={filters.origin} onChange={handleOnChangeOrigin}>
                    <option value="default">Mostrar Todos</option>
                    <option value="pokemonsApi">Pokemons Oficiales</option>
                    <option value="pokemonsDb">Pokemons Creados</option>
                </SelectStyle>

            </LabelInput>

            <LabelInput>

                <label htmlFor="tipo"> Tipo: </label>

                <SelectStyle id="tipo" value={filters.type} onChange={handleOnChangeTypes}>

                    <option value='default'>Todos los tipos</option>

                {state.types
                ? state.types.map(type => {

                    return <option key={type.id} value={type.name}>{type.name}</option>

                }) 

                :null}

                </SelectStyle>

            </LabelInput>
            
            <LabelInput>

                <label htmlFor="orden"> Ordenar por: </label>

                <SelectStyle id="orden" value={filters.order} onChange={handleOnChangeOrder}>
                    <option value="default">Fecha de Registro</option>
                    <option value="name">Nombre</option>
                    <option value="attack">Ataque</option>
                </SelectStyle>

                <input type="checkbox" id="checkboxOrder" onChange={handleOnChangeDescendent} checked={filters.descendent}/>
                <label htmlFor="checkboxOrder">Descendente</label>

                <button onClick={() => {setFilters({...filters, origin: 'default',type:'default', order:'default',descendent:false})}}>Reset</button>

            </LabelInput>
        </FiltersDiv>
        

    )

}

export default Filters;


// Codigo antiguo, guardado aqui por si hiciera falta 

 // const [cambios, setCambios] = useState({origin: 0, type: 0, order: 0});
    
    // useEffect(() => { // Filtra el arreglo a mostrar segun el origen

        
    // if(state.pokemonsApi !== undefined && state.pokemonsDb !== undefined)

    //     {
    //         switch(filters.origin){

    //             case 'default':

    //                 setShow(oldState =>{return {...oldState, array: [...state.pokemonsApi,...state.pokemonsDb]}});
    //                 break;

    //             case 'pokemonsApi':

    //                 setShow(oldState =>{return {...oldState, array: state.pokemonsApi}});
    //                 break;

    //             case 'pokemonsDb':
    //                 setShow(oldState => {return {...oldState, array: state.pokemonsDb}});
    //                 break;

    //             default: 
    //                 break;

    //         }
            
    //         setCambios(oldState =>{return {...oldState, origin: oldState.origin+1}});

    // }

    // },[filters,state,setShow]);

    // useEffect(()=>{ // Filtra el arreglo segun el type del pokemon

    //     if(filters.type !== 'default')
    //     {

    //         let filtered = show.array.filter(poke => {

    //             for(let i = 0; i < poke.types.length; i++){

    //                 if(poke.types[i].name === filters.type) return true;

    //             }

    //             return false;

    //         })

    //        setShow(oldState =>{return {...oldState, array: filtered}})
    // }

    //     setCambios(oldState => {return {...oldState, type: oldState.type+1}})

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[ cambios.origin, setShow ])

    // useEffect(() => { // Acomoda el arreglo a mostrar segun el order y el descendent
        
    //     let ordered = [...show.array];
        
    //     switch(filters.order){

    //         case 'name': 

    //                 ordered.sort((a,b) => {
                        
    //                     if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    //                     if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    //                     return 0;
                        
    //                 })

    //                 if(filters.descendent){

    //                     ordered = ordered.reverse();

    //                 }
                    



    //             setShow(oldState => {return{...oldState, array: ordered}});
    //             break;


    //         case 'attack':

    //             ordered.sort((a,b) => {

    //                 if(a.attack > b.attack) return 1;
    //                 if(a.attack < b.attack) return -1;
    //                 return 0;

    //             })

    //             if(filters.descendent){

    //                 ordered = ordered.reverse();

    //             }


    //             setShow(oldState => {return{...oldState, array: ordered}});
    //             break;

    //         default:
                
    //             if(filters.descendent){

    //                 setShow(oldState => {return{...oldState, array: ordered.reverse()}});

    //             }

    //             break;

    //         }

    //         setCambios(oldState => {return{...oldState, order: oldState.order+1}})

    //         // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[ cambios.type , setShow]);