import { useEffect, useState } from 'react';
import { fetchBasket } from './api/refleshdata.js';

const Sepet_ozeti = ({ updateTrigger }) => {
    const [totalprice, setTotalprice] = useState(0);
    const [reflesh, setReflesh] = useState(false);
    const basket = async () => {
        const data = await fetchBasket();
        if (data) {
            setTotalprice(data.price);
        }
    };

    useEffect(() => {
        basket();
    }, []);
    useEffect(() => {
        basket();
        console.log("hi")
    }, [reflesh]);
    updateTrigger(() => setReflesh(prev=>!prev));

    return (
        <>
            <p className="ozet-baslik">Sepet Özetim</p>
            <div className="ozet-panel">
                <div className="ozet-panel-item">
                    <p className="ozet-panel-item-p1">Ara Toplam</p>
                    <p className="ozet-panel-item-p2">{totalprice}₺</p>
                </div>
            </div>
        </>
    );
};

export default Sepet_ozeti;