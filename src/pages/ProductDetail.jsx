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

    if (!images || images.length === 0) return <LoadingComponent />

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
                                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd"
                                     clipRule="evenodd">
                                    <path
                                        d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/>
                                </svg>
                            </button>
                            <button className="next-button" onClick={handleNextClick}>
                                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd"
                                     clipRule="evenodd">
                                    <path
                                        d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/>
                                </svg>
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
                                <div className="d-flex align-items-center" data-aos="fade-up">
                                    <p className="urun-code fs-4 fw-bold">{Number(product.averageRating).toFixed(0)}/10 </p>

                                    <svg width="24" height="24" fill="orange"
                                         clipRule="evenodd" fillRule="evenodd"
                                         strokeLinejoin="round" strokeMiterlimit="2"
                                         viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"
                                              fillRule="nonzero" />
                                    </svg>
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

                                <div className="sepet-flex"  data-aos="fade-up">
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
                                        <svg
                                            clipRule="evenodd"
                                            width="50"
                                            height="30"
                                            fill="white"
                                            fillRule="evenodd"
                                            strokeLinejoin="round"
                                            strokeMiterlimit="2"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z"
                                                fillRule="nonzero"
                                            />
                                        </svg>
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
                                                    <ProductComments productId={urlpop} />
                                                </div>
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

            <PageLogo size="25" />
        </div>
    );
};

export default ProductDetail;