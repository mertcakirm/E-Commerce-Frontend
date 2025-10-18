import Slider from "react-slick";
import NextArrow from "../home/NextArrow.jsx";
import PrevArrow from "../home/PrevArrow.jsx";


const MoreProduct = () => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        cssEase: "linear",
        centerMode: true,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
            {
                breakpoint: 1124,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 460,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className="row diger-row justify-content-center" data-aos="fade-up">
            <div className="col-11">
                <p className="bunlari-da-begen">BUNLARI DA BEĞENEBİLİRSİNİZ</p>

                <Slider {...settings}>
                    <a href="#" className="urun-detay-card">
                        <img
                            src="https://cdn.aksesuarix.com/Fotograflar/575/89539-yesil-otantik-kapitone-oversize-erkek-gomlek-us4123ys-untitled-session5038-copy-1.jpg"
                            alt=""
                            className="img-fluid w-100"
                        />
                        <p>sweat</p>
                        <div className="urun-detay-card-spans">
                            <span className="urun-detay-card-span1">499₺</span>
                            <span className="urun-detay-card-span2">799₺</span>
                        </div>
                    </a>
                    <a href="#" className="urun-detay-card">
                        <img
                            src="https://cdn.aksesuarix.com/Fotograflar/575/89539-yesil-otantik-kapitone-oversize-erkek-gomlek-us4123ys-untitled-session5038-copy-1.jpg"
                            alt=""
                            className="img-fluid w-100"
                        />
                        <p>sweat</p>
                        <div className="urun-detay-card-spans">
                            <span className="urun-detay-card-span1">499₺</span>
                            <span className="urun-detay-card-span2">799₺</span>
                        </div>
                    </a>
                    <a href="#" className="urun-detay-card">
                        <img
                            src="https://cdn.aksesuarix.com/Fotograflar/575/89539-yesil-otantik-kapitone-oversize-erkek-gomlek-us4123ys-untitled-session5038-copy-1.jpg"
                            alt=""
                            className="img-fluid w-100"
                        />
                        <p>sweat</p>
                        <div className="urun-detay-card-spans">
                            <span className="urun-detay-card-span1">499₺</span>
                            <span className="urun-detay-card-span2">799₺</span>
                        </div>
                    </a>
                    <a href="#" className="urun-detay-card">
                        <img
                            src="https://cdn.aksesuarix.com/Fotograflar/575/89539-yesil-otantik-kapitone-oversize-erkek-gomlek-us4123ys-untitled-session5038-copy-1.jpg"
                            alt=""
                            className="img-fluid w-100"
                        />
                        <p>sweat</p>
                        <div className="urun-detay-card-spans">
                            <span className="urun-detay-card-span1">499₺</span>
                            <span className="urun-detay-card-span2">799₺</span>
                        </div>
                    </a>
                    <a href="#" className="urun-detay-card">
                        <img
                            src="https://cdn.aksesuarix.com/Fotograflar/575/89539-yesil-otantik-kapitone-oversize-erkek-gomlek-us4123ys-untitled-session5038-copy-1.jpg"
                            alt=""
                            className="img-fluid w-100"
                        />
                        <p>sweat</p>
                        <div className="urun-detay-card-spans">
                            <span className="urun-detay-card-span1">499₺</span>
                            <span className="urun-detay-card-span2">799₺</span>
                        </div>
                    </a>
                </Slider>
            </div>
        </div>
    )
}


export default MoreProduct;