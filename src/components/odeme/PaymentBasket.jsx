import {useEffect, useState} from 'react';
import "../../pages/css/Payment.css";
import BasketSummary from "./BasketSummary.jsx";
import {
    DecreaseProductRequest,
    DeleteProductFromBasketRequest,
    FetchBasketRequest,
    IncreaseProductRequest,
    ResetToBasketRequest
} from "../../API/ProductApi.js";
import {setBasket, toggleRefresh} from "../../store/basketSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "../cookie/cookie.js";
import {toast} from "react-toastify";
import Loading from "../other/Loading.jsx";

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
        try {
            await IncreaseProductRequest(productVariantId);
            dispatch(toggleRefresh());
        } catch (error) {
            console.error("Increase product error:", error);
        }
    };

    const decrementProductCount = async (productVariantId) => {
        try {
            await DecreaseProductRequest(productVariantId);
            dispatch(toggleRefresh());
        } catch (error) {
            console.error("Decrease product error:", error);
        }
    };

    const DeleteProductFromBasket = async (basketId) => {
        if (!token) return console.error("No token found");
        try {
            await DeleteProductFromBasketRequest(basketId);
            toast.success("Ürün sepetten başarıyla silindi!");
            dispatch(toggleRefresh());
        } catch (error) {
            console.error("Delete product error:", error);
            toast.error("Ürün sepetten silinirken bir hata oluştu!");
        }
    };

    const resetBasket = async () => {
        if (!token) return console.error("No token found");
        try {
            await ResetToBasketRequest();
            dispatch(toggleRefresh());
            toast.success("Sepet başarıyla sıfırlandı!");
        } catch (error) {
            console.error("Reset basket error:", error);
            toast.error("Sepet sıfırlanırken bir hata oluştu!");
        }
    };

    useEffect(() => {
        fetchBasket();
    }, []);

    useEffect(() => {
        fetchBasket();
    }, [refreshData]);

    if (loading) return <Loading/>;

    return (
        <div className="row">
            <div className="col-lg-8">
                <div className="d-flex justify-content-between mb-3">
                    <p className="ozet-baslik">Ürünlerim</p>
                    {cartItems.length > 0 &&
                        <button className="reset-basket-btn2" onClick={resetBasket}>
                            Sepeti Sıfırla
                        </button>
                    }

                </div>

                {cartItems.length === 0 ? (
                    <div className="d-flex flex-column gap-3">
                        <div className="text-center py-5 fs-5 fw-semibold text-secondary">
                            Sepetiniz boş.
                        </div>
                        <a
                            className="mt-3 text-center"
                            href="../urunler/tum-urunler"
                            style={{fontSize: "20px", color: "#000"}}
                        >
                            Alışverişe Devam Et
                        </a>
                    </div>
                ) : (
                    <div className="sepet-ozet-flex">
                        {cartItems.map((item, index) => (
                            <div key={index} className="sepet-ozet-card row">
                                <div className="col-lg-3 col-md-3">
                                    {item.images[0]?.imageUrl ? (
                                        <img
                                            src={item.images[0].imageUrl}
                                            className="img-fluid w-100 sepet-resim"
                                            alt={item.name}
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
                                </div>

                                <div className="col-lg-5 col-md-5 ozet-card-col-2">
                                    <p className="ozet-card-col-2-p1">{item.name}</p>
                                    <p className="ozet-card-col-2-p2">Ürün Kodu: {item.id}</p>
                                    <p className="ozet-card-col-2-p2">Beden: {item.size}</p>
                                </div>

                                <div className="col-lg-4 col-md-4 ozet-card-col-3">
                                    <button
                                        className="ozet-card-col-3-sil-btn"
                                        onClick={() => DeleteProductFromBasket(item.id)}
                                    >
                                        <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round"
                                             strokeMiterlimit="2" fill="gray" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
                                                fillRule="nonzero"
                                            />
                                        </svg>
                                        <span>Sil</span>
                                    </button>

                                    <div className="updown">
                                        <button onClick={() => decrementProductCount(item.productVariantId)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => incrementProductCount(item.productVariantId)}>+</button>
                                    </div>

                                    <div className="ozet-card-fiyat-flex">
                                        <div className="ozet-card-fiyat-indirim">
                                            %{item.discount}
                                        </div>
                                        <div className="ozet-card-fiyat-1">{item.priceWithDiscount}₺</div>
                                        <div className="ozet-card-fiyat-2">{item.priceWithOutDiscount}₺</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>


            <div className="col-lg-4 ozet-sag-col">
                <BasketSummary />
                {cartItems.length > 0 &&
                    <button
                        className="button-next-step primary"
                        onClick={() => window.location.href = "/siparis/kargo"}
                        id="stepper"
                    >
                        Sonraki Adım
                    </button>
                }

            </div>
        </div>
    );
};

export default PaymentBasket;