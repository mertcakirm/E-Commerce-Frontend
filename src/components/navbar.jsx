import React, { useState, useEffect } from "react";
import "./css/navbar.css";
import logo from '../assets/mob_logo.png';
import { data } from "jquery";


const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null);
  const [productCount, setProductCount] = useState(1);
  const [favoriteproduct, setFavoriteproduct] = useState([]);


  const handleSidebarMouseEnter = () => {
    setSidebarOpen(true);
  };

  const handleSidebarMouseLeave = () => {
    setSidebarOpen(false);
    setSubmenuOpen(null);
  };

  const handleCategoryClick = (index) => {
    setSubmenuOpen(submenuOpen === index ? null : index);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    const handleScroll = () => {
      const button = document.getElementById("nav-col-mid");
      const mobilebutton = document.getElementById("mobile-navbar-name-scroll");
      
      if (button && mobilebutton) {
        if (window.scrollY > 300) {
          button.classList.add("hidden-site-name");
          mobilebutton.classList.add("hidden-site-name");
        } else {
          button.classList.remove("hidden-site-name");
          mobilebutton.classList.remove("hidden-site-name");
        }
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };

    
  },
  
  []);
  

  const handleMobileSidebarOpen = () => {
    setMobileSidebarOpen(true);
  };

  const handleMobileSidebarClose = () => {
    setMobileSidebarOpen(false);
    setMobileSubmenuOpen(null);
  };

  const handleMobileCategoryClick = (index) => {
    setMobileSubmenuOpen(mobileSubmenuOpen === index ? null : index);
  };

  const incrementProductCount = () => {
    setProductCount(productCount + 1);
  };

  const decrementProductCount = () => {
    if (productCount > 1) {
      setProductCount(productCount - 1);
    }
  };

  useEffect(() => {
    const fetchFavoriteData = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://213.142.159.49:8083/api/favorite/get', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const favoritedata = await response.json();
          setFavoriteproduct(favoritedata);
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchFavoriteData();
  }, []);




  

  return (
    <div>
      {/* Desktop Sidebar */}

      <a href="/" id="mobile-navbar-name-scroll" className="mobile-navbar-name">
        <img src={logo} className="logo3 img-fluid" alt="" />
      </a>

      <div
        className={`sidebar ${sidebarOpen ? "sidebar-open" : ""} ${
          submenuOpen !== null ? "sidebar-expanded" : ""
        }`}
        onMouseEnter={handleSidebarMouseEnter}
        onMouseLeave={handleSidebarMouseLeave}
      >
        <a href="#">Tüm Ürünler</a>
        <button onClick={() => handleCategoryClick(0)}>Giyim</button>
        <button onClick={() => handleCategoryClick(1)}>Aksesuar</button>
        <button onClick={() => handleCategoryClick(2)}>Çanta</button>
        <button onClick={() => handleCategoryClick(3)}>Ayakkabı</button>

        {submenuOpen !== null && (
          <div
            className={`submenu`}
            onMouseEnter={() => setSidebarOpen(true)}
            onMouseLeave={handleSidebarMouseLeave}
          >
            {submenuOpen === 0 && (
              <div>
                <a href="#">Home Sub 1</a>
                <a href="#">Home Sub 2</a>
              </div>
            )}
            {submenuOpen === 1 && (
              <div>
                <a href="#">Services Sub 1</a>
                <a href="#">Services Sub 2</a>
              </div>
            )}
            {submenuOpen === 2 && (
              <div>
                <a href="#">Clients Sub 1</a>
                <a href="#">Clients Sub 2</a>
              </div>
            )}
            {submenuOpen === 3 && (
              <div>
                <a href="#">Contact Sub 1</a>
                <a href="#">Contact Sub 2</a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {!isMobile ? (
        <div className="container-fluid" id="nav-container">
          <div className="row">
            <div className="col-4">
              <button
                className="sidebar-btn"
                onMouseEnter={handleSidebarMouseEnter}
              >
                <svg
                  width="100"
                  height="70"
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="10"
                    y1="20"
                    x2="70"
                    y2="20"
                    stroke="black"
                    strokeWidth="7"
                  />
                  <line
                    x1="10"
                    y1="50"
                    x2="70"
                    y2="50"
                    stroke="black"
                    strokeWidth="7"
                  />
                  <line
                    x1="10"
                    y1="80"
                    x2="70"
                    y2="80"
                    stroke="black"
                    strokeWidth="7"
                  />
                </svg>
              </button>
            </div>
            <div className="col-4" id="nav-col-mid">
              <a href="/">
                <img src={logo} className="logo2 img-fluid" alt="" />
              </a>
            </div>

            <div
              className="col-4 d-flex justify-content-end"
              style={{ paddingRight: "50px" }}
            >
              <button
                className="btnsearch"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasTop"
                aria-controls="offcanvasTop"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="30"
                  height="25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="10.5" cy="10.5" r="7.5" />
                  <line x1="21" y1="21" x2="15.8" y2="15.8" />
                </svg>
              </button>

              <button
                className="btnsearch"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.558 7l4.701-4.702c.199-.198.46-.298.721-.298.613 0 1.02.505 1.02 1.029 0 .25-.092.504-.299.711l-3.26 3.26h-2.883zm12.001 0h2.883l-4.701-4.702c-.199-.198-.46-.298-.721-.298-.613 0-1.02.505-1.02 1.029 0 .25.092.504.299.711l3.26 3.26zm-16.559 2v2h.643c.534 0 1.021.304 1.256.784l4.101 10.216h12l4.102-10.214c.233-.481.722-.786 1.256-.786h.642v-2h-24z" />
                </svg>
              </button>

              <a href="/profilim" style={{ paddingTop: "5px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="25"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="mobile-nav">
          <a href="/" className="mobile-nav-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="45"
              viewBox="0 0 24 24"
            >
              <path d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z" />
            </svg>
          </a>
          <button
            className="btnsearch mobile-nav-item"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasTop"
            aria-controls="offcanvasTop"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="30"
              height="25"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="10.5" cy="10.5" r="7.5" />
              <line x1="21" y1="21" x2="15.8" y2="15.8" />
            </svg>
          </button>

          <button className="mobile-nav-item" onClick={handleMobileSidebarOpen}>
            <svg
              width="45"
              height="25"
              viewBox="20 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="10"
                y1="20"
                x2="120"
                y2="20"
                stroke="black"
                strokeWidth="7"
              />
              <line
                x1="10"
                y1="50"
                x2="120"
                y2="50"
                stroke="black"
                strokeWidth="7"
              />
              <line
                x1="10"
                y1="80"
                x2="120"
                y2="80"
                stroke="black"
                strokeWidth="7"
              />
            </svg>
          </button>
          <button
            className="btn mobile-nav-item"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M4.558 7l4.701-4.702c.199-.198.46-.298.721-.298.613 0 1.02.505 1.02 1.029 0 .25-.092.504-.299.711l-3.26 3.26h-2.883zm12.001 0h2.883l-4.701-4.702c-.199-.198-.46-.298-.721-.298-.613 0-1.02.505-1.02 1.029 0 .25.092.504.299.711l3.26 3.26zm-16.559 2v2h.643c.534 0 1.021.304 1.256.784l4.101 10.216h12l4.102-10.214c.233-.481.722-.786 1.256-.786h.642v-2h-24z" />
            </svg>
          </button>

          <a href="/profilim" className="mobile-nav-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="45"
              viewBox="0 0 24 24"
            >
              <path d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z" />
            </svg>
          </a>
        </div>
      )}

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div className="mobile-sidebar">
          <button className="close-btn" onClick={handleMobileSidebarClose}>
            X
          </button>
          <a href="#">Tüm Ürünler</a>
          <a href="#" onClick={() => handleMobileCategoryClick(0)}>
            Giyim
          </a>
          <a href="#" onClick={() => handleMobileCategoryClick(1)}>
            Aksesuar
          </a>
          <a href="#" onClick={() => handleMobileCategoryClick(2)}>
            Çanta
          </a>
          <a href="#" onClick={() => handleMobileCategoryClick(3)}>
            Ayakkabı
          </a>

          {mobileSubmenuOpen !== null && (
            <div className="mobile-submenu">
              <button
                className="close-btn"
                onClick={() => setMobileSubmenuOpen(null)}
              >
                X
              </button>
              {mobileSubmenuOpen === 0 && (
                <div>
                  <a href="#">Home Sub 1</a>
                  <a href="#">Home Sub 2</a>
                </div>
              )}
              {mobileSubmenuOpen === 1 && (
                <div>
                  <a href="#">Services Sub 1</a>
                  <a href="#">Services Sub 2</a>
                </div>
              )}
              {mobileSubmenuOpen === 2 && (
                <div>
                  <a href="#">Clients Sub 1</a>
                  <a href="#">Clients Sub 2</a>
                </div>
              )}
              {mobileSubmenuOpen === 3 && (
                <div>
                  <a href="#">Contact Sub 1</a>
                  <a href="#">Contact Sub 2</a>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* offcanvas */}

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body ofcanvas-body-sepet">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Sepetim
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Favorilerim
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
              tabIndex="0"
            >
              <div className="sepet-flex2">
                <a href="#" className="sepet-card row">
                  <div className="col-4 sepet-card-col-1">
                    <img
                      src="https://www.aksesuarix.com/UserFiles/Fotograflar/107x161/90117-story-of-radio-oversize-siyah-erkek-tisort-us4109sy-us4109sy-01.jpg"
                      className="img-fluid w-100 sepet-resim"
                      alt=""
                    />
                  </div>
                  <div className="col-6 sepet-card-col-2">
                    <p className="sepet-card-col-2-p-1">
                      NY Monogram Drytech Erkek Şort
                    </p>
                    <p className="sepet-card-col-2-urun-kodu">
                      Ürün Kodu : US4109SY
                    </p>
                    <p className="sepet-card-col-2-beden">BEDEN : L</p>
                    <div className="updown">
                      <button onClick={decrementProductCount}>-</button>
                      <span>{productCount}</span>
                      <button onClick={incrementProductCount}>+</button>
                    </div>
                    <div className="sepet-card-col-2-fiyatlar-flex">
                      <p className="sepet-card-col-2-p1-fiyat">499₺</p>
                      <p className="sepet-card-col-2-p2-fiyat">789₺</p>
                    </div>
                  </div>
                  <div className="col-2 sepet-card-col-3">
                    <button className="sepet-card-col-3-like-btn">
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
                          d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
                          fillRule="nonzero"
                        />
                      </svg>
                    </button>
                  </div>
                </a>

                <a href="#" className="sepet-card row">
                  <div className="col-4 sepet-card-col-1">
                    <img
                      src="https://www.aksesuarix.com/UserFiles/Fotograflar/107x161/90117-story-of-radio-oversize-siyah-erkek-tisort-us4109sy-us4109sy-01.jpg"
                      className="img-fluid w-100 sepet-resim"
                      alt=""
                    />
                  </div>
                  <div className="col-6 sepet-card-col-2">
                    <p className="sepet-card-col-2-p-1">
                      NY Monogram Drytech Erkek Şort
                    </p>
                    <p className="sepet-card-col-2-urun-kodu">
                      Ürün Kodu : US4109SY
                    </p>
                    <p className="sepet-card-col-2-beden">BEDEN : L</p>
                    <div className="updown">
                      <button onClick={decrementProductCount}>-</button>
                      <span>{productCount}</span>
                      <button onClick={incrementProductCount}>+</button>
                    </div>
                    <div className="sepet-card-col-2-fiyatlar-flex">
                      <p className="sepet-card-col-2-p1-fiyat">499₺</p>
                      <p className="sepet-card-col-2-p2-fiyat">789₺</p>
                    </div>
                  </div>
                  <div className="col-2 sepet-card-col-3">
                    <button className="sepet-card-col-3-like-btn">
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
                          d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
                          fillRule="nonzero"
                        />
                      </svg>
                    </button>
                  </div>
                </a>

                <a href="#" className="sepet-card row">
                  <div className="col-4 sepet-card-col-1">
                    <img
                      src="https://www.aksesuarix.com/UserFiles/Fotograflar/107x161/90117-story-of-radio-oversize-siyah-erkek-tisort-us4109sy-us4109sy-01.jpg"
                      className="img-fluid w-100 sepet-resim"
                      alt=""
                    />
                  </div>
                  <div className="col-6 sepet-card-col-2">
                    <p className="sepet-card-col-2-p-1">
                      NY Monogram Drytech Erkek Şort
                    </p>
                    <p className="sepet-card-col-2-urun-kodu">
                      Ürün Kodu : US4109SY
                    </p>
                    <p className="sepet-card-col-2-beden">BEDEN : L</p>
                    <div className="updown">
                      <button onClick={decrementProductCount}>-</button>
                      <span>{productCount}</span>
                      <button onClick={incrementProductCount}>+</button>
                    </div>
                    <div className="sepet-card-col-2-fiyatlar-flex">
                      <p className="sepet-card-col-2-p1-fiyat">499₺</p>
                      <p className="sepet-card-col-2-p2-fiyat">789₺</p>
                    </div>
                  </div>
                  <div className="col-2 sepet-card-col-3">
                    <button className="sepet-card-col-3-like-btn">
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
                          d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
                          fillRule="nonzero"
                        />
                      </svg>
                    </button>
                  </div>
                </a>

                <a href="#" className="sepet-card row">
                  <div className="col-4 sepet-card-col-1">
                    <img
                      src="https://www.aksesuarix.com/UserFiles/Fotograflar/107x161/90117-story-of-radio-oversize-siyah-erkek-tisort-us4109sy-us4109sy-01.jpg"
                      className="img-fluid w-100 sepet-resim"
                      alt=""
                    />
                  </div>
                  <div className="col-6 sepet-card-col-2">
                    <p className="sepet-card-col-2-p-1">
                      NY Monogram Drytech Erkek Şort
                    </p>
                    <p className="sepet-card-col-2-urun-kodu">
                      Ürün Kodu : US4109SY
                    </p>
                    <p className="sepet-card-col-2-beden">BEDEN : L</p>
                    <div className="updown">
                      <button onClick={decrementProductCount}>-</button>
                      <span>{productCount}</span>
                      <button onClick={incrementProductCount}>+</button>
                    </div>
                    <div className="sepet-card-col-2-fiyatlar-flex">
                      <p className="sepet-card-col-2-p1-fiyat">499₺</p>
                      <p className="sepet-card-col-2-p2-fiyat">789₺</p>
                    </div>
                  </div>
                  <div className="col-2 sepet-card-col-3">
                    <button className="sepet-card-col-3-like-btn">
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
                          d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
                          fillRule="nonzero"
                        />
                      </svg>
                    </button>
                  </div>
                </a>

                <br />
                <br />
                <br />
              </div>
              <div className="toplam-tutar">
                <p>TOPLAM</p>
                <p>499₺</p>
              </div>
              <a href="#" className="sepeti-tamamla-btn">
                Sepeti Tamamla
              </a>
            </div>

            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
              tabIndex="0"
            >
              <div className="favorilerim-canvas-flex">

              <div>
      {favoriteproduct && favoriteproduct.length > 0 ? (
        favoriteproduct.map((product, index) => (
          <a href="#" className="favorilerim-canvas-card row" key={index}>
            <div className="col-3 favorilerim-canvas-col-1">
              <img
                src={product.image || "https://www.aksesuarix.com/UserFiles/Fotograflar/107x161/90117-story-of-radio-oversize-siyah-erkek-tisort-us4109sy-us4109sy-01.jpg"}
                className="img-fluid w-100 sepet-resim"
                alt={product.productName || "Ürün resmi"}
              />
            </div>
            <div className="col-8 favorilerim-canvas-col-2">
              <p className="sepet-card-col-2-p-1">
                {product.productName}
              </p>
              <p className="sepet-card-col-2-urun-kodu">
                Ürün Kodu : {product.productCode}
              </p>
              <div className="sepet-card-col-2-fiyatlar-flex">
                <p className="sepet-card-col-2-p1-fiyat">{product.priceWithDiscount}₺</p>
                <p className="sepet-card-col-2-p2-fiyat">{product.priceWithOutDiscount}₺</p>
              </div>
              <div className="favori-card-add-flex">
                <div className="updown">
                  <button onClick={() => decrementProductCount(index)}>-</button>
                  <span>{productCount[index] || 1}</span>
                  <button onClick={() => incrementProductCount(index)}>+</button>
                </div>
                <select name="favori-size" id="favori-size">
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                </select>
                <button className="favori-card-sepete-ekle">
                  Sepete Ekle
                </button>
              </div>
            </div>
            <div className="col-1 favorilerim-canvas-col-3">
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
              </svg>
            </div>
          </a>
        ))
      ) : (
        <div style={{padding:'2%'}}>
          <h4>Favori listeniz boş</h4>
        </div>
      )}
    </div>




              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-top"
        tabIndex="-1"
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel2"
      >
        <div className="offcanvas-header2">
          <img src={logo} className="img-fluid top-canvas-logo" alt="" />

        </div>

        <div className="offcanvas-body-top">
          <div className="search-container">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-label="Search"
            />
            <button type="button" className="search-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="30"
                height="25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="10.5" cy="10.5" r="7.5" />
                <line x1="21" y1="21" x2="15.8" y2="15.8" />
              </svg>
            </button>
          </div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
