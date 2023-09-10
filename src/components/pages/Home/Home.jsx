import { useEffect, useState } from "react"
import axios from "axios";
import Card from "../../common/Card/Card";
import './home.scss';
import { Link } from "react-router-dom";

export default function Home() {
    const [pokemons, setPokemons] = useState(null);
    const [todaysPokemons, setTodaysPokemons] = useState(null);
    const url = "https://pokeapi.co/api/v2/pokemon/"//"https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20"
    let random = [1,2,3];

    useEffect(()=>{
        function fetchPokemons() {
            let promises = [];
            for(let i=0;i<random.length;i++){
                promises.push(axios.get(url+random[i]))
            }

            Promise.all(promises).then((results) => {
                setPokemons(results)
            })
            // const res = await axios.get(url);
            // console.log("result ", res);
            // setPokemons(res.data.results);
        }

        async function fetchTodaysPokemons() {
            let random = [1,2,3];
            // for(let i=0;i<3;i++){
            //     random.push(Math.floor(Math.random()*151))
            // }
            console.log(random);
            setTodaysPokemons(random)
        }

        fetchTodaysPokemons();
        fetchPokemons();
    },[])

    function getLinkPath(id) {
        debugger;
        // /pokemon/{pokemon.data.id}
    }

    return (
        <>
            <div className='todays-pokemons'>
            {
                pokemons && pokemons.map((pokemon)=>{
                    return (
                        <Link to={`/pokemon/${pokemon.data.id}`} key={pokemon.data.id} >
                            <Card pokemon={pokemon}></Card>
                        </Link>
                    )
                })
            }
            </div>
        </>
    )
}