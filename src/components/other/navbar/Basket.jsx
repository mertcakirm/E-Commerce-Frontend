import { useEffect, useState } from "react";
import {
    DecreaseProductRequest,
    DeleteProductFromBasketRequest,
    FetchBasketRequest,
    IncreaseProductRequest,
    ResetToBasketRequest,
} from "../../../API/ProductApi.js";
import { setBasket } from "../../../store/basketSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../cookie/cookie.js";
import Loading from "../Loading.jsx";
import { HiOutlineTrash, HiMinus, HiPlus } from "react-icons/hi2";
import { BsBagX } from "react-icons/bs";

const Basket = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.basket.items);
    const refreshData = useSelector((state) => state.basket.refresh);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const token = getCookie("token");

    // 🟢 Sepeti API'den çek
    const fetchBasket = async () => {
        setLoading(true);
        try {
            const basketObj = await FetchBasketRequest();
            const formattedItems =
                basketObj?.data?.data?.cartItems?.map((item) => {
                    const priceWithDiscount =
                        item.product.price *
                        (1 - (item.product.discountRate || 0) / 100);
                    return {
                        id: item.id,
                        productId: item.product?.id,
                        name: item.product?.name || "Ürün ismi yok",
                        productCode: item.product?.id,
                        quantity: item.quantity,
                        productVariantId: item.productVariantId,
                        size: item.productVariantName || "-",
                        priceWithDiscount: priceWithDiscount.toFixed(2),
                        priceWithOutDiscount: (item.product?.price || 0).toFixed(2),
                        discount: item.product?.discountRate || 0,
                        images:
                            item.product?.images?.map((img) => ({
                                imageUrl: `https://localhost:7050${img.imageUrl}`,
                            })) || [],
                    };
                }) || [];
            dispatch(setBasket(formattedItems));
        } catch (error) {
            console.error("Basket fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBasket();
    }, [refreshData]);

    // 🟠 Local miktar güncelleme fonksiyonu (min 1 - max 10)
    const updateQuantityLocally = (productVariantId, delta) => {
        dispatch(
            setBasket(
                cartItems.map((item) => {
                    if (item.productVariantId !== productVariantId) return item;
                    const newQuantity = item.quantity + delta;
                    if (newQuantity < 1) return { ...item, quantity: 1 };
                    if (newQuantity > 10) return { ...item, quantity: 10 };
                    return { ...item, quantity: newQuantity };
                })
            )
        );
    };

    // 🟢 Ürün artırma (max 10)
    const incrementProductCount = async (productVariantId) => {
        const item = cartItems.find((x) => x.productVariantId === productVariantId);
        if (!item || item.quantity >= 10) return;

        updateQuantityLocally(productVariantId, 1);
        try {
            await IncreaseProductRequest(productVariantId);
        } catch (error) {
            console.error("Increase product error:", error);
            updateQuantityLocally(productVariantId, -1);
        }
    };

    // 🟢 Ürün azaltma (min 1)
    const decrementProductCount = async (productVariantId) => {
        const item = cartItems.find((x) => x.productVariantId === productVariantId);
        if (!item || item.quantity <= 1) return;

        updateQuantityLocally(productVariantId, -1);
        try {
            await DecreaseProductRequest(productVariantId);
        } catch (error) {
            console.error("Decrease product error:", error);
            updateQuantityLocally(productVariantId, 1);
        }
    };

    // 🟢 Ürünü sil
    const DeleteProductFromBasket = async (basketId) => {
        if (!token) return console.error("No token found");
        try {
            await DeleteProductFromBasketRequest(basketId);
            dispatch(setBasket(cartItems.filter((x) => x.id !== basketId)));
        } catch (error) {
            console.error("Delete basket item error:", error);
        }
    };

    // 🟢 Sepeti sıfırla
    const resetBasket = async () => {
        if (!token) return console.error("No token found");
        try {
            await ResetToBasketRequest();
            dispatch(setBasket([]));
        } catch (error) {
            console.error("Reset basket error:", error);
        }
    };

    // 🟢 Toplam fiyat hesapla
    useEffect(() => {
        const price = cartItems.reduce(
            (total, item) => total + item.priceWithDiscount * item.quantity,
            0
        );
        setTotalPrice(price.toFixed(2));
    }, [cartItems]);

    return (
        <div
            className="offcanvas offcanvas-end modern-basket-drawer"
            tabIndex="-1"
            id="offcanvasRightBasket"
            aria-labelledby="offcanvasRightLabel"
        >
            {/* Header */}
            <div className="offcanvas-header modern-basket-header">
                <div className="d-flex align-items-center gap-2">
                    <h5 className="basket-drawer-title mb-0" id="offcanvasRightLabel">Sepetiniz</h5>
                    <span className="basket-count-pill">{cartItems.length}</span>
                </div>
                <button
                    type="button"
                    className="btn-close shadow-none"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>

            {/* Body */}
            <div className="offcanvas-body modern-basket-body p-0">
                <div className="modern-basket-items-wrapper">
                    {loading ? (
                        <div className="basket-loading-wrap">
                            <Loading />
                        </div>
                    ) : cartItems.length === 0 ? (
                        <div className="modern-basket-empty">
                            <div className="basket-empty-icon-wrap">
                                <BsBagX size={44} />
                            </div>
                            <h3>Sepetiniz Boş</h3>
                            <p>Henüz sepetinize bir ürün eklemediniz. İlginizi çeken ürünlere göz atabilirsiniz.</p>
                            <a
                                className="modern-basket-empty-btn"
                                href="../urunler/tum-urunler"
                                data-bs-dismiss="offcanvas"
                            >
                                Alışverişe Devam Et
                            </a>
                        </div>
                    ) : (
                        <div className="d-flex flex-column gap-3 p-3">
                            {cartItems.map((item) => (
                                <div className="modern-basket-card" key={item.id}>
                                    {/* Görsel */}
                                    <a
                                        href={`/urunler-detay/${item.productCode}`}
                                        className="modern-basket-img-wrap"
                                    >
                                        {item.images[0]?.imageUrl ? (
                                            <img
                                                src={item.images[0].imageUrl}
                                                className="modern-basket-img"
                                                alt={item.name}
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="modern-basket-img-empty">
                                                Resim Yok
                                            </div>
                                        )}
                                    </a>

                                    {/* Detaylar */}
                                    <div className="modern-basket-content">
                                        <div className="modern-basket-content-top">
                                            <a
                                                href={`/urunler-detay/${item.productCode}`}
                                                className="modern-basket-title"
                                                title={item.name}
                                            >
                                                {item.name}
                                            </a>
                                            <button
                                                className="modern-basket-delete-btn"
                                                onClick={() => DeleteProductFromBasket(item.id)}
                                                title="Ürünü Sil"
                                            >
                                                <HiOutlineTrash size={18} />
                                            </button>
                                        </div>

                                        <div className="modern-basket-meta">
                                            <span>Kod: #{item.productCode}</span>
                                            <span className="modern-meta-separator">•</span>
                                            <span>Beden: <strong>{item.size}</strong></span>
                                        </div>

                                        {/* Fiyat & Sayaç */}
                                        <div className="modern-basket-footer-row">
                                            <div className="modern-basket-prices">
                                                <span className="modern-basket-active-price">
                                                    {item.priceWithDiscount} ₺
                                                </span>
                                                {item.discount > 0 && (
                                                    <span className="modern-basket-slashed-price">
                                                        {item.priceWithOutDiscount} ₺
                                                    </span>
                                                )}
                                            </div>

                                            <div className="modern-quantity-stepper">
                                                <button
                                                    type="button"
                                                    onClick={() => decrementProductCount(item.productVariantId)}
                                                    disabled={item.quantity <= 1}
                                                    aria-label="Azalt"
                                                >
                                                    <HiMinus size={13} />
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => incrementProductCount(item.productVariantId)}
                                                    disabled={item.quantity >= 10}
                                                    aria-label="Artır"
                                                >
                                                    <HiPlus size={13} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sticky Footer */}
                {cartItems.length > 0 && (
                    <div className="modern-basket-checkout-wrap">
                        <div className="modern-checkout-price-row">
                            <span className="modern-checkout-label">Toplam Tutar</span>
                            <span className="modern-checkout-value">{totalPrice} ₺</span>
                        </div>

                        <div className="modern-checkout-btn-group">
                            <button
                                className="modern-reset-btn"
                                onClick={resetBasket}
                            >
                                Sepeti Sıfırla
                            </button>

                            <a
                                href="#"
                                className="modern-submit-btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (totalPrice === 0) {
                                        window.location.href = "/urunler/tum-urunler";
                                    } else {
                                        window.location.href = "/siparis/ozet";
                                    }
                                }}
                            >
                                Sepeti Tamamla
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Basket;
