import React, { Component, useEffect, useState } from "react";
import Navbar from "../components/childcomponents/navbar";
import Footer from "../components/childcomponents/footer";
import { Helmet } from "react-helmet";
import "./css/profile.css";
import Profilechild from "../components/profile/profilechild";
import Profil_adreslerim from "../components/profile/profil-adreslerim";
import Profil_siparisler from "../components/profile/profil-siparisler";
import Profil_kampanyalar from "../components/profile/profil-kampanyalar";

const Profile = () => {
  return (
    <div>
      <Helmet>
        <title>Profilim</title>
        <meta name="description" content="Mob Wear olarak yeni modaya hitap ediyor ve buna göre ürünleri sizler için üretiyoruz." />
        <meta name="keywords" content="tişört,pantolon,giyim,moda,erkek giyim" />
        <meta name="author" content="MOB WEAR" />
        <meta property="og:title" content="Kaliteli Kıyafetler" />
        <meta property="og:description" content="Mob Wear olarak yeni modaya hitap ediyor ve buna göre ürünleri sizler için üretiyoruz." />
        <meta property="og:image" content="URL_of_image" />
        <meta property="og:url" content="URL_of_your_website" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
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
              <Profilechild />
              
              </div>
              <div
                className="tab-pane fade row"
                id="pills-adreslerim"
                role="tabpanel"
                aria-labelledby="pills-adreslerim-tab"
                tabIndex="0"
              >
                <Profil_adreslerim />

              </div>
              <div
                className="tab-pane fade"
                id="pills-kampanyalarim"
                role="tabpanel"
                aria-labelledby="pills-kampanyalarim-tab"
                tabIndex="0"
              >
                <Profil_kampanyalar />
              </div>
              <div
                className="tab-pane fade"
                id="pills-siparislerim"
                role="tabpanel"
                aria-labelledby="pills-siparislerim-tab"
                tabIndex="0"
              >
                <Profil_siparisler />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
