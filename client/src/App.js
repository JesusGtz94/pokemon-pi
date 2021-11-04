import { Route, HashRouter as Router, Link } from 'react-router-dom';
import './App.css';
import Catalogo from './Components/catologe';
import NavBar from './Components/navBar';
import PostForm from './Components/postForm';
import Posting from './Components/posting';
import SearchPokemon from './Components/searchPokemon';

function App() {
  return (
    <div className="App">
      <Router>

        <Route path="/home">
          <NavBar/>
        </Route>

        <Route exact path="/">
          <h1>Landing Page</h1>
          <Link to="/home"><button>Home</button></Link>
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
