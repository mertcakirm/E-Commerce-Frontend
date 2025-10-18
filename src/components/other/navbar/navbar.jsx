import {useEffect, useRef, useState} from "react";
import "../css/navbar.css";
import logo from "../../../assets/mob_logo.png";
import BasketandFavorite from "./Search.jsx";
import Categories from "./Categories.jsx";
import Basket from "./Basket.jsx";
import Favorite from "./Favorite.jsx";
import {getCookie} from "../../cookie/cookie.js";
import {useSelector} from "react-redux";
import {IoPersonSharp} from "react-icons/io5";
import {BsBasket3Fill} from "react-icons/bs";
import {FcLike} from "react-icons/fc";
import {FaSearch} from "react-icons/fa";
import {IoMdHome} from "react-icons/io";
import {HiOutlineBars3} from "react-icons/hi2";

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
                        <div className="d-flex overflow-hidden w-50 rounded-2" style={{background: '#ffffff'}}>
                            <button className="border-0 bg-transparent ratio-1x1">
                                <FaSearch size={30}/>
                            </button>
                            <input placeholder="Ne Arıyorsunuz?" type="text" className="nav-search w-100 border-0"/>
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
                                <FcLike size={25}/>
                            </button>

                            <button
                                className="btnsearch"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRightBasket"
                                aria-controls="offcanvasRightBasket"
                                style={{position: 'relative'}}

                            >
                                <BsBasket3Fill size={20} color="black"/>
                                {cartItems.length > 0 &&
                                    <div
                                        className="basket-number">{cartItems?.length > 9 ? "9+" : cartItems?.length || 0}</div>
                                }
                            </button>

                            <a href={hasToken && hasToken !== "" ? "/profilim" : "/girisyap"} className="btnsearch">
                                <IoPersonSharp size={20} color="black"/>
                            </a>
                        </div>
                    </div>


                    <div className="d-flex justify-content-between align-items-center">
                        <button className="menu-btn" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                            <HiOutlineBars3 size={30} color="white"/>
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
                    <IoMdHome size={30} color="black"/>
                </a>
                <button
                    className="mobile-nav-item"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasTop"
                    aria-controls="offcanvasTop"
                >
                    <FaSearch size={25}/>
                </button>

                <button className="mobile-nav-item" onClick={handleMobileSidebarOpen}>
                    <HiOutlineBars3 size={30} color="black"/>
                </button>

                <div className="mobile-nav-item" style={{position: 'relative'}}>
                    <button
                        className="btn "
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRightBasket"
                        aria-controls="offcanvasRightBasket"
                    >
                        <BsBasket3Fill size={25} color="black"/>
                    </button>
                    {cartItems.length > 0 &&
                        <div className="basket-number">{cartItems?.length > 9 ? "9+" : cartItems?.length || 0}</div>
                    }
                </div>

                <button className="mobile-nav-item" type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRightFav"
                        aria-controls="offcanvasRightFav">
                    <FcLike size={25}/>
                </button>


                <a href={hasToken && hasToken !== "" ? "/profilim" : "/girisyap"} className="mobile-nav-item">
                    <IoPersonSharp size={20} color="black"/>

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
            <Basket/>
            <Favorite/>
            <Categories/>
        </div>
    );
};

export default Navbar;
