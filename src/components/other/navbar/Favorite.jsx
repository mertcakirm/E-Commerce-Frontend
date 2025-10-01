import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getCookie} from "../../cookie/cookie.js";
import {
    AddToBasketRequest,
    FetchBasketRequest,
    FetchLikedProductRequest,
    LikeProductRequest
} from "../../../API/ProductApi.js";
import {setFavorites} from "../../../store/favoriteSlice.js";
import {setBasket} from "../../../store/basketSlice.js";
import Loading from "../Loading.jsx";

const Favorite = () => {
    const dispatch = useDispatch();
    const favoriteproduct = useSelector((state) => state.favorite.favorites);
    const [loading, setLoading] = useState(true);
    const [selectedSizes, setSelectedSizes] = useState({});
    const [refleshData, setRefleshData] = useState(true);
    const token = getCookie("token");

    const toggleRefreshData = () => setRefleshData((prev) => !prev);


    const handleSizeChange = (e, index) => {
        const size = e.target.value;
        setSelectedSizes((prev) => ({ ...prev, [index]: size }));
    };

    const handleAddToBasket = async (productCode, size) => {
        if (!token) return (window.location.href = "/girisyap");
        try {
            const requestData = JSON.stringify({ productCode, size });
            await AddToBasketRequest(requestData);
            toggleRefreshData();
        } catch {
            console.error("Ürün sepete eklenemedi");
        }
    };

    const handleLikeClick = async (productCode) => {
        await LikeProductRequest(productCode);
        toggleRefreshData();
    };

    const fetchFavorite = async () => {
        try {
            const [likedObj, basketObj] = await Promise.all([
                FetchLikedProductRequest(),
            ]);
            dispatch(setFavorites(likedObj));
            dispatch(setBasket(basketObj));
        } catch (error) {
            console.error("Data fetching error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorite();
    }, [refleshData]);


    return (
        <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasRightFav"
            aria-labelledby="offcanvasRightLabel"
        >
            <div className="offcanvas-header">
                <p className="fs-3 m-0 ">
                    Favorileriniz
                </p>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div className="offcanvas-body ofcanvas-body-sepet">

            <div className="favorilerim-canvas-flex">
                <div>
                    {loading ? (
                        <Loading />
                    ) : (
                        favoriteproduct && favoriteproduct.length > 0 ? (
                            favoriteproduct.map((product, index) => (
                            <div className="favorilerim-canvas-card row" key={index}>
                                <div className="col-3 favorilerim-canvas-col-1">
                                    <a href={`/urunler-detay/${product.productCode}`}>
                                        <img
                                            src={`data:image/jpeg;base64,${product.imageBytes}`}
                                            className="img-fluid w-100 sepet-resim"
                                            alt={product.productName || "Ürün resmi"}
                                        />
                                    </a>
                                </div>
                                <div className="col-8 favorilerim-canvas-col-2">
                                    <div
                                        style={{
                                            display: "flex",
                                            zIndex: "20",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <p className="sepet-card-col-2-p-1">
                                            {product.productName}
                                        </p>
                                        <button
                                            id="like-btn-color"
                                            className="urunler-card-content-bottom-like-btn"
                                            onClick={() =>
                                                handleLikeClick(product.productCode)
                                            }
                                        >
                                            <svg
                                                clipRule="evenodd"
                                                width="50"
                                                height="24"
                                                fill="red"
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
                                    <p className="sepet-card-col-2-urun-kodu">
                                        Ürün Kodu : {product.productCode}
                                    </p>
                                    <div className="sepet-card-col-2-fiyatlar-flex">
                                        <p className="sepet-card-col-2-p1-fiyat">
                                            {product.priceWithDiscount}₺
                                        </p>
                                        <p className="sepet-card-col-2-p2-fiyat">
                                            {product.priceWithOutDiscount}₺
                                        </p>
                                    </div>
                                    <div className="favori-card-add-flex">
                                        <select
                                            name="favori-size"
                                            id="favori-size"
                                            onChange={(e) => handleSizeChange(e, index)}
                                        >
                                            {product.sizes.map((sizeObj) => (
                                                <option key={sizeObj.size} value={sizeObj.size}>
                                                    {sizeObj.size}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            className="favori-card-sepete-ekle"
                                            onClick={() =>
                                                handleAddToBasket(
                                                    product.productCode,
                                                    selectedSizes[index] || product.sizes[0].size
                                                )
                                            }
                                        >
                                            Sepete Ekle
                                        </button>
                                    </div>
                                </div>
                                <div className="col-1 favorilerim-canvas-col-3">
                                    <a href={`/urunler-detay/${product.productCode}`}>
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
                                    </a>
                                </div>
                            </div>
                            ))
                        ) : (
                            <div style={{ padding: "2%" }}>
                                <h4>Favori listeniz boş</h4>
                            </div>
                        )
                    )}
                </div>
            </div>
            </div>
        </div>
    );
};

export default Favorite;