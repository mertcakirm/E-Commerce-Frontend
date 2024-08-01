import React, { Component, useState } from 'react'
import Admin_sidebar from './admin-sidebar';

const productsData = [
  { id: 1, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 64  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:20,large:5,xlarge:10,xsmall:20}},
  { id: 2, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 64  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:20,large:5,xlarge:10,xsmall:20}},
  { id: 3, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 64  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:20,large:5,xlarge:10,xsmall:20}},
  { id: 4, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 64  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:20,large:5,xlarge:10,xsmall:20}},
  { id: 5, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 64  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:20,large:5,xlarge:10,xsmall:20}},
  { id: 6, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 64  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:20,large:5,xlarge:10,xsmall:20}},
  { id: 7, name: "search", Kategori: "Üst Giyim", stok: 64  , harcama:"30000" ,fiyat:699,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:20,large:5,xlarge:10,xsmall:20}},
  { id: 8, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 64  , harcama:"30000" ,fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:20,large:5,xlarge:10,xsmall:20}},
  { id: 9, name: "Mob Wear Şort", Kategori: "Üst Giyim", stok: 64  , harcama:"30000" ,fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:20,large:5,xlarge:10,xsmall:20}},
  { id: 10, name:"Mob Wear Şort", Kategori: "Üst Giyim", stok: 64 , harcama:"30000" , fiyat:399,img:"https://cdn.aksesuarix.com/Fotograflar/575/90032-polo-yaka-ekru-erkek-tisort-us4152ek-us4152ek-01-1.jpg" , stoklar:{medium:9,small:20,large:5,xlarge:10,xsmall:20}},
];



const Admin_product = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const productsPerPage = 10;

  const filteredproducts = productsData.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.Kategori.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastproduct = currentPage * productsPerPage;
  const indexOfFirstproduct = indexOfLastproduct - productsPerPage;
  const currentproducts = filteredproducts.slice(indexOfFirstproduct, indexOfLastproduct);

  const totalPages = Math.ceil(filteredproducts.length / productsPerPage);

  const handleClick = (event, pageNumber) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imagePreviews = files.map(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => resolve({ file, url: reader.result });
      });
    });

    Promise.all(imagePreviews).then(images => {
      setSelectedImages(images);
    });
  };

  return (
    <div>
      <Admin_sidebar />
      <div className="admin-sag-container">
        <div className="row admin-genel-row">
          <div className="col-12 alt-basliklar-admin">
            <p>Ürün Listesi</p>
            <input
              type="text"
              placeholder="Ara..."
              className="admin-search-inp"
              value={searchTerm}
              onChange={handleSearch}
            />
            <br />
            <br />
            <button className='tumunu-gor-btn-admin' onClick={togglePopup}>Ürün Ekle</button>
          </div>
          <div className="col-12 mt-5">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Ürün Kodu</th>
                    <th scope="col">Ürün Görseli</th>
                    <th scope="col">Ürün Adı</th>
                    <th scope="col">Ürün Kategorisi</th>
                    <th scope="col">Stok Sayısı</th>
                    <th scope="col">Ürün Fiyatı</th>
                    <th scope="col">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {currentproducts.map(product => (
                    <tr key={product.id}>
                      <th scope="row">{product.id}</th>
                      <td><img className="img-fluid urunler-listesi-img" src={product.img} alt="" /></td>
                      <td>{product.name}</td>
                      <td>{product.Kategori}</td>
                      <td>
                        <div className="stok-flex">
                          <p>Toplam Stok: {product.stok}</p>
                          <div className="stok-details">
                            <p>Medium: {product.stoklar.medium}</p>
                            <p>Small: {product.stoklar.small}</p>
                            <p>Large: {product.stoklar.large}</p>
                            <p>X-Large: {product.stoklar.xlarge}</p>
                            <p>X-Small: {product.stoklar.xsmall}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="stok-details">
                          <p>Ana Fiyat : {product.fiyat}₺</p>
                          <p>İndirim Oranı : 20%</p>
                          <p>İndirimli Fiyat : 299₺</p>
                        </div>
                      </td>
                      <td>
                        <div className="user-duzenle-row">
                          <a href="/admin-urunler-guncelle" className="user-edit-btn">
                            <svg fill="white" width="30" height="30" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.75c0-.414.336-.75.75-.75s.75.336.75.75v9.25c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm-2.011 6.526c-1.045 3.003-1.238 3.45-1.238 3.84 0 .441.385.626.627.626.272 0 1.108-.301 3.829-1.249zm.888-.889 3.22 3.22 8.408-8.4c.163-.163.245-.377.245-.592 0-.213-.082-.427-.245-.591-.58-.578-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245z" fillRule="nonzero" />
                            </svg>
                          </a>
                          <button className="user-sil-btn">
                            <svg clipRule="evenodd" fillRule="evenodd" width="30" height="30" fill="white" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero" />
                            </svg>
                          </button>
                        </div>
                        <div className='indirim-uygula-flex'>
                        <input type="text" maxLength={2} name="indirim-uygula" id="indirim-uygula" />
                        <button className='siparis-durumu-btn'>İndirim Yap</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="row col-12 justify-content-center">
                <nav aria-label="Page navigation example" className="col-6">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <a className="page-link" href="#" onClick={event => handleClick(event, currentPage - 1)} tabIndex="-1" aria-disabled="true"><span aria-hidden="true">&laquo;</span></a>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <a className="page-link" href="#" onClick={event => handleClick(event, i + 1)}>{i + 1}</a>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <a className="page-link" href="#" onClick={event => handleClick(event, currentPage + 1)}><span aria-hidden="true">&raquo;</span></a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <div className="popup-header">
                <h2>Ürün Ekle</h2>
                <button className="popup-close-btn" onClick={togglePopup}>&times;</button>
              </div>
              <form className="popup-form">
              <div>
              <input type="file" multiple onChange={handleImageUpload} />
              <div className="preview-flex" >
                {images.map((image, index) => (
                  <div className="preview-flex-child" key={index}>
                    <img src={URL.createObjectURL(image)} alt={`uploaded-img-${index}`} width="100" />
                    <p>{image.name}</p>
                  </div>
                ))}
              </div>
              </div>
                <div className="image-previews">
                  {selectedImages.map((image, index) => (
                    <img key={index} src={image.url} alt={`Preview ${index}`} className="image-preview" />
                  ))}
                </div>
                <input type="text" placeholder="Ürün Adı" required />
                <input type="text" placeholder="Ürün Kategorisi" required />
                <input type="text" placeholder="Ürün Açıklaması" required />
                <input type="text" placeholder="Stok Sayısı" required />
                <input type="number" placeholder="Ürün Fiyatı" required />
                <button type="submit">Kaydet</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin_product;