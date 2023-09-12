import { createContext, useState } from "react";
import PokemonContext from "../../../context/pokemonContext.js";

export default function Layout({children}) {
    const [selectedPokemon, setSelectedPokemon] = useState({});

    return (
        <PokemonContext.Provider value={{selectedPokemon, setSelectedPokemon}}>
            {children}
        </PokemonContext.Provider>
    )
}