import { useEffect, useRef, useState, useContext } from "react";
import legendary from "../../../helper/legendaryData";
import axios from "axios";
import Loader from "../../common/Loader/Loader";
import { Link } from "react-router-dom";
import Card from "../../common/Card/Card";
import  PokemonContext from "../../../context/pokemonContext.js";
import './legendary.scss';

export default function Legendary() {
    const fetchLegendary = useRef(true);
    const [legendaryPokemons, setLegendaryPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const url = "https://pokeapi.co/api/v2/pokemon/";
    const { setSelectedPokemon } = useContext(PokemonContext);

    useEffect(()=>{
        function fetchLegendaryPokemons() {
            let promises = legendary.map((pokemon)=>{
                return axios.get(url+pokemon.name);
            });

            Promise.allSettled(promises).then((results) => {
                results = results.filter((res)=>{
                    return res.value
                });
                setLegendaryPokemons(results);
                setLoading(false);
            })
        }

        if(fetchLegendary.current) {
            fetchLegendary.current = false;
            fetchLegendaryPokemons();
        }
    },[])

    function onHandleCardClick(pokemon){
        setSelectedPokemon(pokemon);
    }

    return (
        <div className='legendary-pokemons'>
            <div className='legendary-pokemons-container'>
                {
                    legendaryPokemons && legendaryPokemons.map((pokemon)=>{
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