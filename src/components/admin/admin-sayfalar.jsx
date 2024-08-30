import React, { useState } from 'react';
import Admin_sidebar from './admin-sidebar';
import './admin-css/admin-genel.css';

const Admin_sayfalar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sliderData, setSliderData] = useState({
    sliderimage: "",
    topTitle: "",
    middleTitle: "",
    underTitle: "",
    redirectAddress: ""
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSliderData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    console.log(`Updated ${id}: `, value);  // Konsol logu
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await toBase64(file);
      setSliderData((prevState) => ({
        ...prevState,
        sliderimage: base64.split(',')[1], 
      }));
      console.log("Updated slider image: ", base64.split(',')[1]);  // Konsol logu
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting slider data: ", sliderData);  // Konsol logu

    const sliderDTO = {
      bytes: sliderData.sliderimage, 
      category: "Şort",
      topTitle: sliderData.topTitle,
      middleTitle: sliderData.middleTitle,
      underTitle: sliderData.underTitle,
      redirectAddress: sliderData.redirectAddress,
    };
  
    try {
      const response = await fetch('http://213.142.159.49:8083/api/slider/main/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sliderDTO),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Response data: ", data);
        alert("Slider successfully added!");
      } else {
        const errorData = await response;
        console.error("Error response: ", errorData);
      }
    } catch (error) {
      console.error("Request error: ", error);
    }
  };
  return (
    <div>
      <Admin_sidebar />
      <div className="admin-sag-container">
        <div className="col-12 alt-basliklar-admin">Sayfa İçerikleri</div>
        <div className="row admin-genel-row">
          <div className="col-12">
            <div className="site-icerik-shadow2 row">
              <div className="col-12 alt-basliklar-admin">Slider İçerikleri</div>

              <form className="col-lg-4 sayfa-icerikleri-flex" onSubmit={handleSubmit}>
                <div className="row">
                  <label className='col-5' htmlFor="image">Slider Görseli</label>
                  <input className='col-7' type="file" id='image' onChange={handleFileChange} />
                </div>
                <div className="row">
                  <label className='col-5' htmlFor="topTitle">Üst Başlık</label>
                  <input className='col-7' type="text" id='topTitle' value={sliderData.topTitle} onChange={handleInputChange} />
                </div>
                <div className="row">
                  <label className='col-5' htmlFor="middleTitle">Ana Başlık</label>
                  <input className='col-7' type="text" id='middleTitle' value={sliderData.middleTitle} onChange={handleInputChange} />
                </div>
                <div className="row">
                  <label className='col-5' htmlFor="underTitle">Alt Başlık</label>
                  <input className='col-7' type="text" id='underTitle' value={sliderData.underTitle} onChange={handleInputChange} />
                </div>
                <div className="row">
                  <label className='col-5' htmlFor="redirectAddress">Kategori</label>
                  <input className='col-7' type="text" id='redirectAddress' value={sliderData.redirectAddress} onChange={handleInputChange} />
                </div>
                <button className='tumunu-gor-btn-admin' type="submit">Slider Ekle</button>
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

          <div className="row admin-genel-row">

          <div className="col-12">
            <div className="site-icerik-shadow2 row" style={{rowGap:'30px'}}>
              <div className="col-12 alt-basliklar-admin ">Kategori Kartları</div>
              <div>
              <button className='tumunu-gor-btn-admin col-12' onClick={openModal} style={{width:'300px', marginTop:'30px'}} >Kategori Kartı Ekle</button>
              </div>
                <div className="col-lg-4">
                  <div className="kategori-card-admin-sayfalar">
                    <img src="https://cdn.aksesuarix.com/Fotograflar/thumbs/87087-outlet.jpg" className='img-fluid w-100 kategori-card-admin-sayfalar-img' alt="" />
                    <p>Kart Kategori Adı : TİŞORT</p>
                    <p>Kategori : tisort</p>
                    <p>Boyut : 1/3</p>
                    <button type="button" className='tumunu-gor-btn-admin'>Sil</button>
                  
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="kategori-card-admin-sayfalar">
                    <img src="https://cdn.aksesuarix.com/Fotograflar/thumbs/87087-outlet.jpg" className='img-fluid w-100 kategori-card-admin-sayfalar-img' alt="" />
                    <p>Kart Kategori Adı : TİŞORT</p>
                    <p>Kategori : tisort</p>
                    <p>Boyut : 1/3</p>
                    <button type="button" className='tumunu-gor-btn-admin'>Sil</button>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="kategori-card-admin-sayfalar">
                    <img src="https://cdn.aksesuarix.com/Fotograflar/thumbs/87087-outlet.jpg" className='img-fluid w-100 kategori-card-admin-sayfalar-img' alt="" />
                    <p>Kart Kategori Adı : TİŞORT</p>
                    <p>Kategori : tisort</p>
                    <p>Boyut : 1/2</p>
                    <button type="button" className='tumunu-gor-btn-admin'>Sil</button>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="kategori-card-admin-sayfalar">
                    <img src="https://cdn.aksesuarix.com/Fotograflar/thumbs/87087-outlet.jpg" className='img-fluid w-100 kategori-card-admin-sayfalar-img' alt="" />
                    <p>Kart Kategori Adı : TİŞORT</p>
                    <p>Kategori : tisort</p>
                    <p>Boyut : Full</p>
                    <button type="button" className='tumunu-gor-btn-admin'>Sil</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Popup Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="model-header">
            <h3>Kategori Kartı Ekle</h3>
            <button className="popup-close-btn" onClick={closeModal}>&times;</button>
            </div>
            <form className='row mt-3' style={{rowGap:'30px'}}>
              <div className="row">
                <label htmlFor="kategori-kart-ekle-resim" className='col-4'>Kart Resmi</label>
                <input className='col-8' type="file" />
              </div>
              <div className="row">
                <label className='col-4' htmlFor="kategori-adi">Kategori Adı</label>
                <input className='col-8' type="text" id='kategori-adi' />
              </div>
              <div className="row">
                <label className='col-4' htmlFor="yonlendirme-adresi">Kategori</label>
                <input className='col-8' type="text" id='yonlendirme-adresi' />
              </div>
              <div className="row">
                <label className='col-4' htmlFor="boyut">Boyut</label>
                <select name="kart-kategori-select" id="kart-kategori-select" className="col-8">
                  <option value="12">Full</option>
                  <option value="6">Yarım</option>
                  <option value="4">1/3</option>
                </select>
              </div>
              <button type="button" className='tumunu-gor-btn-admin'>Kaydet</button>
            </form>
          </div>
        </div>
      )}
      </div>
    )
  }


export default Admin_sayfalar;