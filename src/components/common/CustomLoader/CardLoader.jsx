import './cardLoader.scss';

export default function CardLoader() {

    return (
        <div className='loader-card-wrap'>
            <div className='card'>
                <div className='default-img'></div>
                
                <div className='content'>
                    <div className='id'>&nbsp;</div>
                    <div className='name'>&nbsp;</div>
                        <span className='type'>&nbsp;</span>
                        <span className='type'>&nbsp;</span>
                </div>    
            </div>
        </div>
    )
}