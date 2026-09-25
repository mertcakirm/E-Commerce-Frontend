import { useState } from "react";
import "./css/Contacts.css";
import { toast } from "react-toastify";
import { MessageSendRequest } from "../API/MessageApi.js";
import { getCookie } from "../components/cookie/cookie.js";
import { 
    HiOutlineEnvelope, 
    HiOutlineMapPin, 
    HiOutlineClock, 
    HiOutlinePaperAirplane,
    HiOutlineChatBubbleLeftRight
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    messageTitle: "",
    messageText: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const token = getCookie("token");

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!formData.messageTitle.trim() || !formData.messageText.trim()) {
      toast.error("Lütfen konu ve mesaj alanını doldurunuz.");
      return;
    }

    if (!token) {
      toast.error("Mesaj gönderebilmek için lütfen giriş yapınız!");
      return;
    }

    setSubmitting(true);
    try {
      await MessageSendRequest(formData);
      toast.success("Mesajınız ekibimize ulaştı. En kısa sürede dönüş yapılacaktır.");
      setFormData({ messageTitle: "", messageText: "" });
    } catch (err) {
      console.error(err);
      toast.error("Mesaj iletilirken bir hata oluştu.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page-wrapper">
      <div className="container contact-main-container">
        
        {/* Başlık Alanı */}
        <div className="contact-header-block text-center" data-aos="fade-up">
          <span className="contact-tagline">Bize Ulaşın</span>
          <h1 className="contact-main-heading">İletişim & Destek</h1>
          <p className="contact-lead-desc">
            Siparişleriniz, ürünlerimiz veya iş birlikleri hakkında sormak istediklerinizi bize iletin.
          </p>
        </div>

        {/* İki Sütunlu Grid */}
        <div className="row g-4 g-xl-5 contact-grid-row" data-aos="fade-up">
          
          {/* Sol: İletişim Bilgileri Kartı */}
          <div className="col-lg-5">
            <div className="contact-info-card">
              <h2 className="info-card-title">Müşteri Deneyimi</h2>
              <p className="info-card-text">
                Ekibimiz sorularınızı en geç 24 saat içinde yanıtlamaktadır.
              </p>

              <div className="info-items-stack">
                <a href="mailto:destek@markaniz.com" className="info-item-link">
                  <div className="info-icon-box">
                    <HiOutlineEnvelope size={20} />
                  </div>
                  <div>
                    <span className="info-label">E-Posta</span>
                    <p className="info-val">destek@markaniz.com</p>
                  </div>
                </a>

                <a href="https://wa.me/905000000000" target="_blank" rel="noreferrer" className="info-item-link">
                  <div className="info-icon-box">
                    <FaWhatsapp size={20} />
                  </div>
                  <div>
                    <span className="info-label">WhatsApp Destek</span>
                    <p className="info-val">+90 (500) 000 00 00</p>
                  </div>
                </a>

                <div className="info-item-static">
                  <div className="info-icon-box">
                    <HiOutlineClock size={20} />
                  </div>
                  <div>
                    <span className="info-label">Çalışma Saatleri</span>
                    <p className="info-val">Pazartesi – Cuma: 09:00 - 18:00</p>
                  </div>
                </div>

                <div className="info-item-static">
                  <div className="info-icon-box">
                    <HiOutlineMapPin size={20} />
                  </div>
                  <div>
                    <span className="info-label">Ofis / Showroom</span>
                    <p className="info-val">Merkez Mah. Moda Caddesi No: 42, İstanbul</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ: Mesaj Gönderme Formu */}
          <div className="col-lg-7">
            <div className="contact-form-card">
              <div className="d-flex align-items-center gap-2 mb-4">
                <HiOutlineChatBubbleLeftRight size={22} className="text-dark" />
                <h3 className="form-card-title">Mesaj Bırakın</h3>
              </div>

              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <div className="form-group-wrap">
                  <label htmlFor="konu">Mesaj Konusu</label>
                  <input
                    type="text"
                    id="konu"
                    className="modern-contact-input"
                    placeholder="Örn: Siparişim hakkında, Ürün önerisi..."
                    value={formData.messageTitle}
                    onChange={(e) => setFormData({ ...formData, messageTitle: e.target.value })}
                  />
                </div>

                <div className="form-group-wrap">
                  <label htmlFor="mesajiniz">Mesajınız</label>
                  <textarea
                    id="mesajiniz"
                    className="modern-contact-textarea"
                    rows={6}
                    placeholder="Detaylı olarak nasıl yardımcı olabileceğimizi açıklayın..."
                    value={formData.messageText}
                    onChange={(e) => setFormData({ ...formData, messageText: e.target.value })}
                  ></textarea>
                </div>

                {!token && (
                  <p className="auth-notice-text">
                    * Mesajınızı iletebilmek için oturum açmış olmanız gerekmektedir.
                  </p>
                )}

                <button
                  type="submit"
                  className="modern-contact-submit-btn"
                  disabled={submitting}
                >
                  <span>{submitting ? "Gönderiliyor..." : "Mesajı Gönder"}</span>
                  <HiOutlinePaperAirplane size={17} />
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
