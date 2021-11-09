import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTypes, postPokemon } from "../redux/actions";
import Errors from "./errores";
import { SelectStyle } from "./filters.styles";
import { HomeButton} from "./pokeDetail.styles";
import { H2Form, StyleForm } from "./postForm.styles";

const PostForm = () => {

    const types = useSelector(state => state.types);
    const dispatch = useDispatch();
    const history = useHistory();
    const [firstCheck , setCheck] = useState(true)
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
            validations : ["Debes colocar un valor en \"vida\"", "El valor debe contener solo numeros", "No se aceptan numeros negativos"]

        },

        attack: {

            isValidate : true,
            validations : ["Debes colocar un valor", "El valor debe contener solo numeros", "No se aceptan numeros negativos"]

        },

        defense: {

            isValidate : true,
            validations : ["Debes colocar un valor", "El valor debe contener solo numeros", "No se aceptan numeros negativos"]

        },

        speed: {

            isValidate : true,
            validations : ["Debes colocar un valor", "El valor debe contener solo numeros", "No se aceptan numeros negativos"]

        },

        height: {

            isValidate : true,
            validations : ["Debes colocar un valor", "El valor debe contener solo numeros", "No se aceptan numeros negativos"]

        },

        weight: {

            isValidate : true,
            validations : ["Debes colocar un valor", "El valor debe contener solo numeros", "No se aceptan numeros negativos"]

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

    const validate = () => {

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

        return approved;

    }

    const handleOnchangeInput = (e) => {

        setInputs(oldState => {return {...oldState, [e.target.name]:e.target.value}});

    }

    const handleSubmit = (e) => {

        e.preventDefault();
        setCheck(false);

        if(validate()){

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

    useEffect(()=> {

        if(!firstCheck){

            validate();

        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[inputs,firstCheck])

    return (

        <>
            
            <H2Form>Publicar un Pokémon</H2Form>

            <StyleForm>

                <div className="box-one">
                    
                    <div className="input-box">
                        <label htmlFor="namePost">Nombre: </label>
                        <input id= "namePost" name="name" type="text" value={inputs.name} onChange={handleOnchangeInput} />
                    </div>

                    {validations.name.isValidate?null:<Errors type="error" errors={validations.name.validations}/>}
                </div>
        
                <div className = "box-two">

                    <div className="box-one">

                        <div className="input-box">
                            <label htmlFor="hpPost">Vida: </label>
                            <input id="hpPost" name="hp" type="number" value={inputs.hp} onChange={handleOnchangeInput}/>
                        </div>

                        {validations.hp.isValidate?null:<Errors type="error" errors={validations.hp.validations}/>}
                    </div>

                    <div className="box-one">
                        <div className="input-box">
                            <label htmlFor="attackPost">Ataque: </label>
                            <input id="attackPost" name="attack" type="number" value={inputs.attack} onChange={handleOnchangeInput}/>
                        </div>

                    {validations.attack.isValidate?null:<Errors type="error" errors={validations.attack.validations}/>}
                    </div>

                </div>

                <div className = "box-two">

                    <div className="box-one">
                        <div className="input-box">
                            <label htmlFor="defensePost">Defensa: </label>
                            <input id="defensePost" name="defense" type="number" value={inputs.defense} onChange={handleOnchangeInput}/>
                        </div>

                        {validations.defense.isValidate?null:<Errors type="error" errors={validations.defense.validations}/>}
                    </div>

                    <div className="box-one">

                        <div className="input-box">
                            <label htmlFor="speedPost">Velocidad: </label>
                            <input id="speedPost" name="speed" type="number" value={inputs.speed} onChange={handleOnchangeInput}/>
                        </div>

                        {validations.speed.isValidate?null:<Errors type="error" errors={validations.speed.validations}/>}
                    </div>

                </div>

                <div className="box-two">

                    <div className="box-one">
                        <div className="input-box">
                            <label htmlFor="heightPost">Tamaño: </label>
                            <input id="heightPost" name="height" type="number" value={inputs.height} onChange={handleOnchangeInput}/>
                        </div>

                        {validations.height.isValidate?null:<Errors type="error" errors={validations.height.validations}/>}
                    </div>

                <div className="box-one">

                    <div className="input-box">
                        <label htmlFor="weightPost">Peso: </label>
                        <input id="weightPost" name="weight" type="number" value={inputs.weight} onChange={handleOnchangeInput}/>
                    </div>

                    {validations.weight.isValidate?null:<Errors type="error" errors={validations.weight.validations}/>}
                </div>

                </div>

                <div className="box-two">

                    <div className="box-one">
                        <div className="input-box">
                            <label htmlFor="typeOnePost">Tipo 1: </label>
                            <SelectStyle name="typeOne" id="typeOnePost" value={inputs.typeOne} onChange={handleOnchangeInput}>
                                <option value='default'>-- Seleccione un tipo --</option>
                                {types.length > 0 
                                    ? types.map(type => {return <option value={type.id} key={type.id}>{type.name}</option>})
                                    : null 
                                }
                            </SelectStyle>
                        </div>

                        {validations.typeOne.isValidate?null:<Errors type="error" errors={validations.typeOne.validations}/>}
                    </div>

                    <div className="box-one">
                        <div className="input-box">
                            <label htmlFor="typeTwoPost">Tipo 2 (opcional): </label>
                            <SelectStyle name="typeTwo" id="typeTwoPost" value={inputs.typeTwo} onChange={handleOnchangeInput}>
                                <option value='default'>n/a</option>
                                {types.length > 0 
                                    ? types.map(type => {return <option value={type.id} key={type.id}>{type.name}</option>})
                                    : null 
                                }
                            </SelectStyle>
                        </div>

                        {validations.typeTwo.isValidate?null:<Errors type="error" errors={validations.typeTwo.validations}/>}
                    </div>

                </div>
                
                <div className="box-one">
                    <div className="input-box">
                        <label htmlFor="imgPost">Imagen url (opcional): </label>
                        <input className="imgInput-fix" id="imgPost" name="img" type="text" value={inputs.img} onChange={handleOnchangeInput}/>
                    </div>
                </div>

                <HomeButton onClick={handleSubmit}>Publicar</HomeButton>

            </StyleForm>

        </>

    )

}

export default PostForm;