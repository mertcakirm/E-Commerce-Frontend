import { useState, useEffect } from "react";
import "./css/Login.css";
import { toast } from "react-toastify";
import { LoginRequest, RegisterRequest } from "../API/AuthApi.js";
import { HiOutlineArrowLeft, HiOutlineCheck } from "react-icons/hi2";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    consent: false,
    kvkk: false,
  });
  const [loginData, setLoginData] = useState({
    email: "",
    passwordLogin: "",
  });
  const [isLoginForm, setIsLoginForm] = useState(true);

  useEffect(() => {
    if (window.$) {
      window.$("#phone").mask("0 (999) 999-9999");
      window.$("#registerEmail").on("input", function () {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        this.setCustomValidity(
          !pattern.test(this.value) ? "Geçerli bir e-posta adresi girin." : ""
        );
      });
    }
  }, [isLoginForm]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setLoginData({
      ...loginData,
      [id]: value,
    });
  };

  const handleRegister = async (e) => {
    if (e) e.preventDefault();

    if (!formData.kvkk) {
      toast.error("KVKK şartlarını kabul etmelisiniz!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Parolalar eşleşmiyor!");
      return;
    }
    const cleanString = (str) => str.replace(/\s+/g, "").replace(/[-()]/g, "");

    const registerDTO = {
      Username: formData.name,
      PhoneNumber: cleanString(formData.phone),
      Email: formData.email,
      Password: formData.password,
      ConfirmPassword: formData.confirmPassword,
      AcceptEmails: formData.consent,
    };
    try {
      await RegisterRequest(registerDTO);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();

    const loginDTO = {
      email: loginData.email,
      password: loginData.passwordLogin,
    };
    try {
      await LoginRequest(loginDTO);
      toast.success("Giriş başarılı!");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      toast.error("Giriş yapılamadı. Lütfen bilgilerinizi gözden geçirin!");
    }
  };

  return (
    <div className="login-screen-wrapper">
      <div className="container-fluid giris-container">
        <div className="row g-0 auth-layout-row">
          
          {/* Sol Kolon: Editorial Görsel & Marka Ambiyansı */}
          <div className="col-lg-7 d-none d-lg-block auth-visual-col">
            <img
              src="https://images.pexels.com/photos/3778704/pexels-photo-3778704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="auth-hero-img"
              alt="Moda Koleksiyonu"
            />
            <div className="auth-visual-scrim" />
            <div className="auth-brand-overlay">
              <span className="auth-brand-kicker">Yeni Sezon</span>
              <h2 className="auth-brand-title">Tarzını Özgürce Keşfet</h2>
              <p className="auth-brand-desc">
                Zamansız tasarımlar, seçkin koleksiyonlar ve sana özel ayrıcalıklar tek bir platformda.
              </p>
            </div>
          </div>

          {/* Sağ Kolon: Giriş & Kayıt Formları */}
          <div className="col-lg-5 col-12 auth-form-col">
            
            {/* Üst Navigasyon: Ana Sayfaya Dön */}
            <div className="auth-top-nav">
              <a href="/" className="auth-back-link">
                <HiOutlineArrowLeft size={18} />
                <span>Ana Sayfa</span>
              </a>
            </div>

            <div className="auth-card-body">
              {isLoginForm ? (
                /* GİRİŞ YAP FORMU */
                <form className="login-form" onSubmit={handleLogin} data-aos="fade-in">
                  <div className="auth-header-group">
                    <span className="auth-mini-tag">Hoş Geldiniz</span>
                    <h1 className="login-form-baslik">Giriş Yap</h1>
                    <p className="auth-header-sub">Hesabınıza erişmek için bilgilerinizi giriniz.</p>
                  </div>

                  <div className="auth-inputs-stack">
                    <div className="form-floating modern-floating">
                      <input
                        className="form-control"
                        type="email"
                        placeholder="E-Posta"
                        id="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        required
                      />
                      <label htmlFor="email">E-Posta Adresi</label>
                    </div>

                    <div className="form-floating modern-floating">
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Parola"
                        id="passwordLogin"
                        value={loginData.passwordLogin}
                        onChange={handleLoginChange}
                        required
                      />
                      <label htmlFor="passwordLogin">Parola</label>
                    </div>
                  </div>

                  <button className="giris-yap-btn" type="submit">
                    Giriş Yap
                  </button>

                  <div className="kayit-giris-gecis-btn">
                    <span>Hesabın yok mu?</span>
                    <button
                      type="button"
                      onClick={() => setIsLoginForm(false)}
                    >
                      Hemen Kayıt Ol
                    </button>
                  </div>
                </form>
              ) : (
                /* KAYIT OL FORMU */
                <form className="login-form" onSubmit={handleRegister} data-aos="fade-in">
                  <div className="auth-header-group">
                    <span className="auth-mini-tag">Aramıza Katılın</span>
                    <h1 className="login-form-baslik">Kayıt Ol</h1>
                    <p className="auth-header-sub">Ayrıcalıklı alışveriş dünyasına hemen adım atın.</p>
                  </div>

                  <div className="auth-inputs-stack">
                    <div className="form-floating modern-floating">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Ad Soyad"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="name">Ad Soyad</label>
                    </div>

                    <div className="form-floating modern-floating">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Telefon"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="phone">Telefon Numarası</label>
                    </div>

                    <div className="form-floating modern-floating">
                      <input
                        className="form-control"
                        type="email"
                        placeholder="E-Posta"
                        id="registerEmail"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                      <label htmlFor="registerEmail">E-Posta Adresi</label>
                    </div>

                    <div className="form-floating modern-floating">
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Parola"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="password">Parola</label>
                    </div>

                    <div className="form-floating modern-floating">
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Parola Tekrar"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="confirmPassword">Parola Tekrar</label>
                    </div>
                  </div>

                  {/* Özel Checkbox Alanı */}
                  <div className="giris-check">
                    <label className="modern-checkbox-label">
                      <input
                        type="checkbox"
                        id="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                      />
                      <span className="custom-checkmark">
                        <HiOutlineCheck size={12} />
                      </span>
                      <span className="checkbox-text">Kampanyalardan ve fırsatlardan e-posta ile haberdar olmak istiyorum</span>
                    </label>

                    <label className="modern-checkbox-label">
                      <input
                        type="checkbox"
                        id="kvkk"
                        checked={formData.kvkk}
                        onChange={handleChange}
                      />
                      <span className="custom-checkmark">
                        <HiOutlineCheck size={12} />
                      </span>
                      <span className="checkbox-text">
                        <a href="/bilgilendirmeler" target="_blank" rel="noreferrer">KVKK Şartları</a>'nı okudum, kabul ediyorum
                      </span>
                    </label>
                  </div>

                  <button className="giris-yap-btn" type="submit">
                    Kayıt Ol
                  </button>

                  <div className="kayit-giris-gecis-btn">
                    <span>Zaten hesabın var mı?</span>
                    <button
                      type="button"
                      onClick={() => setIsLoginForm(true)}
                    >
                      Giriş Yap
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Alt Güvenlik Bildirisi */}
            <div className="auth-footer-privacy">
              <span>256-bit SSL Güvenli Alışveriş Altyapısı</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
