import { darken, desaturate } from "polished";
import styled from "styled-components";
import { stylesVar } from "./variablesCss";


export const CardContainer = styled.div`

    display: flex;
    justify-content: center;

    section{

        background-color: ${stylesVar.ligthGray};
        width: 95%;
        border-radius: 0.2rem;
        text-align: center;

    }

    .card-container{

        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;

    }

    .down{
            margin-top: 1rem;
            margin-bottom: 2rem;
        }

`

export const ButtonPage = styled.div`
    
    display: flex;
    justify-content: space-evenly;
    width: 15rem;
    margin: 0 auto;

    button{

        font-family: ${stylesVar.fatFont};
        font-size: 2rem;
        background-color: ${stylesVar.blue};
        border: none;
        padding: 0.5rem 1rem;
        color: white;

        border-end-end-radius: 1rem;
        border-start-end-radius: 1rem;

        &:first-child{
            border-end-end-radius: 0rem;
            border-start-end-radius: 0rem;
            
            border-start-start-radius: 1rem;
            border-end-start-radius: 1rem;
        }

        &:hover{
            cursor: pointer;
            background-color: ${darken(0.1, stylesVar.blue)};
        }

        
        &:active{
            background-color: ${darken(0.3, stylesVar.blue)};
        }

        &:disabled{
            
            background-color: ${desaturate(0.6, stylesVar.blue)};

            &:hover{
                cursor: default;
            }

        }

    }

`