import {useEffect, useState} from 'react';
import {FetchCartDataRequest} from "../../API/HomeApi.js";

const CardMainComp = ({loading}) => {
    const [cartData, setCartData] = useState([]);
    const [loadingState, setLoadingState] = useState(false);

    const fetchData = async () => {
        const cartData = await FetchCartDataRequest();
        setCartData(cartData.data.data);
        setLoadingState(false);
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="container-fluid px-5">
            <div className="row">

                {cartData && cartData.length > 0 ? (
                    cartData.map((item, index) => {
                        const columnSize = item.cartSize;
                        let height;
                        let width;

                        switch (columnSize) {
                            case '12':
                                height = '700px';
                                width = '12';
                                break;
                            case 'Yarım':
                                height = '900px';
                                width = '6';
                                break;
                            case '1/3':
                                height = '1200px';
                                width = '4';
                                break;
                            default:
                                height = 'auto';
                        }

                        return (
                            <div key={item.id || index} className={`col-lg-${width}`}>
                                <a href={`/urunler/${item.category}`}>
                                    <div className="categori-card">
                                        <img
                                            src={item.imageUrl && item.imageUrl !== "string"
                                                ? (item.imageUrl.startsWith("http")
                                                        ? item.imageUrl
                                                        : `https://localhost:7050${item.imageUrl.startsWith("/contents") ? item.imageUrl : `/contents${item.imageUrl}`}`
                                                )
                                                : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                                            }
                                            className="w-100 img-fluid"
                                            alt={item.title || 'Kategori Resmi'}
                                            style={{height, objectFit: 'cover'}}
                                        />
                                        <div className="categori-card-child">
                                            <p className="categori-baslik">{item.name}</p>
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