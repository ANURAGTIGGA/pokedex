import './header.scss';
import pokedexLogo from '../../../assets/images/pokedex.png';
import { Link } from 'react-router-dom';

export default function Header() {
    const navList = ['Home', 'Legendary', 'Type']

    return (
        <header>
            <div className="header-container">
                <div className="logo-wrap">
                    <Link to="/">
                        <img src={pokedexLogo} />
                        <span></span>
                    </Link>
                </div>
                <div className="navigation-wrap">
                    <ul>
                        {
                            navList.map((item,index)=>{
                                return (
                                    <li key={index}>{item}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="search-wrap">
                    <input type="text" placeholder="Search a Pokemon"></input>
                </div>
            </div>
        </header>
    )
}