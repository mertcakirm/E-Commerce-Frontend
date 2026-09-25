import { useEffect, useState } from 'react';
import "../../pages/css/Payment.css";
import BasketSummary from "./BasketSummary.jsx";
import {
    DecreaseProductRequest,
    DeleteProductFromBasketRequest,
    FetchBasketRequest,
    IncreaseProductRequest,
    ResetToBasketRequest
} from "../../API/ProductApi.js";
import { setBasket } from "../../store/basketSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../cookie/cookie.js";
import { toast } from "react-toastify";
import Loading from "../other/Loading.jsx";
import { HiOutlineTrash } from "react-icons/hi2";

const PaymentBasket = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.basket.items);
    const refreshData = useSelector((state) => state.basket.refresh);
    const token = getCookie("token");

    const fetchBasket = async () => {
        setLoading(true);
        try {
            const basketObj = await FetchBasketRequest();
            const formattedItems = basketObj?.data?.data?.cartItems?.map((item) => {
                const priceWithDiscount = item.product.price * (1 - (item.product.discountRate || 0) / 100);
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
                    images: item.product?.images?.map((img) => ({
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

    const incrementProductCount = async (productVariantId) => {
        const updatedItems = cartItems.map((item) => {
            if (item.productVariantId === productVariantId) {
                if (item.quantity >= 10) {
                    toast.warning("Bir üründen en fazla 10 adet ekleyebilirsiniz.");
                    return item;
                }
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        dispatch(setBasket(updatedItems));

        try {
            await IncreaseProductRequest(productVariantId);
        } catch (error) {
            console.error("Increase product error:", error);
            toast.error("Ürün artırılırken bir hata oluştu!");
        }
    };

    const decrementProductCount = async (productVariantId) => {
        const updatedItems = cartItems.map((item) => {
            if (item.productVariantId === productVariantId) {
                if (item.quantity <= 1) {
                    toast.warning("Ürün adedi 1'in altına inemez.");
                    return item;
                }
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        dispatch(setBasket(updatedItems));

        try {
            await DecreaseProductRequest(productVariantId);
        } catch (error) {
            console.error("Decrease product error:", error);
            toast.error("Ürün azaltılırken bir hata oluştu!");
        }
    };

    const DeleteProductFromBasket = async (basketId) => {
        if (!token) return;
        try {
            await DeleteProductFromBasketRequest(basketId);
            toast.success("Ürün sepetten silindi.");
            const updatedItems = cartItems.filter((item) => item.id !== basketId);
            dispatch(setBasket(updatedItems));
        } catch (error) {
            console.error("Delete product error:", error);
            toast.error("Ürün silinirken hata oluştu.");
        }
    };

    const resetBasket = async () => {
        if (!token) return;
        try {
            await ResetToBasketRequest();
            dispatch(setBasket([]));
            toast.success("Sepet temizlendi.");
        } catch (error) {
            console.error("Reset basket error:", error);
            toast.error("Sepet temizlenirken hata oluştu.");
        }
    };

    useEffect(() => { fetchBasket(); }, []);
    useEffect(() => { fetchBasket(); }, [refreshData]);

    if (loading) return <Loading />;

    return (
        <div className="row g-4 g-xl-5">
            <div className="col-lg-8">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="checkout-section-title">Sepetiniz ({cartItems.length} Ürün)</h2>
                    {cartItems.length > 0 && (
                        <button className="checkout-btn-text text-danger" onClick={resetBasket}>
                            Sepeti Temizle
                        </button>
                    )}
                </div>

                {cartItems.length === 0 ? (
                    <div className="checkout-empty-state">
                        <p>Sepetinizde ürün bulunmamaktadır.</p>
                        <a href="/urunler/tum-urunler" className="checkout-btn-outline">Alışverişe Başla</a>
                    </div>
                ) : (
                    <div className="checkout-cart-list">
                        {cartItems.map((item, index) => (
                            <div key={index} className="checkout-cart-item">
                                <div className="cart-item-img-box">
                                    {item.images[0]?.imageUrl ? (
                                        <img src={item.images[0].imageUrl} alt={item.name} />
                                    ) : (
                                        <div className="cart-img-placeholder">Resim Yok</div>
                                    )}
                                </div>

                                <div className="cart-item-details">
                                    <h3 className="cart-item-title">{item.name}</h3>
                                    <span className="cart-item-prop">Beden: {item.size}</span>
                                    <span className="cart-item-prop">Kod: #{item.id}</span>
                                </div>

                                <div className="cart-item-actions">
                                    <div className="cart-qty-ctrl">
                                        <button onClick={() => decrementProductCount(item.productVariantId)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => incrementProductCount(item.productVariantId)}>+</button>
                                    </div>
                                    
                                    <div className="cart-price-block">
                                        <span className="cart-price-active">{item.priceWithDiscount} ₺</span>
                                        {item.discount > 0 && (
                                            <span className="cart-price-slashed">{item.priceWithOutDiscount} ₺</span>
                                        )}
                                    </div>

                                    <button className="cart-delete-btn" onClick={() => DeleteProductFromBasket(item.id)} title="Sil">
                                        <HiOutlineTrash size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="col-lg-4">
                <div className="checkout-sidebar-sticky">
                    <BasketSummary />
                    {cartItems.length > 0 && (
                        <button className="checkout-btn-primary w-100 mt-3" onClick={() => window.location.href = "/siparis/kargo"}>
                            Sonraki Adım: Teslimat
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentBasket;
