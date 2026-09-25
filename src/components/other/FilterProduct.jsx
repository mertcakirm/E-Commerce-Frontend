import { useState } from "react";
import { HiOutlineSparkles, HiOutlineArrowPath } from "react-icons/hi2";

const FilterProduct = () => {
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });

    const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "Standart"];

    const toggleSize = (size) => {
        setSelectedSizes((prev) =>
            prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
        );
    };

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setPriceRange((prev) => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setSelectedSizes([]);
        setPriceRange({ min: "", max: "" });
    };

    const handleApply = () => {
        // İlgili filtre parametreleri burada üst bileşene veya URL'e aktarılabilir
        const offcanvasEl = document.getElementById("offcanvasRight1");
        if (offcanvasEl) {
            const bsOffcanvas = window.bootstrap?.Offcanvas?.getInstance(offcanvasEl);
            bsOffcanvas?.hide();
        }
    };

    return (
        <div
            className="offcanvas offcanvas-end offcanvas-sayfa modern-filter-drawer"
            tabIndex="-1"
            id="offcanvasRight1"
            aria-labelledby="offcanvasRightLabel"
        >
            {/* Header */}
            <div className="offcanvas-header modern-filter-header">
                <div className="d-flex align-items-center gap-2">
                    <h5 className="offcanvas-title modern-filter-title" id="offcanvasRightLabel">
                        Filtrele
                    </h5>
                    {(selectedSizes.length > 0 || priceRange.min || priceRange.max) && (
                        <span className="filter-active-dot" title="Aktif filtreler var" />
                    )}
                </div>

                <div className="d-flex align-items-center gap-2">
                    <button
                        type="button"
                        className="modern-filter-reset-btn"
                        onClick={handleReset}
                        title="Filtreleri Sıfırla"
                    >
                        <HiOutlineArrowPath size={16} />
                        <span>Temizle</span>
                    </button>
                    <button
                        type="button"
                        className="btn-close shadow-none"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
            </div>

            {/* Body */}
            <div className="offcanvas-body offcanvas-body-filtre modern-filter-body">
                <div className="modern-filter-scroll-wrap">
                    <div className="accordion accordion-flush modern-filter-accordion" id="accordionFlushExample">
                        
                        {/* 1. Beden Filtresi */}
                        <div className="accordion-item modern-filter-item">
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button modern-filter-btn"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseTwo"
                                    aria-expanded="true"
                                    aria-controls="flush-collapseTwo"
                                >
                                    <span className="filter-group-title">Beden</span>
                                    {selectedSizes.length > 0 && (
                                        <span className="filter-badge-count">{selectedSizes.length}</span>
                                    )}
                                </button>
                            </h2>
                            <div
                                id="flush-collapseTwo"
                                className="accordion-collapse collapse show"
                                data-bs-parent="#accordionFlushExample"
                            >
                                <div className="accordion-body modern-filter-acc-body">
                                    <div className="modern-size-chips-grid">
                                        {availableSizes.map((size) => (
                                            <button
                                                key={size}
                                                type="button"
                                                className={`modern-filter-chip ${
                                                    selectedSizes.includes(size) ? "active" : ""
                                                }`}
                                                onClick={() => toggleSize(size)}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Fiyat Aralığı Filtresi */}
                        <div className="accordion-item modern-filter-item">
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button modern-filter-btn"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseFive"
                                    aria-expanded="true"
                                    aria-controls="flush-collapseFive"
                                >
                                    <span className="filter-group-title">Fiyat Aralığı</span>
                                    {(priceRange.min || priceRange.max) && (
                                        <span className="filter-badge-count">₺</span>
                                    )}
                                </button>
                            </h2>
                            <div
                                id="flush-collapseFive"
                                className="accordion-collapse collapse show"
                                data-bs-parent="#accordionFlushExample"
                            >
                                <div className="accordion-body modern-filter-acc-body">
                                    <div className="modern-price-inputs-row">
                                        <div className="price-input-wrapper">
                                            <label>En Az</label>
                                            <div className="price-input-box">
                                                <input
                                                    type="number"
                                                    name="min"
                                                    placeholder="0"
                                                    value={priceRange.min}
                                                    onChange={handlePriceChange}
                                                />
                                                <span>₺</span>
                                            </div>
                                        </div>

                                        <span className="price-range-sep">-</span>

                                        <div className="price-input-wrapper">
                                            <label>En Çok</label>
                                            <div className="price-input-box">
                                                <input
                                                    type="number"
                                                    name="max"
                                                    placeholder="5000"
                                                    value={priceRange.max}
                                                    onChange={handlePriceChange}
                                                />
                                                <span>₺</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hızlı Fiyat Butonları */}
                                    <div className="price-quick-tags">
                                        <button
                                            type="button"
                                            className="quick-price-tag"
                                            onClick={() => setPriceRange({ min: "0", max: "500" })}
                                        >
                                            500 ₺'ye kadar
                                        </button>
                                        <button
                                            type="button"
                                            className="quick-price-tag"
                                            onClick={() => setPriceRange({ min: "500", max: "1500" })}
                                        >
                                            500 - 1500 ₺
                                        </button>
                                        <button
                                            type="button"
                                            className="quick-price-tag"
                                            onClick={() => setPriceRange({ min: "1500", max: "" })}
                                        >
                                            1500 ₺ ve üzeri
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Alt Aksiyon Butonu */}
                <div className="modern-filter-footer">
                    <button
                        type="button"
                        className="filtreyi-uygula-btn modern-filter-submit-btn"
                        onClick={handleApply}
                    >
                        <span>Sonuçları Göster</span>
                        <HiOutlineSparkles size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterProduct;
