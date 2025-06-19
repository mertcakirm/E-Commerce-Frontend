import {useState, useEffect} from "react";
import "../css/navbar.css";
import logo from "../../../assets/mob_logo.png";
import BasketandFavorite from "./BasketandFav.jsx";

const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null);

    const SidebarLinks = [
        {
            id: 1,
            ParentName: "Giyim",
            ChildMenu: [
                {name: "Tişört", href: "#"},
                {name: "Pantolon", href: "#"},
            ],
        },
        {
            id: 2,
            ParentName: "Aksesuar",
            ChildMenu: [
                {name: "Saat", href: "#"},
                {name: "Bileklik", href: "#"},
            ],
        },
        {
            id: 3,
            ParentName: "Çanta",
            ChildMenu: [
                {name: "Sırt Çantası", href: "#"},
                {name: "El Çantası", href: "#"},
            ],
        },
        {
            id: 4,
            ParentName: "Ayakkabı",
            ChildMenu: [
                {name: "Spor Ayakkabı", href: "#"},
                {name: "Bot", href: "#"},
            ],
        },
    ];

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
    }, []);

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

    return (
        <div>
            <a href="/public" id="mobile-navbar-name-scroll" className="mobile-navbar-name">
                <img src={logo} className="logo3 img-fluid" alt=""/>
            </a>
            <div
                className={`sidebar ${sidebarOpen ? "sidebar-open" : ""} ${
                    submenuOpen !== null ? "sidebar-expanded" : ""
                }`}
                onMouseEnter={handleSidebarMouseEnter}
                onMouseLeave={handleSidebarMouseLeave}
            >
                <a className="sidebar-btns" href="#">Tüm Ürünler</a>
                {SidebarLinks.map((link, index) => (
                    <div key={link.id}>
                        <button className="sidebar-btns"
                                onClick={() => handleCategoryClick(index)}>{link.ParentName}</button>
                        {submenuOpen === index && (
                            <div
                                className="submenu"
                                onMouseEnter={() => setSidebarOpen(true)}
                                onMouseLeave={handleSidebarMouseLeave}
                            >
                                {link.ChildMenu.map((child, childIndex) => (
                                    <a key={childIndex} href={child.href}>
                                        {child.name}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* desktop Navigation */}
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
                                <img src={logo} className="logo2 img-fluid" alt=""/>
                            </a>
                        </div>

                        <div
                            className="col-4 d-flex justify-content-end"
                            style={{paddingRight: "50px"}}
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
                                    <circle cx="10.5" cy="10.5" r="7.5"/>
                                    <line x1="21" y1="21" x2="15.8" y2="15.8"/>
                                </svg>
                            </button>
                            <button
                                className="btnsearch"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight"
                                style={{position: 'relative'}}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="50"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M4.558 7l4.701-4.702c.199-.198.46-.298.721-.298.613 0 1.02.505 1.02 1.029 0 .25-.092.504-.299.711l-3.26 3.26h-2.883zm12.001 0h2.883l-4.701-4.702c-.199-.198-.46-.298-.721-.298-.613 0-1.02.505-1.02 1.029 0 .25.092.504.299.711l3.26 3.26zm-16.559 2v2h.643c.534 0 1.021.304 1.256.784l4.101 10.216h12l4.102-10.214c.233-.481.722-.786 1.256-.786h.642v-2h-24z"/>
                                </svg>
                                <div className="basket-number"
                                     style={{width: '25px', height: '25px', lineHeight: '25px'}}>9+
                                </div>

                            </button>

                            <a href="/profilim" style={{paddingTop: "5px"}}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="50"
                                    height="25"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mobile-nav">
                    <a href="/public" className="mobile-nav-item">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="45"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z"/>
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
                            <circle cx="10.5" cy="10.5" r="7.5"/>
                            <line x1="21" y1="21" x2="15.8" y2="15.8"/>
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
                    <div className="mobile-nav-item" style={{position: 'relative'}}>
                        <button
                            className="btn "
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="34"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M4.558 7l4.701-4.702c.199-.198.46-.298.721-.298.613 0 1.02.505 1.02 1.029 0 .25-.092.504-.299.711l-3.26 3.26h-2.883zm12.001 0h2.883l-4.701-4.702c-.199-.198-.46-.298-.721-.298-.613 0-1.02.505-1.02 1.029 0 .25.092.504.299.711l3.26 3.26zm-16.559 2v2h.643c.534 0 1.021.304 1.256.784l4.101 10.216h12l4.102-10.214c.233-.481.722-.786 1.256-.786h.642v-2h-24z"/>
                            </svg>
                        </button>
                        <div className="basket-number">9+</div>
                    </div>


                    <a href="/profilim" className="mobile-nav-item">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="45"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"/>
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
                    <a className="mobile-sidebar-btns" href="#">Tüm Ürünler</a>
                    {SidebarLinks.map((link, index) => (
                        <div key={link.id}>
                            <a href="#" className="mobile-sidebar-btns"
                               onClick={() => handleMobileCategoryClick(index)}>
                                {link.ParentName}
                            </a>
                            {mobileSubmenuOpen === index && (
                                <div className="mobile-submenu">
                                    <button
                                        className="close-btn"
                                        onClick={() => setMobileSubmenuOpen(null)}
                                    >
                                        X
                                    </button>
                                    {link.ChildMenu.map((child, childIndex) => (
                                        <a className="mobile-sidebar-btns" key={childIndex} href={child.href}>
                                            {child.name}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <BasketandFavorite/>
        </div>
    );
};

export default Navbar;
