import './header.scss';
import pokedexLogo from '../../../assets/images/pokedex.png';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect, useContext } from 'react';
import axios from "axios";
import  PokemonContext from "../../../context/pokemonContext.js";
import regions from '../../../helper/regionData';
import pokeball from '../../../assets/images/pokeball-loader.png'

export default function Header() {
    const [inputPokemon, setInputPokemon] = useState('');
    const [showRegionDropDown, setShowRegionDropDown] = useState(false);
    const [regionActive, setRegionActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const pokemonRef = useRef('');
    const navigate = useNavigate();
    const url = "https://pokeapi.co/api/v2/pokemon/";
    const shouldFetch = useRef(false);
    const { setSelectedPokemon } = useContext(PokemonContext);
    const location = useLocation();

    useEffect(()=>{
        if(location.pathname.includes('pokemons/')){
            setRegionActive(true);
        }else{
            setRegionActive(false);
        }
    },[location])

    useEffect(()=>{
        async function fetchPokemon() {
            try{
                const res = await axios.get(`${url + inputPokemon}`);
                console.log('search pokemon', res);
                await setSelectedPokemon(res);
                navigate('/pokemon/'+inputPokemon);
            } catch(err) {
                setError(true);
                setTimeout(()=>{
                    setError(false);
                    pokemonRef.current.value = "";
                }, 2000)
            } finally{
                pokemonRef.current.value = "";
                setLoading(false);
            }
        }

        if(shouldFetch.current){
            shouldFetch.current = false;
            fetchPokemon();
        }
    },[inputPokemon])

    function redirectToPokemonPage() {
        const input = pokemonRef.current.value;
        if(input.length){
            setLoading(true);
            setInputPokemon(input);
            shouldFetch.current = true;
            setError(false);
        }
    }

    return (
        <header>
            <div className="header-container">
                <div className="logo-wrap">
                    <Link to="/">
                        <img src={pokedexLogo} />
                        <svg viewBox="0 0 300 150">
                            <defs>
                                {/* <!-- Top half of a circle (arc) --> */}
                                <path id="topCurve" d="M 50,100 A 150,100 0 0,1 250,100" />
                            </defs>

                            <text>
                                <textPath href="#topCurve" startOffset="50%" text-anchor="middle">
                                    POKEDEX
                                </textPath>
                            </text>
                            </svg>
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
                        <li onMouseEnter={()=>setShowRegionDropDown(true)} onMouseLeave={()=>setShowRegionDropDown(false)}>
                            <a className={regionActive ? 'active' : ''}>Region</a>
                            {
                                showRegionDropDown && (
                                    <div className='region-dropdown'>
                                        {
                                            regions.map((region)=>{
                                                return (
                                                    <Link to={`/pokemons/${region.name}`} onClick={()=>setShowRegionDropDown(false)} key={region.name}>
                                                        <div className='region'>{region.name}</div>
                                                    </Link>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }
                        </li>
                    </ul>
                </div>
                <div className="search-wrap">
                    <div className={error ? 'error input-wrap' : 'input-wrap'}>
                        <input ref={pokemonRef} type="text" placeholder="Search a Pokemon"></input>
                        <span className='error-msg'>Pokemon not found.</span>
                    </div>
                    {
                        loading ? (
                            <img className='search-loading' src={pokeball} />
                        ) : (
                            <button onClick={redirectToPokemonPage}>Go</button>
                        )
                    }
                </div>
            </div>
        </header>
    )
}