import { darken } from 'polished';
import styled from 'styled-components';
import { stylesVar } from './variablesCss';

const LandingDiv = styled.div`

    background-image: url("https://i.imgur.com/XcTnUv0.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    height: 100vh;

    font-family: ${stylesVar.fatFont};
    color: black;


    .contenedor {

        background-color: rgba(255, 255, 255, 0.94);

        padding: 1rem 2.5rem;

        min-width: 20rem;
        max-width: 25rem;

        border-radius: 2%;

        position: relative;

        margin-left: 26%;

        top: 18%;

        box-shadow: -5px 5px 4px 3px rgba(0,0,0,0.6);
        -webkit-box-shadow: -5px 5px 4px 3px rgba(0,0,0,0.6);
        -moz-box-shadow: -5px 5px 4px 3px rgba(0,0,0,0.6);

        h3{

            font-size: 2.5rem;
            text-align: center;

        }


        div{
            
            margin-top: 5rem;
            margin-bottom: 1.8rem;
            text-align: center;


            button{

                font-size: 3rem;
                border: none;
                border-radius: 0.3rem;
                color: white;
                background-color: ${stylesVar.blue};
                padding: 2% 3%;

                &:hover {

                    background-color: ${darken(0.20, stylesVar.blue)};
                    cursor: pointer;

                }

                


            }



        }

        p{
        font-family: ${stylesVar.mainFont};
        font-weight: ${stylesVar.regular};
        font-size: 1.8rem;
        margin-top: 2rem;
        text-align: center;
    }

    /* @media (max-width: ${stylesVar.phone}){
            top: 0;
            height: 100vh;
            min-width: 100vh;
            background-color: rgba(255, 255, 255, 0.6);
            padding: 0.5rem 1.25rem;
            margin: 1.5rem auto;

            h3{
                text-align: center;
            }
        }
        */
    }



`

export default LandingDiv;