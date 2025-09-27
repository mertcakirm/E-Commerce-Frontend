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
                    slidesToScroll: 5,
                },
            },
            {
                breakpoint: 1124,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
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
        console.log(categoriesData);
        setCategories(categoriesData.data);
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
                            href={`/urunler/${category.name}`}
                            className="slick-card"
                        >
                            <img
                                src={category.imageUrl && category.imageUrl !== "string"
                                    ? (category.imageUrl.startsWith("http")
                                            ? category.imageUrl
                                            : `https://localhost:7050${category.imageUrl.startsWith("/images/categories") ? category.imageUrl : `/images/categories${category.imageUrl}`}`
                                    )
                                    : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                                }
                                alt={category.name || "Kategori Resmi"}
                                className="category-image"
                            />
                            <p>{category.name}</p>
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