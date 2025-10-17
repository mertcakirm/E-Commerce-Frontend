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
import {IoIosArrowUp} from "react-icons/io";

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
                    <IoIosArrowUp size={30} color="black" />
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
