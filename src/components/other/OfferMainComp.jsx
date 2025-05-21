import {useEffect, useState} from 'react';
import {fetchSliderData} from "../../pages/api/anasayfa-api.js";

const OfferMainComp = ({loading}) => {
    const [sliderData, setSliderData] = useState([]);
    const fetchData = async () => {
        const sliderData = await fetchSliderData();
        setSliderData(sliderData);
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
                                src={`data:image/jpeg;base64,${slide.image.bytes}`}
                                className="d-block w-100 img-fluid"
                                style={{height: '900px', objectFit: 'cover'}}
                                alt={`Slide ${index + 1}`}
                            />
                            <div className="carousel-item-child">
                                <h5>{slide.topTitle}</h5>
                                <p>{slide.middleTitle}</p>
                                <h5>{slide.underTitle}</h5>
                                <a href={`/urunler/${slide.category}`} className="slider-alisverise-basla-btn">
                                    Alışverişe Başla
                                </a>
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