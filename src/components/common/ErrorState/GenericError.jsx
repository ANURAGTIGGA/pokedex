import genericErrorImg from '../../../assets/images/generic-error.png';
import './genericError.scss';

export default function GenericError({errorMsg, actionText, action}) {

    return (
        <div className='generic-error-wrap'>
            <div className='error-msg'>
                {errorMsg}
            </div>
            <img className='error-img' src={genericErrorImg} />
            <button onClick={action} className='error-cta'>
                {actionText}
            </button>
        </div>
    )
}