import regions from '../../../helper/regionData';
import './regions.scss';
import pokeball from '../../../assets/images/pokeball-loader.png'
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Regions() {
    const regionList = useRef()
    function onHandleScroll() {
        if (regionList.current) {
            // 👇 Will scroll smoothly to the top of the next section
            regionList.current.scrollIntoView({ behavior: 'smooth' });
          }
    }

    return (
        <div className='regions'>
            <p className='regions-note'>Select a Region below to explore more Pokemons !!</p>
            <img onMouseEnter={onHandleScroll} src={pokeball} />
            <div className='region-list' ref={regionList}>
            {
                regions.map((region)=>{
                    return (
                        <Link to={`/pokemons/${region.name}`} key={region.name}>
                            <div key={region.name} className='region'>{region.name}</div>
                        </Link>
                    )
                })
            }
            </div>
        </div>
    )
}