import './header.scss';
import pokedexLogo from '../../../assets/images/pokedex.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect, useContext } from 'react';
import axios from "axios";
import  PokemonContext from "../../../context/pokemonContext.js";

export default function Header() {
    const navList = ['Home', 'Legendary', 'Type'];
    const [inputPokemon, setInputPokemon] = useState('')
    const pokemonRef = useRef('');
    const navigate = useNavigate();
    const url = "https://pokeapi.co/api/v2/pokemon/";
    const shouldFetch = useRef(false);
    const { setSelectedPokemon } = useContext(PokemonContext);

    useEffect(()=>{
        async function fetchPokemon() {
            const res = await axios.get(`${url + inputPokemon}`);
            console.log('search pokemon', res);
            await setSelectedPokemon(res);
            navigate('/pokemon/'+inputPokemon);
        }

        if(shouldFetch.current){
            shouldFetch.current = false;
            fetchPokemon();
        }
    },[inputPokemon])

    function redirectToPokemonPage() {
        const input = pokemonRef.current.value;
        if(input.length){
            setInputPokemon(input);
            shouldFetch.current = true;
            pokemonRef.current.value = "";
            //navigate('/pokemon/'+input);
        }
    }

    return (
        <header>
            <div className="header-container">
                <div className="logo-wrap">
                    <Link to="/">
                        <img src={pokedexLogo} />
                        <span></span>
                    </Link>
                </div>
                <div className="navigation-wrap">
                    <ul>
                        <li>
                        <NavLink 
                            to='/'
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >Home</NavLink>
                        </li>
                        <li>
                        <NavLink 
                            to='/legendary'
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >Legendary</NavLink>
                        </li>
                        <li>Region</li>
                    </ul>
                </div>
                <div className="search-wrap">
                    {/* <input ref={inputPokemon} type="text" placeholder="Search a Pokemon"></input> */}
                    {/* <Link to={`/pokemon/`+inputPokemon.current.value} >
                            Go
                        </Link> 
                        onChange={(e)=>setInputPokemon(e.target.value)}
                        */}
                    <input ref={pokemonRef} type="text" placeholder="Search a Pokemon"></input>
                    <button onClick={redirectToPokemonPage}>Go</button>
                </div>
            </div>
        </header>
    )
}