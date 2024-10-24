import React, { Component, useEffect, useState,useRef } from "react";
import { getCookie, setCookie, deleteCookie } from "../cookie/cookie"; // Çerez fonksiyonlarını ekliyoruz
import { AdresEkle,AdresSil,AdresGuncelle,AdresleriGetir,} from "./api/adresapi";
import { NotificationCard, showNotification } from '../childcomponents/notification';

const Profil_adreslerim = () => {
  // adres
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [addressTitle, setAddressTitle] = useState("");
  const [nameSurname, setNameSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [address, setAddress] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const token = getCookie("token");
  const BASE_URL = "http://213.142.159.49:8083/api";
  const notificationRef = useRef(null);

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
    AdresleriGetir(setAddresses);
  }, [token]);

  const newAddress = async () => {
    const addressDTO = {
      addressTitle: document.getElementById("adreslerim-baslik").value,
      nameSurname: document.getElementById("adreslerim-isim").value,
      email: document.getElementById("adreslerim-mail").value,
      phoneNumber: document.getElementById("adreslerim-tel").value,
      city: document.getElementById("adreslerim-il").value,
      town: document.getElementById("adreslerim-ilce").value,
      address: document.getElementById("adreslerim-adres").value,
      identityNumber: document.getElementById("adreslerim-tc").value,
    };
    try {
      await AdresEkle(addressDTO);
      await AdresleriGetir(setAddresses);
    showNotification(notificationRef, 'Adres başarıyla eklendi!');
    } catch (error) {
    showNotification(notificationRef, 'Adresiniz eklenemedi lütfen bilgilerinizi kontrol edin!');
      console.error("Adres ekleme sırasında hata:", error);
    }
  };

  const deleteAddress = async (id) => {
    AdresSil(id);
    setAddresses(addresses.filter((address) => address.id !== id));
    showNotification(notificationRef, 'Adres başarıyla silindi!');

  };

  const handleOpenPopup = (address) => {
    setSelectedAddress(address);
    setAddressTitle(address.addressTitle || "");
    setNameSurname(address.nameSurname || "");
    setEmail(address.email || "");
    setPhoneNumber(address.phoneNumber || "");
    setCity(address.city || "");
    setTown(address.town || "");
    setAddress(address.address || "");
    setIdentityNumber(address.identityNumber || "");
    setShowPopup(true);
  };

  const updateAddress = async (event) => {
    event.preventDefault();

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

    const result = await AdresGuncelle(selectedAddress.id, addressDTO);

    if (result.success) {
      console.log("Address updated successfully:", result.data);
      setShowPopup(false);
      AdresleriGetir(setAddress);
      showNotification(notificationRef, 'Adres başarıyla güncellendi!');

    } else {
      console.error("Failed to update address:", result.message);
      showNotification(notificationRef, 'Adresiniz güncellenemedi!');

    }
  };

  useEffect(() => {
    window.$("#adreslerim-tel").mask("(999) 999-9999");

    window.$("#adreslerim-mail").on("input", function () {
      const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!pattern.test(this.value)) {
        this.setCustomValidity("Geçerli bir e-posta adresi girin.");
      } else {
        this.setCustomValidity("");
      }
    });
  }, []);

  return (
    <div className="row col-12">
      <div className="col-12 text-center profil-pills-content-baslik adreslerim-profil-baslik">
        ADRESLERİM
      </div>

      <div
        className="row col-12 adres-ekle-row"
        style={{ justifyContent: "end", textAlign: "center" }}
      >
        <div className="col-lg-6 profilim-column">
          <div className="profil-pills-content-altbaslik">ADRES EKLE</div>
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
                  <button
                    className="adres-card-flex-btn2"
                    onClick={() => deleteAddress(address.id)}
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
      {showPopup && selectedAddress && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowPopup(false)}>
              &times;
            </span>
            <form onSubmit={updateAddress}>
              <div className="row yeni-adres-row">
                <div className="col-12">
                  <input
                    className="adres-input"
                    type="text"
                    placeholder="Adres Başlığı"
                    value={addressTitle}
                    onChange={(e) => setAddressTitle(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <input
                    className="adres-input"
                    type="text"
                    placeholder="Ad Soyad"
                    value={nameSurname}
                    onChange={(e) => setNameSurname(e.target.value)}
                  />
                </div>
                <div className="col-lg-6">
                  <input
                    className="adres-input"
                    type="text"
                    placeholder="E-Posta Adresi"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-lg-6">
                  <input
                    className="adres-input"
                    type="text"
                    placeholder="Telefon Numarası"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="col-lg-6">
                  <input
                    className="adres-input"
                    type="text"
                    placeholder="İl"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="col-lg-6">
                  <input
                    className="adres-input"
                    type="text"
                    placeholder="İlçe"
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <textarea
                    name="adres-uzun"
                    id="adres-uzun"
                    placeholder="Adres Tarifi"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <textarea
                    name="hediye-card"
                    id="hediye-card"
                    placeholder="T.C. Kimlik Numaranız"
                    value={identityNumber}
                    onChange={(e) => setIdentityNumber(e.target.value)}
                  />
                </div>
                <button id="popup-adresi-kaydet-btn" type="submit">
                  Adresi Güncelle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div>
      <NotificationCard ref={notificationRef} message="" />

      </div>
    </div>
    
  );
};

export default Profil_adreslerim;