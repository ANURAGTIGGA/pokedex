import { useContext, useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./pokemon.scss";
import  PokemonContext from "../../../context/pokemonContext.js";

export default function Pokemon() {
    const {id} = useParams();
    const [pokeId, setPokeId] = useState(id)
    const [pokemon, setPokemon] = useState(null);
    const [evolution, setEvolution] = useState([]);
    const imgUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";
    const fallbackUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
    const url = "https://pokeapi.co/api/v2/pokemon/";
    const {selectedPokemon, setSelectedPokemon} = useContext(PokemonContext);

    const shouldFetch = useRef(true);
    const evolutionClicked = useRef(false);

    useEffect(()=>{
        async function fetchPokemonData() {
            let res;
            if(selectedPokemon.data && !evolutionClicked.current){
                res = selectedPokemon;
            } else {
                res = await axios.get(`${url + pokeId}`);
            }
            
            console.log("result ", res);
            const species = await axios.get(res.data.species.url);
            const evolutionRes = await axios.get(species.data.evolution_chain.url);
            
            let evolves_to = evolutionRes.data.chain;
            let evolution = [];
            while(evolves_to) {
                const key = evolves_to.species ? evolves_to.species.url : evolves_to[0].species.url;
                evolution.push(getImgUrl(key));
                if(evolves_to.evolves_to.length === 0) break;
                evolves_to = evolves_to.evolves_to[0];
            }
            console.log('evolution', evolution)
            setPokemon(res.data);
            setEvolution(evolution);
        }

        function getImgUrl(url) {
            const temp = url.split('/');
            const id = temp[temp.length-2]
            return {
                url: imgUrl + id + '.svg',
                fallback: fallbackUrl + id + '.png',
                id
            }
        }
        
        if(shouldFetch.current){
            shouldFetch.current = false;
            fetchPokemonData();
            evolutionClicked.current = false;
        }
    },[pokeId])

    function onHandleEvolutionClick(id) {
        shouldFetch.current = true;
        evolutionClicked.current = true;
        setPokeId(id);
    }

    return (
        <div id='pokemon'>
            {
                pokemon ? (
                    <div className='card grass'>
                        <img className='pokemon-img' src={pokemon.sprites.other.dream_world.front_default || pokemon.sprites.other['official-artwork'].front_default} />
                        <div className='content'>
                            <div className='id'>#{pokemon.id}</div>
                            <div className='name'>{pokemon.name}</div>
                            <div>
                                {pokemon.types && pokemon.types.map((type,index)=>{
                                    return (
                                        <span key={index} className='type'>{type.type.name}</span>
                                    )
                                })}
                            </div>
                            <div className='stats'>
                                <div className="stat">
                                    <span className='label'>Height</span>
                                    <span className='value'>{pokemon.height}</span>
                                </div>
                                <div className="stat">
                                    <span className='label'>Weight</span>
                                    <span className='value'>{pokemon.weight}</span>
                                </div>
                                <div className="stat abilities">
                                    <span className='label'>Abilities</span>
                                    <span className='value'>
                                    {
                                        pokemon.abilities.map((item,index)=>{
                                            return (
                                                <span key={index} className='ability'>{item.ability.name}</span>
                                            )
                                        })
                                    }
                                    </span>
                                </div>
                            </div>
                            <p>Evolutions</p>
                            <div className='evolutions'>
                                    {
                                        evolution && evolution.map((item)=>{
                                            return (
                                                <div key={item.id} className='pokemon'>
                                                    <Link to={`/pokemon/${item.id}`}>
                                                        <img onClick={()=>onHandleEvolutionClick(item.id)} src={pokemon.sprites.other.dream_world.front_default ? item.url : item.fallback} ></img>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    }
                            </div>
                        </div>    
                    </div>
                ) : (
                    <p>...Loading</p>
                )
            }
        </div>
    )
}