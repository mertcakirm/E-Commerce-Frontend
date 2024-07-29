import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import './css/giris.css';

const Giris = () => {
  const kayit_gecis = () => {
    const register = document.getElementById('register-form');
    register.style.display = 'flex';
    const login = document.getElementById('login-form');
    login.style.display = 'none';
  };

  const giris_gecis = () => {
    const register = document.getElementById('register-form');
    register.style.display = 'none';
    const login = document.getElementById('login-form');
    login.style.display = 'flex';
  };

  return (
    <div>
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
              <form id="login-form" action="#" style={{ display: 'flex' }}>
                <p className="login-form-baslik">Giriş Yap</p>
                <div className="form-floating">
                  <input className="form-control" type="text" placeholder="Leave a comment here" id="giris-mail" />
                  <label htmlFor="giris-mail">E-Posta Adresi</label>
                </div>
                <div className="form-floating">
                  <input className="form-control" type="password" placeholder="Leave a comment here" id="floatingTextarea2" />
                  <label htmlFor="floatingTextarea2">Parola</label>
                </div>
                <div className="giris-check">
                  <div>
                    <input style={{marginRight:'5px'}} type="checkbox" id='beni-hatirla' name='beni-hatirla' /><label htmlFor="beni-hatirla">Beni Hatırla</label>
                  </div>
                  <a style={{color:'#000'}} href="/parola-yenile">Şifremi Unuttum</a>
                </div>
                <button className="giris-yap-btn" type="button">Giriş Yap</button>
                <div className="kayit-giris-gecis-btn">
                  Hesabın yok mu? Hemen{' '}
                  <button type="button" onClick={kayit_gecis}>Kayıt Ol</button>
                </div>
              </form>
              <form id="register-form" action="#" style={{ display: 'none' }}>
                <p className="login-form-baslik">Kayıt Ol</p>
                <div className="form-floating">
                  <input className="form-control" type="text" placeholder="Leave a comment here" id="kayit-isim" />
                  <label htmlFor="kayit-isim">Ad Soyad</label>
                </div>
                <div className="form-floating">
                  <input className="form-control" type="text" placeholder="Leave a comment here" id="kayit-tel" />
                  <label htmlFor="kayit-tel">Telefon Numarası</label>
                </div>
                <div className="form-floating">
                  <input className="form-control" type="text" placeholder="Leave a comment here" id="kayit-mail" />
                  <label htmlFor="kayit-mail">E-Posta Adresi</label>
                </div>
                <div className="form-floating">
                  <input className="form-control" type="password" placeholder="Leave a comment here" id="kayit-password" />
                  <label htmlFor="kayit-password">Parola</label>
                </div>
                <div className="form-floating">
                  <input className="form-control" type="password" placeholder="Leave a comment here" id="kayit-password-confirm" />
                  <label htmlFor="kayit-password-confirm">Parola Tekrar</label>
                </div>
                <div className="kayit-check">
                  <div className='kayit-check-flex'>
                  <input style={{marginRight:'5px'}} type="checkbox" id='kosullar-check' name='kosullar-check' /><label htmlFor="kosullar-check"> Kişisel Verilere İlişkin Aydınlatma Metni doğrultusunda Gizlilik ve Çerez Politikası, Kullanım Koşulları ve Kişisel Verilere İlişkin Beyan ve Rıza Onay Metni'ni okudum, onaylıyorum.</label>
                  </div>
                  <div className='kayit-check-flex'>
                  <input style={{marginRight:'5px'}} type="checkbox" id='e-posta-bildirim-check' name='e-posta-bildirim-check' /><label htmlFor="e-posta-bildirim-check">Kampanyalar hakkında e-posta almak istiyorum</label>
                  </div>
                </div>
                <button className="giris-yap-btn" type="button">Kayıt Ol</button>
                <div className="kayit-giris-gecis-btn">
                  Hesabın var mı? Hemen{' '}
                  <button type="button" onClick={giris_gecis}>Giriş Yap</button>
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
