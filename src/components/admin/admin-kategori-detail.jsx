import React, { Component } from 'react'
import Admin_sidebar from './admin-sidebar';
import './admin-css/admin-genel.css';

const Admin_kategori_detail =()=> {
    return (
      <div>
      <Admin_sidebar />
      <div className="admin-sag-container">
        <div className="row admin-genel-row">
          <div className="site-icerik-shadow col-12 row kategori-detay-row">
            <div className="col-lg-6">
              <label htmlFor="">Resim</label><input type="file" />
            </div>
            <div className="col-lg-6">
              <input className='kategori-adi-detay-inp' type="text" name="kategori-adi-detay" id="kategori-adi-detay" placeholder='Yeni Kategori Adını Giriniz...' />
            </div>
            <div className="col-lg-6">
              <input className='kategori-adi-detay-inp' type="text" name="kategori-yolu-detay" id="kategori-yolu-detay" placeholder='Yeni Kategori Yolunu Giriniz...' />
            </div>
            <div className="col-lg-6">
              <select name="kategori-duzenle-detay-select" id="kategori-duzenle-detay-select">
                <option value="kart kategori">Kart Kategori</option>
                <option value="slider kategori">Slider Kategori</option>
              </select>
            </div>
            <div className="col-lg-12 row justify-content-center">
              <button className="guncelle-btn">Kategoriyi Güncelle</button>
            </div>
          </div> 
        </div>
      </div>
    </div>
    )
  }

export default Admin_kategori_detail;