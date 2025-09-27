import { useEffect, useState } from "react";
import {
    DecreaseProductRequest,
    DeleteToBasketRequest,
    FetchBasketRequest,
    IncreaseProductRequest,
} from "../../../API/ProductApi.js";
import { setBasket } from "../../../store/basketSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../cookie/cookie.js";
import Loading from "../Loading.jsx";

const Basket = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.basket.items);
    const [loading, setLoading] = useState(true);
    const [totalprice, setTotalprice] = useState(0);
    const [refleshData, setRefleshData] = useState(true);
    const token = getCookie("token");


    const incrementProductCount = async (productVariantId) => {
        await IncreaseProductRequest(productVariantId);
        setRefleshData(!refleshData);
    };

    const decrementProductCount = async (productVariantId) => {
        await DecreaseProductRequest(productVariantId);
        setRefleshData(!refleshData);
    };

    const deleteItemFromBasket = async (productVariantId) => {
        if (!token) return console.error("No token found");
        await DeleteToBasketRequest(productVariantId);
        setRefleshData(!refleshData);
    };

    const fetchBasket = async () => {
        setLoading(true);
        try {
            const basketObj = await FetchBasketRequest();
            console.log(basketObj)

            const formattedItems = basketObj.data.data.cartItems.map((item) => {
                const variant = item.product.variants.find(
                    (v) => v.id === item.productVariantId
                );
                const priceWithDiscount =
                    item.product.price * (1 - item.product.discountRate / 100);
                return {
                    id: item.id,
                    productId: item.product.id,
                    name: item.product.name,
                    productCode: item.product.id,
                    quantity: item.quantity,
                    size: variant?.size || "-",
                    priceWithDiscount: priceWithDiscount.toFixed(2),
                    priceWithOutDiscount: item.product.price.toFixed(2),
                    discount: item.product.discountRate,
                    images: item.product.images,
                    productVariantId: item.productVariantId,
                };
            });
            dispatch(setBasket(formattedItems));
        } catch (error) {
            console.error("Data fetching error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBasket();
    }, [refleshData]);

    useEffect(() => {
        const price = cartItems.reduce(
            (total, item) => total + item.priceWithDiscount * item.quantity,
            0
        );
        setTotalprice(price.toFixed(2));
    }, [cartItems]);

    return (
        <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
            tabIndex="0"
        >
            <div className="sepet-flex2">
                {loading ? (
                    <Loading />
                ) : cartItems.length === 0 ? (
                    <div
                        style={{ margin: "0" }}
                        className="d-flex row text-center justify-content-center mt-5"
                    >
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
                                {item.images[0] ? (
                                    <img
                                        src={
                                            item.images[0].imageUrl.startsWith("http")
                                                ? item.images[0].imageUrl
                                                : `https://localhost:7050${item.images[0].imageUrl}`
                                        }
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
                                    Ürün Kodu : {item.id}
                                </p>
                                <p className="sepet-card-col-2-beden">BEDEN : {item.size}</p>
                                <div className="updown">
                                    <button onClick={() => decrementProductCount(item.id)}>
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => incrementProductCount(item.id)}>
                                        +
                                    </button>
                                </div>
                                <div className="sepet-card-col-2-fiyatlar-flex">
                                    <p className="sepet-card-col-2-p1-fiyat">{item.priceWithDiscount}₺</p>
                                    {item.discount === 0 && (
                                        <p className="sepet-card-col-2-p2-fiyat">
                                            {item.priceWithOutDiscount}₺
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="col-2 sepet-card-col-3">
                                <button
                                    className="sepet-card-col-3-like-btn"
                                    onClick={() => deleteItemFromBasket(item.productVariantId)}
                                >
                                    <svg
                                        width="30"
                                        height="30"
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="2"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
                                            fillRule="nonzero"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {cartItems.length > 0 && (
                <>
                    <div className="toplam-tutar">
                        <p>TOPLAM</p>
                        <p>{totalprice}₺</p>
                    </div>
                    <a
                        href="#"
                        className="sepeti-tamamla-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            if (totalprice === 0) {
                                window.location.href = "/urunler/tum-urunler";
                            } else {
                                window.location.href = "/siparis/ozet";
                            }
                        }}
                    >
                        Sepeti Tamamla
                    </a>
                </>
            )}
        </div>
    );
};

export default Basket;