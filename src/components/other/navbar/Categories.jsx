import "../css/Categories.css";
import PageLogo from "../PageLogo.jsx";
import { HiOutlineSparkles, HiChevronRight } from "react-icons/hi2";

const Categories = () => {
    const categories = [
        {
            id: 1,
            name: "Erkek Giyim",
            sub: ["Tişört", "Pantolon", "Ceket", "Gömlek", "Sweatshirt", "Hırka"],
        },
        {
            id: 2,
            name: "Kadın Giyim",
            sub: ["Elbise", "Bluz", "Etek", "Tunik", "Pantolon", "Ceket"],
        },
        {
            id: 3,
            name: "Aksesuar",
            sub: ["Çanta", "Saat", "Kemer", "Şapka", "Gözlük", "Takı"],
        },
        {
            id: 4,
            name: "Ayakkabı",
            sub: ["Spor Ayakkabı", "Bot", "Sneaker", "Sandalet", "Topuklu"],
        },
        {
            id: 5,
            name: "Çocuk Giyim",
            sub: ["Tişört", "Pantolon", "Elbise", "Mont", "Ayakkabı"],
        },
        {
            id: 6,
            name: "Ev & Yaşam",
            sub: ["Ev Tekstili", "Mutfak Gereçleri", "Dekorasyon", "Aydınlatma"],
        },
        {
            id: 7,
            name: "Elektronik",
            sub: ["Telefon", "Bilgisayar", "Kulaklık", "Tablet", "Aksesuar"],
        },
        {
            id: 8,
            name: "Spor & Outdoor",
            sub: ["Spor Giyim", "Spor Ayakkabı", "Çanta", "Ekipmanlar"],
        },
    ];

    return (
        <div
            className="offcanvas offcanvas-start modern-categories-offcanvas"
            data-bs-backdrop="static"
            tabIndex="-1"
            id="staticBackdrop"
            aria-labelledby="staticBackdropLabel"
        >
            {/* Header */}
            <div className="offcanvas-header modern-cat-header">
                <div className="d-flex align-items-center gap-2">
                    <h5 className="offcanvas-title modern-cat-title" id="staticBackdropLabel">
                        Kategoriler
                    </h5>
                    <span className="cat-count-badge">{categories.length}</span>
                </div>
                <button
                    type="button"
                    className="btn-close shadow-none"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>

            {/* Body */}
            <div className="offcanvas-body modern-cat-body p-0">
                <div className="d-flex flex-column justify-content-between h-100">
                    <div className="cat-scroll-area">
                        {/* Tüm Ürünler Link Banner */}
                        <div className="all-products-banner-wrap">
                            <a
                                className="all-products-link"
                                href="/urunler/tum-urunler"
                            >
                                <div className="d-flex align-items-center gap-2">
                                    <HiOutlineSparkles size={18} className="sparkle-icon" />
                                    <span>Tüm Ürünleri Keşfet</span>
                                </div>
                                <HiChevronRight size={16} className="arrow-icon" />
                            </a>
                        </div>

                        {/* Akordeon Kategori Listesi */}
                        <div className="accordion modern-category-accordion" id="categoryAccordion">
                            {categories.map((cat) => (
                                <div className="accordion-item modern-accordion-item" key={cat.id}>
                                    <h2 className="accordion-header" id={`heading${cat.id}`}>
                                        <button
                                            className="accordion-button collapsed modern-accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse${cat.id}`}
                                            aria-expanded="false"
                                            aria-controls={`collapse${cat.id}`}
                                        >
                                            <span className="cat-name-text">{cat.name}</span>
                                            <span className="sub-count-tag">{cat.sub.length}</span>
                                        </button>
                                    </h2>
                                    <div
                                        id={`collapse${cat.id}`}
                                        className="accordion-collapse collapse"
                                        aria-labelledby={`heading${cat.id}`}
                                        data-bs-parent="#categoryAccordion"
                                    >
                                        <div className="accordion-body modern-accordion-body">
                                            <ul className="subcategory-list">
                                                {cat.sub.map((subItem, i) => (
                                                    <li key={i} className="subcategory-item">
                                                        <a
                                                            className="subcategory-link"
                                                            href={`/urunler/${subItem}`}
                                                        >
                                                            <span>{subItem}</span>
                                                            <HiChevronRight size={13} className="sub-arrow" />
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Logo & Footer Marka Alanı */}
                    <div className="cat-footer-logo-wrap">
                        <PageLogo size="25" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;
