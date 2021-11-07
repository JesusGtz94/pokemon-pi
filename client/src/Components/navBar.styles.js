import styled from "styled-components";
import { stylesVar } from "./variablesCss";

export const NavBarDiv = styled.div`

    background-color: ${stylesVar.red};
    border-end-end-radius: 3rem;

    font-family: ${stylesVar.mainFont};
    font-size: 1.4rem;

    .bar {

        display: flex;
        justify-content: space-between;
        align-items: center;

        a{
            color: white;
            text-decoration: none;
            margin-left: 1rem;
            font-weight: ${stylesVar.bold};

            &.active{

                color: yellow;

            }

        }

    }

    .navs {

        display: flex;
        width: 30%;
        justify-content: space-evenly;


    }

    .searchBar{

        color: yellow;
        margin-right: 2rem;
        margin-top: 0.6rem;

        display: flex;
        width: 28rem;
        justify-content: space-evenly;

        font-family: ${stylesVar.mainFont};

        select{

            color: white;
            font-family: ${stylesVar.mainFont};
            font-size: 1.4rem;
            background-color: ${stylesVar.red};
            border: none;
            margin-left: 0.5rem;

            &:focus{
                outline: none;
            }

            &:hover{
                cursor: pointer;
            }
        }

        input{

            border: none;
            font-family: ${stylesVar.mainFont};
            font-weight: ${stylesVar.regular};
            font-size: 1rem;
            padding: 0 0.5rem;
            margin: 0 0.5rem;
            

        }

        button{

            background-color: ${stylesVar.blue};
            font-family: ${stylesVar.fatFont};
            font-size: 1.5rem;
            color: white;

            border-end-end-radius: 1rem;

            &:hover{
                cursor: pointer;
            }

        }

    }

    img{

        margin-left: 1rem;
        padding: 0.8rem 0;

        &:hover{

            cursor: pointer;

        }

    }

`