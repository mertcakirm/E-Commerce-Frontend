import {useState} from "react";
import Navbar from "../components/other/navbar/navbar.jsx";
import "./css/FrequentlyAskedQuestions.css";

const FrequentlyAskedQuestions = () => {
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
                        <div className="col-lg-4 col-md-6" data-aos="fade-up">
                            <div className="sss-card">
                                <div className="sss-card-baslik">
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
                        <div className="col-lg-4 col-md-6" data-aos="fade-up">
                            <div className="sss-card">
                                <div className="sss-card-baslik">
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
                        <div className="col-lg-4 col-md-6" data-aos="fade-up">
                            <div className="sss-card">
                                <div className="sss-card-baslik">
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
                        <div className="col-lg-4 col-md-6" data-aos="fade-up">
                            <div className="sss-card">
                                <div className="sss-card-baslik">
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
                        <div className="col-lg-4 col-md-6" data-aos="fade-up">
                            <div className="sss-card">
                                <div className="sss-card-baslik">
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
                        <div className="col-lg-4 col-md-6" data-aos="fade-up">
                            <div className="sss-card">
                                <div className="sss-card-baslik">
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

                    <div className="row justify-content-center text-center mb-5 diger-sorular" data-aos="fade-up">
                        <p>Dİğer Sorularınız İçİn</p>
                        <a className="diger-sorular-button" href="#">İletişim</a>
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className="popup" data-aos="fade-in">
                    <div className="popup-content">
                        <div className="popup-close-parent">
                            <button className="popup-close" onClick={handleClosePopup}>
                                <span className="close" >&times;</span>
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

export default FrequentlyAskedQuestions;
