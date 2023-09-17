import './card.scss';
import fallbackImg from '../../../assets/images/default.png';

export default function Card({pokemon}) {
    const imageOnError = (event) => {
        event.currentTarget.src = fallbackImg;
        event.currentTarget.className = "error";
    };
    
    return (
        <div className='card-wrap'>
            <div className={pokemon.data.types[0].type.name + ' card'}>
                {
                    (pokemon.data.sprites.other.dream_world.front_default || pokemon.data.sprites.other['official-artwork'].front_default) ? (
                        <img src={pokemon.data.sprites.other.dream_world.front_default || pokemon.data.sprites.other['official-artwork'].front_default}
                        />
                        // onError={imageOnError}
                    ) : (
                        <div className='default-img'></div>
                    )
                }
                
                <div className='content'>
                    <div className='id'>#{pokemon.data.id}</div>
                    <div className='name'>{pokemon.data.name}</div>
                    <div>
                        {pokemon.data.types && pokemon.data.types.map((type,index)=>{
                            return (
                                <span key={index} className={type.type.name + ' type'}>{type.type.name}</span>
                            )
                        })}
                    </div>
                </div>    
            </div>
        </div>
    )
}