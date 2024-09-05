import React, { Component, useEffect, useState } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { Helmet } from "react-helmet";
import "./css/profile.css";
import kampanya from "../assets/kampanya.jpg";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [addressTitle, setAddressTitle] = useState('');
const [nameSurname, setNameSurname] = useState('');
const [email, setEmail] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
const [city, setCity] = useState('');
const [town, setTown] = useState('');
const [address, setAddress] = useState('');
const [identityNumber, setIdentityNumber] = useState('');


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
  
    // Retrieve the existing token from localStorage
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
    if (showPopup) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showPopup]);

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


// adres 




const newAddress = async () => {
  const addressDTO = {
    addressTitle: document.getElementById('adreslerim-baslik').value,
    nameSurname: document.getElementById('adreslerim-isim').value,
    email: document.getElementById('adreslerim-mail').value,
    phoneNumber: document.getElementById('adreslerim-tel').value,
    city: document.getElementById('adreslerim-il').value,
    town: document.getElementById('adreslerim-ilce').value,
    address: document.getElementById('adreslerim-adres').value,
    identityNumber: document.getElementById('adreslerim-tc').value
  };


  try {
    const response = await fetch('http://213.142.159.49:8083/api/address/add', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addressDTO)
    });

    if (response.ok) {
      const data = response;
      console.log('Address added successfully:', data);
    } else {
      console.error('Failed to add address:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  window.setTimeout(() => window.location.reload(), 1000);


};



useEffect(() => {
  const fetchAddresses = async () => {
    try {
      const response = await fetch('http://213.142.159.49:8083/api/address/all', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json(); // Parse the JSON data
      setAddresses(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchAddresses();
}, []);

const deleteAddress = async (id) => {
  try {
    const response = await fetch(`http://213.142.159.49:8083/api/address/delete/address/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete address! Status: ${response.status}`);
    }

    setAddresses(addresses.filter(address => address.id !== id));
    console.log('Address deleted successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
};
const handleOpenPopup = (address) => {
  setSelectedAddress(address);
  setAddressTitle(address.addressTitle || '');
  setNameSurname(address.nameSurname || '');
  setEmail(address.email || '');
  setPhoneNumber(address.phoneNumber || '');
  setCity(address.city || '');
  setTown(address.town || '');
  setAddress(address.address || '');
  setIdentityNumber(address.identityNumber || '');
  setShowPopup(true);
};


const updateAddress = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  const addressDTO = {
    addressTitle,
    nameSurname,
    email,
    phoneNumber,
    city,
    town,
    address,
    identityNumber,
  };

  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`http://213.142.159.49:8083/api/address/update/${selectedAddress.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addressDTO),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Address updated successfully:', data);
      setShowPopup(false); // Close the popup
      fetchAddresses(); // Refresh the address list
    } else {
      console.error('Failed to update address:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};



  return (
    <div>
      <Helmet>
        <title>Profilim</title>
        <meta name="description" content="Mob Wear olarak yeni modaya hitap ediyor ve buna göre ürünleri sizler için üretiyoruz." />
        <meta name="keywords" content="tişört,pantolon,giyim,moda,erkek giyim" />
        <meta name="author" content="MOB WEAR" />
        <meta property="og:title" content="Kaliteli Kıyafetler" />
        <meta property="og:description" content="Mob Wear olarak yeni modaya hitap ediyor ve buna göre ürünleri sizler için üretiyoruz." />
        <meta property="og:image" content="URL_of_image" />
        <meta property="og:url" content="URL_of_your_website" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <div className="container-fluid profile-container">
        <div className="row">
          <div className="col-lg-12">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-bilgilerim-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-bilgilerim"
                  type="button"
                  role="tab"
                  aria-controls="pills-bilgilerim"
                  aria-selected="true"
                >
                  Bilgilerim
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-adreslerim-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-adreslerim"
                  type="button"
                  role="tab"
                  aria-controls="pills-adreslerim"
                  aria-selected="false"
                >
                  Adreslerim
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-kampanyalarim-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-kampanyalarim"
                  type="button"
                  role="tab"
                  aria-controls="pills-kampanyalarim"
                  aria-selected="false"
                >
                  Kampanyalarım
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-siparislerim-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-siparislerim"
                  type="button"
                  role="tab"
                  aria-controls="pills-siparislerim"
                  aria-selected="false"
                >
                  Siparişlerim
                </button>
              </li>
            </ul>
            <div className="tab-content tab-content2" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-bilgilerim"
                role="tabpanel"
                aria-labelledby="pills-bilgilerim-tab"
                tabIndex="0"
              >
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
              </div>
              <div
                className="tab-pane fade row"
                id="pills-adreslerim"
                role="tabpanel"
                aria-labelledby="pills-adreslerim-tab"
                tabIndex="0"
              >
                <div className="col-12 text-center profil-pills-content-baslik adreslerim-profil-baslik">
                  ADRESLERİM
                </div>

                <div
                  className="row col-12 adres-ekle-row"
                  style={{ justifyContent: "end", textAlign: "center" }}
                >
                  <div className="col-lg-6 profilim-column">
                    <div className="profil-pills-content-altbaslik">
                      ADRES EKLE
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="adreslerim-baslik">Adres Başlığı</label>
                      </div>
                      <div className="col-lg-8">
                        <input
                          type="text"
                          id="adreslerim-baslik"
                          className="profilim-inputs"
                          maxLength={11}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="adreslerim-isim">Ad Soyad</label>
                      </div>
                      <div className="col-lg-8">
                        <input
                          type="text"
                          id="adreslerim-isim"
                          className="profilim-inputs"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="adreslerim-mail">E-Posta Adresi</label>
                      </div>
                      <div className="col-lg-8">
                        <input
                          type="text"
                          id="adreslerim-mail"
                          className="profilim-inputs"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="adreslerim-tel">Telefon Numarası</label>
                      </div>
                      <div className="col-lg-8">
                        <input
                          type="text"
                          id="adreslerim-tel"
                          className="profilim-inputs"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="adreslerim-il">İl</label>
                      </div>
                      <div className="col-lg-8">
                        <input
                          type="text"
                          id="adreslerim-il"
                          className="profilim-inputs"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="adreslerim-ilce">İlçe</label>
                      </div>
                      <div className="col-lg-8">
                        <input
                          type="text"
                          id="adreslerim-ilce"
                          className="profilim-inputs"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="adreslerim-adres">Adres</label>
                      </div>
                      <div className="col-lg-8">
                        <textarea
                          name="adreslerim-adres"
                          id="adreslerim-adres"
                        ></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="adreslerim-tc">T.C. Kimlik No</label>
                      </div>
                      <div className="col-lg-8">
                        <input
                          type="text"
                          id="adreslerim-tc"
                          maxLength={11}
                          className="profilim-inputs"
                        />
                      </div>
                    </div>
                    <div className="col-12 guncelle-flex">
                      <button onClick={newAddress}>Adresimi Ekle</button>
                    </div>
                  </div>

                  <div className="col-lg-6 row profilim-column adreslerim-row-parent">
                    <div className="profil-pills-content-altbaslik col-12">
                      ADRESLERİM
                    </div>
                    <div className="row adreslerim-row">
                    {addresses.map((address, index) => (
                        <div key={index} className="col-lg-5 adres-card">
                          <div>{address.addressTitle}</div> 
                          <div className="adres-card-flex">
                          <button
                                className="adres-card-flex-btn1"
                                onClick={() => handleOpenPopup(address)} // Pass the address data
                              >
                                <svg
                                  clipRule="evenodd"
                                  fillRule="evenodd"
                                  strokeLinejoin="round"
                                  strokeMiterlimit="2"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.75c0-.414.336-.75.75-.75s.75.336.75.75v9.25c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm-2.011 6.526c-1.045 3.003-1.238 3.45-1.238 3.84 0 .441.385.626.627.626.272 0 1.108-.301 3.829-1.249zm.888-.889 3.22 3.22 8.408-8.4c.163-.163.245-.377.245-.592 0-.213-.082-.427-.245-.591-.58-.578-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245z"
                                    fillRule="nonzero"
                                  />
                                </svg>
                              </button>
                            <button className="adres-card-flex-btn2" onClick={()=>deleteAddress(address.id)}>
                              <svg
                                clipRule="evenodd"
                                fillRule="evenodd"
                                strokeLinejoin="round"
                                strokeMiterlimit="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
                                  fillRule="nonzero"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="pills-kampanyalarim"
                role="tabpanel"
                aria-labelledby="pills-kampanyalarim-tab"
                tabIndex="0"
              >
                <div className="row kampanya-row">
                  <div className="col-lg-3">
                    <a href="#" className="kampanya-card">
                      <img src={kampanya} className="img-fluid w-100" alt="" />
                      <div>Bu hafta tişörtlerde %20 indirim</div>
                    </a>
                  </div>
                  <div className="col-lg-3">
                    <a href="#" className="kampanya-card">
                      <img src={kampanya} className="img-fluid w-100" alt="" />
                      <div>Bu hafta tişörtlerde %20 indirim</div>
                    </a>
                  </div>
                  <div className="col-lg-3">
                    <a href="#" className="kampanya-card">
                      <img src={kampanya} className="img-fluid w-100" alt="" />
                      <div>Bu hafta tişörtlerde %20 indirim</div>
                    </a>
                  </div>
                  <div className="col-lg-3">
                    <a href="#" className="kampanya-card">
                      <img src={kampanya} className="img-fluid w-100" alt="" />
                      <div>Bu hafta tişörtlerde %20 indirim</div>
                    </a>
                  </div>
                  <div className="col-lg-3">
                    <a href="#" className="kampanya-card">
                      <img src={kampanya} className="img-fluid w-100" alt="" />
                      <div>Bu hafta tişörtlerde %20 indirim</div>
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-siparislerim"
                role="tabpanel"
                aria-labelledby="pills-siparislerim-tab"
                tabIndex="0"
              >
                <div className="row siparislerim-row">
                  <div className="col-12">
                    <div className="siparis-card row align-items-center">
                      <a href="#" className="col-lg-2 col-md-6 col-sm-6 col-6">
                        <img
                          src={kampanya}
                          className="img-fluid w-100 siparis-card-resim"
                          alt=""
                        />
                      </a>
                      <div className="col-lg-10 col-md-6 col-sm-6 col-6 row siparislerim-card-detays">
                        <div className="siparis-card-isim col-lg-6">
                          <p>Sipariş Tarihi : 04.03.2024</p>
                        </div>
                        <div className="siparis-card-siparis-durum col-lg-5">
                          <svg
                            width="34"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          >
                            <path d="M7.919 17.377l-4.869-13.377h-2.05c-.266 0-.52-.105-.707-.293-.188-.187-.293-.442-.293-.707 0-.552.447-1 1-1h3.45l5.469 15.025c.841.101 1.59.5 2.139 1.088l11.258-4.097.684 1.879-11.049 4.021c.032.19.049.385.049.584 0 1.932-1.569 3.5-3.5 3.5-1.932 0-3.5-1.568-3.5-3.5 0-1.363.781-2.545 1.919-3.123zm1.581 1.811c.724 0 1.312.588 1.312 1.312 0 .724-.588 1.313-1.312 1.313-.725 0-1.313-.589-1.313-1.313s.588-1.312 1.313-1.312zm5.799-12.29l4.767-1.735 2.736 7.517-11.406 4.152-2.736-7.518 4.759-1.732 1.325 3.639 1.879-.684-1.324-3.639zm.537-1.26l-7.518 2.736-2.052-5.638 7.518-2.736 2.052 5.638z" />
                          </svg>
                          <span>Siparişiniz hazırlanıyor</span>
                        </div>

                        <a
                          href="/siparis-durumu"
                          className="col-lg-1 siparis-card-a"
                        >
                          <svg
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          >
                            <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="siparis-card row align-items-center">
                      <a href="#" className="col-lg-2 col-md-6 col-sm-6 col-6">
                        <img
                          src={kampanya}
                          className="img-fluid w-100 siparis-card-resim"
                          alt=""
                        />
                      </a>
                      <div className="col-lg-10 col-md-6 col-sm-6 col-6 row  siparislerim-card-detays">
                        <div className="siparis-card-isim col-lg-6">
                          <p>Sipariş Tarihi : 04.03.2024</p>
                        </div>
                        <div className="siparis-card-siparis-durum col-lg-5">
                          <svg
                            width="34"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          >
                            <path d="M3 18h-2c-.552 0-1-.448-1-1v-2h15v-9h4.667c1.117 0 1.6.576 1.936 1.107.594.94 1.536 2.432 2.109 3.378.188.312.288.67.288 1.035v4.48c0 1.121-.728 2-2 2h-1c0 1.656-1.344 3-3 3s-3-1.344-3-3h-6c0 1.656-1.344 3-3 3s-3-1.344-3-3zm3-1.2c.662 0 1.2.538 1.2 1.2 0 .662-.538 1.2-1.2 1.2-.662 0-1.2-.538-1.2-1.2 0-.662.538-1.2 1.2-1.2zm12 0c.662 0 1.2.538 1.2 1.2 0 .662-.538 1.2-1.2 1.2-.662 0-1.2-.538-1.2-1.2 0-.662.538-1.2 1.2-1.2zm-4-2.8h-14v-10c0-.552.448-1 1-1h12c.552 0 1 .448 1 1v10zm3-6v3h4.715l-1.427-2.496c-.178-.312-.509-.504-.868-.504h-2.42z" />
                          </svg>
                          <span>Siparişiniz yolda</span>
                        </div>

                        <a
                          href="/siparis-durumu"
                          className="col-lg-1 siparis-card-a"
                        >
                          <svg
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          >
                            <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="siparis-card row align-items-center">
                      <a href="#" className="col-lg-2 col-md-6 col-sm-6 col-6">
                        <img
                          src={kampanya}
                          className="img-fluid w-100 siparis-card-resim"
                          alt=""
                        />
                      </a>
                      <div className="col-lg-10 col-md-6 col-sm-6 col-6 row siparislerim-card-detays">
                        <div className="siparis-card-isim col-lg-6">
                          <p>Sipariş Tarihi : 04.03.2024</p>
                        </div>
                        <div className="siparis-card-siparis-durum col-lg-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="44"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="M21.406 9.558c-1.21-.051-2.87-.278-3.977-.744.809-3.283 1.253-8.814-2.196-8.814-1.861 0-2.351 1.668-2.833 3.329-1.548 5.336-3.946 6.816-6.4 7.401v-.73h-6v12h6v-.904c2.378.228 4.119.864 6.169 1.746 1.257.541 3.053 1.158 5.336 1.158 2.538 0 4.295-.997 5.009-3.686.5-1.877 1.486-7.25 1.486-8.25 0-1.648-1.168-2.446-2.594-2.506zm-17.406 10.442h-2v-8h2v8zm15.896-5.583s.201.01 1.069-.027c1.082-.046 1.051 1.469.004 1.563l-1.761.099c-.734.094-.656 1.203.141 1.172 0 0 .686-.017 1.143-.041 1.068-.056 1.016 1.429.04 1.551-.424.053-1.745.115-1.745.115-.811.072-.706 1.235.109 1.141l.771-.031c.822-.074 1.003.825-.292 1.661-1.567.881-4.685.131-6.416-.614-2.239-.965-4.438-1.934-6.959-2.006v-6c3.264-.749 6.328-2.254 8.321-9.113.898-3.092 1.679-1.931 1.679.574 0 2.071-.49 3.786-.921 5.533 1.061.543 3.371 1.402 6.12 1.556 1.055.059 1.024 1.455-.051 1.584l-1.394.167s-.608 1.111.142 1.116z" />
                          </svg>
                          <span>Siparişiniz teslim edildi</span>
                        </div>

                        <a
                          href="/siparis-durumu"
                          className="col-lg-1 siparis-card-a"
                        >
                          <svg
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          >
                            <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {showPopup && selectedAddress && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={() => setShowPopup(false)}>&times;</span>
                  <form onSubmit={updateAddress}>
                    <div className="row yeni-adres-row">
                      <div className="col-12">
                        <input
                          className='adres-input'
                          type="text"
                          placeholder='Adres Başlığı'
                          value={addressTitle}
                          onChange={(e) => setAddressTitle(e.target.value)}
                        />
                      </div>
                      <div className="col-12">
                        <input
                          className='adres-input'
                          type="text"
                          placeholder='Ad Soyad'
                          value={nameSurname}
                          onChange={(e) => setNameSurname(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6">
                        <input
                          className='adres-input'
                          type="text"
                          placeholder='E-Posta Adresi'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6">
                        <input
                          className='adres-input'
                          type="text"
                          placeholder='Telefon Numarası'
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6">
                        <input
                          className='adres-input'
                          type="text"
                          placeholder='İl'
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6">
                        <input
                          className='adres-input'
                          type="text"
                          placeholder='İlçe'
                          value={town}
                          onChange={(e) => setTown(e.target.value)}
                        />
                      </div>
                      <div className="col-12">
                        <textarea
                          name="adres-uzun"
                          id="adres-uzun"
                          placeholder='Adres Tarifi'
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                      <div className="col-12">
                        <textarea
                          name="hediye-card"
                          id="hediye-card"
                          placeholder='T.C. Kimlik Numaranız'
                          value={identityNumber}
                          onChange={(e) => setIdentityNumber(e.target.value)}
                        />
                      </div>
                      <button
                        id='popup-adresi-kaydet-btn'
                        type="submit"
                      >
                        Adresi Güncelle
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
