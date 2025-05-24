import {useEffect, useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Helmet} from "react-helmet";
import "./css/urun-detay.css";
import logo from '../assets/mob_logo.png';
import Dahafazla from "../components/childcomponents/dahafazla";
import {triggerToggleRefreshData} from "../components/childcomponents/reflesh";
import {getCookie} from "../components/cookie/cookie";
import {toast} from "react-toastify";
import {
    AddCommentRequest,
    AddToBasketRequest,
    FetchProductsByIdRequest,
    LikeProductRequest
} from "../API/ProductApi.js";

const Urun_detay = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState([]);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const commentsPerPage = 5;
    const urlpop = location.pathname.split('/').pop();
    const token = getCookie('token');

    const getProduct = async () => {
        const data = await FetchProductsByIdRequest(urlpop)
        setProduct(data);
    }

    useEffect(() => {
        getProduct();
    }, [urlpop]);

    const comments = product?.productComment || [];
    const sizes = product?.sizes || [];
    const images = product?.productImage || [];
    if (!images || images.length === 0) {
        return (
            <div className="d-flex justify-content-center" style={{height: '100vh', alignItems: 'center'}}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    const handleSizeClick = (productCode, size) => {
        setSelectedSize((prevSelectedSizes) => ({
            ...prevSelectedSizes,
            [productCode]: prevSelectedSizes[productCode] === size ? null : size,
        }));
    };

    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    const totalPages = Math.ceil(comments.length / commentsPerPage);

    const commentsClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleThumbnailClick = (index) => {
        setActiveIndex(index);
    };

    const handleNextClick = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevClick = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const hasDiscount = product.discountRate > 0;

    const handleLikeClick = async (productCode) => {
        try {
            await LikeProductRequest(productCode);
            toast.success('Ürün favoriye eklendi!');
            triggerToggleRefreshData();
        } catch (error) {
            console.log(error);
            toast.error('Ürün favoriye eklenemedi!');
        }

    };

    const commentSubmit = async () => {
        try {
            const commentData = {title, comment};
            await AddCommentRequest(urlpop, commentData);
            setTitle('');
            setComment('');
            toast.success('Yorum yapıldı!');
        } catch (error) {
            console.log(error);
            toast.error("Yorum yapılamadı!")
        }


    };

    const handleAddToBasket = async (productCode, size) => {
        if (!token) {
            window.location.href = "/girisyap";
            return;
        }
        try {
            await AddToBasketRequest(productCode, size);
            toast.success('Ürün sepete eklendi!')
            triggerToggleRefreshData();
        } catch (error) {
            console.log(error);
            toast.error("Ürün sepete eklenemedi!");
        }

    };
    return (
        <div>
            <Helmet>
                <title>Ürün Detayı-{urlpop}</title>
                <meta
                    name="description"
                    content="Mob Wear olarak yeni modaya hitap ediyor ve buna göre ürünleri sizler için üretiyoruz."
                />
                <meta
                    name="keywords"
                    content="tişört,pantolon,giyim,moda,erkek giyim"
                />
                <meta name="author" content="MOB WEAR"/>
                <meta property="og:title" content="Kaliteli Kıyafetler"/>
                <meta
                    property="og:description"
                    content="Mob Wear olarak yeni modaya hitap ediyor ve buna göre ürünleri sizler için üretiyoruz."
                />
                <meta property="og:image" content="URL_of_image"/>
                <meta property="og:url" content="URL_of_your_website"/>
                <meta property="og:type" content="website"/>
            </Helmet>

            <div className="container-fluid urun-detay-container">
                <div className="row justify-content-center">
                    {product && (
                        <div className="col-11">
                            <p>Anasayfa - Ürünler - {product.productName}</p>
                        </div>
                    )}
                </div>

                <div className="row">
                    <div className="col-lg-6 urun-detay-col-sol">
                        <div className="carousel-container">
                            <div className="active-image">
                                <img
                                    src={`data:image/jpeg;base64,${product.productImage[activeIndex].bytes}`}
                                    alt={`Slide ${activeIndex}`}
                                    className="img-fluid w-100 active-img-detay"
                                />
                            </div>
                            <button className="prev-button" onClick={handlePrevClick}>
                                <svg
                                    width="24"
                                    height="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                >
                                    <path
                                        d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/>
                                </svg>
                            </button>
                            <button className="next-button" onClick={handleNextClick}>
                                <svg
                                    width="24"
                                    height="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                >
                                    <path
                                        d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/>
                                </svg>
                            </button>
                            <div className="thumbnails">
                                {images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={`data:image/jpeg;base64,${image.bytes}`}
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
                                <p className="urun-baslik">
                                    {product.productName}
                                </p>
                                <p className="urun-code">{product.productCode}</p>
                                <div className="urun-goruntuleme">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="30" viewBox="0 0 24 24">
                                        <path
                                            d="M13.299 3.74c-.207-.206-.299-.461-.299-.711 0-.524.407-1.029 1.02-1.029.262 0 .522.1.721.298l3.783 3.783c-.771.117-1.5.363-2.158.726l-3.067-3.067zm-.299 8.76c0-1.29.381-2.489 1.028-3.5h-14.028v2h.643c.535 0 1.021.304 1.256.784l4.101 10.216h12l1.211-3.015c-3.455-.152-6.211-2.993-6.211-6.485zm-2.299-8.76c.207-.206.299-.461.299-.711 0-.524-.407-1.029-1.02-1.029-.261 0-.522.1-.72.298l-4.701 4.702h2.883l3.259-3.26zm8.799 4.26c-2.486 0-4.5 2.015-4.5 4.5s2.014 4.5 4.5 4.5c2.484 0 4.5-2.015 4.5-4.5s-2.016-4.5-4.5-4.5zm-.469 6.484l-1.688-1.637.695-.697.992.94 2.115-2.169.697.696-2.811 2.867z"/>
                                    </svg>
                                    <span className="mt-1">Bu ürün {product.countInBasket} kişinin sepetinde</span>
                                </div>
                                <div className="urun-detay-fiyat-flex">
                                    <p className="p1-fiyat">{product.priceWithDiscount}₺</p>
                                    {hasDiscount && (
                                        <>
                                            <p className="p2-fiyat">{product.priceWithOutDiscount}₺</p>

                                            <div className="urun-indirim">{product.discountRate}% İNDİRİM</div>
                                        </>
                                    )}
                                </div>
                                <div className="beden">
                                    <p>BEDEN:</p>
                                    <div className="beden-cards">
                                        {sizes.map((size, index) => (
                                            <button
                                                key={index}
                                                className={` ${selectedSize[product.productCode] === size.size ? 'selected-size' : ''}`}
                                                onClick={() => handleSizeClick(product.productCode, size.size)}
                                            >
                                                {size.size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="sepet-flex">
                                    <button className="sepete-ekle-detay-btn"
                                            onClick={() => handleAddToBasket(product.productCode, selectedSize[product.productCode])}>Sepete
                                        Ekle
                                    </button>
                                    <button className="like-detay-btn"
                                            onClick={() => handleLikeClick(product.productCode)}>
                                        <svg
                                            clipRule="evenodd"
                                            width="50"
                                            height="24"
                                            fill={product.favorite ? "red" : "black"}
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
                                    <div
                                        className="accordion accordion-flush"
                                        id="accordionFlushExample"
                                    >
                                        <div className="accordion-item">
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
                                        <div className="accordion-item">
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
                                                    <div className="urunler-yorum-flex">
                                                        <h3>Yorum Yap</h3>
                                                        <input
                                                            type="text"
                                                            placeholder="Yorum Başlığı"
                                                            maxLength={100}
                                                            value={title}
                                                            onChange={(e) => setTitle(e.target.value)}
                                                            style={{
                                                                border: '0',
                                                                borderBottom: '1px solid #000',
                                                                lineHeight: '50px',
                                                                marginBottom: '10px',
                                                            }}
                                                        />
                                                        <textarea
                                                            style={{resize: 'none', height: '80px'}}
                                                            name="yorum-txt"
                                                            placeholder="Yorum"
                                                            id="yorum-txt"
                                                            value={comment}
                                                            maxLength={235}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        />
                                                        <button className="tumunu-gor-btn" onClick={commentSubmit}>
                                                            Paylaş
                                                        </button>
                                                    </div>
                                                    <hr/>
                                                    <div className="urunler-yorumlar">
                                                        {currentComments.map((comment, index) => (
                                                            <div className="urunler-yorum-card" key={index}>
                                                                <p style={{fontWeight: "700"}}>
                                                                    {comment.title}
                                                                </p>
                                                                {/* <p>{comment.rating}</p> */}
                                                                <p>{comment.comment}</p>
                                                            </div>
                                                        ))}
                                                        <div className="row justify-content-center">
                                                            <nav aria-label="Page navigation">
                                                                <ul className="pagination pagination-sm pag-ul">
                                                                    {totalPages > 1 && Array.from({length: totalPages}, (_, index) => (
                                                                        <li
                                                                            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                                                                            key={index}
                                                                        >
                                                                          <span
                                                                              className="page-link"
                                                                              onClick={() => commentsClick(index + 1)}
                                                                          >
                                                                            {index + 1}
                                                                          </span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </nav>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
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
                <Dahafazla/>
            </div>
            <div className="container logo-container">
                <div className="row justify-content-center">
                    <a style={{display: 'flex', justifyContent: 'center'}} className="logo-a" href="/">
                        <img
                            src={logo}
                            className="img-fluid"
                            alt=""
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Urun_detay;