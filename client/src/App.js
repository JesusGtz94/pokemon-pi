import { Route, HashRouter as Router} from 'react-router-dom';
import Catalogo from './Components/catologe';
import Landing from './Components/landing';
import NavBar from './Components/navBar';
import PostForm from './Components/postForm';
import Posting from './Components/posting';
import SearchPokemon from './Components/searchPokemon';

function App() {
  return (
    <div>
      <Router>

        <Route path="/home">
          <NavBar/>
        </Route>

        <Route exact path="/">
          <Landing/>
        </Route>

        <Route exact path="/home">
        <Catalogo/>  
        </Route>

        <Route path="/home/details/:id/:name">
          <SearchPokemon/>
        </Route>

        <Route path="/home/post">
          <PostForm/>
        </Route>

        <Route path="/home/posting">
          <Posting/>
        </Route>

      </Router>

    </div>

  );
}

export default App;
