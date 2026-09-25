import "./css/Profile.css";
import ProfileInfo from "../components/profile/ProfileInfo.jsx";
import ProfileAdresses from "../components/profile/ProfileAddress.jsx";
import ProfileOrders from "../components/profile/ProfileOrders.jsx";
import ProfileOffer from "../components/profile/ProfileOffer.jsx";
import { IoPersonOutline, IoMapOutline, IoPricetagOutline, IoBagCheckOutline } from "react-icons/io5";

const Profile = () => {
    return (
        <div className="container profile-container" data-aos="fade-up">
            <div className="row justify-content-center">
                <div className="col-12 col-xl-10">
                    {/* Modern Pill Navigasyonu */}
                    <div className="profile-tabs-wrapper">
                        <ul className="nav nav-pills profile-nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link active"
                                    id="pills-bilgilerim-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-bilgilerim"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-bilgilerim"
                                    aria-selected="true"
                                >
                                    <IoPersonOutline size={18} />
                                    <span>Bilgilerim</span>
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="pills-adreslerim-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-adreslerim"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-adreslerim"
                                    aria-selected="false"
                                >
                                    <IoMapOutline size={18} />
                                    <span>Adreslerim</span>
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="pills-kampanyalarim-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-kampanyalarim"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-kampanyalarim"
                                    aria-selected="false"
                                >
                                    <IoPricetagOutline size={18} />
                                    <span>Kampanyalarım</span>
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="pills-siparislerim-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-siparislerim"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-siparislerim"
                                    aria-selected="false"
                                >
                                    <IoBagCheckOutline size={18} />
                                    <span>Siparişlerim</span>
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Tab Panelleri */}
                    <div className="tab-content profile-tab-content" id="pills-tabContent">
                        <div
                            className="tab-pane fade show active"
                            id="pills-bilgilerim"
                            role="tabpanel"
                            aria-labelledby="pills-bilgilerim-tab"
                            tabIndex="0"
                        >
                            <ProfileInfo />
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-adreslerim"
                            role="tabpanel"
                            aria-labelledby="pills-adreslerim-tab"
                            tabIndex="0"
                        >
                            <ProfileAdresses />
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-kampanyalarim"
                            role="tabpanel"
                            aria-labelledby="pills-kampanyalarim-tab"
                            tabIndex="0"
                        >
                            <ProfileOffer />
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-siparislerim"
                            role="tabpanel"
                            aria-labelledby="pills-siparislerim-tab"
                            tabIndex="0"
                        >
                            <ProfileOrders />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
