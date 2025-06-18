import { useEffect } from "react";
import "./css/Contacts.css";
import { Helmet } from "react-helmet";

const Contact = () => {
  useEffect(() => {
    window.$("#telefon").mask("(999) 999-9999"); 

    window.$("#eposta").on("input", function () {
      const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!pattern.test(this.value)) {
        this.setCustomValidity("Geçerli bir e-posta adresi girin.");
      } else {
        this.setCustomValidity("");
      }
    });
  }, []);

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
      <div className="container iletisim-container">
        <div className="row iletisim-row-parent">
          <div className="col-12">
            <p className="hakkimizda-baslik">İLETİŞİM</p>
            <div>
              <div className="row iletisim-row">
                <div className="col-12">
                  <input
                    type="text"
                    className="adres-input"
                    placeholder="Ad Soyad"
                    id="adsoyad"
                  />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    className="adres-input"
                    placeholder="E-Posta Adresiniz"
                    id="eposta"
                  />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    className="adres-input"
                    placeholder="Telefon Numaranız"
                    id="telefon"
                  />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    className="adres-input"
                    placeholder="Konu"
                    id="konu"
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
                <button>GÖNDER</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
