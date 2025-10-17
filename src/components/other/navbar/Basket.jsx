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
import {RiDeleteBin7Fill} from "react-icons/ri";

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
        if (!item || item.quantity >= 10) return; // 10’dan fazla olmasın

        updateQuantityLocally(productVariantId, 1); // local UI güncelle
        try {
            await IncreaseProductRequest(productVariantId); // backend isteği gönder
        } catch (error) {
            console.error("Increase product error:", error);
            updateQuantityLocally(productVariantId, -1); // hata olursa geri al
        }
    };

    // 🟢 Ürün azaltma (min 1)
    const decrementProductCount = async (productVariantId) => {
        const item = cartItems.find((x) => x.productVariantId === productVariantId);
        if (!item || item.quantity <= 1) return;

        updateQuantityLocally(productVariantId, -1); // local UI güncelle
        try {
            await DecreaseProductRequest(productVariantId); // backend isteği gönder
        } catch (error) {
            console.error("Decrease product error:", error);
            updateQuantityLocally(productVariantId, 1); // hata olursa geri al
        }
    };

    // 🟢 Ürünü sil
    const DeleteProductFromBasket = async (basketId) => {
        if (!token) return console.error("No token found");
        try {
            await DeleteProductFromBasketRequest(basketId);
            dispatch(setBasket(cartItems.filter((x) => x.id !== basketId))); // localden kaldır
        } catch (error) {
            console.error("Delete basket item error:", error);
        }
    };

    // 🟢 Sepeti sıfırla
    const resetBasket = async () => {
        if (!token) return console.error("No token found");
        try {
            await ResetToBasketRequest();
            dispatch(setBasket([])); // local sepeti temizle
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

    // 🧱 Render
    return (
        <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasRightBasket"
            aria-labelledby="offcanvasRightLabel"
        >
            <div className="offcanvas-header">
                <p className="fs-3 m-0">Sepetiniz</p>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div className="offcanvas-body overflow-hidden ofcanvas-body-sepet">
                <div className="sepet-flex2">
                    {loading ? (
                        <Loading />
                    ) : cartItems.length === 0 ? (
                        <div className="d-flex row text-center justify-content-center mt-5">
                            <h2 className="mt-5">Sepetiniz Boş</h2>
                            <a
                                className="mt-3"
                                href="../urunler/tum-urunler"
                                style={{ fontSize: "24px", color: "#000" }}
                            >
                                Alışverişe Devam Et
                            </a>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div className="sepet-card row" key={item.id}>
                                <a
                                    href={`/urunler-detay/${item.productCode}`}
                                    className="col-4 sepet-card-col-1"
                                >
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
                                </a>
                                <div className="col-6 sepet-card-col-2">
                                    <p className="sepet-card-col-2-p-1">{item.name}</p>
                                    <p className="sepet-card-col-2-urun-kodu">
                                        Ürün Kodu : {item.productCode}
                                    </p>
                                    <p className="sepet-card-col-2-beden">
                                        BEDEN : {item.size}
                                    </p>
                                    <div className="updown">
                                        <button
                                            onClick={() =>
                                                decrementProductCount(item.productVariantId)
                                            }
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() =>
                                                incrementProductCount(item.productVariantId)
                                            }
                                            disabled={item.quantity >= 10}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="sepet-card-col-2-fiyatlar-flex">
                                        <p className="sepet-card-col-2-p1-fiyat fw-bold">
                                            {item.priceWithDiscount}₺
                                        </p>
                                        {item.discount > 0 && (
                                            <p className="sepet-card-col-2-p2-fiyat fw-bold">
                                                {item.priceWithOutDiscount}₺
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="col-2 sepet-card-col-3">
                                    <button
                                        className="sepet-card-col-3-like-btn"
                                        onClick={() => DeleteProductFromBasket(item.id)}
                                    >
                                        <RiDeleteBin7Fill size={30} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="position-absolute d-flex flex-column bottom-0 w-100">
                        <div className="toplam-tutar">
                            <p>TOPLAM</p>
                            <p>{totalPrice}₺</p>
                        </div>

                        <div className="d-flex justify-content-between w-100">
                            <button
                                className="reset-basket-btn w-50"
                                onClick={resetBasket}
                            >
                                Sepeti Sıfırla
                            </button>

                            <a
                                href="#"
                                className="sepeti-tamamla-btn w-50"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (totalPrice === 0) {
                                        window.location.href =
                                            "/urunler/tum-urunler";
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