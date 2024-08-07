import React, { Component } from 'react';
import Admin_sidebar from './admin-sidebar';
import './admin-css/admin-genel.css';
const Admin_sayfalar =()=> {
    return (
      <div>
        <Admin_sidebar />
        <div className="admin-sag-container">
        <div className="col-12 alt-basliklar-admin">Sayfa İçerikleri</div>
          <div className="row admin-genel-row">
            <div className="col-12">
              <div className="site-icerik-shadow2 row">
                <form className="col-lg-4 sayfa-icerikleri-flex">
                  <div className="row">
                    <label className='col-4' htmlFor="sayfa-icerikleri-flex-slider-img1">Slider Görseli</label>
                    <input className='col-8' type="file" id='sayfa-icerikleri-flex-slider-img1' />
                  </div>
                  <div className="row">
                    <label className='col-3' htmlFor="sayfa-icerikleri-flex-slider-p1">Üst Başlık</label>
                    <input className='col-9' type="text" id='sayfa-icerikleri-flex-slider-p1' />
                  </div>
                  <div className="row">
                    <label className='col-3' htmlFor="sayfa-icerikleri-flex-slider-p2">Ana Başlık</label>
                    <input className='col-9' type="text" id='sayfa-icerikleri-flex-slider-p2' />
                  </div>
                  <div className="row">
                    <label className='col-3' htmlFor="sayfa-icerikleri-flex-slider-p3">Alt Başlık</label>
                    <input className='col-9' type="text" id='sayfa-icerikleri-flex-slider-p3' />
                  </div>
                  <div className="row">
                    <label className='col-5' htmlFor="sayfa-icerikleri-flex-slider-adres">Yöndendireceği Adres</label>
                    <input className='col-7' type="text" id='sayfa-icerikleri-flex-slider-adres' />
                  </div>
                  <button className='tumunu-gor-btn-admin'>Slider Ekle</button>
                </form>

                <div className="col-lg-8 row" style={{padding:'2%'}}>
                  <div className="col-12 row sliderlar-card site-icerik-shadow2 ">
                    <div className="col-lg-5">
                      <img src="https://cdn.aksesuarix.com/Fotograflar/thumbs/87087-outlet.jpg" className='img-fluid w-100' alt="" />
                    </div>
                    <div className="col-lg-6">
                      <p>t-shirt</p>
                      <p>%40 indirim</p>
                      <p>büyük yaz indirimi</p>
                      <p>/tişört</p>
                    </div>
                    <div className="col-lg-1">
                      <button className='slider-edit-sil-btn'>
                      <svg clipRule="evenodd" fillRule="evenodd" fill='white' strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"/></svg>
                      </button>
                    </div>
                  </div>
                  <div className="col-12 row sliderlar-card site-icerik-shadow2 ">
                    <div className="col-lg-5">
                      <img src="https://cdn.aksesuarix.com/Fotograflar/thumbs/87087-outlet.jpg" className='img-fluid w-100' alt="" />
                    </div>
                    <div className="col-lg-6">
                      <p>t-shirt</p>
                      <p>%40 indirim</p>
                      <p>büyük yaz indirimi</p>
                      <p>/tişört</p>
                    </div>
                    <div className="col-lg-1">
                      <button className='slider-edit-sil-btn'>
                      <svg clipRule="evenodd" fillRule="evenodd" fill='white' strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"/></svg>
                      </button>
                    </div>
                  </div>
                  <div className="col-12 row sliderlar-card site-icerik-shadow2 ">
                    <div className="col-lg-5">
                      <img src="https://cdn.aksesuarix.com/Fotograflar/thumbs/87087-outlet.jpg" className='img-fluid w-100' alt="" />
                    </div>
                    <div className="col-lg-6">
                      <p>t-shirt</p>
                      <p>%40 indirim</p>
                      <p>büyük yaz indirimi</p>
                      <p>/tişört</p>
                    </div>
                    <div className="col-lg-1">
                      <button className='slider-edit-sil-btn'>
                      <svg clipRule="evenodd" fillRule="evenodd" fill='white' strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


export default Admin_sayfalar;