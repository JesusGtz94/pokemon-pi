import { darken } from "polished";
import styled from "styled-components";
import { stylesVar } from "./variablesCss";

export const DetailDiv = styled.div`

    display: flex;
    background-color: ${props => props.type ? stylesVar.typesColor[props.type] : '#4a4a4a'};

    border-radius: 1rem;
    width: 80%;

    margin: auto;

    font-family: ${stylesVar.mainFont};
    font-size: 1.5rem;
    color: white;
    text-align: center;

    span{
        color: yellow;
        font-family: ${stylesVar.fatFont};
        margin-right: 1rem;
    }

    .rectangle{

        background-color: rgba(0,0,0,0.5);
        border-radius: 1rem;

        padding-left: 1rem;
        padding-right: 1rem;

        border: solid;
        border-color: ${props => props.type ? darken (0.2, stylesVar.typesColor[props.type]) : '#4a4a4a'};

    }

    .data-container{
        
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        width: 100%;
        margin-left: 1rem;
        margin-right: 1rem;

    }

    .container{

        display: flex;

        margin-top: -0.98rem;

        justify-content: space-between;
        
        & > * {
            width: 25%;
        }

    }

    .margin-fix{
        margin-top: -1.98rem;
    }

    .element{

        padding-top: 0.8rem;
        padding-bottom: 0.8rem;

    }

    img{
        height: 30rem;
        max-width: 30rem;
    }
`

export const HomeButton = styled.button`
    
    font-family: ${stylesVar.fatFont};
    font-size: 3rem;
    color: white;

    background-color: ${stylesVar.blue};
    margin-top: 2rem;
    padding: 0.3rem 1rem;

    border:none;
    border-radius: 1rem;

    &:hover{

        background-color: ${darken(0.1, stylesVar.blue)};
        cursor: pointer;

    }

    &:active{
        background-color: ${darken(0.2, stylesVar.blue)};
    }

`

export const WhiteBackground = styled.div`

    text-align: center;
    margin: 0 auto;
    background-color: ${stylesVar.ligthGray};
    padding-top: 4rem;

    height: 100vh;
    width: 90%;

`