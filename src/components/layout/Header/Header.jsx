import './header.scss';
import pokedexLogo from '../../../assets/images/pokedex.png';

export default function Header() {
    const navList = ['Home', 'Legendary', 'Type']

    return (
        <header>
            <div className="header-container">
                <div className="logo-wrap">
                    <img src={pokedexLogo} />
                    <span></span>
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