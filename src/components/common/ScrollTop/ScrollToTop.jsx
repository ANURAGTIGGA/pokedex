import './scrollToTop.scss';
import { useState, useEffect } from 'react';

export default function ScrollToTop({targetRef}) {
    const [showScroll, setShowScroll] = useState(false);

    useEffect(()=>{
        const observer = new IntersectionObserver(
            ([entry]) => {
                if(!entry.isIntersecting) {
                    setShowScroll(true);
                } else {
                    setShowScroll(false);
                }
            },
            {
                threshold: 0,
            }
        );

        if(targetRef) {
            observer.observe(targetRef);
        }

        return () => {
            if(targetRef) {
                observer.unobserve(targetRef);
            }
        }

    }, [targetRef]);

    function scrollTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <>
        {showScroll && <div className="scroll-top" onClick={scrollTop}>SCROLL TO TOP</div>}
        </>
    )
}