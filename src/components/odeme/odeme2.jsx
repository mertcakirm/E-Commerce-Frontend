import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import Sepet_ozeti from './sepet-ozeti';

const Odeme2 = () => {
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedaddresses, setSelectedAddresses] = useState([]);
  const [addressTitle, setAddressTitle] = useState('');
  const [nameSurname, setNameSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
  const [address, setAddress] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const [loading, setLoading] = useState(true);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);
  const token = localStorage.getItem('token');


  const newAddress = async (event) => {
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
  
  
    try {
      const response = await fetch('http://213.142.159.49:8083/api/address/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressDTO),
      });
  
      if (response.ok) {
        const data = await response.json();
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
  
        const result = await response.json(); 
        setAddresses(result);
        setLoading(false)
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchAddresses();
  }, []);
  console.log(addresses);
  if (loading) {
    return (
      <div className="d-flex justify-content-center" style={{ height: '50vh', alignItems: 'center' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className='row'>
      <Helmet>
        <title>Adreslerim</title>
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
      <div className="col-lg-7">
        <p className="ozet-baslik">Teslimat Bilgilerim</p>
        <div className="teslimat-bilgileri-panel-parent">
          <div className="kayitli-adreslerim-parent">
            <p className='kayitli-adresleri-genel-baslik'>Kayıtlı Adreslerim</p>
            {addresses.map((address,index)=>(
            <div key={index} className="kayitli-adreslerim-card">
              <p className='kayitli-adreslerim-card-p1'>{address.addressTitle}</p>
              <p className="cut-text">{address.address}</p>
              <button>Kullan</button>
            </div>

            ))}

          </div>

          <button id='yeni-adres-ekle-btn' onClick={handleOpenModal}>Yeni Adres Ekle</button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal">
            <div className="modal-content" >
              <span className="close" onClick={handleCloseModal} >&times;</span>
              <form>
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
                      name="tc-kimlik"
                      id="tc-kimlik"
                      placeholder='T.C. Kimlik Numaranız'
                      value={identityNumber}
                      onChange={(e) => setIdentityNumber(e.target.value)}
                    />
                  </div>
                  <button
                    id='popup-adresi-kaydet-btn'
                    onClick={newAddress}
                  >
                    Adresi Kaydet
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* Diğer içerik buraya gelecek */}
      </div>
      <div className="col-lg-5 ozet-sag-col">

      <Sepet_ozeti />
      <button className="button-next-step primary" id="stepper" >
          Ödemeye Geç
        </button>
    </div>
    </div>
  );
};



export default Odeme2;
