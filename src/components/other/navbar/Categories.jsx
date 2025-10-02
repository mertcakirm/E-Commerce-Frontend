import React, { useState } from "react";
import "../css/Categories.css";
import PageLogo from "../PageLogo.jsx";

const Categories = () => {
    const categories = [
        {
            id: 1,
            name: "Erkek Giyim",
            sub: ["Tişört", "Pantolon", "Ceket"],
        },
        {
            id: 2,
            name: "Kadın Giyim",
            sub: ["Elbise", "Bluz", "Etek"],
        },
        {
            id: 3,
            name: "Aksesuar",
            sub: ["Çanta", "Saat", "Kemer"],
        },
    ];

    return (
        <div
            className="offcanvas offcanvas-start custom-offcanvas"
            data-bs-backdrop="static"
            tabIndex="-1"
            id="staticBackdrop"
            aria-labelledby="staticBackdropLabel"
        >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title">Kategoriler</h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>

            <div className="offcanvas-body ">
                <div className="d-flex flex-column justify-content-between h-100">
                    <div>
                        <a className="text-decoration-none text-black fs-4 fw-medium p-3" href="/urunler/tum-urunler">Tüm Ürünler</a>
                        <div className="accordion mt-3 " id="categoryAccordion">
                            {categories.map((cat) => (
                                <div className="accordion-item w-100 border-0"  key={cat.id}>
                                    <h2 className="accordion-header" style={{borderTop:'1px solid #cccccc'}} id={`heading${cat.id}`}>
                                        <button
                                            className="accordion-button collapsed fs-4 fw-medium"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse${cat.id}`}
                                            aria-expanded="false"
                                            aria-controls={`collapse${cat.id}`}
                                        >
                                            {cat.name}
                                        </button>
                                    </h2>
                                    <div
                                        id={`collapse${cat.id}`}
                                        className="accordion-collapse collapse"
                                        aria-labelledby={`heading${cat.id}`}
                                        data-bs-parent="#categoryAccordion"
                                    >
                                        <div className="accordion-body">
                                            <ul className="subcategory-list">
                                                {cat.sub.map((subItem, i) => (
                                                    <li key={i} className="subcategory-item">
                                                        {subItem}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <PageLogo size="25" />

                </div>

            </div>
        </div>
    );
};

export default Categories;