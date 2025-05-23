import {useState} from "react";
import {Helmet} from "react-helmet";
import Navbar from "../components/childcomponents/navbar";
import Footer from "../components/childcomponents/footer";
import "./css/sss.css";

const Sss = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupContent, setPopupContent] = useState(null);
    const [popupbaslik, setPopupBaslik] = useState(null);
    const contents = [
        {
            id: "siparislerim-1",
            content: (
                <div>
                    Nasıl sipariş verebilirim? Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed,
                    convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "siparislerim-2",
            content: (
                <div>
                    Siparişim tarafıma ulaşmadı, ne yapmalıyım? Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit. Sed sit amet nulla auctor,
                    vestibulum magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "siparislerim-3",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "siparislerim-4",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "siparislerim-5",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "kargo-1",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "kargo-2",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "kargo-3",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "kargo-4",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "kargo-5",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "odeme-1",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "odeme-2",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "odeme-3",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "odeme-4",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "odeme-5",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "iade-1",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "iade-2",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "iade-3",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "iade-4",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "iade-5",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "uyelik-1",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "uyelik-2",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "uyelik-3",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "uyelik-4",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "uyelik-5",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "diger-1",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "diger-2",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "diger-3",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "diger-4",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
        {
            id: "diger-5",
            content: (
                <div>
                    Sipariş vermek için üye olmalı mıyım? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum
                    magna sed, convallis ex.
                </div>
            ),
            popupbaslik: (
                <div className="popup-card-baslik">Nasıl sipariş verebilirim?</div>
            ),
        },
    ];

    const handleButtonClick = (id) => {
        const content = contents.find((item) => item.id === id);
        if (content) {
            setPopupContent(content.content);
            setPopupBaslik(content.popupbaslik);
            setShowPopup(true);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };
    return (
        <div>
            <Helmet>
                <title>Sıkça Sorulan Sorular</title>
                <meta
                    name="description"
                    content="Mob Wear olarak yeni modaya hitap ediyor ve buna göre ürünleri sizler için üretiyoruz."
                />
                <meta
                    name="keywords"
                    content="tişört,pantolon,giyim,moda,erkek giyim"
                />
                <meta name="author" content="MOB WEAR"/>
                <meta property="og:title" content="Kaliteli Kıyafetler"/>
                <meta
                    property="og:description"
                    content="Mob Wear olarak yeni modaya hitap ediyor ve buna göre ürünleri sizler için üretiyoruz."
                />
                <meta property="og:image" content="URL_of_image"/>
                <meta property="og:url" content="URL_of_your_website"/>
                <meta property="og:type" content="website"/>
            </Helmet>
            <Navbar/>
            <div className="for-bg">
                <img
                    className="bg-image img-fluid w-100"
                    src="https://img.freepik.com/premium-photo/there-is-painting-road-that-is-field-generative-ai_974521-7512.jpg"
                    alt=""
                />
                <div className="container-fluid sss-container py-5">
                    <div className="row sss-row">
                        <div className="col-12">
                            <p className="sss-baslik">Sıkça Sorulan Sorular</p>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="sss-card">
                                <div className="sss-card-baslik">
                                    <svg
                                        width="34"
                                        height="34"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    >
                                        <path
                                            d="M13.403 24h-13.403v-22h3c1.231 0 2.181-1.084 3-2h8c.821.916 1.772 2 3 2h3v9.15c-.485-.098-.987-.15-1.5-.15l-.5.016v-7.016h-4l-2 2h-3.897l-2.103-2h-4v18h9.866c.397.751.919 1.427 1.537 2zm5.097-11c3.035 0 5.5 2.464 5.5 5.5s-2.465 5.5-5.5 5.5c-3.036 0-5.5-2.464-5.5-5.5s2.464-5.5 5.5-5.5zm0 2c1.931 0 3.5 1.568 3.5 3.5s-1.569 3.5-3.5 3.5c-1.932 0-3.5-1.568-3.5-3.5s1.568-3.5 3.5-3.5zm2.5 4h-3v-3h1v2h2v1zm-15.151-4.052l-1.049-.984-.8.823 1.864 1.776 3.136-3.192-.815-.808-2.336 2.385zm6.151 1.052h-2v-1h2v1zm2-2h-4v-1h4v1zm-8.151-4.025l-1.049-.983-.8.823 1.864 1.776 3.136-3.192-.815-.808-2.336 2.384zm8.151 1.025h-4v-1h4v1zm0-2h-4v-1h4v1zm-5-6c0 .552.449 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.551 0-1 .448-1 1z"/>
                                    </svg>
                                    <p>SİPARİŞLERİM</p>
                                </div>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("siparislerim-1")}
                                >
                                    Nasıl sipariş verebilirim?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("siparislerim-2")}
                                >
                                    Siparişim tarafıma ulaşmadı, ne yapmalıyım?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("siparislerim-3")}
                                >
                                    Sipariş vermek için üye olmalı mıyım?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("siparislerim-4")}
                                >
                                    Üye olmanın avantajları nelerdir?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("siparislerim-5")}
                                >
                                    Şifremi unuttum, ne yapmalıyım?
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="sss-card">
                                <div className="sss-card-baslik">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{marginTop: "-15px"}}
                                        width="34"
                                        height="34"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M13.838 8.076l-.171.098v.858l.171-.098v-.858zm1.412.054l-.171.098v-.859l.171-.098v.859zm-4.367-8.13l-4.883 2.758v5.753l6.125 3.489 4.875-2.775v-5.754l-6.117-3.471zm-.001 1.149l4.557 2.585-.851.458-4.511-2.589.805-.454zm.618 9.344l-4.5-2.563v-4.095l4.5 2.609v4.049zm.509-4.91l-4.43-2.569 1.022-.584 4.409 2.61-1.001.543zm3.991 3.06l-3.5 1.993v-4.181l1-.539v1.428l1.5-.844v-1.393l1-.539v4.075zm-2.453.458l-.175.098v-.858l.175-.099v.859zm.702-.401l-.172.098v-.859l.172-.098v.859zm.287-.163l-.171.098v-.859l.171-.098v.859zm.292-.166l-.175.099v-.859l.175-.099v.859zm5.172 5.004v-3.213c0-.77.506-1.162 1.008-1.162.498 0 .992.383.992 1.163v4.086c0 .796-.071 1.179-.573 2.092-.793 1.441-2.242 4.807-2.242 7.66h-5.002s-.559-2.759-.763-3.942c-.411-2.377.126-3.471 1.109-4.485 1.021-1.053 1.527-1.551 1.995-2.035 1.081-1.121 2.552.194 1.694 1.222-.468.561-1.624 1.803-1.901 2.171-.268.356.231.857.624.447.573-.599 1.905-2.083 2.365-2.618.443-.517.694-.829.694-1.386zm-16 0v-3.213c0-.77-.506-1.162-1.008-1.162-.498 0-.992.383-.992 1.163v4.086c0 .796.071 1.179.573 2.092.793 1.441 2.242 4.461 2.242 7.66h5.002s.559-2.759.763-3.942c.411-2.377-.126-3.471-1.109-4.485-1.021-1.053-1.527-1.551-1.995-2.035-1.081-1.121-2.552.194-1.694 1.222.468.561 1.624 1.803 1.901 2.171.268.356-.231.857-.624.447-.573-.599-1.905-2.083-2.365-2.618-.443-.517-.694-.829-.694-1.386z"/>
                                    </svg>
                                    <p>KARGO</p>
                                </div>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("kargo-1")}
                                >
                                    Kargo ücretsiz mi?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("kargo-2")}
                                >
                                    Siparişim hangi kargo ile teslim edilecek?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("kargo-3")}
                                >
                                    Türkiye'nin her yerine teslimat yapıyor musunuz?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("kargo-4")}
                                >
                                    Kargom ne zaman ulaşır?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("kargo-5")}
                                >
                                    Teslimat adresinde bulunmazsam ne olur?
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="sss-card">
                                <div className="sss-card-baslik">
                                    <svg
                                        width="34"
                                        height="34"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    >
                                        <path
                                            d="M22 3c.53 0 1.039.211 1.414.586s.586.884.586 1.414v12c0 .53-.211 1.039-.586 1.414s-.884.586-1.414.586h-8v2h1v1h-6v-1h1v-2h-8c-.53 0-1.039-.211-1.414-.586s-.586-.884-.586-1.414v-12c0-.53.211-1.039.586-1.414s.884-.586 1.414-.586h20zm-20 2v12h20v-12h-20zm2 8h2v1h-2v-1zm0-2h3v1h-3v-1zm0-2h4v1h-4v-1zm7 0h9v1h-9v-1zm0 2h9v1h-9v-1zm0 2h9v1h-9v-1zm-2-7c1.152 0 2.08.428 2.78 1.285s1.05 2.12 1.22 3.215c.015.095.063.187.123.247s.138.108.223.123c1.095.17 2.48.484 3.365 1.28.797.696 1.285 1.628 1.285 2.78 0 1.152-.428 2.08-1.285 2.78-.884.796-2.27 1.11-3.365 1.28-.085.015-.165.063-.223.123-.06.06-.108.152-.123.247-.17 1.095-.484 2.48-1.28 3.365-.696.797-1.628 1.285-2.78 1.285-1.152 0-2.08-.428-2.78-1.285-.796-.884-1.11-2.27-1.28-3.365-.015-.095-.063-.187-.123-.247s-.152-.108-.247-.123c-1.095-.17-2.48-.484-3.365-1.28-.797-.696-1.285-1.628-1.285-2.78 0-1.152.428-2.08 1.285-2.78.884-.796 2.27-1.11 3.365-1.28.095-.015.187-.063.247-.123s.108-.152.123-.247c.17-1.095.484-2.48 1.28-3.365.696-.797 1.628-1.285 2.78-1.285zm0 1.5c-.76 0-1.336.261-1.78.78-.428.505-.712 1.236-.86 2.095-.13.743-.237 1.157-.56 1.5-.343.343-.757.43-1.5.56-.859.148-1.59.432-2.095.86-.519.444-.78 1.02-.78 1.78 0 .76.261 1.336.78 1.78.505.428 1.236.712 2.095.86.743.13 1.157.237 1.5.56.343.343.43.757.56 1.5.148.859.432 1.59.86 2.095.444.519 1.02.78 1.78.78.76 0 1.336-.261 1.78-.78.428-.505.712-1.236.86-2.095.13-.743.237-1.157.56-1.5.343-.343.757-.43 1.5-.56.859-.148 1.59-.432 2.095-.86.519-.444.78-1.02.78-1.78 0-.76-.261-1.336-.78-1.78-.505-.428-1.236-.712-2.095-.86-.743-.13-1.157-.237-1.5-.56-.343-.343-.43-.757-.56-1.5-.148-.859-.432-1.59-.86-2.095-.444-.519-1.02-.78-1.78-.78z"/>
                                    </svg>
                                    <p>ÖDEME</p>
                                </div>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("odeme-1")}
                                >
                                    Hangi ödeme yöntemlerini kullanabilirim?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("odeme-2")}
                                >
                                    Havale veya EFT ile ödeme yapabilir miyim?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("odeme-3")}
                                >
                                    Kapıda ödeme var mı?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("odeme-4")}
                                >
                                    Yurtdışına teslimat yapıyor musunuz?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("odeme-5")}
                                >
                                    Ürün iade şartları nelerdir?
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="sss-card">
                                <div className="sss-card-baslik">
                                    <svg
                                        width="34"
                                        height="34"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    >
                                        <path
                                            d="M20 4v10h-7v-10h7zm2-2h-11v14h11v-14zm-8 16h-10v-10h5v-2h-5c-1.105 0-2 .895-2 2v10c0 1.105.895 2 2 2h10v-2zm8.313 1.308c-.358.829-.789 1.663-1.31 2.308-.51.634-1.086 1.198-1.717 1.644-.775.538-1.635.946-2.563 1.18-.65.161-1.313.235-1.975.277v-2.053c.591-.051 1.175-.145 1.743-.34.595-.201 1.149-.502 1.668-.88.425-.32.819-.686 1.164-1.096.312-.371.569-.783.824-1.194h1.166zm-9.313-17.308h-4v4h4v-4z"/>
                                    </svg>
                                    <p>İADE & DEĞİŞİM</p>
                                </div>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("iade-1")}
                                >
                                    Ürünleri nasıl iade edebilirim?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("iade-2")}
                                >
                                    İade süresi ne kadar?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("iade-3")}
                                >
                                    İade koşulları nelerdir?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("iade-4")}
                                >
                                    Değişim yapmak mümkün mü?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("iade-5")}
                                >
                                    İade kargo ücretini kim öder?
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="sss-card">
                                <div className="sss-card-baslik">
                                    <svg
                                        width="34"
                                        height="34"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    >
                                        <path
                                            d="M12 24c-.553 0-1-.447-1-1 0-.553.447-1 1-1h5v-3h-1c-.553 0-1-.447-1-1s.447-1 1-1h1v-2h-1c-.553 0-1-.447-1-1s.447-1 1-1h1v-2h-1c-.553 0-1-.447-1-1s.447-1 1-1h1v-2h-5c0 .553-.447 1-1 1-.553 0-1-.447-1-1s.447-1 1-1h6c.553 0 1 .447 1 1v2h1c.553 0 1 .447 1 1s-.447 1-1 1h-1v2h1c.553 0 1 .447 1 1s-.447 1-1 1h-1v2h1c.553 0 1 .447 1 1s-.447 1-1 1h-1v3h1c.553 0 1 .447 1 1s-.447 1-1 1h-6zm-2-13h-3v3h3v-3zm1-2v7h-5v-7h5zm-2-3c-.553 0-1-.447-1-1v-2c0-.553.447-1 1-1s1 .447 1 1v2c0 .553-.447 1-1 1zm2-5h-5c0 .553-.447 1-1 1-.553 0-1-.447-1-1s.447-1 1-1h6c.553 0 1 .447 1 1s-.447 1-1 1zm-2 5h-3v3h3v-3zm-5 4h-5c0 .553-.447 1-1 1-.553 0-1-.447-1-1s.447-1 1-1h6c.553 0 1 .447 1 1s-.447 1-1 1z"/>
                                    </svg>
                                    <p>ÜYELİK</p>
                                </div>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("uyelik-1")}
                                >
                                    Üye olmak zorunda mıyım?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("uyelik-2")}
                                >
                                    Üye olmanın avantajları nelerdir?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("uyelik-3")}
                                >
                                    Şifremi unuttum, ne yapmalıyım?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("uyelik-4")}
                                >
                                    Kişisel verilerim güvende mi?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("uyelik-5")}
                                >
                                    Üyelik bilgilerimi nasıl güncellerim?
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="sss-card">
                                <div className="sss-card-baslik">
                                    <svg
                                        width="34"
                                        height="34"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    >
                                        <path
                                            d="M17 16v-7h-10v7h10zm0-10v-3h-10v3h10zm2-6c1.105 0 2 .895 2 2v16c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-16c0-1.105.895-2 2-2h14zm0 2h-14v16h14v-16zm-10 18h6v1h-6v-1z"/>
                                    </svg>
                                    <p>DİĞER</p>
                                </div>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("diger-1")}
                                >
                                    İletişim bilgilerine nereden ulaşabilirim?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("diger-2")}
                                >
                                    Gizlilik politikası nedir?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("diger-3")}
                                >
                                    Çerez politikası nedir?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("diger-4")}
                                >
                                    Şikayet ve önerilerimi nasıl iletebilirim?
                                </button>
                                <button
                                    className="sss-card-soru"
                                    onClick={() => handleButtonClick("diger-5")}
                                >
                                    İş başvurusu yapabilir miyim?
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center text-center mb-5 diger-sorular">
                        <p>Dİğer Sorularınız İçİn</p>
                        <a className="diger-sorular-button" href="#">İletişim</a>
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <div className="popup-close-parent">
                            <button className="popup-close" onClick={handleClosePopup}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
                                </svg>
                            </button>
                        </div>
                        {popupbaslik}
                        {popupContent}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sss;
