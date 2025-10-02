import { useEffect } from "react";
import "./css/Contacts.css";

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
