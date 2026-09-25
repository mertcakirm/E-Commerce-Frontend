import { useState } from 'react';
import BasketSummary from './BasketSummary.jsx';
import { toast } from "react-toastify";
import { CreateOrderRequest } from "../../API/OrderApi.js";
import { HiOutlineLockClosed } from "react-icons/hi2";

const PaymentCardInfo = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [cardHolder, setCardHolder] = useState("");
    const [expiration, setExpiration] = useState(""); // MM/YY formatı
    const [ccv, setCcv] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Kredi kartı boşluklu formatlama
    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, '').substring(0, 16);
        let formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
        setCardNumber(formattedValue);
    };

    // AA/YY formatlama
    const handleExpirationChange = (e) => {
        let value = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (value.length >= 3) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        setExpiration(value);
    };

    const handleCcvChange = (e) => {
        setCcv(e.target.value.replace(/\D/g, '').substring(0, 3));
    };

    const HandleSubmit = async () => {
        if (!agreed) {
            toast.warning("Ön Bilgilendirme Formu ve Mesafeli Satış Sözleşmesini onaylamalısınız.");
            return;
        }

        if (cardNumber.replace(/\s/g, '').length !== 16 || expiration.length !== 5 || ccv.length !== 3 || !cardHolder) {
            toast.warning("Lütfen kredi kartı bilgilerinizi eksiksiz giriniz.");
            return;
        }

        const address = localStorage.getItem("address");
        if (!address || address === "null" || address === "undefined") {
            toast.warning("Adres seçilmedi! Lütfen önceki adıma dönün.");
            return;
        }

        setIsSubmitting(true);
        const dto = {
            "paymentMethod": "Credit_Card",
            "addressId": parseInt(address)
        };

        try {
            await CreateOrderRequest(dto);
            window.location.href = "/siparis/onay";
        } catch (err) {
            setIsSubmitting(false);
            toast.error("Ödeme onaylanırken bir hata oluştu.");
            console.error(err);
        }
    };

    return (
        <div className='row g-4 g-xl-5'>
            <div className="col-lg-8">
                
                {/* Güvenli Ödeme Formu */}
                <div className="checkout-payment-box">
                    <div className="payment-box-header">
                        <h2 className="checkout-section-title mb-0">Kart Bilgileri</h2>
                        <span className="secure-badge">
                            <HiOutlineLockClosed size={16} /> 256-bit SSL
                        </span>
                    </div>

                    <div className="checkout-payment-form">
                        <div className="checkout-input-group">
                            <label>Kart Üzerindeki İsim</label>
                            <input 
                                type="text" 
                                className="checkout-input" 
                                placeholder="Ad Soyad" 
                                value={cardHolder} 
                                onChange={(e) => setCardHolder(e.target.value)} 
                            />
                        </div>

                        <div className="checkout-input-group">
                            <label>Kart Numarası</label>
                            <input 
                                type="text" 
                                className="checkout-input" 
                                placeholder="0000 0000 0000 0000" 
                                value={cardNumber} 
                                onChange={handleCardNumberChange} 
                            />
                        </div>

                        <div className="row g-3">
                            <div className="col-6 checkout-input-group">
                                <label>Son Kullanma Tarihi</label>
                                <input 
                                    type="text" 
                                    className="checkout-input" 
                                    placeholder="AA/YY" 
                                    value={expiration} 
                                    onChange={handleExpirationChange} 
                                />
                            </div>
                            <div className="col-6 checkout-input-group">
                                <label>CVV</label>
                                <input 
                                    type="text" 
                                    className="checkout-input" 
                                    placeholder="***" 
                                    value={ccv} 
                                    onChange={handleCcvChange} 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sözleşmeler Kapsayıcısı */}
                <div className="checkout-agreements-box mt-4">
                    <label className="checkout-checkbox-wrap">
                        <input 
                            type="checkbox" 
                            checked={agreed} 
                            onChange={(e) => setAgreed(e.target.checked)} 
                        />
                        <span className="checkout-check-box"></span>
                        <span className="checkout-check-label">
                            <strong>Ön Bilgilendirme Formu</strong> ve <strong>Mesafeli Satış Sözleşmesi</strong>'ni okudum, kabul ediyorum.
                        </span>
                    </label>

                    <div className="checkout-contracts-scroll">
                        <p className="text-muted" style={{fontSize: "12px", lineHeight: "1.6"}}>
                            <strong>ÖN BİLGİLENDİRME FORMU</strong><br/>
                            1. Satıcı Bilgileri<br/>
                            Ünvan: Marka Ticaret A.Ş.<br/>
                            Mersis No: 00000000000000<br/>
                            İletişim: destek@marka.com<br/><br/>
                            
                            <strong>MESAFELİ SATIŞ SÖZLEŞMESİ</strong><br/>
                            Madde 1: Taraflar<br/>
                            İşbu sözleşme Tüketici Hakları Kanununa tabi olarak hazırlanmış olup, alışverişinizi tamamlamanız ile yürürlüğe girmektedir. 
                            Satın alınan ürünler sipariş onayından itibaren yasal süre olan 30 gün içerisinde teslim edilecektir.
                            Alıcı, cayma hakkını yasal süre olan 14 gün içerisinde koşulsuz olarak kullanabilir...
                            <br/><br/><i>* Tam metin sistem kayıtlarında sipariş numaranız ile birlikte elektronik olarak saklanacaktır.</i>
                        </p>
                    </div>
                </div>

            </div>

            <div className="col-lg-4">
                <div className="checkout-sidebar-sticky">
                    <BasketSummary />
                    <button 
                        onClick={HandleSubmit} 
                        className="checkout-btn-primary w-100 mt-3" 
                        disabled={isSubmitting || !agreed}
                    >
                        {isSubmitting ? "İşleniyor..." : "Siparişi Tamamla"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentCardInfo;
