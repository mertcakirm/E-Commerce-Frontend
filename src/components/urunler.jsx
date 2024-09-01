import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { Helmet } from "react-helmet";
import Footer from "./footer";
import { useLocation } from 'react-router-dom';
import "./css/urunler.css";
import logo from '../assets/mob_logo.png';

const Urunler = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [colClass, setColClass] = useState("col-lg-4");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();
  const [selectedSize, setSelectedSize] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const handleSizeClick = (productCode, size) => {
    setSelectedSize((prevSelectedSizes) => ({
      ...prevSelectedSizes,
      [productCode]: prevSelectedSizes[productCode] === size ? null : size,
    }));
  };
  

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://213.142.159.49:8083/api/favorite/get", {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFavoriteProducts(data);
        } else {
          throw new Error("Favoriler alınamadı");
        }
      } catch (error) {
        console.error("Favorileri alırken bir hata oluştu:", error);
      }
    };

    

    fetchFavorites();
  }, [favoriteProducts]);


  
  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      const token = localStorage.getItem("token");

      try {
        const currentCategory = location.pathname.split('/').pop();
        
        let response;
        if (currentCategory === 'tum-urunler') {
          response = await fetch('http://213.142.159.49:8083/api/product/all', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } else {
          response = await fetch(`http://213.142.159.49:8083/api/category/get/${currentCategory}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }
    
        const data = await response.json();
    
        if (Array.isArray(data.content)) {
          setFilteredProducts(data.content);
        } else {
          console.error('Fetched data content is not an array:', data.content);
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchAndFilterProducts();
  }, [location]);
  


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleGridChange = (size) => {
    if (size === "3x3") {
      setColClass("col-lg-4");
    } else if (size === "4x4") {
      setColClass("col-lg-3");
    }
  };


  const calculateOriginalPrice = (priceWithDiscount, discountRate) => {
    if (discountRate > 0) {
      return (priceWithDiscount / (1 - discountRate / 100)).toFixed(2);
    }
    return priceWithDiscount;
  };

  const handleLikeClick = async (productCode) => {
    try {
      const token = localStorage.getItem("token");
      const favoriteData = JSON.stringify({ productCode: productCode });
      
      const response = await fetch("http://213.142.159.49:8083/api/favorite/add", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
        body: favoriteData, 
      });
  
      if (!response.ok) {
        throw new Error("Favori eklenemedi");
      }
      
      console.log("Ürün favorilere eklendi");
      console.log(response);
  
      const likeBtnColor = document.getElementById("like-btn-color");
      if (likeBtnColor) {
        likeBtnColor.style.fill = "red";
      }
    } catch (error) {
      console.error("Favorilere eklenirken bir hata oluştu:", error);
    }
  };
  


  return (
    <div>
      <Helmet>
        <title>Ürünlerimiz</title>
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
      <div className="container-fluid urunler-container">
        <div className="row text-align-center justify-content-center">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <p className="text-center urunler-sayfa-baslik">
              Pantolon / 200 Ürün
            </p>
          </div>
          <div className="col-lg-4 row grid-row">
            <button
              className="grid-btn 3x3-btn"
              onClick={() => handleGridChange("3x3")}
            >
              <img
                src="https://www.svgrepo.com/show/344890/grid-3x3.svg"
                alt=""
              />
            </button>
            <button
              className="grid-btn 4x4-btn"
              onClick={() => handleGridChange("4x4")}
            >
              <img
                src="https://media.discordapp.net/attachments/1262163053764415622/1266442758072172574/images.png?ex=66a52a3a&is=66a3d8ba&hm=ed9ab4e06d8d2f8e7da2366e8ab7dbd906e5c618a3d3870539749419fc169a42&=&format=webp&quality=lossless"
                alt=""
              />
            </button>

            {/* Dropdown Sırala */}
            <div className="dropdown">
              <button className="dropdown-button" onClick={toggleDropdown}>
                Sırala
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    Seçenek 1
                  </a>
                  <a className="dropdown-item" href="#">
                    Seçenek 2
                  </a>
                  <a className="dropdown-item" href="#">
                    Seçenek 3
                  </a>
                </div>
              )}
            </div>
            {/* Filtre */}
            <button
              className="btn offcanvas-button"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight1"
              aria-controls="offcanvasRight1"
            >
              Filtrele
            </button>
            <div
              className="offcanvas offcanvas-end offcanvas-sayfa"
              tabIndex="-1"
              id="offcanvasRight1"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header">
                <h4>Filtrele</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body offcanvas-body-filtre">
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
                        data-bs-target="#flush-collapseTwo"
                        aria-expanded="false"
                        aria-controls="flush-collapseTwo"
                      >
                        Beden
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTwo"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        Placeholder content for this accordion, which is
                        intended to demonstrate the{" "}
                        <code>.accordion-flush</code> class. This is the second
                        item's accordion body. Let's imagine this being filled
                        with some actual content.
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
                        Renk
                      </button>
                    </h2>
                    <div
                      id="flush-collapseThree"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        Placeholder content for this accordion, which is
                        intended to demonstrate the{" "}
                        <code>.accordion-flush</code> class. This is the third
                        item's accordion body. Nothing more exciting happening
                        here in terms of content, but just filling up the space
                        to make it look, at least at first glance, a bit more
                        representative of how this would look in a real-world
                        application.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseFive"
                        aria-expanded="false"
                        aria-controls="flush-collapseFive"
                      >
                        Fiyat Aralığı
                      </button>
                    </h2>
                    <div
                      id="flush-collapseFive"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        Placeholder content for this accordion, which is
                        intended to demonstrate the{" "}
                        <code>.accordion-flush</code> class. This is the third
                        item's accordion body. Nothing more exciting happening
                        here in terms of content, but just filling up the space
                        to make it look, at least at first glance, a bit more
                        representative of how this would look in a real-world
                        application.
                      </div>
                    </div>
                  </div>
                </div>
                <button className="filtreyi-uygula-btn">Filtreyi Uygula</button>
              </div>
            </div>
          </div>
        </div>
        {/* urun-card */}
        <div className="row urun-cards-row">
  {filteredProducts.map((product) => (
    <div className={colClass} key={product.productCode}>
      <div className="urun-card">
        <div>
          <a href={`/urunler-detay/${product.productCode}`}>
            <img
              className="img-fluid w-100 urun-img2"
              src={`data:image/jpeg;base64,${product.productImage[0].bytes}`}
              alt={product.productName}
            />
            <img
              className="img-fluid w-100 urun-img1"
              src={`data:image/jpeg;base64,${product.productImage[1].bytes}`}
              alt={product.productName}
            />

          </a>
          <div className="urun-card-content-bottom">
            <button className="urunler-card-content-bottom-add-btn">
              +
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M4.558 7l4.701-4.702c.199-.198.46-.298.721-.298.613 0 1.02.505 1.02 1.029 0 .25-.092.504-.299.711l-3.26 3.26h-2.883zm12.001 0h2.883l-4.701-4.702c-.199-.198-.46-.298-.721-.298-.613 0-1.02.505-1.02 1.029 0 .25.092.504.299.711l3.26 3.26zm-16.559 2v2h.643c.534 0 1.021.304 1.256.784l4.101 10.216h12l4.102-10.214c.233-.481.722-.786 1.256-.786h.642v-2h-24z" />
              </svg>
            </button>
            <button id="like-btn-color" className="urunler-card-content-bottom-like-btn" onClick={() => handleLikeClick(product.productCode)} >
              <svg
                clipRule="evenodd"
                fill="white"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                width="50"
                height="24"
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
          <div className="urunler-card-content-left">
            {product.sizes.map((sizeObj) => (
              <button
                className={`urunler-card-content-left-size-btn ${selectedSize[product.productCode] === sizeObj.size ? 'selected-size' : ''}`}
                key={sizeObj.size}
                onClick={() => handleSizeClick(product.productCode, sizeObj.size)}
              >
                {sizeObj.size}
              </button>
            ))}
          </div>
          {product.discountRate > 0 && (
                  <div className="urunler-card-content-top">
                    <p>{product.discountRate}% İndirim</p>
                  </div>
                )}
        </div>
      </div>
      <div className="urun-adi">
        <p>{product.productName}</p>
      </div>
      <div className="urun-fiyat">
  <p style={{ fontSize: '20px' }} className="p1-fiyat">{product.priceWithDiscount}₺</p>
  {product.discountRate > 0 && (
    <p style={{ fontSize: '20px' }} className="p2-fiyat">
      {calculateOriginalPrice(product.priceWithDiscount, product.discountRate)}₺
    </p>
  )}
</div>
    </div>
  ))}
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
      <Footer />
    </div>
  );
};

export default Urunler;
