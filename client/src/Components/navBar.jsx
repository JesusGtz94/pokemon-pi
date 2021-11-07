import { NavLink } from "react-router-dom";
import { NavBarDiv } from "./navBar.styles.js";
import SearchBar from "./searchBar";
import { useHistory } from "react-router-dom";


const NavBar = () => {

    const history = useHistory();

    const goHome = () => {

        history.push('/home')

    }

    return(

        <NavBarDiv>
            
                <div className="bar">


                <img onClick={goHome} width="200rem" src="https://i.imgur.com/T5DtFd6.png" alt="texto" />

                
                    
                        <div className="navs">
                            <NavLink exact to="/home"><p>Home</p></NavLink>
                            <NavLink to="/home/post"><p>Publicar un pokémon</p></NavLink>
                        </div>

                    <SearchBar/>

                </div>

        </NavBarDiv>

    )

}

export default NavBar;