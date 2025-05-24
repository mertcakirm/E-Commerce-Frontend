import { useState, useEffect } from "react";
import Navbar from "../components/childcomponents/navbar";
import "./css/giris.css";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import {LoginRequest, RegisterRequest} from "../API/AuthApi.js";


const Giris = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    consent: false,
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isLoginForm, setIsLoginForm] = useState(true);

  useEffect(() => {
    window.$("#phone").mask("0 (999) 999-9999");
    window.$("#email").on("input", function () {
      const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!pattern.test(this.value)) {
        this.setCustomValidity("Geçerli bir e-posta adresi girin.");
        toast.error("Geçerli bir e-posta adresi girin.")
      } else {
        this.setCustomValidity("");
      }
    });
  }, []);

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

  const handleRegister = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Parolalar eşleşmiyor!")
      return;
    }
    const cleanString = (str) => str.replace(/\s+/g, "").replace(/[-()]/g, "");

    const registerDTO = {
      nameSurname: formData.name,
      phoneNumber: cleanString(formData.phone),
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      acceptEmails: formData.consent,
    };
    RegisterRequest(registerDTO);
  };

  const handleLogin = async () => {
    const loginDTO = {
      email: loginData.email,
      password: loginData.password,
    };
    try {
      await LoginRequest(loginDTO, navigate);
      toast.success("Giriş başarılı!");

    }catch (error) {
      console.log(error);
      toast.error("Giriş yapılamadı.Lütfen bilgilerinizi gözden geçirin!")
    }

  };
  return (
      <div>
        <Helmet>
          <title>Giriş Yap</title>
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
        <div className="container-fluid giris-container">
          <div className="row justify-content-center p-0 m-0 col-12">
            <div className="col-lg-7 p-0">
              <img
                  src="https://images.pexels.com/photos/3778704/pexels-photo-3778704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="img-fluid w-100 giris-bg"
                  alt=""
              />
            </div>
            <div className="col-lg-5 col-12 p-0 m-0 justify-content-center forms-page row align-items-center">
              <div className="row col-lg-10 col-12 justify-content-center">
                {isLoginForm ? (
                    <div className="login-form" >
                      <p className="login-form-baslik">Giriş Yap</p>
                      <div className="form-floating">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Leave a comment here"
                            id="email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                        />
                        <label htmlFor="email">E-Posta Adresi</label>
                      </div>
                      <div className="form-floating">
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Leave a comment here"
                            id="password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                        />
                        <label htmlFor="password">Parola</label>
                      </div>

                      <button
                          className="giris-yap-btn"
                          type="button"
                          onClick={handleLogin}
                      >
                        Giriş Yap
                      </button>
                      <div className="kayit-giris-gecis-btn">
                        Hesabın yok mu? Hemen{" "}
                        <button type="button" style={{cursor:'pointer'}} onClick={()=>setIsLoginForm(false)}>
                          Kayıt Ol
                        </button>
                      </div>
                    </div>

                ) : (
                    <div className="login-form">
                      <p className="login-form-baslik">Kayıt Ol</p>
                      <div className="form-floating">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Leave a comment here"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <label htmlFor="name">Ad Soyad</label>
                      </div>
                      <div className="form-floating">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Leave a comment here"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <label htmlFor="phone">Telefon</label>
                      </div>
                      <div className="form-floating">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Leave a comment here"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="email">E-Posta Adresi</label>
                      </div>
                      <div className="form-floating">
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Leave a comment here"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <label htmlFor="password">Parola</label>
                      </div>
                      <div className="form-floating">
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Leave a comment here"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <label htmlFor="confirmPassword">Parola Tekrar</label>
                      </div>
                      <div className="giris-check">
                        <div>
                          <input
                              style={{ marginRight: "5px" }}
                              type="checkbox"
                              id="consent"
                              checked={formData.consent}
                              onChange={handleChange}
                          />
                          <label htmlFor="consent">
                            Kampanyalardan haberdar olmak istiyorum
                          </label>
                        </div>
                        <div>
                          <input
                              style={{ marginRight: "5px" }}
                              type="checkbox"
                              id="consent"
                              checked={formData.consent}
                              onChange={handleChange}
                          />
                          <label htmlFor="consent">
                            KVKK Şartlarını Kabul Ediyorum
                          </label>
                        </div>
                      </div>
                      <button
                          className="giris-yap-btn"
                          type="button"
                          onClick={handleRegister}
                      >
                        Kayıt Ol
                      </button>
                      <div className="kayit-giris-gecis-btn">
                        Zaten bir hesabın var mı?{" "}
                        <button type="button" style={{cursor:'pointer'}} onClick={()=>setIsLoginForm(true)}>
                          Giriş Yap
                        </button>
                      </div>
                    </div>
                )}
              </div>
            </div>
          </div>
          </div>
      </div>
  );
};

export default Giris;