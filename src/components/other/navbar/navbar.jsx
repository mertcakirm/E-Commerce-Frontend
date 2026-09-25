import "../css/navbar.css";
import logo from "../../../assets/mob_logo.png";
import BasketandFavorite from "./Search.jsx";
import Categories from "./Categories.jsx";
import Basket from "./Basket.jsx";
import Favorite from "./Favorite.jsx";
import { getCookie } from "../../cookie/cookie.js";
import { useSelector } from "react-redux";
import { IoPersonOutline } from "react-icons/io5";
import { BsBag } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { IoMdHome } from "react-icons/io";
import { HiOutlineBars3 } from "react-icons/hi2";

const Navbar = () => {
    const cartItems = useSelector((state) => state.basket.items);
    const token = getCookie("token");
    const hasToken = token && Object.keys(token).length > 0;

    return (
        <div>
            {/* Desktop Navbar */}
            <header className="container-fluid" id="nav-container">
                <div className="nav-inner-wrapper">
                    <div className="nav-top-row">
                        <a href="/" className="nav-logo-link">
                            <img src={logo} className="nav-logo" alt="Logo" />
                        </a>

                        <div className="nav-search-wrapper">
                            <button className="nav-search-btn" aria-label="Arama Yap">
                                <FiSearch size={18} />
                            </button>
                            <input
                                placeholder="Ürün, kategori veya marka ara..."
                                type="text"
                                className="nav-search-input"
                            />
                        </div>

                        <div className="nav-actions">
                            <button
                                className="btnsearch"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRightFav"
                                aria-controls="offcanvasRightFav"
                                aria-label="Favoriler"
                            >
                                <IoHeartOutline size={22} />
                            </button>

                            <button
                                className="btnsearch"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRightBasket"
                                aria-controls="offcanvasRightBasket"
                                aria-label="Sepet"
                            >
                                <BsBag size={20} />
                                {cartItems?.length > 0 && (
                                    <span className="basket-number">
                                        {cartItems.length > 9 ? "9+" : cartItems.length}
                                    </span>
                                )}
                            </button>

                            <a
                                href={hasToken ? "/profilim" : "/girisyap"}
                                className="btnsearch"
                                aria-label="Profil"
                            >
                                <IoPersonOutline size={20} />
                            </a>
                        </div>
                    </div>

                    <div className="nav-bottom-row">
                        <button
                            className="menu-btn"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#staticBackdrop"
                            aria-controls="staticBackdrop"
                        >
                            <HiOutlineBars3 size={20} />
                            <span>Kategoriler</span>
                        </button>

                        <nav className="nav-category-links">
                            <a href="/urunler/tum-urunler" className="nav-link">Tüm Ürünler</a>
                            <a href="/urunler/ERKEK" className="nav-link">Erkek</a>
                            <a href="/urunler/KADIN" className="nav-link">Kadın</a>
                            <a href="/urunler/COCUK" className="nav-link">Çocuk</a>
                            <a href="/urunler/t-shirt" className="nav-link">T-Shirt</a>
                            <a href="/urunler/pantolon" className="nav-link">Pantolon</a>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Mobile Header Logo */}
            <div className="mobile-logo-header">
                <a href="/">
                    <img src={logo} className="mobile-logo-img" alt="Logo" />
                </a>
            </div>

            {/* Mobile Bottom Navigation Bar */}
            <nav className="mobile-nav">
                <a href="/" className="mobile-nav-item" aria-label="Ana Sayfa">
                    <IoMdHome size={24} />
                    <span>Ana Sayfa</span>
                </a>

                <button
                    className="mobile-nav-item"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasTop"
                    aria-controls="offcanvasTop"
                    aria-label="Arama"
                >
                    <FiSearch size={22} />
                    <span>Ara</span>
                </button>

                {/* Menü Butonu Doğrudan Kategoriler Offcanvas'ını Açıyor */}
                <button
                    className="mobile-nav-item"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#staticBackdrop"
                    aria-controls="staticBackdrop"
                    aria-label="Menü"
                >
                    <HiOutlineBars3 size={24} />
                    <span>Menü</span>
                </button>

                <button
                    className="mobile-nav-item position-relative"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRightBasket"
                    aria-controls="offcanvasRightBasket"
                    aria-label="Sepet"
                >
                    <BsBag size={21} />
                    <span>Sepet</span>
                    {cartItems?.length > 0 && (
                        <span className="basket-number">
                            {cartItems.length > 9 ? "9+" : cartItems.length}
                        </span>
                    )}
                </button>

                <button
                    className="mobile-nav-item"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRightFav"
                    aria-controls="offcanvasRightFav"
                    aria-label="Favoriler"
                >
                    <IoHeartOutline size={23} />
                    <span>Favoriler</span>
                </button>

                <a
                    href={hasToken ? "/profilim" : "/girisyap"}
                    className="mobile-nav-item"
                    aria-label="Hesabım"
                >
                    <IoPersonOutline size={22} />
                    <span>Hesabım</span>
                </a>
            </nav>

            {/* Subcomponents & Offcanvases */}
            <BasketandFavorite />
            <Basket />
            <Favorite />
            <Categories />
        </div>
    );
};

export default Navbar;
