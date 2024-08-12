import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Helmet } from "react-helmet";
import Navbar from "./navbar";
import Footer from "./footer";
import "./css/urun-detay.css";
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
const Urun_detay = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  const comments = [
    {
      user: "Furkan Geren",
      rating: "9/10",
      text: "Çok güzel dayanıklı ve malzemesi kaliteli bir ürün herkese tavsiye ederim.",
    },
    {
      user: "Furkan Geren",
      rating: "9/10",
      text: "Çok güzel dayanıklı ve malzemesi kaliteli bir ürün herkese tavsiye ederim.",
    },
    {
      user: "Furkan Geren",
      rating: "8/10",
      text: "Güzel ama bazı eksiklikleri var.",
    },
    { user: "Furkan Geren", rating: "7/10", text: "Fena değil, iş görür." },
    { user: "Furkan Geren", rating: "7/10", text: "Fena değil, iş görür." },
    { user: "Furkan Geren", rating: "7/10", text: "Fena değil, iş görür." },
    { user: "Furkan Geren", rating: "7/10", text: "Fena değil, iş görür." },
  ];

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const commentsClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const images = [
    "https://cdn.aksesuarix.com/UserFiles/Fotograflar/80508-ny-monogram-drytech-erkek-sort-uk1156sygr-uk1156sygr-01.jpg",
    "https://cdn.aksesuarix.com/UserFiles/Fotograflar/80508-ny-monogram-drytech-erkek-sort-uk1156sygr-uk1156sygr-01.jpg",
    "https://cdn.aksesuarix.com/UserFiles/Fotograflar/80508-ny-monogram-drytech-erkek-sort-uk1156sygr-uk1156sygr-01.jpg",
    "https://cdn.aksesuarix.com/UserFiles/Fotograflar/80508-ny-monogram-drytech-erkek-sort-uk1156sygr-uk1156sygr-01.jpg",
    "https://cdn.aksesuarix.com/UserFiles/Fotograflar/80508-ny-monogram-drytech-erkek-sort-uk1156sygr-uk1156sygr-01.jpg",
  ];

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };
  const handleNextClick = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevClick = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    cssEase: "linear",
    centerMode: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
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
        <title>Ürün Detayı</title>
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

      <div className="container-fluid urun-detay-container">
        <div className="row justify-content-center">
          <div className="col-11">
            <p>Anasayfa - Urun-detay</p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 urun-detay-col-sol">
            <div className="carousel-container">
              <div className="active-image">
                <img
                  src={images[activeIndex]}
                  alt={`Slide ${activeIndex}`}
                  className="img-fluid w-100"
                />
              </div>
              <button className="prev-button" onClick={handlePrevClick}>
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                >
                  <path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" />
                </svg>
              </button>
              <button className="next-button" onClick={handleNextClick}>
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                >
                  <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
                </svg>
              </button>
              <div className="thumbnails">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index}`}
                    className={`thumbnail ${
                      index === activeIndex ? "active" : ""
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-6 urun-detay-col-sag">
            <div className="urun-detay-col-sag">
              <p className="urun-baslik">
                Kahve Logo Oversize Erkek Jogger Eşofman Altı
              </p>
              <p className="urun-code">UK1156SYGR</p>
              <div className="urun-goruntuleme">
                <svg
                  width="40"
                  height="30"
                  clipRule="evenodd"
                  fillRule="evenodd"
                  strokeLinejoin="round"
                  strokeMiterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm.002 3c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z"
                    fillRule="nonzero"
                  />
                </svg>
                <span>Bu ürünü 70 kişi görüntüledi</span>
              </div>
              <div className="urun-goruntuleme">
              <svg xmlns="http://www.w3.org/2000/svg" width="45" height="30" viewBox="0 0 24 24"><path d="M13.299 3.74c-.207-.206-.299-.461-.299-.711 0-.524.407-1.029 1.02-1.029.262 0 .522.1.721.298l3.783 3.783c-.771.117-1.5.363-2.158.726l-3.067-3.067zm-.299 8.76c0-1.29.381-2.489 1.028-3.5h-14.028v2h.643c.535 0 1.021.304 1.256.784l4.101 10.216h12l1.211-3.015c-3.455-.152-6.211-2.993-6.211-6.485zm-2.299-8.76c.207-.206.299-.461.299-.711 0-.524-.407-1.029-1.02-1.029-.261 0-.522.1-.72.298l-4.701 4.702h2.883l3.259-3.26zm8.799 4.26c-2.486 0-4.5 2.015-4.5 4.5s2.014 4.5 4.5 4.5c2.484 0 4.5-2.015 4.5-4.5s-2.016-4.5-4.5-4.5zm-.469 6.484l-1.688-1.637.695-.697.992.94 2.115-2.169.697.696-2.811 2.867z"/></svg>
                <span className="mt-1">Bu ürün 90 kişinin sepetinde</span>
              </div>
              <div className="urun-detay-fiyat-flex">
                <p className="p1-fiyat">499₺</p>
                <p className="p2-fiyat">789₺</p>
                <div className="urun-indirim">%20 İNDİRİM</div>
              </div>
              <div className="beden">
                <p>BEDEN:</p>
                <div className="beden-cards">
                  <button>S</button>
                  <button>M</button>
                  <button>L</button>
                  <button>XL</button>
                </div>
              </div>

              <div className="sepet-flex">
                <button className="sepete-ekle-detay-btn">Sepete Ekle</button>
                <button className="like-detay-btn">
                  <svg
                    width="30"
                    height="30"
                    clipRule="evenodd"
                    fillRule="evenodd"
                    strokeLinejoin="round"
                    strokeMiterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m7.234 3.004c-2.652 0-5.234 1.829-5.234 5.177 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-3.353-2.58-5.168-5.229-5.168-1.836 0-3.646.866-4.771 2.554-1.13-1.696-2.935-2.563-4.766-2.563zm0 1.5c1.99.001 3.202 1.353 4.155 2.7.14.198.368.316.611.317.243 0 .471-.117.612-.314.955-1.339 2.19-2.694 4.159-2.694 1.796 0 3.729 1.148 3.729 3.668 0 2.671-2.881 5.673-8.5 11.127-5.454-5.285-8.5-8.389-8.5-11.127 0-1.125.389-2.069 1.124-2.727.673-.604 1.625-.95 2.61-.95z"
                      fillRule="nonzero"
                    />
                  </svg>
                </button>
              </div>

              <div className="tahmini-teslimat">
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                >
                  <path d="M7.919 17.377l-4.869-13.377h-2.05c-.266 0-.52-.105-.707-.293-.188-.187-.293-.442-.293-.707 0-.552.447-1 1-1h3.45l5.469 15.025c.841.101 1.59.5 2.139 1.088l11.258-4.097.684 1.879-11.049 4.021c.032.19.049.385.049.584 0 1.932-1.569 3.5-3.5 3.5-1.932 0-3.5-1.568-3.5-3.5 0-1.363.781-2.545 1.919-3.123zm1.581 1.811c.724 0 1.312.588 1.312 1.312 0 .724-.588 1.313-1.312 1.313-.725 0-1.313-.589-1.313-1.313s.588-1.312 1.313-1.312zm5.799-12.29l4.767-1.735 2.736 7.517-11.406 4.152-2.736-7.518 4.759-1.732 1.325 3.639 1.879-.684-1.324-3.639zm.537-1.26l-7.518 2.736-2.052-5.638 7.518-2.736 2.052 5.638z" />
                </svg>
                <span>Tahmini Teslimat</span>
                <span className="teslimat-span2">16 Temmuz</span>
              </div>
              <div className="urun-detay-accordion">
                <div
                  className="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                      >
                        Ürün Bilgisi
                      </button>
                    </h2>
                    <div
                      id="flush-collapseOne"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">...</div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo"
                        aria-expanded="false"
                        aria-controls="flush-collapseTwo"
                      >
                        Yorumlar
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTwo"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <div className="urunler-yorum-flex">
                          <h3>Yorum Yap</h3>
                          <select name="yorum-puan" id="yorum-puan">
                            <option value="0">0/10</option>
                            <option value="0">1/10</option>
                            <option value="0">2/10</option>
                            <option value="0">3/10</option>
                            <option value="0">4/10</option>
                            <option value="0">5/10</option>
                            <option value="0">6/10</option>
                            <option value="0">7/10</option>
                            <option value="0">8/10</option>
                            <option value="0">9/10</option>
                            <option value="0">10/10</option>
                          </select>
                          <textarea name="yorum-txt" id="yorum-txt"></textarea>
                          <button className="tumunu-gor-btn">Paylaş</button>
                        </div>
                        <div className="urunler-yorumlar">
                          {currentComments.map((comment, index) => (
                            <div className="urunler-yorum-card" key={index}>
                              <p style={{ fontWeight: "700" }}>
                                {comment.user}
                              </p>
                              <p>{comment.rating}</p>
                              <p>{comment.text}</p>
                            </div>
                          ))}

                          <nav aria-label="...">
                            <ul className="pagination pagination-sm">
                              {[...Array(totalPages)].map((_, index) => (
                                <li
                                  className={`page-item ${
                                    currentPage === index + 1 ? "active" : ""
                                  }`}
                                  key={index}
                                >
                                  <span
                                    className="page-link"
                                    onClick={() => commentsClick(index + 1)}
                                  >
                                    {index + 1}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseThree"
                        aria-expanded="false"
                        aria-controls="flush-collapseThree"
                      >
                        Teslimat ve İade
                      </button>
                    </h2>
                    <div
                      id="flush-collapseThree"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row diger-row justify-content-center">
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

        <div className="row diger-row justify-content-center">
          <div className="col-11">
            <p className="bunlari-da-begen">SON GEZDİKLERİNİZ</p>
            <Slider {...settings}>
              <a href="#" className="urun-detay-card">
                <img
                  src="https://cdn.aksesuarix.com/Fotograflar/575/89679-ekru-boxy-oversize-keten-erkek-gomlek-uk1348ek-uk1348ek-00.jpg"
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
                  src="https://cdn.aksesuarix.com/Fotograflar/575/89679-ekru-boxy-oversize-keten-erkek-gomlek-uk1348ek-uk1348ek-00.jpg"
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
                  src="https://cdn.aksesuarix.com/Fotograflar/575/89679-ekru-boxy-oversize-keten-erkek-gomlek-uk1348ek-uk1348ek-00.jpg"
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
                  src="https://cdn.aksesuarix.com/Fotograflar/575/89679-ekru-boxy-oversize-keten-erkek-gomlek-uk1348ek-uk1348ek-00.jpg"
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
                  src="https://cdn.aksesuarix.com/Fotograflar/575/89679-ekru-boxy-oversize-keten-erkek-gomlek-uk1348ek-uk1348ek-00.jpg"
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

export default Urun_detay;
