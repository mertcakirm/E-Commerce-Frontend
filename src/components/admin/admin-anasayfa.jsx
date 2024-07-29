import React, { Component } from 'react'
import Admin_sidebar from './admin-sidebar';
import './admin-css/admin-genel.css';


const Admin_anasayfa=()=> {
    return (
      <div>
        <Admin_sidebar />
        <div className="admin-sag-container">
            <div className="row admin-genel-row">
              <div className="col-lg-6">
                <div className="site-icerik-shadow">
                  <div className="row">
                  <div className="col-lg-4 site-icerik-sayilari-content"><p>Ürün Sayısı</p><p>1000</p></div>
                  <div className="col-lg-4 site-icerik-sayilari-content"><p>Kullanıcı Sayısı</p><p>1000</p></div>
                  <div className="col-lg-4 site-icerik-sayilari-content"><p>Sipariş Sayısı</p><p>1000</p></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="site-icerik-shadow">
                  <div className="row">
                  <div className="col-lg-6 site-icerik-sayilari-content"><p>Bu Ay Satılan Ürün Sayısı</p><p>100.000</p></div>
                  <div className="col-lg-6 site-icerik-sayilari-content"><p>Bu Ay Toplam Ciro</p><p>100.000₺</p></div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="site-icerik-shadow">
                  <div className="row en-cok-row">
                    <div className="col-12 alt-basliklar-admin">En Çok Ürün Alan Kullanıcılar</div>

                    <a href='#' className="col-12 en-cok-card row">
                      <div className="col-lg-4">Furkan Geren</div>
                      <div className="col-lg-5">FurkanGeren@gmail.com</div>
                      <div className="col-lg-3">05378231123</div>
                    </a>


                    <a href='#' className="col-12 en-cok-card row">
                      <div className="col-lg-4">Furkan Geren</div>
                      <div className="col-lg-5">FurkanGeren@gmail.com</div>
                      <div className="col-lg-3">05378231123</div>
                    </a>


                    <a href='#' className="col-12 en-cok-card row">
                      <div className="col-lg-4">Furkan Geren</div>
                      <div className="col-lg-5">FurkanGeren@gmail.com</div>
                      <div className="col-lg-3">05378231123</div>
                    </a>

                    <a href='#' className="col-12 en-cok-card row">
                      <div className="col-lg-4">Furkan Geren</div>
                      <div className="col-lg-5">FurkanGeren@gmail.com</div>
                      <div className="col-lg-3">05378231123</div>
                    </a>
                    

                    <a href='#' className="col-12 en-cok-card row">
                      <div className="col-lg-4">Furkan Geren</div>
                      <div className="col-lg-5">FurkanGeren@gmail.com</div>
                      <div className="col-lg-3">05378231123</div>
                    </a>

                    <a href='#' className="col-12 en-cok-card row">
                      <div className="col-lg-4">Furkan Geren</div>
                      <div className="col-lg-5">FurkanGeren@gmail.com</div>
                      <div className="col-lg-3">05378231123</div>
                    </a>

                    <a href='#' className="col-12 en-cok-card row">
                      <div className="col-lg-4">Furkan Geren</div>
                      <div className="col-lg-5">FurkanGeren@gmail.com</div>
                      <div className="col-lg-3">05378231123</div>
                    </a>

                    <div className="col-12 row justify-content-center"><a className='tumunu-gor-btn-admin col-6' href="#">Tüm Kullanıcıları Gör</a></div>
                    
                    </div>

                </div>


                <div className="site-icerik-shadow">
                  <div className="row en-cok-row">
                    <div className="col-12 alt-basliklar-admin">Aylık Finansal Genel Bakış</div>
                      <div className="row col-12">
                        <div className="col-lg-6 finansal-bakis-anasayfa-admin">Havale ile Alınan Ödeme</div>
                        <div className="col-lg-6 finansal-bakis-anasayfa-admin">14499₺</div>
                      </div>
                      <div className="row col-12">
                        <div className="col-lg-6 finansal-bakis-anasayfa-admin">Kredi Kartı  ile Alınan Ödeme</div>
                        <div className="col-lg-6 finansal-bakis-anasayfa-admin">14499₺</div>
                      </div>
                      <div className="row col-12">
                        <div className="col-lg-6 finansal-bakis-anasayfa-admin">Toplam Alınan Ödeme</div>
                        <div className="col-lg-6 finansal-bakis-anasayfa-admin">14499₺</div>
                      </div>
                      <div className="row col-12">
                        <div className="col-lg-6 finansal-bakis-anasayfa-admin">Toplam Net Kar</div>
                        <div className="col-lg-6 finansal-bakis-anasayfa-admin">14499₺</div>
                      </div>
                      <div className="row col-12">
                        <div className="col-lg-6 finansal-bakis-anasayfa-admin">Toplam Yapılan Satış Sayısı</div>
                        <div className="col-lg-6 finansal-bakis-anasayfa-admin">1449</div>
                      </div>




                    <div className="col-12 row justify-content-center"><a className='tumunu-gor-btn-admin col-6' href="#">Tüm Raporları Gör</a></div>                    
                    </div>
                </div>
              </div>


              <div className="col-lg-6">
                <div className="site-icerik-shadow">
                  <div className="row en-cok-row">
                    <div className="col-12 alt-basliklar-admin">En Çok Satın Alınan Ürünler</div>

                    <a href='#' className="col-12 en-cok-card row">
                      <div className="col-lg-3">
                        <img className='img-fluid w-100' src="https://cdn.aksesuarix.com/Fotograflar/575/90026-story-of-radio-oversize-kahve-erkek-tisort-us4109kh-us4109kh-01.jpg" alt="" />
                      </div>
                      <div className="col-lg-9 en-cok-urunler-admin">
                        <p>Ürün Adı : Mob Wear Şort</p>
                        <p>Ürün Kodu : 23123</p>
                        <p>Ürün Fiyatı : 499₺</p>
                        <p>Ürün Kategorisi : Tişört</p>
                        <p>Satış Sayısı : 27</p>
                      </div>
                    </a>


                    <a href='#' className="col-12 en-cok-card row">
                      <div className="col-lg-3">
                        <img className='img-fluid w-100' src="https://cdn.aksesuarix.com/Fotograflar/575/90026-story-of-radio-oversize-kahve-erkek-tisort-us4109kh-us4109kh-01.jpg" alt="" />
                      </div>
                      <div className="col-lg-9 en-cok-urunler-admin">
                        <p>Ürün Adı : Mob Wear Şort</p>
                        <p>Ürün Kodu : 23123</p>
                        <p>Ürün Fiyatı : 499₺</p>
                        <p>Ürün Kategorisi : Tişört</p>
                        <p>Satış Sayısı : 27</p>
                      </div>
                    </a>


                    <a href='#' className="col-12 en-cok-card row">
                      <div className="col-lg-3">
                        <img className='img-fluid w-100' src="https://cdn.aksesuarix.com/Fotograflar/575/90026-story-of-radio-oversize-kahve-erkek-tisort-us4109kh-us4109kh-01.jpg" alt="" />
                      </div>
                      <div className="col-lg-9 en-cok-urunler-admin">
                        <p>Ürün Adı : Mob Wear Şort</p>
                        <p>Ürün Kodu : 23123</p>
                        <p>Ürün Fiyatı : 499₺</p>
                        <p>Ürün Kategorisi : Tişört</p>
                        <p>Satış Sayısı : 27</p>
                      </div>
                    </a>


                    <a href='#' className="col-12 en-cok-card row">
                      <div className="col-lg-3">
                        <img className='img-fluid w-100' src="https://cdn.aksesuarix.com/Fotograflar/575/90026-story-of-radio-oversize-kahve-erkek-tisort-us4109kh-us4109kh-01.jpg" alt="" />
                      </div>
                      <div className="col-lg-9 en-cok-urunler-admin">
                        <p>Ürün Adı : Mob Wear Şort</p>
                        <p>Ürün Kodu : 23123</p>
                        <p>Ürün Fiyatı : 499₺</p>
                        <p>Ürün Kategorisi : Tişört</p>
                        <p>Satış Sayısı : 27</p>

                      </div>
                    </a>



                    
                    <div className="col-12 row justify-content-center"><a className='tumunu-gor-btn-admin col-6' href="#">Tüm Ürünleri Gör</a></div>
                    
                    </div>

                </div>
              </div>


            </div>
          </div>
      </div>
    )
  }


export default Admin_anasayfa;