import { useEffect, useRef, useState, useContext } from "react";
import legendary from "../../../helper/legendaryData";
import Loader from "../../common/Loader/Loader";
import { Link } from "react-router-dom";
import Card from "../../common/Card/Card";
import  PokemonContext from "../../../context/pokemonContext.js";
import './legendary.scss';
import { fetchPokemons } from "../../../services";
import CardLoader from "../../common/CustomLoader/CardLoader";

export default function Legendary() {
    const fetchLegendary = useRef(true);
    const [legendaryPokemons, setLegendaryPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setSelectedPokemon } = useContext(PokemonContext);

    useEffect(()=>{
        if(fetchLegendary.current) {
            fetchLegendary.current = false;
            fetchPokemons(legendary, 'name').then((results)=>{
                setLegendaryPokemons(results);
                setLoading(false);
            })
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
                {
                loading && (
                    <>
                        <CardLoader></CardLoader>
                        <CardLoader></CardLoader>
                        <CardLoader></CardLoader>
                    </>
                )
            }
            </div>
        </div>
    )
}