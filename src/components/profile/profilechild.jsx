import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profilechild = () => {
    const token = localStorage.getItem("token"); 

      // profil güncelle
  const updateProfile = async () => {
    const userDTO1 = {
      nameSurname: document.getElementById('bilgilerim-isim').value,
      phoneNumber: document.getElementById('bilgilerim-tel').value
    };
  
    const changePasswordDTO1 = {
      password: document.getElementById('bilgilerim-password').value,
      confirmPassword: document.getElementById('bilgilerim-confirm').value
    };
  
    const token = localStorage.getItem('token');
  
    const formData = new FormData();
    formData.append('UserDTO', new Blob([JSON.stringify(userDTO1)], { type: 'application/json' }));
    formData.append('ChangePasswordDTO', new Blob([JSON.stringify(changePasswordDTO1)], { type: 'application/json' }));
  
    try {
      const response = await fetch('http://213.142.159.49:8083/api/user/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('User information updated:', data);
  
        if (data) { 
          localStorage.removeItem("token")
          localStorage.setItem("token",data.token)
        }
      } else {
        console.error('Failed to update profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const navigate = useNavigate();

  const cikisyap = () => {
    localStorage.removeItem("token");
    navigate('/girisyap');
  };

    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const response = await fetch('http://213.142.159.49:8083/api/user/profile', {
              method: 'GET',
              headers: {
                'Authentication': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            
            const data = await response.json();
            document.getElementById('bilgilerim-isim').value = data.nameSurname;
            document.getElementById('bilgilerim-tel').value = data.phoneNumber;
          } catch (error) {
            console.error('Error:', error);
          }
    
        };
    
        fetchProfile();
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
                      <button type="button" id="uyeligi-sil-btn">Üyeliğimi Sil</button>
                    </div>
                  </div>
                  <div className="col-12 guncelle-flex">
                    <button type="button" id="bilgileri-guncelle-btn-profile" onClick={updateProfile}>
                      Bilgilerimi Güncelle
                    </button>
                  </div>
                </form>
    )
  }


export default Profilechild;