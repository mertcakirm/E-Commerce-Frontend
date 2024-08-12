import React, { Component } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import "./css/iletisim.css";
import { Helmet } from "react-helmet";

const iletisim = () => {
  return (
    <div>
      <Helmet>
        <title>İletişim</title>
        <meta
          name="description"
          content="Mob Wear olarak yeni modaya hitap ediyor ve buna göre ürünleri sizler için üretiyoruz."
        />
        <meta
          name="keywords"
          content="tişört,pantolon,giyim,moda,erkek giyim"
        />
        <meta name="author" content="MOB WEAR" />
        <meta property="og:title" content="Kaliteli Kıyafetler" />
        <meta
          property="og:description"
          content="Mob Wear olarak yeni modaya hitap ediyor ve buna göre ürünleri sizler için üretiyoruz."
        />
        <meta property="og:image" content="URL_of_image" />
        <meta property="og:url" content="URL_of_your_website" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />

      <div className="container iletisim-container">
        <div className="row iletisim-row-parent">
          <div className="col-12">
            <p className="hakkimizda-baslik">İLETİŞİM</p>
            <form>
              <div className="row iletisim-row">
                <div className="col-12">
                  <input
                    type="text"
                    className="adres-input"
                    placeholder="Ad Soyad"
                  />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    className="adres-input"
                    placeholder="E-Posta Adresiniz"
                  />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    className="adres-input"
                    placeholder="Telefon Numaranız"
                  />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    className="adres-input"
                    placeholder="Konu"
                  />
                </div>
                <div className="col-12">
                  <textarea
                    style={{ paddingLeft: "1%", height: "150px" }}
                    name="mesajiniz"
                    id="mesajiniz"
                    placeholder="Mesajınız"
                  ></textarea>
                </div>
              </div>
              <div className="iletisim-form-submit">
                <button type="submit">GÖNDER</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default iletisim;
