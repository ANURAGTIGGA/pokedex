import './aboutMe.scss';
import profileImg from '../../../assets/images/profile.png';
import linkedInImg from '../../../assets/images/linkedin.png';

export default function AboutMe() {
    const zetaWebsite = "https://www.zeta.tech/in/";

    return (
        <div className="about-page">
            <h1>About Me</h1>
            <img className="profile-img" src={profileImg} />
            <p>
                Hello, my name is <b>Anurag Aron Tigga</b> and I am a passionate frontend developer currently working in <a href={zetaWebsite} target="_blank">Zeta</a>, India.
            </p>
            <p>Apart from work I really enjoy running, calisthenics and basketball.</p>
            <div className="social-wrap">
                <p>Find me on 
                    <a className="badge-base__link LI-simple-link" href="https://in.linkedin.com/in/anurag-aron-tigga-972367186?trk=profile-badge" target="_blank">
                        <img className="linkenin" src={linkedInImg} />
                    </a>
                </p>
            </div>
        </div>
    )
}