import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCookie } from "../../cookie/cookie.js";
import {
    AddToBasketRequest,
    FetchLikedProductRequest,
    LikeProductRequest
} from "../../../API/ProductApi.js";
import {setFavorites, toggleRefreshFav} from "../../../store/favoriteSlice.js";
import Loading from "../Loading.jsx";
import { toast } from "react-toastify";
import {toggleRefresh} from "../../../store/basketSlice.js";

const Favorite = () => {
    const dispatch = useDispatch();
    const favoriteproduct = useSelector((state) => state.favorite.favorites);
    const refreshData = useSelector((state) => state.favorite.refresh);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState(null);
    const token = getCookie("token");

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

    // Favori butonuna tıklayınca
    const handleLikeClick = async (productCode) => {
        if (!token) {
            window.location.href = "/girisyap";
            return;
        }
        try {
            await LikeProductRequest(productCode);
            dispatch(toggleRefreshFav());
            toast.success("Ürün favorilerden çıkarıldı!");
        } catch {
            toast.error("Ürün favorilerden çıkarılamadı!");
        }
    };

    // Favorileri API'den çek
    const fetchFavorite = async () => {
        setLoading(true);
        try {
            const likedObj = await FetchLikedProductRequest();

            const likedData = likedObj?.data?.data?.items?.map((item) => {
                const priceWithDiscount = item.price * (1 - item.discountRate / 100);

                return {
                    productName: item.name,
                    productCode: item.id,
                    priceWithDiscount: priceWithDiscount.toFixed(2),
                    priceWithOutDiscount: item.price.toFixed(2),
                    discount: item.discountRate,
                    averageRating: item.averageRating,
                    images: item.images?.map(img => ({
                        imageUrl: `https://localhost:7050${img.imageUrl}`
                    })) || [],
                    sizes: item.variants?.map(variant => ({
                        id: variant.id || null,
                        size: variant.size || "-"
                    })) || [{ size: "-" }]
                };
            }) || [];

            dispatch(setFavorites(likedData));
        } catch (error) {
            console.error("Data fetching error:", error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect refreshData değiştiğinde yeniden çek
    useEffect(() => {
        fetchFavorite();
    }, [refreshData]);

    return (
        <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasRightFav"
            aria-labelledby="offcanvasRightLabel"
        >
            <div className="offcanvas-header">
                <p className="fs-3 m-0">Favorileriniz</p>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>

            <div className="offcanvas-body ofcanvas-body-sepet">
                {loading ? (
                    <Loading />
                ) : favoriteproduct.length > 0 ? (
                    favoriteproduct.map((product, index) => (
                        <div className="favorilerim-canvas-card row" key={index}>
                            <div className="col-3 favorilerim-canvas-col-1">
                                <a href={`/urunler-detay/${product.productCode}`}>
                                    {product.images[0] ? (
                                        <img
                                            src={product.images[0].imageUrl}
                                            className="img-fluid w-100 sepet-resim"
                                            alt={product.productName}
                                        />
                                    ) : (
                                        <div
                                            className="img-fluid w-100 sepet-resim"
                                            style={{
                                                background: "#f0f0f0",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                height: "150px",
                                            }}
                                        >
                                            Resim Yok
                                        </div>
                                    )}
                                </a>
                            </div>

                            <div className="col-8 favorilerim-canvas-col-2">
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <p className="sepet-card-col-2-p-1">{product.productName}</p>
                                    <button
                                        className="urunler-card-content-bottom-like-btn"
                                        onClick={() => handleLikeClick(product.productCode)}
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
                                    <p className="sepet-card-col-2-p1-fiyat">{product.priceWithDiscount}₺</p>
                                    <p className="sepet-card-col-2-p2-fiyat">{product.priceWithOutDiscount}₺</p>
                                </div>
                                <div className="favori-card-add-flex">
                                    <select
                                        name="favori-size"
                                        id="favori-size"
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                    >
                                        <option value="0">Beden Seçiniz</option>
                                        {product.sizes.map((sizeObj) => (
                                            <option key={sizeObj.id} value={sizeObj.id}>
                                                {sizeObj.size}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        className="favori-card-sepete-ekle"
                                        onClick={handleAddToBasket}
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
                                        <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="d-flex row text-center justify-content-center mt-5">
                        <h2 className="mt-5">Favori Listeniz Boş</h2>
                        <a
                            className="mt-3"
                            href="../urunler/tum-urunler"
                            style={{ fontSize: "24px", color: "#000" }}
                        >
                            Alışverişe Devam Et
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorite;