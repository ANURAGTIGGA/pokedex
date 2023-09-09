import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.scss';
import Header from './components/layout/Header/Header';
import Home from './components/pages/Home/Home';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
