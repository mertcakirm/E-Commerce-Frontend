import {useEffect, useState} from 'react';
import Slider from "react-slick";
import NextArrow from "./NextArrow.jsx";
import PrevArrow from "./PrevArrow.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {FetchCategoriesRequest} from "../../API/HomeApi.js";

const SliderComp = ({loading}) => {
    const [categories, setCategories] = useState([]);

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        cssEase: "linear",
        centerMode: true,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1124,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 460,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    const fetchData = async () => {
        const categoriesData = await FetchCategoriesRequest();
        setCategories(categoriesData);
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="container-fluid" id="urunler-fluid">
            <Slider {...settings}>
                {categories && categories.length > 0 ? (
                    categories.map((category) => (
                        <a
                            key={category.id}
                            href={`/urunler/${category.categoryName}`}
                            className="slick-card"
                        >
                            <img
                                src={`data:image/jpeg;base64,${category.image.bytes}`}
                                alt={category.categoryName || "Kategori Resmi"}
                                className="category-image"
                            />
                            <p>{category.categoryName}</p>
                        </a>
                    ))
                ) : (
                    <div className="no-data-message">
                        <p>Görüntülenecek kategori bulunamadı.</p>
                    </div>
                )}
            </Slider>
        </div>
    );
};

export default SliderComp;