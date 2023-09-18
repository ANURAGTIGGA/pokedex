import fallbackImg from '../assets/images/default.png';

const imageOnError = (event) => {
    event.currentTarget.src = fallbackImg;
    event.currentTarget.className = "error";
};

export {
    imageOnError
}