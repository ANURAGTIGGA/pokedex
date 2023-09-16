import { Link } from 'react-router-dom';
import './footer.scss';

export default function Footer(){

    return (
        <footer>
            <div>Created by ANURAG with &#10084;&#65039; on &#127758; | 
               <Link to="/about" className='about-me-link'> About me</Link>
            </div>
            <div>Copyright &copy; 2023 All Rights Reserved</div>
        </footer>
    )
}