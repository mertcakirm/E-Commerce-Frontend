import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const BasketSummary = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const cartItems = useSelector((state) => state.basket.items || []);

    useEffect(() => {
        if (cartItems && cartItems.length > 0) {
            const price = cartItems.reduce(
                (total, item) =>
                    total + (item.priceWithDiscount || item.price || 0) * (item.quantity || 1),
                0
            );
            setTotalPrice(Number(price.toFixed(2)));
        } else {
            setTotalPrice(0);
            const timer = setTimeout(() => {
                if (cartItems.length === 0) {
                    window.location.href = "/";
                }
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [cartItems]);

    return (
        <div className="checkout-summary-card">
            <h3 className="summary-title">Sipariş Özeti</h3>
            
            <div className="summary-line-item">
                <span className="summary-key">Ara Toplam</span>
                <span className="summary-val">{totalPrice} ₺</span>
            </div>
            
            <div className="summary-line-item">
                <span className="summary-key">Kargo Ücreti</span>
                <span className="summary-val text-success">Ücretsiz</span>
            </div>

            <div className="summary-divider"></div>
            
            <div className="summary-total-item">
                <span className="summary-total-key">Genel Toplam</span>
                <span className="summary-total-val">{totalPrice} ₺</span>
            </div>
        </div>
    );
};

export default BasketSummary;
