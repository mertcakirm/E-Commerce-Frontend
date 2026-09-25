import { useEffect, useState } from 'react';
import Slider from "react-slick";
import NextArrow from "./NextArrow.jsx";
import PrevArrow from "./PrevArrow.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FetchCategoriesRequest } from "../../API/HomeApi.js";
import { HiArrowUpRight } from "react-icons/hi2";

const SliderComp = ({ loading }) => {
    const [categories, setCategories] = useState([]);

    const settings = {
        dots: false,
        infinite: categories.length > 5,
        slidesToShow: 5,
        slidesToScroll: 1,
        cssEase: "cubic-bezier(0.16, 1, 0.3, 1)",
        speed: 500,
        centerMode: false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: categories.length > 5,
                },
            },
            {
                breakpoint: 1124,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: categories.length > 4,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: categories.length > 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: categories.length > 2,
                },
            },
        ],
    };

    const fetchData = async () => {
        try {
            const categoriesData = await FetchCategoriesRequest();
            setCategories(categoriesData?.data || []);
        } catch (error) {
            console.error("Kategoriler alınamadı:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className="modern-slider-section" id="urunler-fluid" data-aos="fade-up">
            <div className="container">
                <div className="section-header-wrap">
                    <span className="section-tagline">Koleksiyonlar</span>
                    <h2 className="section-main-title">Popüler Kategoriler</h2>
                </div>

                <div className="slider-container-box">
                    {categories && categories.length > 0 ? (
                        <Slider {...settings}>
                            {categories.map((category) => (
                                <div key={category.id} className="slick-card-slide-item">
                                    <a
                                        href={`/urunler/${category.name}`}
                                        className="editorial-category-card"
                                    >
                                        {/* Arka Plan Görseli */}
                                        <div className="editorial-img-container">
                                            <img
                                                src={
                                                    category.imageUrl && category.imageUrl !== "string"
                                                        ? (category.imageUrl.startsWith("http")
                                                                ? category.imageUrl
                                                                : `https://localhost:7050${
                                                                      category.imageUrl.startsWith("/images/categories")
                                                                          ? category.imageUrl
                                                                          : `/images/categories${category.imageUrl}`
                                                                  }`
                                                          )
                                                        : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                                                }
                                                alt={category.name || "Kategori Resmi"}
                                                className="editorial-category-img"
                                                loading="lazy"
                                            />
                                            {/* Karartma degrade katmanı */}
                                            <div className="editorial-overlay" />
                                        </div>

                                        {/* Kart Altı İçerik */}
                                        <div className="editorial-content">
                                            <div className="editorial-text-wrap">
                                                <span className="editorial-subtitle">Koleksiyon</span>
                                                <h4 className="editorial-title">{category.name}</h4>
                                            </div>
                                            <div className="editorial-action-btn">
                                                <HiArrowUpRight size={18} />
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div className="no-data-message">
                            <p>Görüntülenecek kategori bulunamadı.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SliderComp;
