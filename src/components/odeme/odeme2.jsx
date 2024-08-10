import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";

const Odeme2 = () => {
  const [showModal, setShowModal] = useState(false);

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
            <div className="kayitli-adreslerim-card">
              <p className='kayitli-adreslerim-card-p1'>Ev</p>
              <p>Şehitler Tepesi Mah. 3686</p>
              <button>Kullan</button>
            </div>
            <div className="kayitli-adreslerim-card">
              <p className='kayitli-adreslerim-card-p1'>Ev</p>
              <p>Şehitler Tepesi Mah. 3686</p>
              <button>Kullan</button>
            </div>
            <div className="kayitli-adreslerim-card">
              <p className='kayitli-adreslerim-card-p1'>Ev</p>
              <p>Şehitler Tepesi Mah. 3686</p>
              <button>Kullan</button>
            </div>
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
                  <div className="col-12"><input className='adres-input' type="text" placeholder='Ad Soyad' /></div>
                  <div className="col-lg-6"><input className='adres-input' type="text" placeholder='E-Posta Adresi' /></div>
                  <div className="col-lg-6"><input className='adres-input' type="text" placeholder='Telefon Numarası' /></div>
                  <div className="col-lg-6"><input className='adres-input' type="text" placeholder='İl' /></div>
                  <div className="col-lg-6"><input className='adres-input' type="text" placeholder='İlçe' /></div>
                  <div className="col-12"><textarea name="adres-uzun" id="adres-uzun" placeholder='Adres Tarifi'></textarea></div>
                  <div className="col-12"><textarea name="hediye-card" id="hediye-card" placeholder='Hediye kartına not yazabilirsiniz...'></textarea></div>
                  <button id='popup-adresi-kaydet-btn'>Adresi Kaydet</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Diğer içerik buraya gelecek */}
      </div>
      <div className="col-lg-5 ozet-sag-col">
        <p className="ozet-baslik">Sepet Özetim</p>
        <div className="ozet-panel">
          <div className="ozet-panel-item">
            <p className="ozet-panel-item-p1">Ara Toplam</p>
            <p className="ozet-panel-item-p2">695₺</p>
          </div>
        </div>
        <button className="button-next-step primary" id="stepper" >
          Ödemeye Geç
        </button>
      </div>
    </div>
  );
};



export default Odeme2;
