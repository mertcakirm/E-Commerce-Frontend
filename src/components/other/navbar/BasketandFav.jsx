import logo from "../../../assets/mob_logo.png";
import Basket from "./Basket.jsx";
import Favorite from "./Favorite.jsx";

const BasketandFavorite = () => {
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

                        <Basket />
                        <Favorite />

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
                    <img src={logo} className="img-fluid top-canvas-logo" alt=""/>
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
                                <circle cx="10.5" cy="10.5" r="7.5"/>
                                <line x1="21" y1="21" x2="15.8" y2="15.8"/>
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

export default BasketandFavorite;