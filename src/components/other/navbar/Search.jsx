import logo from "../../../assets/mob_logo.png";

const Search = () => {
    return (
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
    );
};

export default Search;