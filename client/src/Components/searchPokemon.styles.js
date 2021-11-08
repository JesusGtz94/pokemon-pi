import styled from "styled-components";
import { stylesVar } from "./variablesCss";

export const NoFoundDiv = styled.div`

    display: flex;
    flex-direction: column;
    
    margin: 0 auto;

    font-family: ${stylesVar.fatFont};
    font-size: 4rem;
    text-align: center;

    width: 50rem;

    button{
        width: 10rem;
        align-self: center;
    }

`