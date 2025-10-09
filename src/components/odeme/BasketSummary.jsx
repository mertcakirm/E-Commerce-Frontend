import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const BasketSummary = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const cartItems = useSelector((state) => state.basket.items || []);

    useEffect(() => {
        if (cartItems && cartItems.length > 0) {
            const price = cartItems.reduce(
                (total, item) =>
                    total +
                    (item.priceWithDiscount || item.price || 0) * (item.quantity || 1),
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
        <>
            <p className="ozet-baslik">Sepet Özetim</p>
            <div className="ozet-panel">
                <div className="ozet-panel-item">
                    <p className="ozet-panel-item-p1">Ara Toplam</p>
                    <p className="ozet-panel-item-p2">{totalPrice}₺</p>
                </div>
            </div>
        </>
    );
};

export default BasketSummary;