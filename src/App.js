import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.scss';
import Header from './components/layout/Header/Header';
import Home from './components/pages/Home/Home';
import Pokemon from './components/pages/Pokemon/Pokemon';
import PokemonList from './components/pages/PokemonList/PokemonList';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<Pokemon />} />
      </Routes>
    </div>
  );
}

export default App;