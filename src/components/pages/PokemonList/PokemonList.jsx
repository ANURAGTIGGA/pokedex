import { useEffect, useRef, useState, useContext } from "react";
import { useLocation, useParams } from "react-router-dom"
import regions from '../../../helper/regionData';
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "../../common/Card/Card";
import  PokemonContext from "../../../context/pokemonContext.js";
import Loader from "../../common/Loader/Loader";
import './pokemonList.scss';
import { fetchPokemons } from "../../../services";

export default function PokemonList() {
    const {region} = useParams();
    const [regionName, setRegionName] = useState(region);
    const fetchList = useRef(true);
    const [error, setError] = useState(null);
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setSelectedPokemon } = useContext(PokemonContext);
    const location = useLocation();

    useEffect(()=>{
        async function getPokedex() {
            const pokedex = regions.filter((item)=>{
                if(item.name === region.toLowerCase()) return item;
                else{
                    setError('404');
                }
            });
            const entries = await axios.get(pokedex[0].pokedex);
            filterEntries(entries.data.pokemon_entries);
        }
        function filterEntries(entries) {
            const finalEntries = entries.map((entry)=>{
                const item = entry.pokemon_species.url.split('/');
                return item[item.length-2]
            })
            
            fetchPokemons(finalEntries).then((results) => {
                setPokemons(results);
                setLoading(false);
            })
        }
        
        if(fetchList.current || region !== regionName){
            fetchList.current = false;
            getPokedex();
            setRegionName(region);
        }
    },[location])

    function onHandleCardClick(pokemon){
        setSelectedPokemon(pokemon);
    }

    return (
        <div className='pokemon-list'>
        <h1>Pokemons from <span className='region-name'>{region}</span> region</h1>
        <div className='pokemon-container'>
            {
                pokemons && pokemons.map((pokemon)=>{
                    return (
                        <Link to={`/pokemon/${pokemon.value.data.id}`} onClick={()=>onHandleCardClick(pokemon.value)} key={pokemon.value.data.id} >
                            <Card pokemon={pokemon.value}></Card>
                        </Link>
                    )
                })
            }
        </div>
        {
            loading && <Loader></Loader>
        }
        </div>
    )
}