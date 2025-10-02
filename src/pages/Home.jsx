import {useEffect, useState} from "react";
import "./css/Home.css";
import {Helmet} from "react-helmet";
import Cookie_accept from "../components/cookie/cookie_accept.jsx";
import LoadingComponent from "../components/other/Loading.jsx";
import SliderComp from "../components/home/sliderComp.jsx";
import OfferMainComp from "../components/home/OfferMainComp.jsx";
import CardMainComp from "../components/home/cardMainComp.jsx";
import PageLogo from "../components/other/PageLogo.jsx";
import SEO from "../components/SEO.jsx";

const Home = () => {
    const [showButton, setShowButton] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleClick = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    if (loading) {
        return <LoadingComponent/>
    }

    return (
        <div>
            <SEO />

            {showButton && (
                <button className="en-ust-btn" onClick={handleClick}>
                    <svg
                        width="24"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        clipRule="evenodd"
                    >
                        <path d="M23.245 20l-11.245-14.374-11.219 14.374-.781-.619 12-15.381 12 15.391-.755.609z"/>
                    </svg>
                </button>
            )}

                <OfferMainComp loading={(b) => {
                    if (b === false) {
                        setLoading(b);
                    }
                }} />
                <SliderComp
                    loading={(b) => {
                        if (b === false) {
                            setLoading(b);
                        }
                    }} />

                    <CardMainComp
                        loading={(b) => {
                            if (b === false) {
                                setLoading(b);
                            }
                        }} />



            <PageLogo size="25" />
            <Cookie_accept/>
        </div>
    );
};

export default Home;
