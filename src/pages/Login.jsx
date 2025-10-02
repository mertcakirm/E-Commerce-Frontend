import { useState, useEffect } from "react";
import "./css/Login.css";
import {toast} from "react-toastify";
import {LoginRequest, RegisterRequest} from "../API/AuthApi.js";


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
    window.$("#phone").mask("0 (999) 999-9999");
    window.$("#registerEmail").on("input", function () {
      const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      this.setCustomValidity(
          !pattern.test(this.value) ? "Geçerli bir e-posta adresi girin." : ""
      );
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

  const handleRegister = async () => {
    if (!formData.kvkk) {
      toast.error("KVKK şartlarını kabul etmelisiniz!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Parolalar eşleşmiyor!")
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
    await RegisterRequest(registerDTO);
  };

  const handleLogin = async () => {
    const loginDTO = {
      email: loginData.email,
      password: loginData.passwordLogin,
    };
    try {
      await LoginRequest(loginDTO);
      toast.success("Giriş başarılı!");
      window.location.href = "/";
    }catch (error) {
      console.log(error);
      toast.error("Giriş yapılamadı.Lütfen bilgilerinizi gözden geçirin!")
    }

  };
  return (
      <div>
        <div className="container-fluid giris-container">
          <div className="row justify-content-center p-0 m-0 col-12">
            <div className="col-lg-7 p-0">
              <img
                  src="https://images.pexels.com/photos/3778704/pexels-photo-3778704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="img-fluid w-100 giris-bg"
                  alt=""
              />
            </div>
            <div className="col-lg-5 col-12 py-5 m-0 justify-content-between forms-page d-flex flex-column align-items-center ">
              <div></div>
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
                            placeholder="Parola"
                            id="passwordLogin"
                            value={loginData.passwordLogin}
                            onChange={handleLoginChange}
                        />
                        <label htmlFor="passwordLogin">Parola</label>
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
                              id="kvkk"
                              checked={formData.kvkk}
                              onChange={handleChange}
                          />
                          <label htmlFor="kvkk">
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

              <div className="d-flex justify-content-center">
                <a href="/">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z"/></svg>
                </a>
              </div>

            </div>
          </div>
          </div>
      </div>
  );
};

export default Login;