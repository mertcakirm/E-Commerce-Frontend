import { useEffect, useState } from "react";
import "./css/anasayfa.css";
import Navbar from "../components/childcomponents/navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/childcomponents/footer";
import { Helmet } from "react-helmet";
import logo from '../assets/mob_logo.png';
import { fetchSliderData, fetchCategories, fetchCartData } from "./api/anasayfa-api";
import Cookie_accept from "../components/cookie/cookie_accept.jsx";
import LoadingComponent from "../components/childcomponents/Loading.jsx"; // API fonksiyonlarını içe aktardık

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
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
        <path d="M9 18l6-6-6-6" />
      </svg>
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
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
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </div>
  );
};

const Anasayfa = () => {
  
    const [showButton, setShowButton] = useState(false);
    const [sliderData, setSliderData] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 200) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    const handleClick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  
    useEffect(() => {
      const fetchData = async () => {
        const sliderData = await fetchSliderData();
        const categoriesData = await fetchCategories();
        const cartData = await fetchCartData();
        setSliderData(sliderData);
        setCategories(categoriesData);
        setCartData(cartData);
        setLoading(false);
      };
  
      fetchData();
    }, []);


    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      cssEase: "linear",
      centerMode: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1124,
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
          breakpoint: 460,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  
    if (loading) {
      return <LoadingComponent />
    }


  return (
    <div>
      <Helmet>
        <title>Mob Wear</title>
        <meta
          name="description"
          content="Mob Wear olarak yeni modaya hitap ediyor ve buna göre ürünleri sizler için üretiyoruz."
        />
        <meta
          name="keywords"
          content="tişört,pantolon,giyim,moda,erkek giyim"
        />
        <meta name="author" content="MOB WEAR" />
        <meta property="og:title" content="Kaliteli Kıyafetler" />
        <meta
          property="og:description"
          content="Mob Wear olarak yeni modaya hitap ediyor ve buna göre ürünleri sizler için üretiyoruz."
        />
        <meta property="og:image" content="URL_of_image" />
        <meta property="og:url" content="URL_of_your_website" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />

      {showButton && (
        <button className="en-ust-btn" onClick={handleClick}>
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path d="M23.245 20l-11.245-14.374-11.219 14.374-.781-.619 12-15.381 12 15.391-.755.609z" />
          </svg>
        </button>
      )}
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {sliderData.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {sliderData && sliderData.length > 0 ? (
          sliderData.map((slide, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <img
              src={`data:image/jpeg;base64,${slide.image.bytes}`}
              className="d-block w-100 img-fluid"
              style={{height:'900px',objectFit:'cover'}}
              alt={`Slide ${index + 1}`}
            />
            <div className="carousel-item-child">
              <h5>{slide.topTitle}</h5>               
              <p>{slide.middleTitle}</p>
              <h5>{slide.underTitle}</h5> 
              <a href={`/urunler/${slide.category}`} className="slider-alisverise-basla-btn">
                Alışverişe Başla
              </a>
            </div>
          </div>
          ))
        ) : (
            <div className="no-data-message">
              <p>Görüntülenecek kampyanya bulunamadı.</p>
            </div>
        )}
      </div>
    </div>
    <div className="container-fluid" id="urunler-fluid">
      <Slider {...settings}>
        {categories && categories.length > 0 ? (
            categories.map((category) => (
                <a
                    key={category.id}
                    href={`/urunler/${category.categoryName}`}
                    className="slick-card"
                >
                  <img
                      src={`data:image/jpeg;base64,${category.image.bytes}`}
                      alt={category.categoryName || "Kategori Resmi"}
                      className="category-image"
                  />
                  <p>{category.categoryName}</p>
                </a>
            ))
        ) : (
            <div className="no-data-message">
              <p>Görüntülenecek kategori bulunamadı.</p>
            </div>
        )}

      </Slider>
    </div>


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
                            style={{ height, objectFit: 'cover' }}
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

      <div className="container logo-container">
        <div className="row justify-content-center">
          <a style={{display:'flex',justifyContent:'center'}} className="logo-a" href="/">
            <img
              src={logo}
              className="img-fluid"
              alt=""
            />
          </a>
        </div>
      </div>
      <Cookie_accept />
      <Footer />
    </div>
  );
};

export default Anasayfa;
