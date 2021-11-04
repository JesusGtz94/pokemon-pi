import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTypes, postPokemon } from "../redux/actions";
import Errors from "./errores";

const PostForm = () => {

    const types = useSelector(state => state.types);
    const dispatch = useDispatch();
    const history = useHistory();
    const [inputs, setInputs] = useState({

        name: '',
        img: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        typeOne: 'default',
        typeTwo: 'default'       

    })

    const [validations , setValidations] = useState({

        name: {

            isValidate : true,
            validations : ["Debes colocar un nombre","El nombre debe tener almenos tres caracteres", "El nombre no puede contener números"]

        },

        hp: {

            isValidate : true,
            validations : ["Debes colocar un valor en \"vida\"", "El valor debe contener solo numeros", "No se aceptan numero negativos"]

        },

        attack: {

            isValidate : true,
            validations : ["Debes colocar un valor", "El valor debe contener solo numeros", "No se aceptan numero negativos"]

        },

        defense: {

            isValidate : true,
            validations : ["Debes colocar un valor", "El valor debe contener solo numeros", "No se aceptan numero negativos"]

        },

        speed: {

            isValidate : true,
            validations : ["Debes colocar un valor", "El valor debe contener solo numeros", "No se aceptan numero negativos"]

        },

        height: {

            isValidate : true,
            validations : ["Debes colocar un valor", "El valor debe contener solo numeros", "No se aceptan numero negativos"]

        },

        weight: {

            isValidate : true,
            validations : ["Debes colocar un valor", "El valor debe contener solo numeros", "No se aceptan numero negativos"]

        },

        typeOne: {

            isValidate : true,
            validations : ["El tipo 1 es obligatorio"]

        },

        typeTwo: {

            isValidate : true,
            validations : ["El tipo 2 no puede ser igual al tipo 1", "Tipo 1 debe tener un valor obligatoriamente"]

        }

    });

    const handleOnchangeInput = (e) => {

        setInputs(oldState => {return {...oldState, [e.target.name]:e.target.value}});

    }

    const handleSubmit = (e) => {

        e.preventDefault();

        let approved = true;

        if(inputs.name === '' || !/^([^0-9]*)$/.test(inputs.name) || inputs.name.length < 3){

            setValidations(oldState => {return {...oldState, name: {...oldState.name, isValidate: false}}});
            approved = false;

        } else {
            setValidations(oldState => {return {...oldState, name: {...oldState.name, isValidate: true}}});
        }

        if(inputs.hp === '' || !/^\d+$/.test(inputs.hp)){

            setValidations(oldState => {return {...oldState, hp: {...oldState.hp, isValidate: false}}});
            approved = false;

        } else {

            setValidations(oldState => {return {...oldState, hp: {...oldState.hp, isValidate: true}}});

        }

        if(inputs.attack === '' || !/^\d+$/.test(inputs.attack)){

            setValidations(oldState => {return {...oldState, attack: {...oldState.attack, isValidate: false}}});
            approved = false;

        } else {

            setValidations(oldState => {return {...oldState, attack: {...oldState.attack, isValidate: true}}});

        }

        if(inputs.defense === '' || !/^\d+$/.test(inputs.defense)){

            setValidations(oldState => {return {...oldState, defense: {...oldState.defense, isValidate: false}}});
            approved = false;

        } else {

            setValidations(oldState => {return {...oldState, defense: {...oldState.defense, isValidate: true}}});

        }

        if(inputs.speed === '' || !/^\d+$/.test(inputs.speed)){

            setValidations(oldState => {return {...oldState, speed: {...oldState.speed, isValidate: false}}});
            approved = false;

        } else {

            setValidations(oldState => {return {...oldState, speed: {...oldState.speed, isValidate: true}}});

        }

        if(inputs.height === '' || !/^\d+$/.test(inputs.height)){

            setValidations(oldState => {return {...oldState, height: {...oldState.height, isValidate: false}}});
            approved = false;

        } else {

            setValidations(oldState => {return {...oldState, height: {...oldState.height, isValidate: true}}});

        }

        if(inputs.weight === '' || !/^\d+$/.test(inputs.weight)){

            setValidations(oldState => {return {...oldState, weight: {...oldState.weight, isValidate: false}}});
            approved = false;

        } else {

            setValidations(oldState => {return {...oldState, weight: {...oldState.weight, isValidate: true}}});

        }

        if(inputs.typeOne === 'default'){

            setValidations(oldState => {return {...oldState, typeOne: {...oldState.typeOne, isValidate: false}}});
            approved = false;

        } else {

            setValidations(oldState => {return {...oldState, typeOne: {...oldState.typeOne, isValidate: true}}});

        }

        if(inputs.typeTwo === inputs.typeOne){

            setValidations(oldState => {return {...oldState, typeTwo: {...oldState.typeTwo, isValidate: false}}});
            approved = false;

        } else {

            setValidations(oldState => {return {...oldState, typeTwo: {...oldState.typeTwo, isValidate: true}}});

        }

        if(approved){

            let pokemon = {

                name: inputs.name.toLowerCase(),
                img: inputs.img,
                hp: parseInt(inputs.hp),
                attack: parseInt(inputs.attack),
                defense: parseInt(inputs.defense),
                speed: parseInt(inputs.speed),
                height: parseInt(inputs.height),
                weight: parseInt(inputs.weight),
                type: inputs.typeTwo !== 'default'
                    ? [parseInt(inputs.typeOne),parseInt(inputs.typeTwo)]
                    : [parseInt(inputs.typeOne)]

            }

            dispatch(postPokemon(pokemon));

            history.push('/home/posting')
            
            }

        }

    useEffect(()=>{

        if(types.length < 1){
            dispatch(getTypes())
        }

    },[dispatch, types.length])

    return (

        <form>

            <label htmlFor="namePost">Nombre: </label>
            <input id= "namePost" name="name" type="text" value={inputs.name} onChange={handleOnchangeInput} />

            {validations.name.isValidate?null:<Errors errors={validations.name.validations}/>}

            <label htmlFor="imgPost">Imagen url (opcional): </label>
            <input id="imgPost" name="img" type="text" value={inputs.img} onChange={handleOnchangeInput}/>

    
            <label htmlFor="hpPost">Vida: </label>
            <input id="hpPost" name="hp" type="number" value={inputs.hp} onChange={handleOnchangeInput}/>

            {validations.hp.isValidate?null:<Errors errors={validations.hp.validations}/>}
            
            <label htmlFor="attackPost">Ataque: </label>
            <input id="attackPost" name="attack" type="number" value={inputs.attack} onChange={handleOnchangeInput}/>

            {validations.attack.isValidate?null:<Errors errors={validations.attack.validations}/>}

            <label htmlFor="defensePost">Defensa: </label>
            <input id="defensePost" name="defense" type="number" value={inputs.defense} onChange={handleOnchangeInput}/>

            {validations.defense.isValidate?null:<Errors errors={validations.defense.validations}/>}

            <label htmlFor="speedPost">Velocidad: </label>
            <input id="speedPost" name="speed" type="number" value={inputs.speed} onChange={handleOnchangeInput}/>

            {validations.speed.isValidate?null:<Errors errors={validations.speed.validations}/>}

            <label htmlFor="heightPost">Tamaño: </label>
            <input id="heightPost" name="height" type="number" value={inputs.height} onChange={handleOnchangeInput}/>

            {validations.height.isValidate?null:<Errors errors={validations.height.validations}/>}

            <label htmlFor="weightPost">Peso: </label>
            <input id="weightPost" name="weight" type="number" value={inputs.weight} onChange={handleOnchangeInput}/>

            {validations.weight.isValidate?null:<Errors errors={validations.weight.validations}/>}
            
            <label htmlFor="typeOnePost">Tipo 1: </label>
            <select name="typeOne" id="typeOnePost" value={inputs.typeOne} onChange={handleOnchangeInput}>
                <option value='default'>-- Seleccione un tipo --</option>
                {types.length > 0 
                    ? types.map(type => {return <option value={type.id} key={type.id}>{type.name}</option>})
                    : null 
                }
            </select>

            {validations.typeOne.isValidate?null:<Errors errors={validations.typeOne.validations}/>}

            <label htmlFor="typeTwoPost">Tipo 2 (opcional): </label>
            <select name="typeTwo" id="typeTwoPost" value={inputs.typeTwo} onChange={handleOnchangeInput}>
                <option value='default'>n/a</option>
                {types.length > 0 
                    ? types.map(type => {return <option value={type.id} key={type.id}>{type.name}</option>})
                    : null 
                }
            </select>

            {validations.typeTwo.isValidate?null:<Errors errors={validations.typeTwo.validations}/>}

            <button onClick={handleSubmit}>Publicar</button>

        </form>

    )

}

export default PostForm;