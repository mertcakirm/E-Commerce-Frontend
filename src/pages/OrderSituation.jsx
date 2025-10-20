import React, { useEffect, useState } from "react";
import "./css/OrderSituation.css";
import { GetOrderRequest } from "../API/OrderApi.js";

const OrderSituation = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [order, setOrder] = useState(null);
    const steps = ["Onaylandı", "Hazırlanıyor", "Yolda", "Teslim Edildi"];
    const urlpop = location.pathname.split("/").pop();

    const GetOrder = async () => {
        const response = await GetOrderRequest(urlpop);
        setOrder(response.data);

        switch (response.data.status) {
            case "Onaylandı":
                setCurrentStep(1);
                break;
            case "Hazırlanıyor":
                setCurrentStep(2);
                break;
            case "Yolda":
                setCurrentStep(3);
                break;
            case "Teslim Edildi":
                setCurrentStep(4);
                break;
            default:
                setCurrentStep(1);
        }
    };

    useEffect(() => {
        GetOrder();
    }, []);

    return (
        <div>
            <div className="container-fluid siparis-durumu-container">
                <div className="row" style={{ margin: "0px", marginTop: "120px" }}>
                    <div className="col-12">
                        <section className="checkout-progress-indicator">
                            <div className="progress">
                                {steps.map((step, index) => (
                                    <React.Fragment key={index}>
                                        <div className={`step${currentStep >= index + 1 ? " current" : ""}`} id={index + 1}>
                                            <span>{index + 1}</span>
                                            <span>{step}</span>
                                        </div>
                                        {index < steps.length - 1 && <div></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                {order && (
                    <div className="row siparis-durumu-row-parent" style={{ margin: "0px" }}>
                        {/* Teslimat ve Fatura Adresi */}
                        <div className="col-lg-6">
                            <div className="siparisDurumu-parts">
                                <div className="siparis-durumu-genel-baslik">Teslimat Adresi</div>
                                <div className="siparis-durumu-contents-parent">
                                    <p>{order.shippingAddress}</p>
                                    <p>Tel: 5057057858</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="siparisDurumu-parts">
                                <div className="siparis-durumu-genel-baslik">Fatura Adresi</div>
                                <div className="siparis-durumu-contents-parent">
                                    <p>{order.shippingAddress}</p>
                                    <p>Tel: 5057057858</p>
                                </div>
                            </div>
                        </div>

                        {/* Sipariş Bilgileri */}
                        <div className="col-lg-6">
                            <div className="siparis-durumu-genel-baslik">Sipariş Bilgileri</div>
                            <div className="siparis-durumu-contents-parent">
                                <div className="row siparis-durumu-satir-row">
                                    <div className="col-lg-6 siparis-durumu-satir-metin">Sipariş Numarası</div>
                                    <div className="col-lg-6 siparis-durumu-satir-metin">#{order.id}</div>
                                </div>
                                <div className="row siparis-durumu-satir-row">
                                    <div className="col-lg-6 siparis-durumu-satir-metin">Sipariş Tarihi</div>
                                    <div className="col-lg-6 siparis-durumu-satir-metin">
                                        {new Date(order.orderDate).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="row siparis-durumu-satir-row">
                                    <div className="col-lg-6 siparis-durumu-satir-metin">
                                        Taksit
                                    </div>
                                    <div className="col-lg-6 siparis-durumu-satir-metin">
                                        3 Taksit
                                    </div>
                                </div>
                                <div className="row siparis-durumu-satir-row">
                                    <div className="col-lg-6 siparis-durumu-satir-metin">
                                        Kargo Ücreti
                                    </div>
                                    <div className="col-lg-6 siparis-durumu-satir-metin">10₺</div>
                                </div>
                                <div className="row siparis-durumu-satir-row">
                                    <div className="col-lg-6 siparis-durumu-satir-metin">
                                        Kargo Takip
                                    </div>
                                    <div className="col-lg-6 siparis-durumu-satir-metin green">
                                        Kargo Teslim Edilmiştir
                                    </div>
                                </div>
                                <div className="row siparis-durumu-satir-row">
                                    <div className="col-lg-6 siparis-durumu-satir-metin">Sipariş Toplamı</div>
                                    <div className="col-lg-6 siparis-durumu-satir-metin">{order.totalAmount}₺</div>
                                </div>
                                <div className="row siparis-durumu-satir-row">
                                    <div className="col-lg-6 siparis-durumu-satir-metin">Sipariş Durumu</div>
                                    <div className="col-lg-6 siparis-durumu-satir-metin green">{order.status}</div>
                                </div>
                            </div>
                        </div>

                        {/* Ödeme Bilgileri */}
                        <div className="col-lg-6">
                            <div className="siparis-durumu-genel-baslik">Ödeme Bilgileri</div>
                            <div className="siparis-durumu-contents-parent">
                                {order.payment.map((p) => (
                                    <React.Fragment key={p.paymentId}>
                                        <div className="row siparis-durumu-satir-row">
                                            <div className="col-lg-6 siparis-durumu-satir-metin">Ödeme Türü</div>
                                            <div className="col-lg-6 siparis-durumu-satir-metin">{p.paymentMethod ==="Credit_Card" ? "Kredi Kartı" : "Havale"}</div>
                                        </div>
                                        <div className="row siparis-durumu-satir-row">
                                            <div className="col-lg-6 siparis-durumu-satir-metin">Ödeme Alındı mı?</div>
                                            <div className="col-lg-6 siparis-durumu-satir-metin green">
                                                {p.paymentStatus === "Pending" ? "Hayır" : "Evet"}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="siparis-durumu-genel-baslik">Ürünler</div>
                            <div className="d-flex align-items-center gap-5 flex-wrap mt-3 px-4 siparis-durumu-contents-parent2">
                                {order.orderItem.map((item) =>
                                    item.orderItemProduct.map((prod) => (
                                            <div key={item.orderItemId} className="d-flex gap-2 border shadow-sm p-3 rounded-2">
                                                <a href={`/urunler-detay/${prod.id}`}>
                                                    <img
                                                        className="img-fluid mx-3" style={{height:'200px',width:'100px',objectFit:'cover'}}
                                                        src={`https://localhost:7050${prod.imageUrl}`}
                                                        alt={prod.name}
                                                    />
                                                </a>

                                                <div className="d-flex mx-3 flex-wrap flex-column">
                                                    <p className="large">{prod.name}</p>
                                                    <p>Beden : {item.productVariantOrder[0]?.size || "M"}</p>
                                                    <p>Ürün Kodu : {prod.id}</p>
                                                    <p>Adet : {item.quantity}</p>
                                                    <p>Fiyat : {item.price}₺</p>
                                                </div>
                                            </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderSituation;