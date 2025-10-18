import logo from "../../../assets/mob_logo.png";
import {FaSearch} from "react-icons/fa";

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
                            <FaSearch size={25} />
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