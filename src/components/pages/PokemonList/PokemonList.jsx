import { useEffect, useRef, useState, useContext } from "react";
import { useLocation, useParams } from "react-router-dom"
import regions from '../../../helper/regionData';
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "../../common/Card/Card";
import  PokemonContext from "../../../context/pokemonContext.js";
import './pokemonList.scss';
import { fetchPokemons } from "../../../services";
import CardLoader from "../../common/CustomLoader/CardLoader";
import GenericError from "../../common/ErrorState/GenericError";
import ScrollToTop from "../../common/ScrollTop/ScrollToTop";

export default function PokemonList() {
    const errorState = {
        "errorMsg": "Something is broken. Failed to load pokemons.",
        "state": false
    }
    const {region} = useParams();
    const [regionName, setRegionName] = useState(region);
    const fetchList = useRef(true);
    const [error, setError] = useState(errorState);
    const [retry, setRetry] = useState(false);
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setSelectedPokemon } = useContext(PokemonContext);
    const location = useLocation();
    const targetRef = useRef();

    useEffect(() => {
        scrollTop();
      }, []);

    useEffect(()=>{
        async function getPokedex() {
            try{
                const pokedex = regions.filter((item)=>{
                    if(item.name === region.toLowerCase()) return item;
                });
                if(pokedex.length === 0) {
                    setError({
                        "errorMsg": "Invalid route. No such region found!",
                        "state": true
                    });
                    setLoading(false);
                } else {
                    const entries = await axios.get(pokedex[0].pokedex);
                    filterEntries(entries.data.pokemon_entries);
                    setError({
                        ...error,
                        "state": false
                    });
                }
            } catch(err) {
                setError(errorState);
            }
        }
        function filterEntries(entries) {
            try{
                const finalEntries = entries.map((entry)=>{
                    const item = entry.pokemon_species.url.split('/');
                    return item[item.length-2]
                })
                
                fetchPokemons(finalEntries).then((results) => {
                    if(results.length === 0){
                        setError({
                            ...errorState,
                            "state": true
                        });
                        setLoading(false);
                    } else {
                        setPokemons(results);
                        setLoading(false);
                        setError({
                            ...error,
                            "state": false
                        });
                    }
                })
            } catch(err) {
                setError(errorState);
                setLoading(false);
            }
        }
        
        if(fetchList.current || region !== regionName || retry){
            setLoading(true);
            fetchList.current = false;
            getPokedex();
            setRegionName(region);
        }
    },[location, retry]);

    function scrollTop() {
        window.scrollTo(0, 0);
    }

    function onHandleCardClick(pokemon){
        setSelectedPokemon(pokemon);
    }

    function onHandleError() {
        setRetry(true);
    }

    return (
        <div className='pokemon-list'>
        <p ref={targetRef} className="heading">Pokemons from <span className='region-name'>{region}</span> region</p>
        <div className='pokemon-container'>
            {
                !loading && pokemons && pokemons.map((pokemon)=>{
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
                error.state && <GenericError errorMsg={error.errorMsg} actionText="Try Again" action={onHandleError}></GenericError>
            }
        </div>
        {<ScrollToTop targetRef={targetRef.current} ></ScrollToTop>}
        </div>
    )
}