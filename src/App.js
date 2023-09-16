import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.scss';
import Header from './components/layout/Header/Header';
import Home from './components/pages/Home/Home';
import Pokemon from './components/pages/Pokemon/Pokemon';
import PokemonList from './components/pages/PokemonList/PokemonList';
import Layout from './components/layout/Layout/Layout';
import Legendary from './components/pages/Legendary/Legendary';
import Footer from './components/layout/Footer/Footer';
import AboutMe from './components/pages/AboutMe/AboutMe';

function App() {
  return (
    <div className="App">
      <Layout>
        <Header></Header>
        <div className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemons/:region" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<Pokemon />} />
          <Route path="/legendary" element={<Legendary />} />
          <Route path="/about" element={<AboutMe />} />
        </Routes>
        </div>
        <Footer></Footer>
      </Layout>
    </div>
  );
}

export default App;
