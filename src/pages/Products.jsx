import {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {useLocation} from "react-router-dom";
import "./css/Products.css";
import logo from "../assets/mob_logo.png";
import FilterProduct from "../components/other/FilterProduct.jsx";
import {getCookie} from "../components/cookie/cookie";
import LoadingComponent from "../components/other/Loading.jsx";
import {toast} from "react-toastify";
import {AddToBasketRequest, FetchProductRequest, LikeProductRequest} from "../API/ProductApi.js";
import {toggleRefresh} from "../store/basketSlice.js";
import {useDispatch} from "react-redux";
import {toggleRefreshFav} from "../store/favoriteSlice.js";
import PageLogo from "../components/other/PageLogo.jsx";

const Products = () => {
    const dispatch = useDispatch();
    const [colClass, setColClass] = useState("col-lg-3");
    const [products, setProducts] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const location = useLocation();
    const currentCategory = location.pathname.split("/").pop();
    const token = getCookie("token");

    const GetProducts = async () => {
        if (currentPage > totalPages) return;
        setLoading(true);
        try {
            const data = await FetchProductRequest(currentCategory, currentPage);
            setProducts(data.data.data.items)
            setTotalPages(data.totalPages || 1);
            setCurrentPage(prev => prev + 1);
        } catch (err) {
            console.error("API Hatası:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetProducts();
    }, [currentCategory]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.innerHeight + document.documentElement.scrollTop;
            const offsetHeight = document.documentElement.offsetHeight;
            if (scrollTop + 100 >= offsetHeight && !loading) {
                GetProducts();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, currentPage, totalPages]);

    const handleLikeClick = async (productCode) => {
        try {
            await LikeProductRequest(productCode);
            toast.success("Ürün favoriye eklendi!");
            dispatch(toggleRefreshFav());
        } catch {
            toast.error("Ürün favoriye eklenemedi!");
        }
    };

    const handleAddToBasket = async () => {
        if (!token) {
            window.location.href = "/girisyap";
            return;
        }
        try {
            await AddToBasketRequest(selectedSize);
            toast.success("Ürün sepete eklendi!");
            dispatch(toggleRefresh());

        } catch {
            toast.error("Ürün sepete eklenemedi!");
        }
    };

    const handleGridChange = (size) =>
        setColClass(size === "4x4" ? "col-lg-3" : "col-lg-4");

    if (loading && products.length === 0) return <LoadingComponent/>;

    return (
        <div>
            <Helmet>
                <title>Ürünlerimiz</title>
                <meta
                    name="description"
                    content="Mob Wear olarak yeni modaya hitap ediyor ve buna göre ürünleri sizler için üretiyoruz."
                />
                <meta name="keywords" content="tişört,pantolon,giyim,moda,erkek giyim"/>
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

            <div className="container-fluid urunler-container">
                <div className="row text-align-center justify-content-center">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4 mt-5" data-aos="fade-in">
                        <p
                            className="text-center urunler-sayfa-baslik"
                            style={{textTransform: "uppercase"}}
                        >
                            {currentCategory} / 200 Ürün
                        </p>
                    </div>
                    <div className="col-lg-4 row grid-row">
                        <button className="grid-btn 3x3-btn" onClick={() => handleGridChange("3x3")}>
                            <svg clipRule="evenodd" width={50} height={50} fillRule="evenodd" strokeLinejoin="round"
                                 strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m21 4c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-12.5 15.5h-4v-4h4zm1.5-4h4v4h-4zm9.5 0v4h-4v-4zm-15-5.5h4v4h-4zm5.5 0h4v4h-4zm5.5 0h4v4h-4zm-11-5.5h4v4h-4zm5.5 0h4v4h-4zm5.5 0h4v4h-4z"
                                    fillRule="nonzero"/>
                            </svg>
                        </button>
                        <button className="grid-btn 4x4-btn" onClick={() => handleGridChange("4x4")}>
                            <svg width="40" height="40" viewBox="0 0 53 51" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <line x1="1.5" y1="1" x2="1.5" y2="51" stroke="black" strokeWidth="3"/>
                                <line x1="14.5" y1="1" x2="14.5" y2="51" stroke="black" strokeWidth="3"/>
                                <line x1="26.5" y1="1" x2="26.5" y2="51" stroke="black" strokeWidth="3"/>
                                <line x1="51.5" y1="1" x2="51.5" y2="51" stroke="black" strokeWidth="3"/>
                                <line x1="38.5" y1="1" x2="38.5" y2="51" stroke="black" strokeWidth="3"/>
                                <line y1="1.5" x2="53" y2="1.5" stroke="black" strokeWidth="3"/>
                                <line y1="13.5" x2="51" y2="13.5" stroke="black" strokeWidth="3"/>
                                <line y1="25.5" x2="51" y2="25.5" stroke="black" strokeWidth="3"/>
                                <line y1="37.5" x2="51" y2="37.5" stroke="black" strokeWidth="3"/>
                                <line y1="49.5" x2="51" y2="49.5" stroke="black" strokeWidth="3"/>
                            </svg>
                        </button>
                        <button className="btn offcanvas-button" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1">
                            Filtrele
                        </button>
                        <FilterProduct/>
                    </div>
                </div>

                <div className="row urun-cards-row">
                    {products.map((product, index) => (
                        <div style={{transition: '.4s'}} className={colClass} key={`${product.id}-${index}`} data-aos="fade-up">
                            <div className="urun-card">
                                <a href={`/urunler-detay/${product.id}`}>
                                    {product.images?.[0] && (
                                        <img
                                            className="img-fluid w-100 urun-img2"
                                            src={
                                                product.images[0].imageUrl.startsWith("http")
                                                    ? product.images[0].imageUrl
                                                    : `https://localhost:7050${product.images[0].imageUrl}`
                                            }
                                            alt={product.name}
                                        />
                                    )}

                                    {product.images?.[1] && (
                                        <img
                                            className="img-fluid w-100 urun-img1"
                                            src={
                                                product.images[1].imageUrl.startsWith("http")
                                                    ? product.images[1].imageUrl
                                                    : `https://localhost:7050${product.images[1].imageUrl}`
                                            }
                                            alt={product.name}
                                        />
                                    )}
                                </a>

                                <div className="urun-card-content-bottom">
                                    <button className="urunler-card-content-bottom-add-btn"
                                            onClick={handleAddToBasket}>
                                        +
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="24"
                                             viewBox="0 0 24 24" fill="white">
                                            <path
                                                d="M4.558 7l4.701-4.702c.199-.198.46-.298.721-.298.613 0 1.02.505 1.02 1.029 0 .25-.092.504-.299.711l-3.26 3.26h-2.883zm12.001 0h2.883l-4.701-4.702c-.199-.198-.46-.298-.721-.298-.613 0-1.02.505-1.02 1.029 0 .25.092.504.299.711l3.26 3.26zm-16.559 2v2h.643c.534 0 1.021.304 1.256.784l4.101 10.216h12l4.102-10.214c.233-.481.722-.786 1.256-.786h.642v-2h-24z"/>
                                        </svg>
                                    </button>
                                    <button
                                        className="urunler-card-content-bottom-like-btn"
                                        onClick={() => token ? handleLikeClick(product.id) : (window.location.href = "/girisyap")}
                                    >
                                        <svg clipRule="evenodd" width="50" height="24"
                                             fill={product.favorite ? "red" : "white"}
                                             fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"
                                             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z"/>
                                        </svg>
                                    </button>
                                </div>

                                <div className="urunler-card-content-left">
                                    {product.variants.map(variant => (
                                        <button
                                            key={variant.id}
                                            className={`urunler-card-content-left-size-btn ${
                                                selectedSize === variant.id ? "selected-size" : ""
                                            }`}
                                            onClick={() => setSelectedSize(variant.id)}
                                        >
                                            {variant.size}
                                        </button>
                                    ))}
                                </div>

                                {product.discountRate > 0 && (
                                    <div className="urunler-card-content-top">
                                        <p>{product.discountRate}% İndirim</p>
                                    </div>
                                )}
                            </div>

                            <div className="urun-adi">
                                <p>{product.name}</p>
                            </div>
                            <div className="d-flex mt-1 w-100 justify-content-center align-items-center">
                                <p className="urun-code fs-6 fw-bold">{Number(product.averageRating).toFixed(0)}/10 </p>

                                <svg width="24" height="24" fill="orange"
                                     clipRule="evenodd" fillRule="evenodd"
                                     strokeLinejoin="round" strokeMiterlimit="2"
                                     viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"
                                        fillRule="nonzero"/>
                                </svg>
                            </div>
                            <div className="urun-fiyat">
                                <p style={{fontSize: "20px"}} className="p1-fiyat">
                                    {product.priceWithDiscount}₺
                                </p>
                                {product.discountRate > 0 && (
                                    <p style={{fontSize: "20px"}} className="p2-fiyat">
                                        {product.price}₺
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}

                    <PageLogo size="25" />

                </div>
            </div>
        </div>
    );
};

export default Products;