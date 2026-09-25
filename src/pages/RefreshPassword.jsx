import "./css/Login.css";
import { HiOutlineKey, HiOutlineEnvelope } from "react-icons/hi2";

const Parola_yenile = () => {
  return (
    <div className="login-screen-wrapper d-flex align-items-center justify-content-center">
      <div className="container parola-yenile-container">
        
        <div className="parola-yenile-card" data-aos="fade-up">
          <div className="parola-icon-box">
            <HiOutlineKey size={28} />
          </div>
          
          <h2 className="parola-baslik">Parolanızı mı Unuttunuz?</h2>
          <p className="parola-aciklama">
            Hesabınıza kayıtlı e-posta adresinizi girin. Size parolanızı sıfırlayabilmeniz için güvenli bir bağlantı göndereceğiz.
          </p>

          <form className="parola-yenile-flex" onSubmit={(e) => e.preventDefault()}>
            <div className="parola-input-group">
              <HiOutlineEnvelope className="parola-input-icon" size={20} />
              <input
                type="email"
                name="parola-yenile-inp"
                id="parola-yenile-inp"
                placeholder="E-Posta adresiniz"
                required
              />
            </div>
            
            <button type="submit" className="e-posta-gonder">
              Sıfırlama Bağlantısı Gönder
            </button>
          </form>

          <div className="parola-alt-link">
            <a href="/girisyap">Giriş ekranına geri dön</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Parola_yenile;
