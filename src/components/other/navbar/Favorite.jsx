import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCookie } from "../../cookie/cookie.js";
import {
    AddToBasketRequest,
    FetchLikedProductRequest,
    LikeProductRequest
} from "../../../API/ProductApi.js";
import { setFavorites, toggleRefreshFav } from "../../../store/favoriteSlice.js";
import Loading from "../Loading.jsx";
import { toast } from "react-toastify";
import { toggleRefresh } from "../../../store/basketSlice.js";
import { IoHeart, IoArrowForward, IoBagAddOutline } from "react-icons/io5";

const Favorite = () => {
    const dispatch = useDispatch();
    const favoriteproduct = useSelector((state) => state.favorite.favorites);
    const refreshData = useSelector((state) => state.favorite.refresh);
    const [loading, setLoading] = useState(true);
    // Ürün bazlı beden seçimi için map yapısı
    const [selectedSizes, setSelectedSizes] = useState({});
    const token = getCookie("token");

    const handleSizeChange = (productId, sizeId) => {
        setSelectedSizes(prev => ({
            ...prev,
            [productId]: sizeId
        }));
    };

    const handleAddToBasket = async (productId) => {
        if (!token) {
            window.location.href = "/girisyap";
            return;
        }

        const chosenSize = selectedSizes[productId];
        if (!chosenSize || chosenSize === "0") {
            toast.warn("Lütfen önce bir beden seçin!");
            return;
        }

        try {
            await AddToBasketRequest(chosenSize);
            toast.success("Ürün sepete eklendi!");
            dispatch(toggleRefresh());
        } catch {
            toast.error("Ürün sepete eklenemedi!");
        }
    };

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

    useEffect(() => {
        fetchFavorite();
    }, [refreshData]);

    return (
        <div
            className="offcanvas offcanvas-end modern-favorite-drawer"
            tabIndex="-1"
            id="offcanvasRightFav"
            aria-labelledby="offcanvasRightLabel"
        >
            <div className="offcanvas-header modern-fav-header">
                <div className="d-flex align-items-center gap-2">
                    <h5 className="fav-drawer-title mb-0" id="offcanvasRightLabel">Favorilerim</h5>
                    <span className="fav-count-pill">{favoriteproduct?.length || 0}</span>
                </div>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>

            <div className="offcanvas-body modern-fav-body p-0">
                {loading ? (
                    <div className="fav-loading-wrap">
                        <Loading />
                    </div>
                ) : favoriteproduct.length > 0 ? (
                    <div className="fav-items-container">
                        {favoriteproduct.map((product) => {
                            const hasDiscount = Number(product.discount) > 0;
                            return (
                                <div className="modern-fav-card" key={product.productCode}>
                                    {/* Ürün Görseli */}
                                    <a
                                        href={`/urunler-detay/${product.productCode}`}
                                        className="modern-fav-img-wrap"
                                    >
                                        {product.images[0] ? (
                                            <img
                                                src={product.images[0].imageUrl}
                                                className="modern-fav-img"
                                                alt={product.productName}
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="modern-fav-img-empty">Görsel Yok</div>
                                        )}
                                    </a>

                                    {/* Ürün Bilgileri ve Aksiyonlar */}
                                    <div className="modern-fav-info">
                                        <div className="modern-fav-info-top">
                                            <a
                                                href={`/urunler-detay/${product.productCode}`}
                                                className="modern-fav-name"
                                                title={product.productName}
                                            >
                                                {product.productName}
                                            </a>
                                            <button
                                                className="modern-fav-remove-btn"
                                                onClick={() => handleLikeClick(product.productCode)}
                                                aria-label="Favorilerden Çıkar"
                                                title="Favorilerden Çıkar"
                                            >
                                                <IoHeart size={20} />
                                            </button>
                                        </div>

                                        <p className="modern-fav-code">Kod: #{product.productCode}</p>

                                        {/* Fiyat Alanı */}
                                        <div className="modern-fav-price-wrap">
                                            <span className="modern-fav-final-price">
                                                {product.priceWithDiscount} ₺
                                            </span>
                                            {hasDiscount && (
                                                <>
                                                    <span className="modern-fav-old-price">
                                                        {product.priceWithOutDiscount} ₺
                                                    </span>
                                                    <span className="modern-fav-discount-tag">
                                                        %{product.discount}
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        {/* Beden Seçimi & Sepete Ekleme */}
                                        <div className="modern-fav-actions">
                                            <select
                                                className="modern-fav-select"
                                                value={selectedSizes[product.productCode] || "0"}
                                                onChange={(e) => handleSizeChange(product.productCode, e.target.value)}
                                            >
                                                <option value="0">Beden</option>
                                                {product.sizes.map((sizeObj) => (
                                                    <option key={sizeObj.id || sizeObj.size} value={sizeObj.id}>
                                                        {sizeObj.size}
                                                    </option>
                                                ))}
                                            </select>

                                            <button
                                                className="modern-fav-add-btn"
                                                onClick={() => handleAddToBasket(product.productCode)}
                                            >
                                                <IoBagAddOutline size={16} />
                                                <span>Sepete Ekle</span>
                                            </button>

                                            <a
                                                href={`/urunler-detay/${product.productCode}`}
                                                className="modern-fav-detail-link"
                                                title="Ürüne Git"
                                            >
                                                <IoArrowForward size={16} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="modern-fav-empty">
                        <div className="fav-empty-icon-wrap">
                            <IoHeart size={44} />
                        </div>
                        <h3>Favori Listeniz Boş</h3>
                        <p>Beğendiğiniz ürünleri kalp ikonuna tıklayarak buraya ekleyebilirsiniz.</p>
                        <a
                            className="modern-fav-empty-btn"
                            href="../urunler/tum-urunler"
                            data-bs-dismiss="offcanvas"
                        >
                            Alışverişe Başla
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorite;
