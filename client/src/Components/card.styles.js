import { lighten } from "polished";
import styled from "styled-components";
import { stylesVar } from "./variablesCss";

export const DivCard = styled.div`

    background-color: ${props => stylesVar.typesColor[props.type]};
    color: white;
    width: 20rem;
    padding: 1rem;
    border-radius: 1rem;
    text-align: center;
    font-family: ${stylesVar.mainFont};
    font-size: 1.5rem;

    border:solid;
    border-color: rgba(0,0,0,0.2);
    border-width: 0.3rem;

    margin: 1rem 0;

    transition: transform 0.25s;

    &:hover{

        cursor: pointer;
        transform: scale(1.2);

    }

    &:after{
        background-color: black;
    }

    img{
        height: 18rem;
    }

    span{   

            color: yellow;
            font-weight: ${stylesVar.bold};

        }

    .back-box{

        border:solid;
        border-color: rgba(0,0,0,0.2);
        border-width: 0.2rem;

        background-color: rgba(0,0,0,0.5);
        border-radius: 0.4rem;
        

    }

    .one-box{

        text-align: left;

        span{
            margin-left: 1.5rem;
        }

    }

    .two-box{

        margin: -2rem 0;

        div{

            display: flex;
            justify-content: space-around;

            p{

                width: 50%;

                &:first-child{
                    margin-right: 0.8rem;
                }
            }

        }

    }

    .three-box{

        div{

            display: flex;
            justify-content: space-around;

            p{
                width: 33%;

                &:nth-child(2n){
                    margin: auto 1rem;
                }
            }

        }

    }


`