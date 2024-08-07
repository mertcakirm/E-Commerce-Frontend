import React, { useEffect, useState } from "react";
import "./css/anasayfa.css";
import Navbar from "./navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./footer";
import { Helmet } from "react-helmet";

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
          <button
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://cdn.aksesuarix.com/Fotograflar/thumbs/89948-sort.jpg"
              className="d-block w-100 img-fluid"
              alt="Image 1"
            />
            <div className="carousel-item-child">
              <h5>T-SHİRT</h5>
              <p>%40 İNDİRİM</p>
              <h5>Büyük Yaz İndirimi</h5>
              <a href="#" className="slider-alisverise-basla-btn">
                Alışverişe Başla
              </a>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://cdn.aksesuarix.com/Fotograflar/thumbs/87087-outlet.jpg"
              className="d-block w-100 img-fluid"
              alt="Image 2"
            />
            <div className="carousel-item-child">
              <h5>T-SHİRT</h5>
              <p>%40 İNDİRİM</p>
              <h5>Büyük Yaz İndirimi</h5>
              <a href="#" className="slider-alisverise-basla-btn">
                Alışverişe Başla
              </a>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://cdn.aksesuarix.com/Fotograflar/thumbs/89950-pant.jpg"
              className="d-block w-100 img-fluid"
              alt="Image 3"
            />
            <div className="carousel-item-child">
              <h5>T-SHİRT</h5>
              <p>%40 İNDİRİM</p>
              <h5>Büyük Yaz İndirimi</h5>
              <a href="#" className="slider-alisverise-basla-btn">
                Alışverişe Başla
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* urunler-card */}
      <div className="container-fluid" id="urunler-fluid">
        <Slider {...settings}>
          <a href="#" className="slick-card">
            <img
              src="https://cdn.aksesuarix.com/Fotograflar/thumbs/87057-sweat.jpg"
              alt=""
            />
            <h3>sweat</h3>
          </a>
          <a href="#" className="slick-card">
            <img
              src="https://cdn.aksesuarix.com/Fotograflar/thumbs/87057-sweat.jpg"
              alt=""
            />
            <h3>sweat</h3>
          </a>
          <a href="#" className="slick-card">
            <img
              src="https://cdn.aksesuarix.com/Fotograflar/thumbs/87057-sweat.jpg"
              alt=""
            />
            <h3>sweat</h3>
          </a>
          <a href="#" className="slick-card">
            <img
              src="https://cdn.aksesuarix.com/Fotograflar/thumbs/87057-sweat.jpg"
              alt=""
            />
            <h3>sweat</h3>
          </a>
          <a href="#" className="slick-card">
            <img
              src="https://cdn.aksesuarix.com/Fotograflar/thumbs/87057-sweat.jpg"
              alt=""
            />
            <h3>sweat</h3>
          </a>
          <a href="#" className="slick-card">
            <img
              src="https://cdn.aksesuarix.com/Fotograflar/thumbs/87057-sweat.jpg"
              alt=""
            />
            <h3>sweat</h3>
          </a>
          <a href="#" className="slick-card">
            <img
              src="https://cdn.aksesuarix.com/Fotograflar/thumbs/87057-sweat.jpg"
              alt=""
            />
            <h3>sweat</h3>
          </a>
          <a href="#" className="slick-card">
            <img
              src="https://cdn.aksesuarix.com/Fotograflar/thumbs/87057-sweat.jpg"
              alt=""
            />
            <h3>sweat</h3>
          </a>
          <a href="#" className="slick-card">
            <img
              src="https://cdn.aksesuarix.com/Fotograflar/thumbs/87057-sweat.jpg"
              alt=""
            />
            <h3>sweat</h3>
          </a>
          <a href="#" className="slick-card">
            <img
              src="https://cdn.aksesuarix.com/Fotograflar/thumbs/87057-sweat.jpg"
              alt=""
            />
            <h3>sweat</h3>
          </a>
        </Slider>
      </div>

      {/* kategori cards */}
      <div className="container-fluid categori-card-fluid">
        <div className="row">
          <div className="col-lg-6">
            <a href="#">
              <div className="categori-card">
                <img
                  src="https://cdn.aksesuarix.com/Fotograflar/88114-tee.jpg"
                  className="w-100 img-fluid"
                  alt=""
                />
                <div className="categori-card-child">
                  <p className="categori-baslik">t-shirt</p>
                  <button className="categori-hemen-kesfet">
                    Hemen Keşfet
                  </button>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-6">
            <a href="#">
              <div className="categori-card">
                <img
                  src="https://cdn.aksesuarix.com/Fotograflar/88115-sort.jpg"
                  className="w-100 img-fluid"
                  alt=""
                />
                <div className="categori-card-child">
                  <p className="categori-baslik">şort</p>
                  <button className="categori-hemen-kesfet">
                    Hemen Keşfet
                  </button>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4">
            <a href="#">
              <div className="categori-card">
                <img
                  src="https://cdn.aksesuarix.com/Fotograflar/88116-pant.jpg"
                  className="w-100 img-fluid"
                  alt=""
                />
                <div className="categori-card-child">
                  <p className="categori-baslik">pantolon</p>
                  <button className="categori-hemen-kesfet">
                    Hemen Keşfet
                  </button>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4">
            <a href="#">
              <div className="categori-card">
                <img
                  src="https://cdn.aksesuarix.com/Fotograflar/88119-go-n.jpg"
                  className="w-100 img-fluid"
                  alt=""
                />
                <div className="categori-card-child">
                  <p className="categori-baslik">gömlek</p>
                  <button className="categori-hemen-kesfet">
                    Hemen Keşfet
                  </button>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4">
            <a href="#">
              <div className="categori-card">
                <img
                  src="https://cdn.aksesuarix.com/Fotograflar/88118-esof.jpg"
                  className="w-100 img-fluid"
                  alt=""
                />
                <div className="categori-card-child">
                  <p className="categori-baslik">eşofman</p>
                  <button className="categori-hemen-kesfet">
                    Hemen Keşfet
                  </button>
                </div>
              </div>
            </a>
          </div>
          <div className="col-12">
            <a href="#">
              <div className="categori-card categori-card-full">
                <img
                  src="https://cdn.aksesuarix.com/Fotograflar/89963-aaaaa.jpg"
                  className="w-100 img-fluid"
                  alt=""
                />
                <div className="categori-card-child">
                  <div className="categori-p2">Havluda ikinci ürüne</div>
                  <p className="categori-baslik">%50 indirim</p>
                  <button className="categori-hemen-kesfet-full">
                    Hemen Keşfet
                  </button>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="container logo-container">
        <div className="row justify-content-center logo">
          <a className="logo-a" href="/">
            <img
              src="https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2020/06/896/500/TESLA-LOGO.jpg?ve=1&tl=1"
              alt=""
            />
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Anasayfa;
