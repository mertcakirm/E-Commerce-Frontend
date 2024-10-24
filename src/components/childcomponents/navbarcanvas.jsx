import { useEffect, useState } from "react";
import logo from "../../assets/mob_logo.png";
import { fetchCartData, fetchFavoriteData } from "../http/bridge";
import { setToggleRefreshData } from "./reflesh";
import { getCookie, setCookie, deleteCookie } from "../cookie/cookie";

const Navbarpc = () => {
  const [favoriteproduct, setFavoriteproduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalprice, setTotalprice] = useState(0);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [refleshData, setRefleshData] = useState(true);
  const BASE_URL = "http://213.142.159.49:8083/api";
  const token = getCookie("token");

  const toggleRefreshData = () => {
    setRefleshData((prev) => !prev);
  };

  useEffect(() => {
    setToggleRefreshData(toggleRefreshData);
  }, []);

  const handleSizeChange = (e, index) => {
    const size = e.target.value;
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [index]: size,
    }));
  };

  const handleAddToBasket = async (productCode, size) => {
    try {
      if (!token) {
        window.location.href = "/girisyap";
        return;
      }
      const requestData = JSON.stringify({ productCode, size });

      const response = await fetch(`${BASE_URL}/basket/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: requestData,
      });

      if (response.ok) {
        console.log("Ürün sepete eklendi");
      } else {
        throw new Error("Ürün sepete eklenemedi");
      }
    } catch (error) {
      console.error("Ürün sepete eklenirken bir hata oluştu:", error);
    }
    toggleRefreshData();
    setTimeout(() => setTotalprice, 2000);
  };

  const deleteItemFromBasket = (productCode) => {
    if (!token) {
      console.error("No token found");
      return;
    }

    fetch(`${BASE_URL}/basket/delete/${productCode}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((data) => {
        console.log("Item deleted:", data);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
    toggleRefreshData();
    setTimeout(() => setTotalprice, 2000);
  };

  const fetchFullData = async () => {
    setLoading(true);
    try {
      await fetchFavoriteData(setFavoriteproduct);
      await fetchCartData(setCartItems, setTotalprice, setLoading);
    } catch (error) {
      console.error("Data fetching error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFullData();
  }, [refleshData]);

  const incrementProductCount = (productCode) => {
    fetch(`${BASE_URL}/basket/increase/quantity/${productCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          fetchCartData();
        } else {
          console.error("Error incrementing product count");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    toggleRefreshData();
    setTimeout(() => setTotalprice, 2000);
  };

  const decrementProductCount = (productCode) => {
    fetch(`${BASE_URL}/basket/decrease/quantity/${productCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          fetchCartData();
        } else {
          console.error("Error decrementing product count");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    toggleRefreshData();
    setTimeout(() => setTotalprice, 2000);
  };

  const handleLikeClick = async (productCode) => {
    try {
      const favoriteData = JSON.stringify({ productCode: productCode });

      const response = await fetch(`${BASE_URL}/favorite/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: favoriteData,
      });

      if (!response.ok) {
        throw new Error("Favori eklenemedi");
      }

      const likeBtnColor = document.getElementById("like-btn-color");
      if (likeBtnColor) {
        likeBtnColor.style.fill = "red";
      }
    } catch (error) {
      console.error("Favorilere eklenirken bir hata oluştu:", error);
    }
    toggleRefreshData();
  };

  return (
    <div>
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
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : cartItems.length === 0 ? (
                  <div
                    style={{ margin: "0" }}
                    className="d-flex row text-center justify-content-center mt-5"
                  >
                    <h2 className="mt-5">Sepetiniz Boş</h2>
                    <a
                      className="mt-3"
                      href="../urunler/tum-urunler"
                      style={{ fontSize: "24px", color: "#000" }}
                    >
                      Alışverişe Devam Et
                    </a>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div className="sepet-card row" key={item.productCode}>
                      <a
                        href={`/urunler-detay/${item.productCode}`}
                        className="col-4 sepet-card-col-1"
                      >
                        <img
                          src={`data:image/jpeg;base64,${item.image.bytes}`}
                          className="img-fluid w-100 sepet-resim"
                          alt={item.productName}
                        />
                      </a>
                      <div className="col-6 sepet-card-col-2">
                        <p className="sepet-card-col-2-p-1">
                          {item.productName}
                        </p>
                        <p className="sepet-card-col-2-urun-kodu">
                          Ürün Kodu : {item.productCode}
                        </p>
                        <p className="sepet-card-col-2-beden">
                          BEDEN : {item.size}
                        </p>
                        <div className="updown">
                          <button
                            onClick={() =>
                              decrementProductCount(item.productCode)
                            }
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              incrementProductCount(item.productCode)
                            }
                          >
                            +
                          </button>
                        </div>
                        <div className="sepet-card-col-2-fiyatlar-flex">
                          <p className="sepet-card-col-2-p1-fiyat">
                            {item.priceWithDiscount}₺
                          </p>
                          {item.discount === 0 && (
                            <p className="sepet-card-col-2-p2-fiyat">
                              {item.priceWithOutDiscount}₺
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-2 sepet-card-col-3">
                        <button
                          className="sepet-card-col-3-like-btn"
                          onClick={() => deleteItemFromBasket(item.productCode)}
                        >
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
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && ( // Show total price and button only if cart is not empty
                <>
                  <div className="toplam-tutar">
                    <p>TOPLAM</p>
                    <p>{totalprice}₺</p>
                  </div>
                  <a
                    href="#"
                    className="sepeti-tamamla-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      if (totalprice === 0) {
                        window.location.href = "/urunler/tum-urunler";
                      } else {
                        window.location.href = "/siparis/ozet";
                      }
                    }}
                  >
                    Sepeti Tamamla
                  </a>
                </>
              )}
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
                      <div className="favorilerim-canvas-card row" key={index}>
                        <div className="col-3 favorilerim-canvas-col-1">
                          <a href={`/urunler-detay/${product.productCode}`}>
                            <img
                              src={`data:image/jpeg;base64,${product.imageBytes}`}
                              className="img-fluid w-100 sepet-resim"
                              alt={product.productName || "Ürün resmi"}
                            />
                          </a>
                        </div>
                        <div className="col-8 favorilerim-canvas-col-2">
                          <div
                            style={{
                              display: "flex",
                              zIndex: "20",
                              justifyContent: "space-between",
                            }}
                          >
                            <p className="sepet-card-col-2-p-1">
                              {product.productName}
                            </p>
                            <button
                              id="like-btn-color"
                              className="urunler-card-content-bottom-like-btn"
                              onClick={() =>
                                handleLikeClick(product.productCode)
                              }
                            >
                              <svg
                                clipRule="evenodd"
                                width="50"
                                height="24"
                                fill="red"
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
                          <p className="sepet-card-col-2-urun-kodu">
                            Ürün Kodu : {product.productCode}
                          </p>
                          <div className="sepet-card-col-2-fiyatlar-flex">
                            <p className="sepet-card-col-2-p1-fiyat">
                              {product.priceWithDiscount}₺
                            </p>
                            <p className="sepet-card-col-2-p2-fiyat">
                              {product.priceWithOutDiscount}₺
                            </p>
                          </div>
                          <div className="favori-card-add-flex">
                            <select
                              name="favori-size"
                              id="favori-size"
                              onChange={(e) => handleSizeChange(e, index)}
                            >
                              {product.sizes.map((sizeObj) => (
                                <option key={sizeObj.size} value={sizeObj.size}>
                                  {sizeObj.size}
                                </option>
                              ))}
                            </select>
                            <button
                              className="favori-card-sepete-ekle"
                              onClick={() =>
                                handleAddToBasket(
                                  product.productCode,
                                  selectedSizes[index] || product.sizes[0].size
                                )
                              }
                            >
                              Sepete Ekle
                            </button>
                          </div>
                        </div>
                        <div className="col-1 favorilerim-canvas-col-3">
                          <a href={`/urunler-detay/${product.productCode}`}>
                            <svg
                              width="24"
                              height="24"
                              xmlns="http://www.w3.org/2000/svg"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            >
                              <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: "2%" }}>
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

export default Navbarpc;