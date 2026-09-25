import { useEffect, useState } from "react";
import "./css/Home.css";
import Cookie_accept from "../components/cookie/cookie_accept.jsx";
import LoadingComponent from "../components/other/Loading.jsx";
import SliderComp from "../components/home/sliderComp.jsx";
import OfferMainComp from "../components/home/OfferMainComp.jsx";
import CardMainComp from "../components/home/cardMainComp.jsx";
import PageLogo from "../components/other/PageLogo.jsx";
import SEO from "../components/SEO.jsx";
import { HiOutlineArrowUp } from "react-icons/hi2";
import { 
    HiOutlineTruck, 
    HiOutlineShieldCheck, 
    HiOutlineArrowPath, 
    HiOutlineCreditCard 
} from "react-icons/hi2";

const Home = () => {
    const [showButton, setShowButton] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
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
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <div className="home-page-container">
            <SEO />

            {/* 1. Ana Hero Kampanya Slider */}
            <main className="home-hero-wrap">
                <OfferMainComp
                    loading={(b) => {
                        if (b === false) setLoading(b);
                    }}
                />
            </main>

            {/* 2. Marka Güven & Ayrıcalık Barı (Editorial Trust Badges) */}
            <section className="home-features-bar">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon-box">
                                <HiOutlineTruck size={20} />
                            </div>
                            <div className="feature-text">
                                <span className="feature-title">Hızlı & Sigortalı Teslimat</span>
                                <span className="feature-desc">Tüm siparişlerde özenli paketleme</span>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon-box">
                                <HiOutlineArrowPath size={20} />
                            </div>
                            <div className="feature-text">
                                <span className="feature-title">14 Gün Kolay İade</span>
                                <span className="feature-desc">Koşulsuz iade ve değişim güvencesi</span>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon-box">
                                <HiOutlineShieldCheck size={20} />
                            </div>
                            <div className="feature-text">
                                <span className="feature-title">Orijinal Ürün Garantisi</span>
                                <span className="feature-desc">%100 onaylı seçkin koleksiyonlar</span>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon-box">
                                <HiOutlineCreditCard size={20} />
                            </div>
                            <div className="feature-text">
                                <span className="feature-title">Güvenli Ödeme Altyapısı</span>
                                <span className="feature-desc">256-bit SSL korumalı işlemler</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Popüler Kategoriler Slider */}
            <SliderComp
                loading={(b) => {
                    if (b === false) setLoading(b);
                }}
            />

            {/* 4. Vitrin / Kampanya Banner Kartları */}
            <CardMainComp
                loading={(b) => {
                    if (b === false) setLoading(b);
                }}
            />

            {/* Alt Marka İmzası */}
            <div className="home-logo-divider">
                <PageLogo size="25" />
            </div>

            {/* Floating 'En Üste Dön' Butonu */}
            <button
                type="button"
                className={`scroll-to-top-btn ${showButton ? "visible" : ""}`}
                onClick={handleClick}
                aria-label="Sayfanın Başına Dön"
            >
                <HiOutlineArrowUp size={20} />
            </button>

            {/* Çerez İzni */}
            <Cookie_accept />
        </div>
    );
};

export default Home;
