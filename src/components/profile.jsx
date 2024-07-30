import React, { Component, useEffect, useState } from 'react'
import Navbar from './navbar';
import Footer from './footer';
import './css/profile.css';
import kampanya from '../assets/kampanya.jpg';

const Profile= ()=> {
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    if (showPopup) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [showPopup]);
    return (
      <div>
        <Navbar />

        <div className="container-fluid profile-container">
            <div className="row">
                <div className="col-lg-12">
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-bilgilerim-tab" data-bs-toggle="pill" data-bs-target="#pills-bilgilerim" type="button" role="tab" aria-controls="pills-bilgilerim" aria-selected="true">Bilgilerim</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-adreslerim-tab" data-bs-toggle="pill" data-bs-target="#pills-adreslerim" type="button" role="tab" aria-controls="pills-adreslerim" aria-selected="false">Adreslerim</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-kampanyalarim-tab" data-bs-toggle="pill" data-bs-target="#pills-kampanyalarim" type="button" role="tab" aria-controls="pills-kampanyalarim" aria-selected="false">Kampanyalarım</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-siparislerim-tab" data-bs-toggle="pill" data-bs-target="#pills-siparislerim" type="button" role="tab" aria-controls="pills-siparislerim" aria-selected="false">Siparişlerim</button>
                </li>
                </ul>
                <div className="tab-content tab-content2" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-bilgilerim" role="tabpanel" aria-labelledby="pills-bilgilerim-tab" tabIndex="0">
                        <form className="row">
                            <div className="col-12 text-center profil-pills-content-baslik">
                                BİLGİLERİM
                            </div>
                            <div className="col-lg-6 profilim-column">
                                <div className="row">
                                    <div className="col-lg-4"><label htmlFor="bilgilerim-isim">Ad Soyad</label></div>
                                    <div className="col-lg-8"><input type="text" id='bilgilerim-isim' className='profilim-inputs' /></div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4"><label htmlFor="bilgilerim-mail">E-Posta Adresiniz</label></div>
                                    <div className="col-lg-8"><input type="text" id='bilgilerim-mail' className='profilim-inputs' /></div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4"><label htmlFor="bilgilerim-tel">Telefon Numaranız</label></div>
                                    <div className="col-lg-8"><input type="text" id='bilgilerim-tel' className='profilim-inputs' /></div>
                                </div>
                            </div>
                            <div className="col-lg-6 profilim-column">
                            <div className="row">
                                    <div className="col-lg-4"><label htmlFor="bilgilerim-password">Şifreniz</label></div>
                                    <div className="col-lg-8"><input type="password" id='bilgilerim-password' className='profilim-inputs' /></div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4"><label htmlFor="bilgilerim-confirm">Şifreniz Tekrar</label></div>
                                    <div className="col-lg-8"><input type="password" id='bilgilerim-confirm' className='profilim-inputs' /></div>
                                </div>
                                <div>
                                    <button id='uyeligi-sil-btn'>Üyeliğimi Sil</button>
                                </div>
                            </div>
                            <div className="col-12 guncelle-flex">
                                <button>Bilgilerimi Güncelle</button>
                            </div>
                        </form>
                    </div>
                    <div className="tab-pane fade row" id="pills-adreslerim" role="tabpanel" aria-labelledby="pills-adreslerim-tab" tabIndex="0">
                                <div className="col-12 text-center profil-pills-content-baslik adreslerim-profil-baslik">ADRESLERİM</div>

                                <div className='row col-12 adres-ekle-row' style={{justifyContent:'end',textAlign:'center'}}>
                                
                                <div className="col-lg-6 profilim-column">
                                <div className='profil-pills-content-altbaslik'>ADRES EKLE</div>
                                <div className="row">
                                    <div className="col-lg-4"><label htmlFor="adreslerim-baslik">Adres Başlığı</label></div>
                                    <div className="col-lg-8"><input type="text" id='adreslerim-baslik' className='profilim-inputs' /></div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4"><label htmlFor="adreslerim-isim">Ad Soyad</label></div>
                                    <div className="col-lg-8"><input type="text" id='adreslerim-isim' className='profilim-inputs' /></div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4"><label htmlFor="adreslerim-mail">E-Posta Adresi</label></div>
                                    <div className="col-lg-8"><input type="text" id='adreslerim-mail' className='profilim-inputs' /></div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4"><label htmlFor="adreslerim-tel">Telefon Numarası</label></div>
                                    <div className="col-lg-8"><input type="text" id='adreslerim-tel' className='profilim-inputs' /></div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4"><label htmlFor="adreslerim-ulke">Ülke</label></div>
                                    <div className="col-lg-8"><input type="text" id='adreslerim-ulke' className='profilim-inputs' /></div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4"><label htmlFor="adreslerim-il">İl</label></div>
                                    <div className="col-lg-8"><input type="text" id='adreslerim-il' className='profilim-inputs' /></div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4"><label htmlFor="adreslerim-adres">Adres</label></div>
                                    <div className='col-lg-8'><textarea name="adreslerim-adres" id="adreslerim-adres" ></textarea></div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4"><label htmlFor="adreslerim-tc">T.C. Kimlik No</label></div>
                                    <div className="col-lg-8"><input type="text" id='adreslerim-tc' maxLength={11} className='profilim-inputs' /></div>
                                </div>
                                <div className="col-12 guncelle-flex">
                                    <button>Adresimi Ekle</button>
                                </div>
                                </div>

                                <div className='col-lg-6 row profilim-column adreslerim-row-parent'>
                                    <div className='profil-pills-content-altbaslik col-12'>ADRESLERİM</div>
                                    <div className='row adreslerim-row'>
                                    <div className="col-lg-5 adres-card">
                                        <div>EV</div>
                                        <div className='adres-card-flex'>
                                            <button className='adres-card-flex-btn1'><svg onClick={togglePopup} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.75c0-.414.336-.75.75-.75s.75.336.75.75v9.25c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm-2.011 6.526c-1.045 3.003-1.238 3.45-1.238 3.84 0 .441.385.626.627.626.272 0 1.108-.301 3.829-1.249zm.888-.889 3.22 3.22 8.408-8.4c.163-.163.245-.377.245-.592 0-.213-.082-.427-.245-.591-.58-.578-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245z" fillRule="nonzero"/></svg></button>
                                            <button className='adres-card-flex-btn2'><svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"/></svg></button>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 adres-card">
                                        <div>EV</div>
                                        <div className='adres-card-flex'>
                                            <button className='adres-card-flex-btn1'><svg onClick={togglePopup} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.75c0-.414.336-.75.75-.75s.75.336.75.75v9.25c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm-2.011 6.526c-1.045 3.003-1.238 3.45-1.238 3.84 0 .441.385.626.627.626.272 0 1.108-.301 3.829-1.249zm.888-.889 3.22 3.22 8.408-8.4c.163-.163.245-.377.245-.592 0-.213-.082-.427-.245-.591-.58-.578-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245z" fillRule="nonzero"/></svg></button>
                                            <button className='adres-card-flex-btn2'><svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"/></svg></button>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 adres-card">
                                        <div>EV</div>
                                        <div className='adres-card-flex'>
                                        <button className='adres-card-flex-btn1'><svg onClick={togglePopup} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.75c0-.414.336-.75.75-.75s.75.336.75.75v9.25c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm-2.011 6.526c-1.045 3.003-1.238 3.45-1.238 3.84 0 .441.385.626.627.626.272 0 1.108-.301 3.829-1.249zm.888-.889 3.22 3.22 8.408-8.4c.163-.163.245-.377.245-.592 0-.213-.082-.427-.245-.591-.58-.578-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245z" fillRule="nonzero"/></svg></button>
                                        <button className='adres-card-flex-btn2'><svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"/></svg></button>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 adres-card">
                                        <div>EV</div>
                                        <div className='adres-card-flex'>
                                        <button className='adres-card-flex-btn1'><svg onClick={togglePopup} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.75c0-.414.336-.75.75-.75s.75.336.75.75v9.25c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm-2.011 6.526c-1.045 3.003-1.238 3.45-1.238 3.84 0 .441.385.626.627.626.272 0 1.108-.301 3.829-1.249zm.888-.889 3.22 3.22 8.408-8.4c.163-.163.245-.377.245-.592 0-.213-.082-.427-.245-.591-.58-.578-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245z" fillRule="nonzero"/></svg></button>
                                        <button className='adres-card-flex-btn2'><svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"/></svg></button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>

                    </div>

                    <div className="tab-pane fade" id="pills-kampanyalarim" role="tabpanel" aria-labelledby="pills-kampanyalarim-tab" tabIndex="0">
                        <div className="row kampanya-row">
                            <div className="col-lg-3">
                                <a href='#' className="kampanya-card">
                                    <img src={kampanya} className='img-fluid w-100' alt="" />
                                    <div>Bu hafta tişörtlerde %20 indirim</div>
                                </a>
                            </div>
                            <div className="col-lg-3">
                                <a href='#' className="kampanya-card">
                                    <img src={kampanya} className='img-fluid w-100' alt="" />
                                    <div>Bu hafta tişörtlerde %20 indirim</div>
                                </a>
                            </div>
                            <div className="col-lg-3">
                                <a href='#' className="kampanya-card">
                                    <img src={kampanya} className='img-fluid w-100' alt="" />
                                    <div>Bu hafta tişörtlerde %20 indirim</div>
                                </a>
                            </div>
                            <div className="col-lg-3">
                                <a href='#' className="kampanya-card">
                                    <img src={kampanya} className='img-fluid w-100' alt="" />
                                    <div>Bu hafta tişörtlerde %20 indirim</div>
                                </a>
                            </div>
                            <div className="col-lg-3">
                                <a href='#' className="kampanya-card">
                                    <img src={kampanya} className='img-fluid w-100' alt="" />
                                    <div>Bu hafta tişörtlerde %20 indirim</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pills-siparislerim" role="tabpanel" aria-labelledby="pills-siparislerim-tab" tabIndex="0">
                        <div className="row siparislerim-row">
                            <div className="col-12">
                                <div className="siparis-card row align-items-center">
                                    <a href="#" className='col-lg-2 col-md-6 col-sm-6 col-6'>
                                    <img src={kampanya} className='img-fluid w-100 siparis-card-resim' alt="" />
                                    </a>
                                    <div className='col-lg-10 col-md-6 col-sm-6 col-6 row siparislerim-card-detays'>
                                    <div className='siparis-card-isim col-lg-6'><p>Beymen Tişört</p></div>
                                    <div className='siparis-card-siparis-durum col-lg-5'>
                                    <svg width="34" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M7.919 17.377l-4.869-13.377h-2.05c-.266 0-.52-.105-.707-.293-.188-.187-.293-.442-.293-.707 0-.552.447-1 1-1h3.45l5.469 15.025c.841.101 1.59.5 2.139 1.088l11.258-4.097.684 1.879-11.049 4.021c.032.19.049.385.049.584 0 1.932-1.569 3.5-3.5 3.5-1.932 0-3.5-1.568-3.5-3.5 0-1.363.781-2.545 1.919-3.123zm1.581 1.811c.724 0 1.312.588 1.312 1.312 0 .724-.588 1.313-1.312 1.313-.725 0-1.313-.589-1.313-1.313s.588-1.312 1.313-1.312zm5.799-12.29l4.767-1.735 2.736 7.517-11.406 4.152-2.736-7.518 4.759-1.732 1.325 3.639 1.879-.684-1.324-3.639zm.537-1.26l-7.518 2.736-2.052-5.638 7.518-2.736 2.052 5.638z"/></svg>
                                    <span>Siparişiniz hazırlanıyor</span>
                                    </div>

                                    <a href='/siparis-durumu' className='col-lg-1 siparis-card-a'>
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
                                    </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="siparis-card row align-items-center">
                                    <a href="#" className='col-lg-2 col-md-6 col-sm-6 col-6'>
                                    <img src={kampanya} className='img-fluid w-100 siparis-card-resim' alt="" />
                                    </a>
                                    <div className='col-lg-10 col-md-6 col-sm-6 col-6 row  siparislerim-card-detays'>
                                    <div className='siparis-card-isim col-lg-6'><p>Beymen Tişört</p></div>
                                    <div className='siparis-card-siparis-durum col-lg-5'>
                                    <svg width="34" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M3 18h-2c-.552 0-1-.448-1-1v-2h15v-9h4.667c1.117 0 1.6.576 1.936 1.107.594.94 1.536 2.432 2.109 3.378.188.312.288.67.288 1.035v4.48c0 1.121-.728 2-2 2h-1c0 1.656-1.344 3-3 3s-3-1.344-3-3h-6c0 1.656-1.344 3-3 3s-3-1.344-3-3zm3-1.2c.662 0 1.2.538 1.2 1.2 0 .662-.538 1.2-1.2 1.2-.662 0-1.2-.538-1.2-1.2 0-.662.538-1.2 1.2-1.2zm12 0c.662 0 1.2.538 1.2 1.2 0 .662-.538 1.2-1.2 1.2-.662 0-1.2-.538-1.2-1.2 0-.662.538-1.2 1.2-1.2zm-4-2.8h-14v-10c0-.552.448-1 1-1h12c.552 0 1 .448 1 1v10zm3-6v3h4.715l-1.427-2.496c-.178-.312-.509-.504-.868-.504h-2.42z"/></svg>
                                    <span>Siparişiniz yolda</span>
                                    </div>

                                    <a href='/siparis-durumu' className='col-lg-1 siparis-card-a'>
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
                                    </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="siparis-card row align-items-center">
                                    <a href="#" className='col-lg-2 col-md-6 col-sm-6 col-6'>
                                    <img src={kampanya} className='img-fluid w-100 siparis-card-resim' alt="" />
                                    </a>
                                    <div className='col-lg-10 col-md-6 col-sm-6 col-6 row siparislerim-card-detays'>
                                    <div className='siparis-card-isim col-lg-6'><p>Beymen Tişört</p></div>
                                    <div className='siparis-card-siparis-durum col-lg-5'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="24" viewBox="0 0 24 24"><path d="M21.406 9.558c-1.21-.051-2.87-.278-3.977-.744.809-3.283 1.253-8.814-2.196-8.814-1.861 0-2.351 1.668-2.833 3.329-1.548 5.336-3.946 6.816-6.4 7.401v-.73h-6v12h6v-.904c2.378.228 4.119.864 6.169 1.746 1.257.541 3.053 1.158 5.336 1.158 2.538 0 4.295-.997 5.009-3.686.5-1.877 1.486-7.25 1.486-8.25 0-1.648-1.168-2.446-2.594-2.506zm-17.406 10.442h-2v-8h2v8zm15.896-5.583s.201.01 1.069-.027c1.082-.046 1.051 1.469.004 1.563l-1.761.099c-.734.094-.656 1.203.141 1.172 0 0 .686-.017 1.143-.041 1.068-.056 1.016 1.429.04 1.551-.424.053-1.745.115-1.745.115-.811.072-.706 1.235.109 1.141l.771-.031c.822-.074 1.003.825-.292 1.661-1.567.881-4.685.131-6.416-.614-2.239-.965-4.438-1.934-6.959-2.006v-6c3.264-.749 6.328-2.254 8.321-9.113.898-3.092 1.679-1.931 1.679.574 0 2.071-.49 3.786-.921 5.533 1.061.543 3.371 1.402 6.12 1.556 1.055.059 1.024 1.455-.051 1.584l-1.394.167s-.608 1.111.142 1.116z"/></svg>
                                    <span>Siparişiniz teslim edildi</span>
                                    </div>

                                    <a href='/siparis-durumu' className='col-lg-1 siparis-card-a'>
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
                                    </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    {showPopup && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                        <div className="popup-header">
                            <h2>Adresi Düzenle</h2>
                            <button className="popup-close-btn" onClick={togglePopup}>&times;</button>
                        </div>
                        <form className="popup-form row mt-3">
                            <div className="row col-12 pop-up-form-adres">
                            <div className="col-lg-6 row adres-duzenle-rows" >
                            <div className="row col-12 align-items-center">
                            <label className='col-lg-4' htmlFor="adres-duzenle-adres-basligi">Adres Başlığı</label>
                            <input className='col-lg-8' type="text" id='adres-duzenle-adres-basligi' />
                            </div>
                            <div className="row col-12 align-items-center">
                            <label className='col-lg-4' htmlFor="adres-duzenle-adres-adi-soyadi">Ad Soyad</label>
                            <input className='col-lg-8' type="text" id='adres-duzenle-adres-adi-soyadi' />
                            </div>
                            <div className="row col-12 align-items-center">
                            <label className='col-lg-4' htmlFor="adres-duzenle-adres-eposta">E-Posta Adresi</label>
                            <input className='col-lg-8' type="text" id='adres-duzenle-adres-eposta' />
                            </div>
                            <div className="row col-12 align-items-center">
                            <label className='col-lg-4' htmlFor="adres-duzenle-adres-tel">Telefon Numarası</label>
                            <input className='col-lg-8' type="text" id='adres-duzenle-adres-tel' />
                            </div>
                            
                            </div>


                            <div className="col-lg-6 row adres-duzenle-rows" >
                            <div className="row col-12 align-items-center">
                            <label className='col-lg-4' htmlFor="adres-duzenle-adres-ulke">Ülke</label>
                            <input className='col-lg-8' type="text" id='adres-duzenle-adres-ulke' />
                            </div>
                            <div className="row col-12 align-items-center">
                            <label className='col-lg-4' htmlFor="adres-duzenle-adres-il">İl</label>
                            <input className='col-lg-8' type="text" id='adres-duzenle-adres-il' />
                            </div>
                            <div className="row col-12 align-items-center">
                            <label className='col-lg-4' htmlFor="adres-duzenle-adres-adres">Adres</label>
                            <textarea style={{resize:'none' , border:'1px solid #ccc',borderRadius:'5px'}} className='col-lg-8' name="adres-duzenle-adres-adres" id="adres-duzenle-adres-adres"></textarea>
                            </div>
                            <div className="row col-12 align-items-center">
                            <label className='col-lg-4' htmlFor="adres-duzenle-adres-tc">T.C. Kimlik Numarası</label>
                            <input className='col-lg-8' type="text" id='adres-duzenle-adres-tc' />
                            </div>
                            
                            </div>

                            </div>
                            <div className='row justify-content-center'>
                            <button className="adres-duzenle-btn mt-5 col-lg-4">Adresi Düzenle</button>
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
    )   
  }


export default Profile;