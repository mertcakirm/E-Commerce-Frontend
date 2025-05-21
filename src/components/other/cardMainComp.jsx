import {useEffect, useState} from 'react';
import {fetchCartData} from "../../pages/api/anasayfa-api.js";

const CardMainComp = ({loading}) => {
    const [cartData, setCartData] = useState([]);
    const [loadingState, setLoadingState] = useState(false);

    const fetchData = async () => {
        const cartData = await fetchCartData();
        setCartData(cartData);
        setLoadingState(false);
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="container-fluid categori-card-fluid">
            <div className="row">

                {cartData && cartData.length > 0 ? (
                    cartData.map((item, index) => {
                        const columnSize = item.viewType;
                        let height;

                        switch (columnSize) {
                            case '12':
                                height = '700px';
                                break;
                            case '4':
                                height = '900px';
                                break;
                            case '6':
                                height = '1200px';
                                break;
                            default:
                                height = 'auto';
                        }

                        return (
                            <div key={item.id || index} className={`col-lg-${columnSize}`}>
                                <a href={`/urunler/${item.category}`}>
                                    <div className="categori-card">
                                        <img
                                            src={`data:image/jpeg;base64,${item.image.bytes}`}
                                            className="w-100 img-fluid"
                                            alt={item.title || 'Kategori Resmi'}
                                            style={{height, objectFit: 'cover'}}
                                        />
                                        <div className="categori-card-child">
                                            <p className="categori-baslik">{item.cartName}</p>
                                            <button className="categori-hemen-kesfet">Hemen Keşfet</button>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        );
                    })
                ) : (
                    <div className="no-data-message">
                        <p>Görüntülenecek kategori bulunamadı.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardMainComp;