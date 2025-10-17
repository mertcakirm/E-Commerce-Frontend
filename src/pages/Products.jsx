import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import "./css/Products.css";
import FilterProduct from "../components/other/FilterProduct.jsx";
import {getCookie} from "../components/cookie/cookie";
import LoadingComponent from "../components/other/Loading.jsx";
import {toast} from "react-toastify";
import {AddToBasketRequest, FetchProductRequest, LikeProductRequest} from "../API/ProductApi.js";
import {toggleRefresh} from "../store/basketSlice.js";
import {useDispatch} from "react-redux";
import {toggleRefreshFav} from "../store/favoriteSlice.js";
import PageLogo from "../components/other/PageLogo.jsx";
import {TfiLayoutGrid3Alt, TfiLayoutGrid4Alt} from "react-icons/tfi";
import {FaStar} from "react-icons/fa";
import {FcLike} from "react-icons/fc";
import {BsBasket3Fill} from "react-icons/bs";

const Products = () => {
    const dispatch = useDispatch();
    const [colClass, setColClass] = useState("col-lg-3");
    const [products, setProducts] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [offerName, setOfferName] = useState("");
    const location = useLocation();
    const currentCategory = decodeURIComponent(location.pathname.split("/").pop());
    const token = getCookie("token");

    const GetProducts = async () => {
        if (loading) return; // aynı anda iki çağrı olmasın
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
            <div className="container-fluid urunler-container">
                <div className="row text-align-center justify-content-center">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4 mt-5" data-aos="fade-in">
                        <p
                            className="text-center urunler-sayfa-baslik"
                            style={{ textTransform: "uppercase" }}
                        >
                            {offerName || currentCategory} / {totalCount} Ürün
                        </p>
                    </div>
                    <div className="col-lg-4 row grid-row">
                        <button className="grid-btn 3x3-btn" onClick={() => handleGridChange("3x3")}>
                            <TfiLayoutGrid3Alt size={35} />
                        </button>
                        <button className="grid-btn 4x4-btn" onClick={() => handleGridChange("4x4")}>
                            <TfiLayoutGrid4Alt size={40} />
                        </button>
                        <button className="btn mx-3 filter-btn offcanvas-button" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight1" aria-controls="offcanvasRight1">
                            Filtrele
                        </button>
                        <FilterProduct/>
                    </div>
                </div>

                <div className="row urun-cards-row">
                    {products.map((product, index) => (
                        <div style={{transition: '.4s'}} className={colClass} key={`${product.id}-${index}`}>
                            <div className="urun-card"  data-aos="fade-up">
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
                                    <button className="d-flex align-items-center gap-2 urunler-card-content-bottom-add-btn"
                                            onClick={handleAddToBasket}>
                                        +
                                        <BsBasket3Fill size={25} color="white" />

                                    </button>
                                    <button
                                        className="urunler-card-content-bottom-like-btn"
                                        onClick={() => token ? handleLikeClick(product.id) : (window.location.href = "/girisyap")}
                                    >
                                        <FcLike size={25} />
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
                            <div className="d-flex mt-1 w-100 gap-2 justify-content-center align-items-center">
                                <p className="urun-code fs-6 fw-bold">{Number(product.averageRating).toFixed(0)}/10 </p>

                                <FaStar size={24} color="orange" />
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