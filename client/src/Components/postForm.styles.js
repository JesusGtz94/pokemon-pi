import { darken } from "polished";
import styled from "styled-components";
import { stylesVar } from "./variablesCss";

export const StyleForm = styled.form`

    background-color: ${stylesVar.red};
    
    width: 94%;
    height: 100%;

    border-end-end-radius: 1rem;
    border-end-start-radius: 1rem;

    padding: 1rem 2.5% 2rem 2.5%;

    margin: 0 auto;

    font-family: ${stylesVar.mainFont};
    font-size: 1.5rem;
    text-align: center;

    display: flex;
    flex-direction: column;

    .box-one{

        width: 100%;

        margin-bottom: 1rem;

        label{
            margin-right: 1rem;
        }

        input{
            margin-right: 0.5rem;
            width: 100%;
            height: 1.3rem;
            border:none;
            color: white;
            font-family: ${stylesVar.mainFont};
            font-size: 1.5rem;
            background-color: ${darken(0.1, stylesVar.red)};

        }

        .imgInput-fix{
                width: 86.8%;
            }
        
    }

    .input-box{
        display: flex;
        align-items: flex-end;
    }

    .box-two{
        display: flex;   
    }

`

export const H2Form = styled.h2`

    background-color: ${darken(0.25, stylesVar.red)};
    width: 94%;
    padding: 0.8% 2.5% 2.5% 2.5%;
    margin: 0 auto -2rem auto;

    text-align: center;
    font-family: ${stylesVar.fatFont};
    font-size: 3rem;
    color: white;

    border-start-end-radius: 1rem;
    border-start-start-radius: 1rem;

    margin-top: 5%;

`
