import { useParams } from "react-router-dom"

export default function PokemonList() {
    const {region} = useParams()

    return (
        <h1>Pokemon List Page : {region} region</h1>
    )
}