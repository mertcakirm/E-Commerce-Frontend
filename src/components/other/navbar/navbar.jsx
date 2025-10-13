import {useEffect, useRef, useState} from "react";
import "../css/navbar.css";
import logo from "../../../assets/mob_logo.png";
import BasketandFavorite from "./Search.jsx";
import Categories from "./Categories.jsx";
import Basket from "./Basket.jsx";
import Favorite from "./Favorite.jsx";
import {getCookie} from "../../cookie/cookie.js";
import {useSelector} from "react-redux";

const Navbar = () => {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showNavbar, setShowNavbar] = useState(true);
    const cartItems = useSelector((state) => state.basket.items);
    const token = getCookie("token");
    const hasToken = token && Object.keys(token).length > 0;

    const handleMobileSidebarOpen = () => {
        setMobileSidebarOpen(true);
    };

    const handleMobileSidebarClose = () => {
        setMobileSidebarOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);


    return (
        <div>

                <div className="container-fluid" id="nav-container" style={{
                    transform: showNavbar ? "translateY(0)" : "translateY(-100%)",
                    transition: "transform 0.6s ease-in-out",
                }}>
                    <div className="flex-column d-flex row-gap-3">
                        <div className="d-flex justify-content-between align-items-center border-bottom">

                            <a href="/">
                                <img src={logo} className="img-fluid" style={{width: '150px'}} alt=""/>
                            </a>
                            <div className="d-flex overflow-hidden w-50 rounded-2" style={{background:'#ffffff'}}>
                                <button className="border-0 bg-transparent ratio-1x1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/></svg>
                                </button>
                                <input placeholder="Ne Arıyorsunuz?" type="text" className="nav-search w-100 border-0" />
                            </div>

                            <div className="d-flex justify-content-end align-items-center">
                                <button
                                    className="btnsearch"
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasRightFav"
                                    aria-controls="offcanvasRightFav"
                                    style={{position: 'relative'}}
                                >
                                    <svg clipRule="evenodd" fillRule="evenodd" width="30" height="30" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m7.234 3.004c-2.652 0-5.234 1.829-5.234 5.177 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-3.353-2.58-5.168-5.229-5.168-1.836 0-3.646.866-4.771 2.554-1.13-1.696-2.935-2.563-4.766-2.563zm0 1.5c1.99.001 3.202 1.353 4.155 2.7.14.198.368.316.611.317.243 0 .471-.117.612-.314.955-1.339 2.19-2.694 4.159-2.694 1.796 0 3.729 1.148 3.729 3.668 0 2.671-2.881 5.673-8.5 11.127-5.454-5.285-8.5-8.389-8.5-11.127 0-1.125.389-2.069 1.124-2.727.673-.604 1.625-.95 2.61-.95z" fillRule="nonzero"/></svg>
                                </button>

                                <button
                                    className="btnsearch"
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasRightBasket"
                                    aria-controls="offcanvasRightBasket"
                                    style={{position: 'relative'}}

                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M4.558 7l4.701-4.702c.199-.198.46-.298.721-.298.613 0 1.02.505 1.02 1.029 0 .25-.092.504-.299.711l-3.26 3.26h-2.883zm12.001 0h2.883l-4.701-4.702c-.199-.198-.46-.298-.721-.298-.613 0-1.02.505-1.02 1.029 0 .25.092.504.299.711l3.26 3.26zm-16.559 2v2h.643c.534 0 1.021.304 1.256.784l4.101 10.216h12l4.102-10.214c.233-.481.722-.786 1.256-.786h.642v-2h-24z"/>
                                    </svg>
                                    {cartItems.length > 0 &&
                                        <div className="basket-number">{cartItems?.length > 9 ? "9+" : cartItems?.length || 0}</div>
                                    }
                                </button>

                                <a href={hasToken && hasToken !== "" ? "/profilim" : "/girisyap"} className="btnsearch">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>


                        <div className="d-flex justify-content-between align-items-center">
                            <button className="menu-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                                <svg width="30" height="30" fill="white" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 17.75c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z" fillRule="nonzero"/></svg>
                                <div>
                                    Menü
                                </div>
                            </button>
                            <a href="/urunler/tum-urunler" className="nav-link">Tüm Ürünler</a>
                            <a href="/urunler/ERKEK" className="nav-link">Erkek</a>
                            <a href="/urunler/KADIN" className="nav-link">Kadın</a>
                            <a href="/urunler/COCUK" className="nav-link">Çocuk</a>
                            <a href="/urunler/t-shirt" className="nav-link">T-Shirt</a>
                            <a href="/urunler/pantolon" className="nav-link">Pantolon</a>
                        </div>

                    </div>
                </div>



                    <div className="w-100 bg-transparent mobile-logo" style={{
                        transform: showNavbar ? "translateY(0)" : "translateY(-100%)",
                        transition: "transform 0.6s ease-in-out",
                    }}>
                        <a href="/">
                            <img src={logo} className="img-fluid" style={{width: '150px'}} alt=""/>
                        </a>
                    </div>



                <div className="mobile-nav" style={{
                    transform: showNavbar ? "translateY(0)" : "translateY(100%)",
                    transition: "transform 0.6s ease-in-out",
                }}>
                    <a href="/" className="mobile-nav-item">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 2 24 24"
                        >
                            <path
                                d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z"/>
                        </svg>
                    </a>
                    <button
                        className="mobile-nav-item"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasTop"
                        aria-controls="offcanvasTop"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="30"
                            height="30"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="10.5" cy="10.5" r="7.5"/>
                            <line x1="21" y1="21" x2="15.8" y2="15.8"/>
                        </svg>
                    </button>

                    <button className="mobile-nav-item" onClick={handleMobileSidebarOpen}>
                        <svg width="30" height="30" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 17.75c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z" fillRule="nonzero"/></svg>
                    </button>

                    <div className="mobile-nav-item" style={{position: 'relative'}}>
                        <button
                            className="btn "
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRightBasket"
                            aria-controls="offcanvasRightBasket"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M4.558 7l4.701-4.702c.199-.198.46-.298.721-.298.613 0 1.02.505 1.02 1.029 0 .25-.092.504-.299.711l-3.26 3.26h-2.883zm12.001 0h2.883l-4.701-4.702c-.199-.198-.46-.298-.721-.298-.613 0-1.02.505-1.02 1.029 0 .25.092.504.299.711l3.26 3.26zm-16.559 2v2h.643c.534 0 1.021.304 1.256.784l4.101 10.216h12l4.102-10.214c.233-.481.722-.786 1.256-.786h.642v-2h-24z"/>
                            </svg>
                        </button>
                        {cartItems.length > 0 &&
                            <div className="basket-number">{cartItems?.length > 9 ? "9+" : cartItems?.length || 0}</div>
                        }
                    </div>

                    <button className="mobile-nav-item" type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRightFav"
                            aria-controls="offcanvasRightFav">
                        <svg clipRule="evenodd" fillRule="evenodd" width="30" height="30" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m7.234 3.004c-2.652 0-5.234 1.829-5.234 5.177 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-3.353-2.58-5.168-5.229-5.168-1.836 0-3.646.866-4.771 2.554-1.13-1.696-2.935-2.563-4.766-2.563zm0 1.5c1.99.001 3.202 1.353 4.155 2.7.14.198.368.316.611.317.243 0 .471-.117.612-.314.955-1.339 2.19-2.694 4.159-2.694 1.796 0 3.729 1.148 3.729 3.668 0 2.671-2.881 5.673-8.5 11.127-5.454-5.285-8.5-8.389-8.5-11.127 0-1.125.389-2.069 1.124-2.727.673-.604 1.625-.95 2.61-.95z" fillRule="nonzero"/></svg>
                    </button>


                    <a href={hasToken && hasToken !== "" ? "/profilim" : "/girisyap"} className="mobile-nav-item">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"
                            />
                        </svg>
                    </a>
                </div>

            {mobileSidebarOpen && (
                <div className="mobile-sidebar">
                    <button className="close-btn" onClick={handleMobileSidebarClose}>
                        X
                    </button>

                </div>
            )}

            <BasketandFavorite/>
            <Basket />
            <Favorite />
            <Categories />
        </div>
    );
};

export default Navbar;
