import {useEffect, useState} from 'react';
import {FetchSliderDataRequest} from "../../API/HomeApi.js";

const OfferMainComp = ({loading}) => {
    const [sliderData, setSliderData] = useState([]);
    const fetchData = async () => {
        const sliderData = await FetchSliderDataRequest();
        setSliderData(sliderData.data.data);
        loading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div
            id="carouselExampleAutoplaying"
            className="carousel slide"
            data-bs-ride="carousel"
            data-aos="fade-in"
        >
            <div className="carousel-indicators">
                {sliderData && sliderData.length > 0 ? (
                    sliderData.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#carouselExampleAutoplaying"
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-current={index === 0 ? "true" : "false"}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))
                ) : (
                    <div className="no-data-message">
                        <p>Görüntülenecek kampyanya bulunamadı.</p>
                    </div>
                )}
            </div>
            <div className="carousel-inner">
                {sliderData && sliderData.length > 0 ? (
                    sliderData.map((slide, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                            <img
                                src={slide.imageUrl && slide.imageUrl !== "string"
                                    ? (slide.imageUrl.startsWith("http")
                                            ? slide.imageUrl
                                            : `https://localhost:7050${slide.imageUrl.startsWith("/contents/") ? slide.imageUrl : `/contents/${slide.imageUrl}`}`
                                    )
                                    : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                                }
                                className="d-block w-100 img-fluid"
                                style={{height: '800px', objectFit: 'cover'}}
                                alt={`Slide ${index + 1}`}
                            />
                            <div className="carousel-item-child">
                                <div className="carousel-card">
                                    <p className="fs-2 fw-bold text-light text-uppercase">{slide.name}</p>
                                    <a href={`/urunler/${slide.href}`} className="slider-alisverise-basla-btn px-5 py-2">
                                        Alışverişe Başla
                                    </a>
                                </div>

                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-data-message">
                        <p>Görüntülenecek kampyanya bulunamadı.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OfferMainComp;