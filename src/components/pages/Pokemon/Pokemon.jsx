import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./pokemon.scss";

export default function Pokemon() {
    const {id} = useParams();
    const [pokemon, setPokemon] = useState(null);
    const url = "https://pokeapi.co/api/v2/pokemon/";

    useEffect(()=>{
        async function fetchPokemonData() {
            const res = await axios.get(`${url + id}`);
            console.log("result ", res);
            setPokemon(res.data);
        }

        fetchPokemonData()
    },[])


    return (
        <div id='pokemon'>
            {
                pokemon ? (
                    <div className='card grass'>
                        <img src={pokemon.sprites.other.dream_world.front_default} />
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
                        </div>    
                    </div>
                ) : (
                    <p>...Loading</p>
                )
            }
        </div>
    )
}