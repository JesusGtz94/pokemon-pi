import { useHistory } from "react-router-dom"
import LandingDiv from "./landing.styles.js";



const Landing = () => {

    const history = useHistory(); 

    const goHome = () => {

        history.push('/home')

    }

    return(

            <LandingDiv>

                <div className="contenedor">

                    <h3>¡Saludos Entrenador!</h3>

                    <p>¡Bienvenido a la PokeApp! El lugar donde podrás aprender más acerca de los Pokémon y compartir tus descubrimientos con entrenadores de todo el mundo!</p>
                    
                    <div>
                        <button onClick={goHome}>Empezar</button>
                    </div>


                </div>
            </LandingDiv>

    )

}

export default Landing;