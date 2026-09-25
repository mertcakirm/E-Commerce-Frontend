import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./css/Products.css";
import FilterProduct from "../components/other/FilterProduct.jsx";
import { getCookie } from "../components/cookie/cookie";
import LoadingComponent from "../components/other/Loading.jsx";
import { toast } from "react-toastify";
import { AddToBasketRequest, FetchProductRequest, LikeProductRequest } from "../API/ProductApi.js";
import { toggleRefresh } from "../store/basketSlice.js";
import { useDispatch } from "react-redux";
import { toggleRefreshFav } from "../store/favoriteSlice.js";
import PageLogo from "../components/other/PageLogo.jsx";
import { TfiLayoutGrid3Alt, TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaStar } from "react-icons/fa";
import { IoHeartOutline, IoBagAddOutline } from "react-icons/io5";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const Products = () => {
    const dispatch = useDispatch();
    const [colClass, setColClass] = useState("col-lg-3 col-md-6 col-6");
    const [products, setProducts] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState({});
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [offerName, setOfferName] = useState("");
    const location = useLocation();
    const currentCategory = decodeURIComponent(location.pathname.split("/").pop());
    const token = getCookie("token");

    const GetProducts = async () => {
        if (loading) return;
        if (currentPage > totalPages) return;

        setLoading(true);
        try {
            const response = await FetchProductRequest(currentCategory, currentPage);

            const newItems = response.data?.data?.items || [];
            const newPage = response.data?.data?.pageNumber || currentPage;
            const newTotalPages = response.data?.data?.totalPages || totalPages;
            const newTotalCount = response.data?.data?.totalCount || totalCount;

            setProducts(prevProducts => [...prevProducts, ...newItems]);
            setCurrentPage(newPage + 1);
            setTotalPages(newTotalPages);
            setTotalCount(newTotalCount);
            setOfferName(response.data?.data?.offerName || "");
        } catch (err) {
            console.error("API Hatası:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setProducts([]);
        setCurrentPage(1);
        setTotalPages(1);
        setOfferName("");
        GetProducts();
    }, [currentCategory]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.innerHeight + document.documentElement.scrollTop;
            const offsetHeight = document.documentElement.offsetHeight;

            if (scrollTop + 500 >= offsetHeight && !loading) {
                GetProducts();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, totalPages, currentCategory]);

    const handleLikeClick = async (productCode) => {
        if (!token) {
            window.location.href = "/girisyap";
            return;
        }
        try {
            await LikeProductRequest(productCode);
            toast.success("Favori durumu güncellendi!");
            dispatch(toggleRefreshFav());
        } catch {
            toast.error("Favori güncellenemedi!");
        }
    };

    const handleSelectSize = (productId, variantId, e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setSelectedSizes(prev => ({
            ...prev,
            [productId]: variantId
        }));
    };

    const handleAddToBasket = async (productId, hasVariants) => {
        if (!token) {
            window.location.href = "/girisyap";
            return;
        }

        const chosenSize = selectedSizes[productId];
        if (hasVariants && !chosenSize) {
            toast.warn("Lütfen önce bir beden seçin!");
            return;
        }

        try {
            await AddToBasketRequest(chosenSize || null);
            toast.success("Ürün sepete eklendi!");
            dispatch(toggleRefresh());
        } catch {
            toast.error("Ürün sepete eklenemedi!");
        }
    };

    const handleGridChange = (size) =>
        setColClass(size === "4x4" ? "col-lg-3 col-md-6 col-6" : "col-lg-4 col-md-6 col-6");

    if (loading && products.length === 0) return <LoadingComponent />;

    return (
        <div>
            <div className="container-fluid urunler-container">
                {/* Header & Controls Toolbar */}
                <div className="products-toolbar-wrapper">
                    <div className="products-title-box" data-aos="fade-in">
                        <span className="products-category-kicker">Koleksiyon</span>
                        <h1 className="urunler-sayfa-baslik">
                            {currentCategory === "tum-urunler" ? "Tüm Ürünler" : offerName || currentCategory}
                        </h1>
                        <span className="products-count-badge">{totalCount} Ürün</span>
                    </div>

                    <div className="grid-row products-controls-box">
                        <div className="grid-view-buttons">
                            <button
                                className={`grid-btn 3x3-btn ${colClass.includes("col-lg-4") ? "active-grid" : ""}`}
                                onClick={() => handleGridChange("3x3")}
                                aria-label="3 Sütunlu Görünüm"
                            >
                                <TfiLayoutGrid3Alt size={19} />
                            </button>
                            <button
                                className={`grid-btn 4x4-btn ${colClass.includes("col-lg-3") ? "active-grid" : ""}`}
                                onClick={() => handleGridChange("4x4")}
                                aria-label="4 Sütunlu Görünüm"
                            >
                                <TfiLayoutGrid4Alt size={20} />
                            </button>
                        </div>

                        <button
                            className="btn filter-btn offcanvas-button"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight1"
                            aria-controls="offcanvasRight1"
                        >
                            <HiOutlineAdjustmentsHorizontal size={18} />
                            <span>Filtrele</span>
                        </button>

                        <FilterProduct />
                    </div>
                </div>

                {/* Ürünler Grid Listesi */}
                <div className="row urun-cards-row g-3 g-md-4">
                    {products.map((product, index) => {
                        const hasDiscount = Number(product.discountRate) > 0;
                        const hasVariants = product.variants && product.variants.length > 0;
                        const currentSelectedSize = selectedSizes[product.id];

                        return (
                            <div className={colClass} key={`${product.id}-${index}`}>
                                <div className="product-item-wrapper">
                                    <div className="urun-card" data-aos="fade-up">
                                        {/* İndirim Rozeti */}
                                        {hasDiscount && (
                                            <div className="urunler-card-content-top">
                                                <span>%{product.discountRate}</span>
                                            </div>
                                        )}

                                        {/* Ürün Fotoğrafları Linki */}
                                        <a href={`/urunler-detay/${product.id}`} className="product-card-link">
                                            {product.images?.[0] && (
                                                <img
                                                    className="img-fluid urun-img2"
                                                    src={
                                                        product.images[0].imageUrl.startsWith("http")
                                                            ? product.images[0].imageUrl
                                                            : `https://localhost:7050${product.images[0].imageUrl}`
                                                    }
                                                    alt={product.name}
                                                    loading="lazy"
                                                />
                                            )}

                                            {product.images?.[1] && (
                                                <img
                                                    className="img-fluid urun-img1"
                                                    src={
                                                        product.images[1].imageUrl.startsWith("http")
                                                            ? product.images[1].imageUrl
                                                            : `https://localhost:7050${product.images[1].imageUrl}`
                                                    }
                                                    alt={product.name}
                                                    loading="lazy"
                                                />
                                            )}
                                        </a>

                                        {/* Masaüstü ve Mobilde Beden Seçici */}
                                        {hasVariants && (
                                            <div className="urunler-card-content-left">
                                                {product.variants.map((variant) => (
                                                    <button
                                                        key={variant.id}
                                                        type="button"
                                                        className={`urunler-card-content-left-size-btn ${
                                                            currentSelectedSize === variant.id ? "selected-size" : ""
                                                        }`}
                                                        onClick={(e) => handleSelectSize(product.id, variant.id, e)}
                                                    >
                                                        {variant.size}
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {/* FLOATING DYNAMIC ISLAND (Sepete Ekle & Favori) */}
                                        <div className="product-island-container">
                                            <div className="product-action-island">
                                                <button
                                                    type="button"
                                                    className="island-basket-btn"
                                                    onClick={() => handleAddToBasket(product.id, hasVariants)}
                                                >
                                                    <IoBagAddOutline size={18} />
                                                    <span>Sepete Ekle</span>
                                                </button>

                                                <span className="island-divider" />

                                                <button
                                                    type="button"
                                                    className="island-fav-btn"
                                                    onClick={() => handleLikeClick(product.id)}
                                                    aria-label="Favori"
                                                >
                                                    <IoHeartOutline size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ürün Detayları */}
                                    <div className="product-meta-wrap">
                                        <a href={`/urunler-detay/${product.id}`} className="urun-adi">
                                            <p>{product.name}</p>
                                        </a>

                                        <div className="d-flex align-items-center justify-content-between mt-1">
                                            <div className="urun-fiyat">
                                                <span className="p1-fiyat">{product.priceWithDiscount} ₺</span>
                                                {hasDiscount && (
                                                    <span className="p2-fiyat">{product.price} ₺</span>
                                                )}
                                            </div>

                                            {product.averageRating > 0 && (
                                                <div className="rating-pill">
                                                    <FaStar size={11} color="#f59e0b" />
                                                    <span>{Number(product.averageRating).toFixed(1)}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <div className="col-12 d-flex justify-content-center py-5">
                        <PageLogo size="25" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
