import { useEffect, useState } from "react";
import "./css/Contacts.css";
import {toast} from "react-toastify";
import {MessageSendRequest} from "../API/MessageApi.js";
import {getCookie} from "../components/cookie/cookie.js";

const Contact = () => {
  const [formData, setFormData] = useState({
    messageTitle: "",
    messageText: ""
  });
  const token = getCookie("token");

  useEffect(() => {
    window.$("#telefon").mask("(999) 999-9999");
    window.$("#eposta").on("input", function () {
      const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      this.setCustomValidity(pattern.test(this.value) ? "" : "Geçerli bir e-posta adresi girin.");
    });
  }, []);

  const handleSubmit = async () => {
    if (!formData.messageTitle || !formData.messageText) {
      toast.error("Lütfen tüm alanları doldurun")
      return;
    }

    if (!token || token==="" || token == null){
      toast.error("Lütfen giriş yapınız!")
      return;
    }

    try {
      const res = await MessageSendRequest(formData);
      console.log(res)

      toast.success("Mesajınız başarıyla gönderildi!");
      setFormData({ messageTitle: "", messageText: "" });

    } catch (err) {
      console.error(err);
      toast.error("Mesaj gönderilemedi!");
    }
  };

  return (
      <div>
        <div className="container iletisim-container">
          <div className="d-flex  flex-column">
            <div className="w-100 mt-5">
              <p className="hakkimizda-baslik">İLETİŞİM</p>
              <div>
                <div className="d-flex flex-column gap-3 iletisim-row">
                  <div className="w-100">
                    <input
                        style={{ paddingLeft: "1%"}}
                        type="text"
                        className="adres-input"
                        placeholder="Konu"
                        id="konu"
                        value={formData.messageTitle}
                        onChange={(e) => setFormData({ ...formData, messageTitle: e.target.value })}
                    />
                  </div>
                  <div className="w-100">
                  <textarea
                      style={{ paddingLeft: "1%", height: "150px" }}
                      name="mesajiniz"
                      id="mesajiniz"
                      placeholder="Mesajınız"
                      value={formData.messageText}
                      onChange={(e) => setFormData({ ...formData, messageText: e.target.value })}
                  ></textarea>
                  </div>
                </div>
                <div className="iletisim-form-submit">
                  <button onClick={handleSubmit}>GÖNDER</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Contact;