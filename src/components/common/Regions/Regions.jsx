import regions from '../../../helper/regionData';
import './regions.scss';
import pokeball from '../../../assets/images/pokeball-loader.png'
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Regions() {
    const regionList = useRef();
    // function onHandleScroll() {
    //     if (regionList.current) {
    //         // 👇 Will scroll smoothly to the top of the next section
    //         regionList.current.scrollIntoView({ behavior: 'smooth' });
    //       }
    // }

    return (
        <div className='regions'>
            <p className='regions-note'>
                <span>SELECT A</span>
                <span className='region-text'>REGION</span>
                <span>TO EXPLORE MORE</span>
                <span className='mon-text'>MONS</span>
            </p>
            {/* <p>
                <span>P </span>
                <img onMouseEnter={onHandleScroll} src={pokeball} />
                <span> KEMONS</span>
            </p> */}
            <div className='region-list' ref={regionList}>
            {
                regions.map((region)=>{
                    return (
                        <Link to={`/pokemons/${region.name}`} key={region.name} className={region.name}>
                            <img src={region.imgUrl} />
                            <div key={region.name} className='region overlay'>{region.name}</div>
                        </Link>
                    )
                })
            }
            </div>
        </div>
    )
}