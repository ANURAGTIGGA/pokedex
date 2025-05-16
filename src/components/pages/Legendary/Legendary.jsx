import { useEffect, useRef, useState, useContext } from "react";
import legendary from "../../../helper/legendaryData";
import Loader from "../../common/Loader/Loader";
import { Link } from "react-router-dom";
import Card from "../../common/Card/Card";
import  PokemonContext from "../../../context/pokemonContext.js";
import './legendary.scss';
import { fetchPokemons } from "../../../services";
import CardLoader from "../../common/CustomLoader/CardLoader";
import GenericError from "../../common/ErrorState/GenericError";
import ScrollToTop from "../../common/ScrollTop/ScrollToTop.jsx";

export default function Legendary() {
    const fetchLegendary = useRef(true);
    const [legendaryPokemons, setLegendaryPokemons] = useState([]);
    const [error, setError] = useState(false);
    const [retry, setRetry] = useState(false);
    const [loading, setLoading] = useState(true);
    const errorMsg = "Something is broken. Failed to load pokemons."
    const { setSelectedPokemon } = useContext(PokemonContext);
    const targetRef = useRef();

    useEffect(()=>{
        function fetchLegendaryPokemons() {
            try{
                fetchPokemons(legendary, 'name').then((results)=>{
                    if(results.length === 0){
                        setError(true);
                    } else {
                        setLegendaryPokemons(results);
                        setError(false);
                    }
                });
            } catch(err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        
        if(fetchLegendary.current || retry) {
            setLoading(true);
            fetchLegendary.current = false;
            setRetry(false);
            fetchLegendaryPokemons();
        }
    },[retry])

    function onHandleCardClick(pokemon){
        setSelectedPokemon(pokemon);
    }

    function onHandleError() {
        setRetry(true);
    }

    return (
        <div className='legendary-pokemons'>
            <p ref={targetRef} className="heading">Rare and Powerful Pokemons from all regions</p>
            <div className='legendary-pokemons-container'>
                {
                    !loading && legendaryPokemons && legendaryPokemons.map((pokemon)=>{
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
            {<ScrollToTop targetRef={targetRef.current} ></ScrollToTop>}
        </div>
    )
}