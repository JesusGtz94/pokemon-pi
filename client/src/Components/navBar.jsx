import { NavLink } from "react-router-dom";
import SearchBar from "./searchBar";

const NavBar = () => {

    return(

        <div>
            <div>
                <NavLink to="/home"><p>Home</p></NavLink>
                <NavLink to="/home/post"><p>Publicar un pokemon</p></NavLink>
            </div>
            <SearchBar/>
        </div>

    )

}

export default NavBar;