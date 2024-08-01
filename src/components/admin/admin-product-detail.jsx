import React, { Component } from 'react';
import Admin_sidebar from './admin-sidebar';
import './admin-css/admin-genel.css';
const Admin_product_detail=()=> {
    return (
      <div>
        <Admin_sidebar />
        <div className="admin-sag-container">
          <div className="row admin-genel-row">
            <div className="site-icerik-shadow col-12 row urun-detay-row">
              <div className="col-lg-5">
              <input type="file" id="fileInput" />
              <button className="fotograf-gonder">Fotoğrafı Ekle</button>
              </div>
              <div className="col-lg-7 resim-preview-card-parent">
                <div className="resim-preview-card">
                  <img className='img-fluid w-100' src="https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" alt="" />
                  <button className='resim-sil-btn'>Resmi Sil</button>
                </div>
                <div className="resim-preview-card">
                  <img className='img-fluid w-100' src="https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" alt="" />
                  <button className='resim-sil-btn'>Resmi Sil</button>
                </div>
                <div className="resim-preview-card">
                  <img className='img-fluid w-100' src="https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" alt="" />
                  <button className='resim-sil-btn'>Resmi Sil</button>
                </div>
                <div className="resim-preview-card">
                  <img className='img-fluid w-100' src="https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" alt="" />
                  <button className='resim-sil-btn'>Resmi Sil</button>
                </div>
                <div className="resim-preview-card">
                  <img className='img-fluid w-100' src="https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" alt="" />
                  <button className='resim-sil-btn'>Resmi Sil</button>
                </div>
                <div className="resim-preview-card">
                  <img className='img-fluid w-100' src="https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" alt="" />
                  <button className='resim-sil-btn'>Resmi Sil</button>
                </div>
              </div>
              <div className="col-12 mt-5 row">
                <div className="col-lg-6">
                  <div className="row">
                    <label htmlFor="urun-detay-edit-ad" className="col-4">Ürün Adı</label>
                    <input type="text" id='urun-detay-edit-ad' className='col-8' />
                  </div>
                  <div className="row mt-3">
                    <label htmlFor="urun-detay-edit-kategori" className="col-4">Ürün Kategorisi</label>
                    <input type="text" id='urun-detay-edit-kategori' className='col-8' />
                  </div>
                  <div className="row mt-3">
                    <label htmlFor="urun-detay-edit-content" className="col-4">Ürün Açıklaması</label>
                    <input type="text" id='urun-detay-edit-content' className='col-8' />
                  </div>
                  <div className="row mt-3">
                    <label htmlFor="urun-detay-edit-fiyat" className="col-4">Ürün Fiyatı</label>
                    <input type="number" id='urun-detay-edit-fiyat' className='col-8' />
                  </div>
                  <div className="row mt-3">
                    <label htmlFor="urun-detay-edit-stok" className="col-4">Ürün Fiyatı</label>
                    <input type="text" id='urun-detay-edit-stok' className='col-8' />
                  </div>
                  
                  <button className='degisiklikleri-kaydet-btn mt-3'>Değişiklikleri Kaydet</button>

                </div>
              </div>
            </div> 
          </div>
        </div>
      </div>
    )
  }


export default Admin_product_detail;