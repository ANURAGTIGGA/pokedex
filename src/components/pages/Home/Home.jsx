import { useContext, useEffect, useRef, useState } from "react";
import Card from "../../common/Card/Card";
import './home.scss';
import { Link } from "react-router-dom";
import  PokemonContext from "../../../context/pokemonContext.js";
import Regions from "../../common/Regions/Regions";
import {fetchPokemons} from "../../../services/index";
import CardLoader from "../../common/CustomLoader/CardLoader";
import GenericError from "../../common/ErrorState/GenericError";

export default function Home() {
    const [pokemons, setPokemons] = useState(null);
    const [todaysPokemons, setTodaysPokemons] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [retry, setRetry] = useState(false);
    const { setSelectedPokemon } = useContext(PokemonContext);
    const errorMsg = "Something is broken. Failed to load pokemons."
    const shouldFetch = useRef(true);

    useEffect(()=>{
        function fetchTodaysPokemons() {
            try{
                const random = todaysPokemons || generateRandom();
                fetchPokemons(random).then((results)=>{
                    if(results.length === 0){
                        setError(true);
                    } else {
                        setPokemons(results);
                        setError(false);
                    }
                })
                setTodaysPokemons(random);
            }
            catch(err) {
                setError(true);
            } finally {
                setLoading(false);
            }
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
        
        if(shouldFetch.current || retry){
            shouldFetch.current = false;
            setRetry(false);
            fetchTodaysPokemons();
        }
    },[retry])

    function onHandleCardClick(pokemon){
        setSelectedPokemon(pokemon);
    }

    function onHandleError() {
        setRetry(true);
    }

    return (
        <>
        <div id='home'>
            <h1>TODAY'S POKEMONS</h1>
            <div className='todays-pokemons'>
            {
                pokemons && pokemons.map((pokemon)=>{
                    return (
                        <Link to={`/pokemon/${pokemon.value.data.id}`} onClick={()=>onHandleCardClick(pokemon.value)} key={pokemon.value.data.id} >
                            <Card pokemon={pokemon.value}></Card>
                        </Link>
                    )
                })
            }
            {
                loading && (
                <>
                    <CardLoader></CardLoader>
                    <CardLoader></CardLoader>
                    <CardLoader></CardLoader>
                </>
                )
            }
            {
                error && <GenericError errorMsg={errorMsg} actionText="Try Again" action={onHandleError}></GenericError>
            }
            </div>
            <div>
                {
                    <Regions></Regions>
                }
            </div>
        </div>
        </>
    )
}