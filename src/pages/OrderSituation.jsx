import React, { useEffect, useState } from "react";
import "./css/OrderSituation.css";
import { GetOrderRequest } from "../API/OrderApi.js";
import { 
    HiOutlineMapPin, 
    HiOutlineDocumentText, 
    HiOutlineCreditCard, 
    HiOutlineShoppingBag,
    HiOutlineCheckCircle,
    HiOutlineTruck
} from "react-icons/hi2";

const OrderSituation = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [order, setOrder] = useState(null);
    const steps = ["Onaylandı", "Hazırlanıyor", "Yolda", "Teslim Edildi"];
    const urlpop = location.pathname.split("/").pop();

    const GetOrder = async () => {
        try {
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
        } catch (error) {
            console.error("Sipariş verisi alınamadı:", error);
        }
    };

    useEffect(() => {
        GetOrder();
    }, []);

    return (
        <div className="order-situation-page">
            <div className="container siparis-durumu-container">
                
                {/* Üst Başlık */}
                <div className="order-header-banner" data-aos="fade-in">
                    <span className="order-kicker">Sipariş Durumu</span>
                    <h1 className="order-main-title">
                        {order ? `Sipariş Takibi #${order.id}` : "Sipariş Takibi"}
                    </h1>
                </div>

                {/* 1. Modern İlerleme Çubuğu (Stepper) */}
                <div className="order-stepper-wrapper" data-aos="fade-up">
                    <div className="order-stepper-track">
                        {steps.map((step, index) => {
                            const stepNumber = index + 1;
                            const isCompleted = currentStep > stepNumber;
                            const isCurrent = currentStep === stepNumber;
                            const isPending = currentStep < stepNumber;

                            return (
                                <div
                                    key={index}
                                    className={`stepper-node ${isCurrent ? "current" : ""} ${isCompleted ? "completed" : ""} ${isPending ? "pending" : ""}`}
                                >
                                    <div className="stepper-circle">
                                        {isCompleted ? (
                                            <HiOutlineCheckCircle size={22} className="completed-icon" />
                                        ) : (
                                            <span>{stepNumber}</span>
                                        )}
                                    </div>
                                    <span className="stepper-label">{step}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {order && (
                    <div className="row g-4 siparis-durumu-row-parent" data-aos="fade-up">
                        
                        {/* Teslimat ve Fatura Adresi */}
                        <div className="col-lg-6">
                            <div className="order-card-box">
                                <div className="order-card-header">
                                    <HiOutlineMapPin size={20} className="order-card-icon" />
                                    <h2>Teslimat Adresi</h2>
                                </div>
                                <div className="order-card-body">
                                    <p className="order-address-text">{order.shippingAddress}</p>
                                    <span className="order-phone-badge">İletişim: 0505 705 78 58</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="order-card-box">
                                <div className="order-card-header">
                                    <HiOutlineDocumentText size={20} className="order-card-icon" />
                                    <h2>Fatura Adresi</h2>
                                </div>
                                <div className="order-card-body">
                                    <p className="order-address-text">{order.shippingAddress}</p>
                                    <span className="order-phone-badge">İletişim: 0505 705 78 58</span>
                                </div>
                            </div>
                        </div>

                        {/* Sipariş Özeti ve Detayları */}
                        <div className="col-lg-6">
                            <div className="order-card-box">
                                <div className="order-card-header">
                                    <HiOutlineTruck size={20} className="order-card-icon" />
                                    <h2>Sipariş Detayları</h2>
                                </div>
                                <div className="order-table-rows">
                                    <div className="order-info-line">
                                        <span className="info-key">Sipariş Numarası</span>
                                        <span className="info-val fw-bold">#{order.id}</span>
                                    </div>
                                    <div className="order-info-line">
                                        <span className="info-key">Sipariş Tarihi</span>
                                        <span className="info-val">{new Date(order.orderDate).toLocaleDateString("tr-TR")}</span>
                                    </div>
                                    <div className="order-info-line">
                                        <span className="info-key">Ödeme Şekli</span>
                                        <span className="info-val">3 Taksit</span>
                                    </div>
                                    <div className="order-info-line">
                                        <span className="info-key">Kargo Ücreti</span>
                                        <span className="info-val">10 ₺</span>
                                    </div>
                                    <div className="order-info-line">
                                        <span className="info-key">Kargo Durumu</span>
                                        <span className="status-pill green">Kargo Teslim Edilmiştir</span>
                                    </div>
                                    <div className="order-info-line">
                                        <span className="info-key">Sipariş Durumu</span>
                                        <span className="status-pill current">{order.status}</span>
                                    </div>
                                    <div className="order-info-line total-line">
                                        <span className="info-key">Toplam Tutar</span>
                                        <span className="info-val total-price">{order.totalAmount} ₺</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ödeme Bilgileri */}
                        <div className="col-lg-6">
                            <div className="order-card-box">
                                <div className="order-card-header">
                                    <HiOutlineCreditCard size={20} className="order-card-icon" />
                                    <h2>Ödeme Bilgileri</h2>
                                </div>
                                <div className="order-table-rows">
                                    {order.payment && order.payment.map((p) => (
                                        <React.Fragment key={p.paymentId}>
                                            <div className="order-info-line">
                                                <span className="info-key">Ödeme Türü</span>
                                                <span className="info-val">
                                                    {p.paymentMethod === "Credit_Card" ? "Kredi Kartı" : "Havale / EFT"}
                                                </span>
                                            </div>
                                            <div className="order-info-line">
                                                <span className="info-key">Ödeme Durumu</span>
                                                <span className={`status-pill ${p.paymentStatus === "Pending" ? "pending" : "green"}`}>
                                                    {p.paymentStatus === "Pending" ? "Bekleniyor" : "Ödeme Onaylandı"}
                                                </span>
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Siparişteki Ürünler */}
                        <div className="col-12">
                            <div className="order-card-box">
                                <div className="order-card-header">
                                    <HiOutlineShoppingBag size={20} className="order-card-icon" />
                                    <h2>Siparişteki Ürünler</h2>
                                </div>

                                <div className="order-products-flow">
                                    {order.orderItem.map((item) =>
                                        item.orderItemProduct.map((prod) => (
                                            <div key={item.orderItemId} className="order-product-card">
                                                <a href={`/urunler-detay/${prod.id}`} className="order-product-img-link">
                                                    <img
                                                        className="order-product-img"
                                                        src={`https://localhost:7050${prod.imageUrl}`}
                                                        alt={prod.name}
                                                    />
                                                </a>

                                                <div className="order-product-meta">
                                                    <a href={`/urunler-detay/${prod.id}`} className="product-title-link">
                                                        <h3 className="product-title">{prod.name}</h3>
                                                    </a>
                                                    
                                                    <div className="product-props-wrap">
                                                        <span className="prop-badge">Beden: {item.productVariantOrder[0]?.size || "M"}</span>
                                                        <span className="prop-badge">Kod: #{prod.id}</span>
                                                        <span className="prop-badge">Adet: {item.quantity}</span>
                                                    </div>

                                                    <div className="product-price-tag">
                                                        {item.price} ₺
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderSituation;
