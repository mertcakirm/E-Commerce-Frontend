import React, { Component } from 'react'
import { Helmet } from "react-helmet";
import "../css/odeme.css";

const Odeme1=()=>{
    return (
        <div className="row">
            <Helmet>
            <title>Sepet Özetim</title>
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
          <div className="col-lg-8">
            <p className="ozet-baslik">Ürünlerim</p>
            <div className="sepet-ozet-flex">
              <div className="sepet-ozet-card row">
                <div className="col-lg-3 col-md-3">
                  <a href="#">
                  <img src="https://www.aksesuarix.com/UserFiles/Fotograflar/107x161/90117-story-of-radio-oversize-siyah-erkek-tisort-us4109sy-us4109sy-01.jpg" className="img-fluid w-100 sepet-resim" alt="" />
                  </a>
                </div>
                <div className="col-lg-5 col-md-5 ozet-card-col-2">
                  <p className="ozet-card-col-2-p1">Skate Uzun Kollu Erkek Tişört </p>
                  <p className="ozet-card-col-2-p2">Ürün Kodu : UK1302SYBY </p>
                  <p className="ozet-card-col-2-p2">Beden : S </p>
                </div>
                <div className="col-lg-4 col-md-4 ozet-card-col-3">
                  <button className="ozet-card-col-3-sil-btn">
                    <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" fill="gray" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"/></svg>
                    <span>Sil</span>
                  </button>
                    <div className="updown">
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                    </div>
                    <div className="ozet-card-fiyat-flex">
                      <div className="ozet-card-fiyat-indirim">%20</div>
                      <div className="ozet-card-fiyat-1">499₺</div>
                      <div className="ozet-card-fiyat-2">799₺</div>
                    </div>
                </div>
              </div>

              <div className="sepet-ozet-card row">
                <div className="col-lg-3 col-md-3">
                <a href="#">
                  <img src="https://www.aksesuarix.com/UserFiles/Fotograflar/107x161/90117-story-of-radio-oversize-siyah-erkek-tisort-us4109sy-us4109sy-01.jpg" className="img-fluid w-100 sepet-resim" alt="" />
                </a>
                </div>
                <div className="col-lg-5 col-md-5 ozet-card-col-2">
                  <p className="ozet-card-col-2-p1">Skate Uzun Kollu Erkek Tişört </p>
                  <p className="ozet-card-col-2-p2">Ürün Kodu : UK1302SYBY </p>
                  <p className="ozet-card-col-2-p2">Beden : S </p>
                </div>
                <div className="col-lg-4 col-md-4 ozet-card-col-3">
                  <button className="ozet-card-col-3-sil-btn">
                    <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" fill="gray" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"/></svg>
                    <span>Sil</span>
                  </button>
                    <div className="updown">
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                    </div>
                    <div className="ozet-card-fiyat-flex">
                      <div className="ozet-card-fiyat-indirim">%20</div>
                      <div className="ozet-card-fiyat-1">499₺</div>
                      <div className="ozet-card-fiyat-2">799₺</div>
                    </div>
                </div>
              </div>
              <div className="sepet-ozet-card row">
                <div className="col-lg-3 col-md-3">
                <a href="#">
                  <img src="https://www.aksesuarix.com/UserFiles/Fotograflar/107x161/90117-story-of-radio-oversize-siyah-erkek-tisort-us4109sy-us4109sy-01.jpg" className="img-fluid w-100 sepet-resim" alt="" />
                </a>
                </div>
                <div className="col-lg-5 col-md-5 ozet-card-col-2">
                  <p className="ozet-card-col-2-p1">Skate Uzun Kollu Erkek Tişört </p>
                  <p className="ozet-card-col-2-p2">Ürün Kodu : UK1302SYBY </p>
                  <p className="ozet-card-col-2-p2">Beden : S </p>
                </div>
                <div className="col-lg-4 col-md-4 ozet-card-col-3">
                  <button className="ozet-card-col-3-sil-btn">
                    <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" fill="gray" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"/></svg>
                    <span>Sil</span>
                  </button>
                    <div className="updown">
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                    </div>
                    <div className="ozet-card-fiyat-flex">
                      <div className="ozet-card-fiyat-indirim">%20</div>
                      <div className="ozet-card-fiyat-1">499₺</div>
                      <div className="ozet-card-fiyat-2">799₺</div>
                    </div>
                </div>
              </div>




            </div>
                <div className="row sepeti-bosalt-flex" >
                  <button className="ozet-card-col-3-sil-btn">
                    <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" fill="gray" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"/></svg>
                    <span>Sepeti Boşalt</span>
                  </button>
                  </div>
          </div>
            <div className="col-lg-4 ozet-sag-col">
              <p className="ozet-baslik">Sepet Özetim</p>
              <div className="ozet-panel">
                  <div className="ozet-panel-item">
                    <p className="ozet-panel-item-p1">Ara Toplam</p>
                    <p className="ozet-panel-item-p2">695₺</p>
                  </div>
              </div>
              <button className="button-next-step primary" id="stepper" >
                Sonraki Adım
              </button>
            </div>
        </div>
    )
  }


export default Odeme1;