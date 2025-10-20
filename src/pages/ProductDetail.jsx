import {useEffect, useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/ProductDetail.css";
import MoreProduct from "../components/other/MoreProduct.jsx";
import {getCookie} from "../components/cookie/cookie";
import {toast} from "react-toastify";
import {
    AddToBasketRequest,
    FetchProductsByIdRequest,
    LikeProductRequest
} from "../API/ProductApi.js";
import LoadingComponent from "../components/other/Loading.jsx";
import ProductComments from "../components/other/ProductComments.jsx";
import {toggleRefresh} from "../store/basketSlice.js";
import {useDispatch} from "react-redux";
import {toggleRefreshFav} from "../store/favoriteSlice.js";
import PageLogo from "../components/other/PageLogo.jsx";
import {FaStar} from "react-icons/fa";
import {FcLike} from "react-icons/fc";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import ProductQuestions from "../components/other/ProductQuestions.jsx";

const ProductDetail = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const urlpop = location.pathname.split('/').pop();
    const token = getCookie('token');

    const getProducts = async () => {
        const data = await FetchProductsByIdRequest(urlpop);
        setProduct(data.data.data);
    };

    useEffect(() => {
        getProducts();
    }, [urlpop]);

    const sizes = product?.variants || [];
    const images = product?.images || [];

    if (!images || images.length === 0) return <LoadingComponent/>

    const handleThumbnailClick = (index) => {
        setActiveIndex(index);
    };

    const handleNextClick = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevClick = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleLikeClick = async (productId) => {
        try {
            await LikeProductRequest(productId);
            toast.success('Ürün favoriye eklendi!');
            dispatch(toggleRefreshFav());
        } catch (error) {
            console.log(error);
            toast.error('Ürün favoriye eklenemedi!');
        }
    };

    const handleAddToBasket = async () => {
        if (!token) {
            window.location.href = "/girisyap";
            return;
        }

        if (!selectedSize) {
            toast.error("Lütfen beden seçiniz!");
            return;
        }

        try {
            await AddToBasketRequest(selectedSize);
            toast.success("Ürün sepete eklendi!");
            dispatch(toggleRefresh());
        } catch (error) {
            toast.error("Ürün sepete eklenemedi!");
        }
    };

    return (
        <div>

            <div className="container-fluid urun-detay-container">
                <div className="row justify-content-center">
                    {product && (
                        <div className="col-11" data-aos="fade-in">
                            <p>Anasayfa - Ürünler - {product.name}</p>
                        </div>
                    )}
                </div>

                <div className="row">
                    <div className="col-lg-6 urun-detay-col-sol" data-aos="fade-up">
                        <div className="carousel-container">
                            <div className="active-image">
                                {/* Ana resim */}
                                {images.length > 0 && (
                                    <img
                                        src={
                                            images[activeIndex]?.imageUrl && images[activeIndex]?.imageUrl !== "string"
                                                ? (images[activeIndex].imageUrl.startsWith("http")
                                                    ? images[activeIndex].imageUrl
                                                    : `https://localhost:7050${
                                                        images[activeIndex].imageUrl.startsWith("/images/products")
                                                            ? images[activeIndex].imageUrl
                                                            : `/images/products/${images[activeIndex].imageUrl}`
                                                    }`)
                                                : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                                        }
                                        alt={`Slide ${activeIndex}`}
                                        className="img-fluid w-100 active-img-detay"
                                        data-aos="fade-in"
                                    />
                                )}
                            </div>
                            <button className="prev-button" onClick={handlePrevClick}>
                                <IoIosArrowBack size={35} color="black"/>
                            </button>
                            <button className="next-button" onClick={handleNextClick}>
                                <IoIosArrowForward size={35} color="black"/>
                            </button>
                            <div className="thumbnails">
                                {images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.imageUrl && image.imageUrl !== "string"
                                            ? (image.imageUrl.startsWith("http")
                                                    ? image.imageUrl
                                                    : `https://localhost:7050${image.imageUrl.startsWith("/images/products") ? image.imageUrl : `/images/products/${image.imageUrl}`}`
                                            )
                                            : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                                        }
                                        alt={`Thumbnail ${index}`}
                                        className={`thumbnail ${index === activeIndex ? 'active' : ''}`}
                                        onClick={() => handleThumbnailClick(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 urun-detay-col-sag">
                        {product && (
                            <div className="urun-detay-col-sag">
                                <p className="urun-baslik" data-aos="fade-up">{product.name}</p>
                                <p className="urun-code" data-aos="fade-up">Ürün Kodu: {product.id}</p>
                                <div className="d-flex gap-2 align-items-center" data-aos="fade-up">
                                    <p className="urun-code fs-4 fw-bold">{Number(product.averageRating).toFixed(0)}/10 </p>
                                    <FaStar size={24} color="orange"/>
                                </div>
                                <div className="urun-detay-fiyat-flex" data-aos="fade-up">
                                    <p className="p1-fiyat">{product.priceWithDiscount}₺</p>
                                    {product.discountRate > 0 && (
                                        <div className="d-flex align-items-center gap-3">
                                            <p className="p2-fiyat">{product.price}₺</p>

                                            <div className="urun-indirim">{product.discountRate}% İNDİRİM</div>
                                        </div>

                                    )}
                                </div>

                                <div className="beden" data-aos="fade-up">
                                    <p>BEDEN:</p>
                                    <div className="beden-cards">
                                        {sizes.map((variant) => (
                                            <button
                                                key={variant.id}
                                                onClick={() =>
                                                    setSelectedSize((prev) => (prev === variant.id ? null : variant.id))
                                                }
                                                className={selectedSize === variant.id ? "selected-size" : ""}
                                            >
                                                {variant.size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="sepet-flex" data-aos="fade-up">
                                    <button
                                        className="sepete-ekle-detay-btn"
                                        onClick={handleAddToBasket}
                                    >
                                        Sepete Ekle
                                    </button>
                                    <button
                                        className="like-detay-btn"
                                        onClick={() => handleLikeClick(product.id)}
                                    >
                                        <FcLike size={30}/>
                                    </button>
                                </div>

                                <div className="urun-detay-accordion">
                                    <div className="accordion accordion-flush" id="accordionFlushExample">
                                        <div className="accordion-item" data-aos="fade-up">
                                            <h2 className="accordion-header">
                                                <button
                                                    className="accordion-button collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#flush-collapseOne"
                                                    aria-expanded="false"
                                                    aria-controls="flush-collapseOne"
                                                >
                                                    Ürün Bilgisi
                                                </button>
                                            </h2>
                                            <div
                                                id="flush-collapseOne"
                                                className="accordion-collapse collapse"
                                                data-bs-parent="#accordionFlushExample"
                                            >
                                                <div className="accordion-body">
                                                    {product.description}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-item" data-aos="fade-up">
                                            <h2 className="accordion-header">
                                                <button
                                                    className="accordion-button collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#flush-collapseTwo"
                                                    aria-expanded="false"
                                                    aria-controls="flush-collapseTwo"
                                                >
                                                    Yorumlar
                                                </button>
                                            </h2>
                                            <div
                                                id="flush-collapseTwo"
                                                className="accordion-collapse collapse"
                                                data-bs-parent="#accordionFlushExample"
                                            >
                                                <div className="accordion-body">
                                                    <ProductComments productId={urlpop}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-item" data-aos="fade-up">
                                            <h2 className="accordion-header">
                                                <button
                                                    className="accordion-button collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#flush-collapseFour"
                                                    aria-expanded="false"
                                                    aria-controls="flush-collapseFour"
                                                >
                                                    Soru - Cevap
                                                </button>
                                            </h2>
                                            <div
                                                id="flush-collapseFour"
                                                className="accordion-collapse collapse"
                                                data-bs-parent="#accordionFlushExample"
                                            >
                                                <div className="accordion-body"><ProductQuestions productId={urlpop} /></div>
                                            </div>
                                        </div>

                                        <div className="accordion-item" data-aos="fade-up">
                                            <h2 className="accordion-header">
                                                <button
                                                    className="accordion-button collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#flush-collapseThree"
                                                    aria-expanded="false"
                                                    aria-controls="flush-collapseThree"
                                                >
                                                    Teslimat ve İade
                                                </button>
                                            </h2>
                                            <div
                                                id="flush-collapseThree"
                                                className="accordion-collapse collapse"
                                                data-bs-parent="#accordionFlushExample"
                                            >
                                                <div className="accordion-body">...</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <MoreProduct/>
            </div>

            <PageLogo size="25"/>
        </div>
    );
};

export default ProductDetail;