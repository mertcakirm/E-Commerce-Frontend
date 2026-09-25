import { useEffect, useState } from 'react';
import { FetchSliderDataRequest } from "../../API/HomeApi.js";
import { HiArrowRight } from "react-icons/hi2";

const OfferMainComp = ({ loading }) => {
    const [sliderData, setSliderData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await FetchSliderDataRequest();
            setSliderData(res?.data?.data || []);
        } catch (error) {
            console.error("Slider verisi alınamadı:", error);
        } finally {
            if (typeof loading === 'function') {
                loading(false);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div
            id="carouselExampleAutoplaying"
            className="carousel slide modern-hero-carousel"
            data-bs-ride="carousel"
            data-bs-interval="5000"
            data-aos="fade-in"
        >
            {/* Gösterge Noktaları */}
            {sliderData && sliderData.length > 1 && (
                <div className="carousel-indicators">
                    {sliderData.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#carouselExampleAutoplaying"
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-current={index === 0 ? "true" : "false"}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
            )}

            {/* Slayt İçerikleri */}
            <div className="carousel-inner">
                {sliderData && sliderData.length > 0 ? (
                    sliderData.map((slide, index) => (
                        <div
                            key={slide.id || index}
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                        >
                            <img
                                src={
                                    slide.imageUrl && slide.imageUrl !== "string"
                                        ? (slide.imageUrl.startsWith("http")
                                                ? slide.imageUrl
                                                : `https://localhost:7050${
                                                      slide.imageUrl.startsWith("/contents/")
                                                          ? slide.imageUrl
                                                          : `/contents/${slide.imageUrl}`
                                                  }`
                                          )
                                        : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                                }
                                className="d-block w-100 modern-hero-img"
                                alt={slide.name || `Slide ${index + 1}`}
                                loading={index === 0 ? "eager" : "lazy"}
                            />

                            {/* Doğal Karartma ve Başlık Alanı */}
                            <div className="carousel-item-child">
                                <div className="carousel-card">
                                    <div className="carousel-item-card">
                                        <span className="hero-kicker-tag">Öne Çıkan Kampanya</span>
                                        <p className="hero-slide-heading">{slide.name}</p>
                                    </div>
                                    <a
                                        href={`/urunler/${slide.href}`}
                                        className="slider-alisverise-basla-btn"
                                    >
                                        <span>Alışverişe Başla</span>
                                        <HiArrowRight size={16} className="btn-arrow-icon" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-data-message text-center py-5">
                        <p className="text-muted fw-medium">Görüntülenecek kampanya bulunamadı.</p>
                    </div>
                )}
            </div>

            {/* Önceki / Sonraki Kontrol Butonları */}
            {sliderData && sliderData.length > 1 && (
                <>
                    <button
                        className="carousel-control-prev modern-hero-control"
                        type="button"
                        data-bs-target="#carouselExampleAutoplaying"
                        data-bs-slide="prev"
                        aria-label="Önceki Slayt"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>
                    <button
                        className="carousel-control-next modern-hero-control"
                        type="button"
                        data-bs-target="#carouselExampleAutoplaying"
                        data-bs-slide="next"
                        aria-label="Sonraki Slayt"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>
                </>
            )}
        </div>
    );
};

export default OfferMainComp;
