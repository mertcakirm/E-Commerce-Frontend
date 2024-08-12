import React, { useState, useEffect } from 'react';
import Admin_sidebar from './admin-sidebar';

const Admin_product = () => {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedProductCode, setSelectedProductCode] = useState(null);
  const [discountValue, setDiscountValue] = useState('');
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const productsPerPage = 10;
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://213.142.159.49:8083/api/admin/product/all')
      .then(response => response.json())
      .then(data => setProducts(data.content))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  const filteredProducts = products.filter(product => {
    const productNameLower = product.productName?.toLowerCase() || '';
    const categoryName = product.category?.name?.toLowerCase() || '';
    const productCode = product.productCode?.toLowerCase() || '';
    const productId = product.id?.toString() || '';

    return (
      productNameLower.includes(searchTerm.toLowerCase()) ||
      categoryName.includes(searchTerm.toLowerCase()) ||
      productCode.includes(searchTerm.toLowerCase()) ||
      productId.includes(searchTerm)
    );
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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
    const imagePreviews = files.map(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => resolve({ file, preview: reader.result });
      });
    });

    Promise.all(imagePreviews).then(images => {
      setSelectedImages(images);
      setImages(prevImages => [...prevImages, ...files]);
    });
  };

  const handleDelete = (productCode) => {
    fetch(`http://213.142.159.49:8083/api/product/delete/${productCode}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setProducts(products.filter(product => product.productCode !== productCode));
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  const applyDiscount = () => {
    fetch(`/product/update/discount/${selectedProductCode}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ discountRate: parseFloat(discountValue) }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Update the product list with the new discount rate
        setProducts(products.map(product =>
          product.productCode === selectedProductCode ? { ...product, discountRate: data.discountRate } : product
        ));
        // Clear the discount value and close the popup
        setDiscountValue('');
        setSelectedProductCode(null);
        togglePopup();
      })
      .catch(error => console.error('Error applying discount:', error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productCategory', productCategory);
    formData.append('productDescription', productDescription);
    formData.append('productStock', productStock);
    formData.append('productPrice', productPrice);

    images.forEach(image => formData.append('images', image));

    fetch('http://213.142.159.49:8083/product/add', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',

      },
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Optionally, update products with the newly added product
        setProducts(prevProducts => [...prevProducts, data]);
        // Close the popup and clear form fields
        togglePopup();
        setProductName('');
        setProductCategory('');
        setProductDescription('');
        setProductStock('');
        setProductPrice('');
        setImages([]);
      })
      .catch(error => console.error('Error adding product:', error));
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
                  {currentProducts.map(product => (
                    <tr key={product.productCode}>
                      <th scope="row">{product.productCode}</th>
                      <td>
                        {product.productImage.length > 0 ? (
                          <img className="img-fluid urunler-listesi-img" src={`http://213.142.159.49:8083/api/files/image/${product.productImage[0]?.url}`} alt="" />
                        ) : (
                          <p>No image</p>
                        )}
                      </td>
                      <td>{product.productName}</td>
                      <td>{product.category ? product.category.name : 'Unknown'}</td>
                      <td>
                        <div className="stok-flex">
                          <p>Toplam Stok: {product.sizes.reduce((total, size) => total + size.stock, 0)}</p>
                          <div className="stok-details">
                            {product.sizes.map((size, index) => (
                              <p key={index}>{size.size}: {size.stock}</p>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="stok-details">
                          <p>Ana Fiyat : {product.priceWithOutDiscount}₺</p>
                          <p>İndirim Oranı : {product.discountRate}%</p>
                          <p>İndirimli Fiyat : {product.priceWithDiscount}₺</p>
                        </div>
                      </td>
                      <td>
                        <div className="user-duzenle-row">
                          <a href="/admin-urunler-guncelle" className="user-edit-btn">
                          <svg fill="white" width="30" height="30" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.75c0-.414.336-.75.75-.75s.75.336.75.75v9.25c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm-2.011 6.526c-1.045 3.003-1.238 3.45-1.238 3.84 0 .441.385.626.627.626.272 0 1.108-.301 3.829-1.249zm.888-.889 3.22 3.22 8.408-8.4c.163-.163.245-.377.245-.592 0-.213-.082-.427-.245-.591-.58-.578-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245z" fillRule="nonzero" />
                            </svg>
                          </a>
                          <button className="user-sil-btn" onClick={() => handleDelete(product.productCode)}>
                          <svg clipRule="evenodd" fillRule="evenodd" width="30" height="30" fill="white" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero" />
                            </svg>
                          </button>
                        </div>
                        <div className='indirim-uygula-flex'>
                          <input
                            type="text"
                            maxLength={2}
                            value={selectedProductCode === product.productCode ? discountValue : ''}
                            onChange={(e) => setDiscountValue(e.target.value)}
                            onFocus={() => setSelectedProductCode(product.productCode)}
                            
                          />
                          <button
                            className='siparis-durumu-btn'
                            onClick={applyDiscount}
                            disabled={!selectedProductCode}
                          >
                            İndirim Yap
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <a className="page-link" href="#" aria-label="Previous" onClick={(e) => handleClick(e, currentPage - 1)}>
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <a className="page-link" href="#" onClick={(e) => handleClick(e, index + 1)}>{index + 1}</a>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <a className="page-link" href="#" aria-label="Next" onClick={(e) => handleClick(e, currentPage + 1)}>
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
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
            <form className="popup-form" onSubmit={handleSubmit}>
              <div>
                <input type="file" multiple onChange={handleImageUpload} />
                <div className="preview-flex">
                  {images.map((image, index) => (
                    <div className="preview-flex-child" key={index}>
                      <img src={URL.createObjectURL(image)} alt={`uploaded-img-${index}`} width="100" />
                      <p>{image.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <input
                type="text"
                placeholder="Ürün Adı"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Ürün Kategorisi"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Ürün Açıklaması"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Stok Sayısı"
                value={productStock}
                onChange={(e) => setProductStock(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Ürün Fiyatı"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                required
              />
              <button type="submit">Kaydet</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin_product;
