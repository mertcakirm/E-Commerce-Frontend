import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/ProductDetail.css";
import MoreProduct from "../components/other/MoreProduct.jsx";
import { getCookie } from "../components/cookie/cookie";
import { toast } from "react-toastify";
import {
    AddToBasketRequest,
    FetchProductsByIdRequest,
    LikeProductRequest
} from "../API/ProductApi.js";
import LoadingComponent from "../components/other/Loading.jsx";
import ProductComments from "../components/other/ProductComments.jsx";
import { toggleRefresh } from "../store/basketSlice.js";
import { useDispatch } from "react-redux";
import { toggleRefreshFav } from "../store/favoriteSlice.js";
import PageLogo from "../components/other/PageLogo.jsx";
import { FaStar } from "react-icons/fa";
import { IoHeartOutline, IoBagAddOutline } from "react-icons/io5";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import ProductQuestions from "../components/other/ProductQuestions.jsx";

const ProductDetail = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const urlpop = location.pathname.split('/').pop();
    const token = getCookie('token');

    const getProducts = async () => {
        try {
            const data = await FetchProductsByIdRequest(urlpop);
            setProduct(data?.data?.data || null);
        } catch (error) {
            console.error("Ürün detayı alınamadı:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, [urlpop]);

    const sizes = product?.variants || [];
    const images = product?.images || [];

    if (!images || images.length === 0) return <LoadingComponent />;

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
        if (!token) {
            window.location.href = "/girisyap";
            return;
        }
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

        if (sizes.length > 0 && !selectedSize) {
            toast.error("Lütfen beden seçiniz!");
            return;
        }

        try {
            await AddToBasketRequest(selectedSize);
            toast.success("Ürün sepete eklendi!");
            dispatch(toggleRefresh());
        } catch (error) {
            console.log(error);
            toast.error("Ürün sepete eklenemedi!");
        }
    };

    const hasDiscount = Number(product?.discountRate) > 0;

    return (
        <div className="product-detail-page-wrapper">
            <div className="container-fluid urun-detay-container">
                {/* Breadcrumb Navigasyonu */}
                {product && (
                    <div className="row justify-content-center">
                        <div className="col-12" data-aos="fade-in">
                            <nav className="detail-breadcrumb" aria-label="breadcrumb">
                                <a href="/">Anasayfa</a>
                                <span className="breadcrumb-divider">/</span>
                                <a href="/urunler/tum-urunler">Ürünler</a>
                                <span className="breadcrumb-divider">/</span>
                                <span className="breadcrumb-current">{product.name}</span>
                            </nav>
                        </div>
                    </div>
                )}

                <div className="row g-4 g-xl-5 mt-1">
                    {/* Sol Galeri Alanı */}
                    <div className="col-lg-6 urun-detay-col-sol" data-aos="fade-up">
                        <div className="carousel-container">
                            <div className="active-image">
                                {hasDiscount && (
                                    <div className="gallery-discount-badge">
                                        %{product.discountRate} İNDİRİM
                                    </div>
                                )}

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
                                        key={activeIndex}
                                    />
                                )}

                                {images.length > 1 && (
                                    <>
                                        <button
                                            type="button"
                                            className="prev-button"
                                            onClick={handlePrevClick}
                                            aria-label="Önceki Görsel"
                                        >
                                            <HiOutlineChevronLeft size={22} />
                                        </button>
                                        <button
                                            type="button"
                                            className="next-button"
                                            onClick={handleNextClick}
                                            aria-label="Sonraki Görsel"
                                        >
                                            <HiOutlineChevronRight size={22} />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Thumbnail Şeridi */}
                            {images.length > 1 && (
                                <div className="thumbnails">
                                    {images.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`thumbnail ${index === activeIndex ? 'active' : ''}`}
                                            onClick={() => handleThumbnailClick(index)}
                                        >
                                            <img
                                                src={
                                                    image.imageUrl && image.imageUrl !== "string"
                                                        ? (image.imageUrl.startsWith("http")
                                                                ? image.imageUrl
                                                                : `https://localhost:7050${image.imageUrl.startsWith("/images/products") ? image.imageUrl : `/images/products/${image.imageUrl}`}`
                                                          )
                                                        : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                                                }
                                                alt={`Thumbnail ${index}`}
                                                loading="lazy"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sağ Ürün Bilgi Alanı */}
                    <div className="col-lg-6 urun-detay-col-sag">
                        {product && (
                            <div className="detail-meta-wrapper">
                                <div className="d-flex align-items-center justify-content-between">
                                    <span className="urun-code" data-aos="fade-up">Ürün Kodu: #{product.id}</span>
                                    {product.averageRating > 0 && (
                                        <div className="rating-badge" data-aos="fade-up">
                                            <FaStar size={13} color="#f59e0b" />
                                            <span>{Number(product.averageRating).toFixed(1)} / 10</span>
                                        </div>
                                    )}
                                </div>

                                <h1 className="urun-baslik" data-aos="fade-up">{product.name}</h1>

                                {/* Fiyat Bölümü */}
                                <div className="urun-detay-fiyat-flex" data-aos="fade-up">
                                    <span className="p1-fiyat">{product.priceWithDiscount} ₺</span>
                                    {hasDiscount && (
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="p2-fiyat">{product.price} ₺</span>
                                            <span className="urun-indirim">%{product.discountRate} İNDİRİM</span>
                                        </div>
                                    )}
                                </div>

                                {/* Beden Seçici */}
                                {sizes.length > 0 && (
                                    <div className="beden" data-aos="fade-up">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="beden-label">BEDEN:</span>
                                            {selectedSize && (
                                                <span className="selected-size-text">
                                                    Seçilen: {sizes.find((v) => v.id === selectedSize)?.size}
                                                </span>
                                            )}
                                        </div>
                                        <div className="beden-cards">
                                            {sizes.map((variant) => (
                                                <button
                                                    key={variant.id}
                                                    type="button"
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
                                )}

                                {/* Aksiyon Barı */}
                                <div className="sepet-flex" data-aos="fade-up">
                                    <button
                                        type="button"
                                        className="sepete-ekle-detay-btn"
                                        onClick={handleAddToBasket}
                                    >
                                        <IoBagAddOutline size={20} />
                                        <span>Sepete Ekle</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="like-detay-btn"
                                        onClick={() => handleLikeClick(product.id)}
                                        aria-label="Favorilere Ekle"
                                        title="Favorilere Ekle"
                                    >
                                        <IoHeartOutline size={24} />
                                    </button>
                                </div>

                                {/* Bilgi Akordeonu */}
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
                                                    {product.description || "Bu ürün için detaylı bir açıklama bulunmamaktadır."}
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
                                                <div className="accordion-body">
                                                    <ProductQuestions productId={urlpop} />
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
                                                <div className="accordion-body">
                                                    Siparişleriniz 1-3 iş günü içerisinde kargoya teslim edilmektedir. 14 gün içinde koşulsuz ücretsiz iade hakkınız mevcuttur.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <MoreProduct />
            </div>

            <PageLogo size="25" />
        </div>
    );
};

export default ProductDetail;
