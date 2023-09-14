import loader from "../../../assets/images/pokeball.png";
import './loader.scss';

export default function Loader() {

    return (
        <div className='loader'>
            <img src={loader} />
        </div>
    )
}