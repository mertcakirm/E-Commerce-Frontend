import Slider from "react-slick";


const NextArrow = (props) => {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, display: "block"}}
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M9 18l6-6-6-6"/>
            </svg>
        </div>
    );
};

const PrevArrow = (props) => {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, display: "block"}}
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M15 18l-6-6 6-6"/>
            </svg>
        </div>
    );
};

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