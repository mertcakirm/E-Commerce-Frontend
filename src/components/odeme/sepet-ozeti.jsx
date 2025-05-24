import {useEffect, useState} from 'react';
import {FetchBasketRequest} from "../../API/ProductApi.js";

const Sepet_ozeti = ({updateTrigger}) => {
    const [totalprice, setTotalprice] = useState(0);
    const [reflesh, setReflesh] = useState(false);

    const getBasket = async () => {
        const data = await FetchBasketRequest();
        if (data) {
            setTotalprice(data.price);
        }
    };

    useEffect(() => {
        getBasket();
    }, []);

    useEffect(() => {
        getBasket();
    }, [reflesh]);

    useEffect(() => {
        if (typeof updateTrigger === "function") {
            updateTrigger(() => setReflesh(prev => !prev));
        }
    }, [updateTrigger]);

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
