import { useEffect, useState } from 'react';
import { FetchCartDataRequest } from "../../API/HomeApi.js";
import { HiArrowUpRight } from "react-icons/hi2";

const CardMainComp = ({ loading }) => {
    const [cartData, setCartData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await FetchCartDataRequest();
            setCartData(res?.data?.data || []);
        } catch (error) {
            console.error("Ana sayfa kartları alınamadı:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className="modern-hero-banners-section">
            <div className="container-fluid px-lg-4 px-3">
                <div className="row g-3 g-md-4">
                    {cartData && cartData.length > 0 ? (
                        cartData.map((item, index) => {
                            const columnSize = item.cartSize;
                            let ratioClass;
                            let colClass;

                            switch (columnSize) {
                                case '12':
                                    ratioClass = 'banner-ratio-horizontal';
                                    colClass = 'col-12';
                                    break;
                                case 'Yarım':
                                    ratioClass = 'banner-ratio-vertical-half';
                                    colClass = 'col-12 col-md-6';
                                    break;
                                case '1/3':
                                    ratioClass = 'banner-ratio-vertical-third';
                                    colClass = 'col-12 col-md-6 col-lg-4';
                                    break;
                                default:
                                    ratioClass = 'banner-ratio-horizontal';
                                    colClass = 'col-12';
                            }

                            // Başlık alanını garantiye alıyoruz (name, title veya cartTitle)
                            const bannerTitle = item.name || item.title || item.cartTitle || "Koleksiyonu Keşfet";

                            return (
                                <div
                                    key={item.id || index}
                                    className={colClass}
                                    data-aos="fade-up"
                                >
                                    <a
                                        href={`/urunler/${item.href || ''}`}
                                        className="modern-category-banner-link"
                                    >
                                        <div className={`categori-card modern-banner-card ${ratioClass}`}>
                                            {/* 1. Görsel Katmanı */}
                                            <img
                                                src={
                                                    item.imageUrl && item.imageUrl !== "string"
                                                        ? (item.imageUrl.startsWith("http")
                                                                ? item.imageUrl
                                                                : `https://localhost:7050${
                                                                      item.imageUrl.startsWith("/contents")
                                                                          ? item.imageUrl
                                                                          : `/contents${item.imageUrl}`
                                                                  }`
                                                          )
                                                        : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                                                }
                                                className="modern-banner-img img-fluid"
                                                alt={bannerTitle}
                                                loading="lazy"
                                            />

                                            {/* 2. Karartma Katmanı (z-index: 2) */}
                                            <div className="banner-overlay-scrim" />

                                            {/* 3. İçerik ve Yazı Katmanı (z-index: 10 - En Önde) */}
                                            <div className="categori-card-child modern-banner-content">
                                                <h3 className="categori-baslik modern-banner-title">
                                                    {bannerTitle}
                                                </h3>
                                                <div className="categori-hemen-kesfet modern-banner-btn">
                                                    <span>Hemen Keşfet</span>
                                                    <HiArrowUpRight size={18} className="banner-btn-icon" />
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            );
                        })
                    ) : (
                        <div className="no-data-message col-12 text-center py-5">
                            <p className="text-muted fw-medium">Görüntülenecek vitrin içeriği bulunamadı.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CardMainComp;
