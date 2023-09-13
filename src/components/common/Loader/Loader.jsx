import loader from "../../../assets/images/pokeball-loader.png";
import './loader.scss';

export default function Loader() {

    return (
        <div className='loader'>
            <img src={loader} />
        </div>
    )
}