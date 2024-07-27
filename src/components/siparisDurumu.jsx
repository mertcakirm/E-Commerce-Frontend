import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import './css/siparisDurumu.css';

const SiparisDurumu = () => {
  const [currentStep, setCurrentStep] = useState(1); // Başlangıç değeri 1
  const steps = 4; // Toplam adım sayısı

//   useEffect(() => {
//     // API çağrısı
//     const fetchStepData = async () => {
//       try {
//         const response = await fetch('YOUR_API_ENDPOINT'); // API URL'nizi buraya ekleyin
//         const data = await response.json();
//         setCurrentStep(data.currentStep); // API'den dönen değere göre currentStep'i güncelle
//       } catch (error) {
//         console.error('API çağrısı sırasında bir hata oluştu:', error);
//       }
//     };

//     fetchStepData();
//   }, []); // Bileşen yüklendiğinde sadece bir kez çalıştır

  const renderStepName = (index) => {
    switch (index) {
      case 0:
        return 'Sipariş Alındı';
      case 1:
        return 'Onaylandı';
      case 2:
        return 'Hazırlanıyor';
      case 3:
        return 'Teslim Edildi';
      default:
        return '';
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container-fluid siparis-durumu-container">
        <div className="row" style={{margin:'0px'}}>
          <div className="col-12">
            <section className="checkout-progress-indicator">
              <div className="progress">
                {[...Array(steps)].map((_, index) => (
                  <React.Fragment key={index}>
                    <div className={`step${currentStep >= index + 1 ? ' current' : ''}`} id={index + 1}>
                      <span>{index + 1}</span>
                      <span>{renderStepName(index)}</span>
                    </div>
                    {index < steps - 1 && <div></div>}
                  </React.Fragment>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="row siparis-durumu-row-parent" style={{margin:'0px'}} >
            <div className="col-lg-6">
                <div className="siparisDurumu-parts">
                    <div className="siparis-durumu-genel-baslik">
                        Teslimat Adresi
                    </div>
                    <div className="siparis-durumu-contents-parent">
                    <p>Kırklarsını mah.26û2 sokak Kupeli sitesi B blok kat 3 no 8 Tarsus/Mersin </p>
                    <p>Tel: 5057057858</p>

                    </div>
                </div>
            </div>
            <div className="col-lg-6">
            <div className="siparisDurumu-parts">
                    <div className="siparis-durumu-genel-baslik">
                        Fatura Adresi
                    </div>
                    <div className="siparis-durumu-contents-parent">
                    <p>Kırklarsını mah.26û2 sokak Kupeli sitesi B blok kat 3 no 8 Tarsus/Mersin </p>
                    <p>Tel: 5057057858</p>

                    </div>
                </div>
            </div>


            <div className="col-lg-6">
                    <div className="siparis-durumu-genel-baslik">
                        Sipariş Bilgileri
                    </div>
                    <div className="siparis-durumu-contents-parent">
                        <div className="row siparis-durumu-satir-row">
                            <div className="col-lg-6 siparis-durumu-satir-metin">Sipariş Numarası</div>
                            <div className="col-lg-6 siparis-durumu-satir-metin">#60240</div>
                        </div>
                        <div className="row siparis-durumu-satir-row">
                            <div className="col-lg-6 siparis-durumu-satir-metin">Sipariş Tarihi</div>
                            <div className="col-lg-6 siparis-durumu-satir-metin">10.10.2024</div>
                        </div>
                        <div className="row siparis-durumu-satir-row">
                            <div className="col-lg-6 siparis-durumu-satir-metin">Sipariş Toplamı</div>
                            <div className="col-lg-6 siparis-durumu-satir-metin">600₺</div>
                        </div>
                        <div className="row siparis-durumu-satir-row">
                            <div className="col-lg-6 siparis-durumu-satir-metin">Taksit</div>
                            <div className="col-lg-6 siparis-durumu-satir-metin">3 Taksit</div>
                        </div>
                        <div className="row siparis-durumu-satir-row">
                            <div className="col-lg-6 siparis-durumu-satir-metin">Kargo Ücreti</div>
                            <div className="col-lg-6 siparis-durumu-satir-metin">10₺</div>
                        </div>
                        <div className="row siparis-durumu-satir-row">
                            <div className="col-lg-6 siparis-durumu-satir-metin">Kargo Takip</div>
                            <div className="col-lg-6 siparis-durumu-satir-metin green">Kargo Teslim Edilmiştir</div>
                        </div>
                        <div className="row siparis-durumu-satir-row">
                            <div className="col-lg-6 siparis-durumu-satir-metin">Fatura Ünvanı</div>
                            <div className="col-lg-6 siparis-durumu-satir-metin">Furkan Geren</div>
                        </div>
                        <div className="row siparis-durumu-satir-row">
                            <div className="col-lg-6 siparis-durumu-satir-metin">T.C. Kimlik Numarası</div>
                            <div className="col-lg-6 siparis-durumu-satir-metin">12345678910</div>
                        </div>
                        <div className="row siparis-durumu-satir-row">
                            <div className="col-lg-6 siparis-durumu-satir-metin">Sipariş Durumu</div>
                            <div className="col-lg-6 siparis-durumu-satir-metin green">Müşteriye Teslim Edildi</div>
                        </div>

                    </div>
            </div>
            <div className="col-lg-6">
                    <div className="siparis-durumu-genel-baslik">
                        Ödeme Bilgileri
                    </div>
                    <div className="siparis-durumu-contents-parent">
                        <div className="row siparis-durumu-satir-row">
                            <div className="col-lg-6 siparis-durumu-satir-metin">Ödeme Türü</div>
                            <div className="col-lg-6 siparis-durumu-satir-metin">Kredi Kartı</div>
                        </div>
                        <div className="row siparis-durumu-satir-row">
                            <div className="col-lg-6 siparis-durumu-satir-metin">Ödeme Alındı mı?</div>
                            <div className="col-lg-6 siparis-durumu-satir-metin green">Evet</div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="siparis-durumu-genel-baslik">
                        Ürünler
                    </div>
                    <div className="row siparis-durumu-contents-parent2">

                    <div className="col-lg-6 siparis-durumu-contents-parent2-col">
                    <div className="row siparis-durumu-urunler-card">
                        <div className="col-lg-4">
                            <img className='img-fluid w-100' src="https://www.aksesuarix.com/UserFiles/Fotograflar/107x161/90117-story-of-radio-oversize-siyah-erkek-tisort-us4109sy-us4109sy-01.jpg" alt="" />
                        </div>
                        <div className="col-lg-8 siparis-durumu-urunler-card-content">
                            <p className='large'>Los Angeles LA Erkek Kolej Ceket</p>
                            <p>Beden : M</p>
                            <p>Ürün Kodu : 28323</p>
                            <p>Adet : 2</p>
                            <p>Fiyat : 600₺</p>
                        </div>
                    </div>
                    </div>

                    <div className="col-lg-6 siparis-durumu-contents-parent2-col">
                    <div className="row siparis-durumu-urunler-card">
                        <div className="col-lg-4">
                            <img className='img-fluid w-100' src="https://www.aksesuarix.com/UserFiles/Fotograflar/107x161/90117-story-of-radio-oversize-siyah-erkek-tisort-us4109sy-us4109sy-01.jpg" alt="" />
                        </div>
                        <div className="col-lg-8 siparis-durumu-urunler-card-content">
                            <p className='large'>Los Angeles LA Erkek Kolej Ceket</p>
                            <p>Beden : M</p>
                            <p>Ürün Kodu : 28323</p>
                            <p>Adet : 2</p>
                            <p>Fiyat : 600₺</p>
                        </div>
                    </div>
                    </div>
                    
                    <div className="col-lg-6 siparis-durumu-contents-parent2-col">
                    <div className="row siparis-durumu-urunler-card">
                        <div className="col-lg-4">
                            <img className='img-fluid w-100' src="https://www.aksesuarix.com/UserFiles/Fotograflar/107x161/90117-story-of-radio-oversize-siyah-erkek-tisort-us4109sy-us4109sy-01.jpg" alt="" />
                        </div>
                        <div className="col-lg-8 siparis-durumu-urunler-card-content">
                            <p className='large'>Los Angeles LA Erkek Kolej Ceket</p>
                            <p>Beden : M</p>
                            <p>Ürün Kodu : 28323</p>
                            <p>Adet : 2</p>
                            <p>Fiyat : 600₺</p>
                        </div>
                    </div>
                    </div>
                    
                    </div>
                </div>
        </div>


      </div>

      <Footer />
    </div>
  );
};

export default SiparisDurumu;
