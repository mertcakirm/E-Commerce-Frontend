import React, { useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie, deleteCookie } from "../cookie/cookie"; // Çerez fonksiyonlarını ekliyoruz
import { profilGuncelle,profilGetir } from "./api/profilbilgilerimapi";
import { NotificationCard, showNotification } from '../childcomponents/notification';

const Profilechild = () => {
  const token = getCookie("token"); 
  const BASE_URL = 'http://213.142.159.49:8083/api';
  const notificationRef = useRef(null);

  const updateProfile = async () => {
    const userDTO1 = {
      nameSurname: document.getElementById('bilgilerim-isim').value,
      phoneNumber: document.getElementById('bilgilerim-tel').value
    };
  
    const changePasswordDTO1 = {
      password: document.getElementById('bilgilerim-password').value,
      confirmPassword: document.getElementById('bilgilerim-confirm').value
    };

    const formData = new FormData();
    formData.append('UserDTO', new Blob([JSON.stringify(userDTO1)], { type: 'application/json' }));
    formData.append('ChangePasswordDTO', new Blob([JSON.stringify(changePasswordDTO1)], { type: 'application/json' }));
    
    try{
      profilGuncelle(formData)
      showNotification(notificationRef, 'Profil bilgilerin başarıyla güncellendi!');
    }catch{
      showNotification(notificationRef, 'Profil bilgilerin güncellenemedi!');
    }
  };

  const navigate = useNavigate();

  const cikisyap = () => {
    deleteCookie("token"); // Çerezden token'ı siliyoruz
    navigate('/girisyap');
  };

  useEffect(() => {
    const loadProfile = async () => {
      const data = await profilGetir();
      if (data) {
        document.getElementById('bilgilerim-isim').value = data.nameSurname;
        document.getElementById('bilgilerim-tel').value = data.phoneNumber;
      }
    };

    if (token) {
      loadProfile();
    }
  }, [token]);
    
    return (

                <form className="row">
                  <div className="col-12 text-center profil-pills-content-baslik">
                    BİLGİLERİM
                  </div>
                  <div className="col-lg-6 profilim-column">
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="bilgilerim-isim">Ad Soyad</label>
                      </div>
                      <div className="col-lg-8">
                        <input
                          type="text"
                          id="bilgilerim-isim"
                          className="profilim-inputs"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="bilgilerim-tel">Telefon Numaranız</label>
                      </div>
                      <div className="col-lg-8">
                        <input
                          type="tel"
                          id="bilgilerim-tel"
                          className="profilim-inputs"
                        />
                      </div>
                    </div>
                    <div>
                      <button type="button" onClick={cikisyap} id="cikis-btn">Çıkış Yap</button>
                    </div>
                  </div>
                  <div className="col-lg-6 profilim-column">
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="bilgilerim-password">Şifreniz</label>
                      </div>
                      <div className="col-lg-8">
                        <input
                          type="password"
                          id="bilgilerim-password"
                          className="profilim-inputs"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="bilgilerim-confirm">Şifreniz Tekrar</label>
                      </div>
                      <div className="col-lg-8">
                        <input
                          type="password"
                          id="bilgilerim-confirm"
                          className="profilim-inputs"
                        />
                      </div>
                    </div>
                    <div>
                      <button onClick={()=>window.location.href="../iletisim"} type="button" id="uyeligi-sil-btn">Üyeliğimi Sil</button>
                    </div>
                  </div>
                  <div className="col-12 guncelle-flex">
                    <button type="button" id="bilgileri-guncelle-btn-profile" onClick={updateProfile}>
                      Bilgilerimi Güncelle
                    </button>
                  </div>
                  <div>
                    <NotificationCard ref={notificationRef} message="" />
                  </div>
                </form>
                
    )
  }


export default Profilechild;