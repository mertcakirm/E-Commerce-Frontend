import React, { Component } from 'react'

const Odeme2=()=> {
    return (
      <div className='row'>
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


            <form>
              <div className="row yeni-adres-row">
                <div className="col-12"><input className='adres-input'  type="text" placeholder='Ad Soyad' /></div>
                <div className="col-lg-6"><input className='adres-input' type="text" placeholder='E-Posta Adresi' /></div>
                <div className="col-lg-6"><input className='adres-input' type="text" placeholder='Telefon Numarası' /></div>
                <div className="col-lg-6"><input className='adres-input' type="text" placeholder='İl' /></div>
                <div className="col-lg-6"><input className='adres-input' type="text" placeholder='İlçe' /></div>
                <div className="col-12"><textarea name="adres-uzun" id="adres-uzun" placeholder='Adres Tarifi'></textarea></div>
                <div className="col-12"><textarea name="hediye-card" id="hediye-card" placeholder='Hediye kartına not yazabilirsiniz...'></textarea></div>
                <div className="col-lg-5 yeni-adres-olarak-kaydet-chc">
                  <input type="checkbox" id='yeni-adres-olarak' style={{marginRight:'5px'}} />
                  <label htmlFor="yeni-adres-olarak">Yeni Adres Olarak Kaydet</label>
                </div>
              </div>

            </form>
          </div>








          <div>
          <p className="ozet-baslik">Fatura Bilgilerim</p>
          <div className="teslimat-bilgileri-panel-parent">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="pills-bireysel-tab" data-bs-toggle="pill" data-bs-target="#pills-bireysel" type="button" role="tab" aria-controls="pills-bireysel" aria-selected="true">Bireysel</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-kurumsal-tab" data-bs-toggle="pill" data-bs-target="#pills-kurumsal" type="button" role="tab" aria-controls="pills-kurumsal" aria-selected="false">Kurumsal</button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-bireysel" role="tabpanel" aria-labelledby="pills-bireysel-tab" tabIndex="0">
              <form>
                <div className="row">
                <div className="col-lg-6"><input type="text" className='adres-input' placeholder='Fatura Ad Soyad' /></div>
                <div className="col-lg-6"><input type="text" className='adres-input' maxLength={11} placeholder='T.C. Kimlik Numarası' /></div>
                </div>
              </form>
            </div>
            <div className="tab-pane fade" id="pills-kurumsal" role="tabpanel" aria-labelledby="pills-kurumsal-tab" tabIndex="0">
            <form>
                <div className="row">
                <div className="col-12"><input type="text" className='adres-input' placeholder='Fatura Ad Soyad' /></div>
                <div className="col-lg-6"><input type="text" className='adres-input' placeholder='Vergi Dairesi' /></div>
                <div className="col-lg-6"><input type="text" className='adres-input' placeholder='Vergi Numarası' /></div>
                </div>
              </form>
            </div>
          </div>
          </div>
          </div>










          <div>
          <p className="ozet-baslik">Kargo Bilgilerim</p>
          <div className="teslimat-bilgileri-panel-parent">
            <div className="row kargo-row">
              <div className="kargo-card col-lg-4">
                <div className="row kargo-card-row">
                  <div className="col-8 kargo-resim-flex">
                    <img src="https://www.aksesuarix.com/UserFiles/Fotograflar/thumbs/43330-17-yurticikargo-png-yurticikargo-png-17-yurticikargo-png-yurticikargo.png" className='img-fluid w-100' alt="" />
                  </div>
                  <div className="col-4 kargo-fiyat-flex">
                    <p>95₺</p>
                  </div>
                </div>
              </div>
              </div>
              <div className="col-12">
                <input type="checkbox" style={{marginRight:'5px'}}  id='seffaf'/>
                <label htmlFor="seffaf">Şeffaf kargo istiyorum +5₺</label>
              </div>

          </div>
          </div>

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
    )
  }


export default Odeme2;