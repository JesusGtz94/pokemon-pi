import { darken } from "polished";
import styled from "styled-components";
import { stylesVar } from "./variablesCss";

export const SelectStyle = styled.select`

    background: none;
    border: none;
    color: white;
    font-family: ${stylesVar.mainFont};
    font-weight: ${stylesVar.bold};
    font-size: 1.6rem;

    &:focus{
        outline: none;
    }

    &:hover{
        cursor: pointer;
    }

    option{
        background-color: ${stylesVar.blue};
    }

`
export const FiltersDiv = styled.div`

    display: flex;
    justify-content: space-evenly;


    color: yellow;

    background-color: ${darken(0.1,stylesVar.red)};
    border-end-end-radius: 0.5rem;
    border-end-start-radius: 0.5rem;

    font-family: ${stylesVar.fatFont};
    font-size: 1.8rem;
    padding: 1rem;

    button{
        
        background-color: gray;

        border-radius: 100%;
        border: none;

        font-family: ${stylesVar.fatFont};
        font-size: 1.5rem;
        color: white;

        margin-left: 5rem;

        padding: 1rem 0.5rem;

        &:hover {

            cursor: pointer;
            background-color: ${darken(0.2,stylesVar.red)};

        }

        &:active{
            background-color: ${darken(0.5,stylesVar.red)};
        }

    }

`

export const LabelInput = styled.div`

    display: flex;
    align-content: center;
    align-items: center;
    
    input{

        margin: 0rem 0.5rem 0.4rem 3rem; 

        &:hover{
            cursor: pointer;
        }

    }

    label{
        margin-right: 1rem;
    }

`
