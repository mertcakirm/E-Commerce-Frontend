import { useEffect, useState ,useRef} from "react";
import Navbar from "../components/childcomponents/navbar";
import { Helmet } from "react-helmet";
import Footer from "../components/childcomponents/footer";
import { useLocation } from "react-router-dom";
import "./css/urunler.css";
import logo from "../assets/mob_logo.png";
import Filtercomponent from "../components/childcomponents/filtercomponent";
import { fetchProductsByCategory, handleLikeProduct ,handleAddToBasketApi} from "./api/urunler-api";
import { triggerToggleRefreshData } from "../components/childcomponents/reflesh";
import {getCookie} from "../components/cookie/cookie";
import { NotificationCard, showNotification } from '../components/childcomponents/notification';
import LoadingComponent from "../components/childcomponents/Loading.jsx";


const Urunler = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [colClass, setColClass] = useState("col-lg-4");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const notificationRef = useRef(null);
  const location = useLocation();
  const currentCategory = location.pathname.split("/").pop();
  const token = getCookie("SESSIONID");


  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      setLoading(true);
      fetchProductsByCategory(
        currentCategory,
        newPage,
        setFilteredProducts,
        setTotalPages,
        setLoading
      );
    }
  };

  const handleSizeClick = (productCode, size) => {
    setSelectedSize((prevSelectedSizes) => ({
      ...prevSelectedSizes,
      [productCode]: prevSelectedSizes[productCode] === size ? null : size,
    }));
  };
  
  useEffect(() => {
    console.log("Fetching products for category:", currentCategory, "and page:", currentPage);
    fetchProductsByCategory(currentCategory, currentPage, setFilteredProducts, setTotalPages, setLoading);
  }, [currentCategory, currentPage]);

  // useEffect(() => {
  //   fetchFavoriteData(setFavoriteProducts);
  //   fetchCartData(setCartItems, setTotalPrice, setLoading);
  // }, []);

  const handleLikeClick = async (productCode) => {
    if(await handleLikeProduct(productCode, filteredProducts, setFilteredProducts)){
    showNotification(notificationRef, 'Ürün favoriye eklendi!');
    }else{
    showNotification(notificationRef, 'Ürün favoriye eklenemedi!');
    }
    triggerToggleRefreshData();
  };

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

  const handleAddToBasket = async (productCode, size) => {
    if (!token) {
      window.location.href = "/girisyap";
      return;
    } 
      if(await handleAddToBasketApi(productCode, size)){
        showNotification(notificationRef, 'Ürün sepete eklendi!');
        }else{
        showNotification(notificationRef, 'Ürün sepete eklenemedi!');
        }
    triggerToggleRefreshData();
  };

  if (loading) {
    <LoadingComponent />
  }

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
          <div className="col-lg-4  mt-5">
            <p
              className="text-center urunler-sayfa-baslik"
              style={{ textTransform: "uppercase" }}
            >
              {currentCategory} / 200 Ürün
            </p>
          </div>
          <div className="col-lg-4 row grid-row">
            <button
                className="grid-btn 3x3-btn"
                onClick={() => handleGridChange("3x3")}
            >
              <svg clipRule="evenodd" width={50} height={50} fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"
                   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="m21 4c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-12.5 15.5h-4v-4h4zm1.5-4h4v4h-4zm9.5 0v4h-4v-4zm-15-5.5h4v4h-4zm5.5 0h4v4h-4zm5.5 0h4v4h-4zm-11-5.5h4v4h-4zm5.5 0h4v4h-4zm5.5 0h4v4h-4z"
                    fillRule="nonzero"/>
              </svg>
            </button>
            <button
                className="grid-btn 4x4-btn"
                onClick={() => handleGridChange("4x4")}
            >
              <svg width="40" height="40" viewBox="0 0 53 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="1.5" y1="1" x2="1.5" y2="51" stroke="black" strokeWidth="3"/>
                <line x1="14.5" y1="1" x2="14.5" y2="51" stroke="black" strokeWidth="3"/>
                <line x1="26.5" y1="1" x2="26.5" y2="51" stroke="black" strokeWidth="3"/>
                <line x1="51.5" y1="1" x2="51.5" y2="51" stroke="black" strokeWidth="3"/>
                <line x1="38.5" y1="1" x2="38.5" y2="51" stroke="black" strokeWidth="3"/>
                <line y1="1.5" x2="53" y2="1.5" stroke="black" strokeWidth="3"/>
                <line y1="13.5" x2="51" y2="13.5" stroke="black" strokeWidth="3"/>
                <line y1="25.5" x2="51" y2="25.5" stroke="black" strokeWidth="3"/>
                <line y1="37.5" x2="51" y2="37.5" stroke="black" strokeWidth="3"/>
                <line y1="49.5" x2="51" y2="49.5" stroke="black" strokeWidth="3"/>
              </svg>


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
            <Filtercomponent />
          </div>
        </div>
        {/* urun-card */}
        <div className="row urun-cards-row">
          {filteredProducts.map((product, index) => (
            <div className={colClass} key={`${product.productCode}-${index}`}>
              <div className="urun-card">
                <div>
                  <a href={`/urunler-detay/${product.productCode}`}>
                    {product.productImage.length > 0 && (
                      <img
                        className="img-fluid w-100 urun-img2"
                        src={`data:image/jpeg;base64,${product.productImage[0].bytes}`}
                        alt={product.productName}
                      />
                    )}
                    {product.productImage.length > 1 && (
                      <img
                        className="img-fluid w-100 urun-img1"
                        src={`data:image/jpeg;base64,${product.productImage[1].bytes}`}
                        alt={product.productName}
                      />
                    )}
                  </a>
                  <div className="urun-card-content-bottom">
                    <button
                      className="urunler-card-content-bottom-add-btn"
                      onClick={() =>
                        handleAddToBasket(
                          product.productCode,
                          selectedSize[product.productCode]
                        )
                      }
                    >
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
                    <button
                      id={`like-btn-${product.productCode}`}
                      className="urunler-card-content-bottom-like-btn"
                      onClick={() => {
                        const token = getCookie("token");
                        if (token) {
                          handleLikeClick(product.productCode);
                        } else {
                          window.location.href = "/girisyap";
                        }
                      }}
                    >
                      <svg
                        clipRule="evenodd"
                        width="50"
                        height="24"
                        fill={product.favorite ? "red" : "white"}
                        fillRule="evenodd"
                        strokeLinejoin="round"
                        strokeMiterlimit="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z"
                          fillRule="nonzero"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="urunler-card-content-left">
                    {product.sizes.map((sizeObj) => (
                      <button
                        className={`urunler-card-content-left-size-btn ${
                          selectedSize[product.productCode] === sizeObj.size
                            ? "selected-size"
                            : ""
                        }`}
                        key={sizeObj.size}
                        onClick={() =>
                          handleSizeClick(product.productCode, sizeObj.size)
                        }
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
                <p style={{ fontSize: "20px" }} className="p1-fiyat">
                  {product.priceWithDiscount}₺
                </p>
                {product.discountRate > 0 && (
                  <p style={{ fontSize: "20px" }} className="p2-fiyat">
                    {calculateOriginalPrice(
                      product.priceWithDiscount,
                      product.discountRate
                    )}
                    ₺
                  </p>
                )}
              </div>
            </div>
          ))}
          <div className="row justify-content-center">
            <nav aria-label="Page navigation example">
              <ul className="pagination pag-ul">
                <li
                  className={`page-item ${currentPage === 0 ? "disabled" : ""}`}
                  style={{cursor: "pointer"}}
                >
                  <a
                    className="page-link"
                    href="#"
                    aria-label="Previous"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {/* Sayfa Numaraları */}
                {[...Array(totalPages).keys()].map((page) => (
                  <li
                    className={`page-item ${
                      currentPage === page ? "active" : ""
                    }`}
                    key={page}
                  >
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => handlePageChange(page)}
                    >
                      {page + 1}
                    </a>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages - 1 ? "disabled" : ""
                  }`}
                  style={{cursor: "pointer"}}
                >
                  <a
                    className="page-link"
                    href="#"
                    aria-label="Next"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="container logo-container">
            <div className="row justify-content-center">
              <a
                style={{ display: "flex", justifyContent: "center" }}
                className="logo-a"
                href="/"
              >
                <img src={logo} className="img-fluid" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <NotificationCard ref={notificationRef} message="" />
    </div>
  );
};

export default Urunler;