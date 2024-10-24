import React, { useState, useEffect } from "react";
import Navbar from "../components/childcomponents/navbar";
import Footer from "../components/childcomponents/footer";
import "./css/giris.css";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Register, Login } from "./api/giris";


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
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    window.$("#phone").mask("0 (999) 999-9999");

    // E-posta için doğrulama
    window.$("#email").on("input", function () {
      const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!pattern.test(this.value)) {
        this.setCustomValidity("Geçerli bir e-posta adresi girin.");
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

  const kayit_gecis = () => {
    const register = document.getElementById("register-form");
    register.style.display = "flex";
    const login = document.getElementById("login-form");
    login.style.display = "none";
  };

  const giris_gecis = () => {
    const register = document.getElementById("register-form");
    register.style.display = "none";
    const login = document.getElementById("login-form");
    login.style.display = "flex";
  };

  const handleRegister = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Parolalar eşleşmiyor!");
      return;
    }

    const registerDTO = {
      nameSurname: formData.name,
      phoneNumber: formData.phone,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      acceptEmails: formData.consent,
    };

    Register(registerDTO);
  };

  const handleLogin = async () => {
    const loginDTO = {
      email: loginData.email,
      password: loginData.password,
    };

    Login(loginData, navigate, setErrorMessage);
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
        <img
          src="https://images.pexels.com/photos/3778704/pexels-photo-3778704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="img-fluid w-100 giris-bg"
          alt=""
        />
        <div className="row justify-content-center giris-row">
          <div className="col-lg-8 ">
            <div className="login-card">
              <form id="login-form" action="#" style={{ display: "flex" }}>
                <p className="login-form-baslik">Giriş Yap</p>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
                <div className="giris-check">
                  <div>
                    {/* <input
                      style={{ marginRight: "5px" }}
                      type="checkbox"
                      id="beni-hatirla"
                      name="beni-hatirla"
                    />
                    <label htmlFor="beni-hatirla">Beni Hatırla</label> */}
                  </div>
                  <a style={{ color: "#000" }} href="/parola-yenile">
                    Şifremi Unuttum
                  </a>
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
                  <button type="button" onClick={kayit_gecis}>
                    Kayıt Ol
                  </button>
                </div>
              </form>
              <form id="register-form" action="#" style={{ display: "none" }}>
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
                  <button type="button" onClick={giris_gecis}>
                    Giriş Yap
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Giris;
