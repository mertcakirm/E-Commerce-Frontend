import {Helmet} from "react-helmet";
import "./css/Profile.css";
import ProfileInfo from "../components/profile/ProfileInfo.jsx";
import ProfileAdresses from "../components/profile/ProfileAddress.jsx";
import ProfileOrders from "../components/profile/ProfileOrders.jsx";
import ProfileOffer from "../components/profile/ProfileOffer.jsx";

const Profile = () => {
    return (
        <div>
            <Helmet>
                <title>Profilim</title>
                <meta name="description"
                      content="Mob Wear olarak yeni modaya hitap ediyor ve buna göre ürünleri sizler için üretiyoruz."/>
                <meta name="keywords" content="tişört,pantolon,giyim,moda,erkek giyim"/>
                <meta name="author" content="MOB WEAR"/>
                <meta property="og:title" content="Kaliteli Kıyafetler"/>
                <meta property="og:description"
                      content="Mob Wear olarak yeni modaya hitap ediyor ve buna göre ürünleri sizler için üretiyoruz."/>
                <meta property="og:image" content="URL_of_image"/>
                <meta property="og:url" content="URL_of_your_website"/>
                <meta property="og:type" content="website"/>
            </Helmet>

            <div className="container-fluid profile-container">
                <div className="row">
                    <div className="col-lg-12">
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
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
                                    Bilgilerim
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
                                    Adreslerim
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
                                    Kampanyalarım
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
                                    Siparişlerim
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content tab-content2" id="pills-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="pills-bilgilerim"
                                role="tabpanel"
                                aria-labelledby="pills-bilgilerim-tab"
                                tabIndex="0"
                            >
                                <ProfileInfo/>

                            </div>
                            <div
                                className="tab-pane fade row"
                                id="pills-adreslerim"
                                role="tabpanel"
                                aria-labelledby="pills-adreslerim-tab"
                                tabIndex="0"
                            >
                                <ProfileAdresses/>

                            </div>
                            <div
                                className="tab-pane fade"
                                id="pills-kampanyalarim"
                                role="tabpanel"
                                aria-labelledby="pills-kampanyalarim-tab"
                                tabIndex="0"
                            >
                                <ProfileOffer/>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="pills-siparislerim"
                                role="tabpanel"
                                aria-labelledby="pills-siparislerim-tab"
                                tabIndex="0"
                            >
                                <ProfileOrders/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
