import './card.scss';

export default function Card({pokemon}) {

    return (
        <div className='card-wrap'>
            <div className='card grass'>
                <img src={pokemon.data.sprites.other.dream_world.front_default} />
                <div className='content'>
                    <div className='id's>#{pokemon.data.id}</div>
                    <div className='name'>{pokemon.data.name}</div>
                    <div>
                        {pokemon.data.types && pokemon.data.types.map((type,index)=>{
                            return (
                                <span key={index} className='type'>{type.type.name}</span>
                            )
                        })}
                    </div>
                </div>    
            </div>
        </div>
    )
}