import Slider from "react-slick";
import NextArrow from "../home/NextArrow.jsx";
import PrevArrow from "../home/PrevArrow.jsx";

const MoreProduct = () => {
    // Slider ayarları: centerMode kapalı, akıcı 1'er kaydırma ve bezier eğrisi
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 500,
        cssEase: "cubic-bezier(0.16, 1, 0.3, 1)",
        centerMode: false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    // Örnek benzer ürün verisi (İleride API'ye kolayca bağlanabilir)
    const mockProducts = [
        {
            id: 1,
            title: "Oversize Kapitone Gömlek",
            price: 499,
            oldPrice: 799,
            image: "https://cdn.aksesuarix.com/Fotograflar/575/89539-yesil-otantik-kapitone-oversize-erkek-gomlek-us4123ys-untitled-session5038-copy-1.jpg",
            category: "Gömlek"
        },
        {
            id: 2,
            title: "Vintage Yıkamalı Sweatshirt",
            price: 649,
            oldPrice: 899,
            image: "https://cdn.aksesuarix.com/Fotograflar/575/89539-yesil-otantik-kapitone-oversize-erkek-gomlek-us4123ys-untitled-session5038-copy-1.jpg",
            category: "Sweatshirt"
        },
        {
            id: 3,
            title: "Minimalist Dokuma Pantolon",
            price: 529,
            oldPrice: 749,
            image: "https://cdn.aksesuarix.com/Fotograflar/575/89539-yesil-otantik-kapitone-oversize-erkek-gomlek-us4123ys-untitled-session5038-copy-1.jpg",
            category: "Pantolon"
        },
        {
            id: 4,
            title: "Klasik Relaxed Fit Triko",
            price: 599,
            oldPrice: 849,
            image: "https://cdn.aksesuarix.com/Fotograflar/575/89539-yesil-otantik-kapitone-oversize-erkek-gomlek-us4123ys-untitled-session5038-copy-1.jpg",
            category: "Triko"
        },
        {
            id: 5,
            title: "Otantik Düğmeli Ceket",
            price: 799,
            oldPrice: 1199,
            image: "https://cdn.aksesuarix.com/Fotograflar/575/89539-yesil-otantik-kapitone-oversize-erkek-gomlek-us4123ys-untitled-session5038-copy-1.jpg",
            category: "Ceket"
        }
    ];

    return (
        <section className="row diger-row justify-content-center" data-aos="fade-up">
            <div className="col-12">
                <div className="more-product-header">
                    <span className="more-product-kicker">Kombinini Tamamla</span>
                    <h3 className="bunlari-da-begen">Bunları da Beğenebilirsiniz</h3>
                </div>

                <div className="more-slider-track-wrap">
                    <Slider {...settings}>
                        {mockProducts.map((item) => {
                            const discountRate = Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100);
                            return (
                                <div key={item.id} className="more-product-slide-item">
                                    <a href={`/urunler-detay/${item.id}`} className="urun-detay-card">
                                        <div className="more-product-img-box">
                                            {discountRate > 0 && (
                                                <span className="more-product-badge">%{discountRate}</span>
                                            )}
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="more-product-img"
                                                loading="lazy"
                                            />
                                        </div>

                                        <div className="more-product-info">
                                            <span className="more-product-cat">{item.category}</span>
                                            <p className="more-product-title">{item.title}</p>
                                            <div className="urun-detay-card-spans">
                                                <span className="urun-detay-card-span1">{item.price} ₺</span>
                                                {item.oldPrice > item.price && (
                                                    <span className="urun-detay-card-span2">{item.oldPrice} ₺</span>
                                                )}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default MoreProduct;
