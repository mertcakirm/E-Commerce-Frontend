import logo from "../../../assets/mob_logo.png";
import { FiSearch } from "react-icons/fi";
import { HiXMark } from "react-icons/hi2";

const Search = () => {
    return (
        <div
            className="offcanvas offcanvas-top modern-search-offcanvas"
            tabIndex="-1"
            id="offcanvasTop"
            aria-labelledby="offcanvasTopLabel2"
        >
            <div className="modern-search-wrapper">
                {/* Üst Bar: Logo ve Kapat Butonu */}
                <div className="modern-search-header">
                    <img src={logo} className="modern-search-logo top-canvas-logo" alt="Logo" />
                    <button
                        type="button"
                        className="modern-search-close btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    >
                        <HiXMark size={22} />
                    </button>
                </div>

                {/* Arama Alanı */}
                <div className="modern-search-body offcanvas-body-top">
                    <div className="search-container modern-spotlight-input-box">
                        <button type="button" className="search-button modern-spotlight-btn" aria-label="Ara">
                            <FiSearch size={22} />
                        </button>
                        <input
                            type="text"
                            className="form-control modern-spotlight-input"
                            placeholder="Ürün, kategori veya koleksiyon ara..."
                            aria-label="Search"
                            autoFocus
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
