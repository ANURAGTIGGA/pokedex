import axios from "axios";
const url = "https://pokeapi.co/api/v2/pokemon/"
//"https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20"

function fetchPokemons(list, name) {
    let promises = list.map((pokemon)=>{
        const path = name ? url+pokemon[name] : url+pokemon;
        return axios.get(path)
    });
    
    return Promise.allSettled(promises).then((results) => {
        results = results.filter((res)=>{
            return res.value;
        });
        return results;
    });
}

export {
    fetchPokemons
}