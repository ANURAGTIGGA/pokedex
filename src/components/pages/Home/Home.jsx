import { useContext, useEffect, useRef, useState } from "react"
import axios from "axios";
import Card from "../../common/Card/Card";
import './home.scss';
import { Link } from "react-router-dom";
import  PokemonContext from "../../../context/pokemonContext.js";
import Loader from "../../common/Loader/Loader";
import Regions from "../../common/Regions/Regions";

export default function Home() {
    const [pokemons, setPokemons] = useState(null);
    const [todaysPokemons, setTodaysPokemons] = useState(null);
    const [loading, setLoading] = useState(true);
    const url = "https://pokeapi.co/api/v2/pokemon/"//"https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20"
    const { setSelectedPokemon } = useContext(PokemonContext);

    const shouldFetch = useRef(true);

    useEffect(()=>{
        function fetchPokemons(randomList) {
            let promises = [];
            for(let i=0;i<randomList.length;i++){
                promises.push(axios.get(url+randomList[i]))
            }

            Promise.all(promises).then((results) => {
                setPokemons(results);
                setLoading(false);
            })
        }

        function fetchTodaysPokemons() {
            const random = todaysPokemons || generateRandom();
            console.log(random);
            fetchPokemons(random);
            setTodaysPokemons(random);
        }

        function generateRandom() {
            let random = [];
            let date = new Date();
            const limit = localStorage.getItem('randomLimit');
            const randomLimit = date.getMonth().toString() + date.getDate().toString();
            if(limit === randomLimit) return localStorage.getItem('randomList').split(',');
            
            for(let i=0;i<3;i++){
                random.push(Math.floor(Math.random()*randomLimit))
            }
            localStorage.setItem('randomLimit', randomLimit);
            localStorage.setItem('randomList', random);

            return random;
        }

        if(shouldFetch.current){
            shouldFetch.current = false;
            fetchTodaysPokemons();
        }
    },[])

    function onHandleCardClick(pokemon){
        setSelectedPokemon(pokemon);
    }

    return (
        <>
        <div id='home'>
            <h1>TODAY'S POKEMONS</h1>
            <div className='todays-pokemons'>
            {
                pokemons && pokemons.map((pokemon)=>{
                    return (
                        <Link to={`/pokemon/${pokemon.data.id}`} onClick={()=>onHandleCardClick(pokemon)} key={pokemon.data.id} >
                            <Card pokemon={pokemon}></Card>
                        </Link>
                    )
                })
            }
            </div>
            <div>
                {
                    <Regions></Regions>
                }
            </div>
        </div>
        {
            loading && <Loader></Loader>
        }
        </>
    )
}