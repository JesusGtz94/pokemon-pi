import { darken } from "polished";
import styled from "styled-components";
import { stylesVar } from "./variablesCss";

export const ErrorLi = styled.ul`
    background-color: ${props => stylesVar[props.type]};
    border: solid;
    border-color: ${props => darken(0.4,stylesVar[props.type])};
    border-radius: 1rem;

    text-align: start;
    color: ${props => darken(props.type === 'warning'? 0.6 : 0.4,stylesVar[props.type])};

    padding-top: 0.5rem;
    padding-bottom: 0.5rem;

    margin-left: 0.5rem;

` 