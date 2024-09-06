import React, { Component, useEffect, useState } from 'react'
import { Helmet } from "react-helmet";
import "../css/odeme.css";
import Sepet_ozeti from './sepet-ozeti';

const Odeme1=()=>{

  const [productCount, setProductCount] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalprice, setTotalprice] = useState(0);

  useEffect(() => {
    fetch('http://213.142.159.49:8083/api/basket/get', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        "Content-Type": "application/json",
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);  
        setCartItems(data.bucketItems); 
        setTotalprice(data.price)
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
        setLoading(false);
      });
  }, []);

  const deleteItemFromBasket = (productCode) => {
    const token = localStorage.getItem('token');  // Get the token from localStorage
  
    if (!token) {
      console.error('No token found');
      return;
    }
  
    fetch(`http://213.142.159.49:8083/api/basket/delete/${productCode}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'  // Set the content type to JSON
      }
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {
        console.log('Item deleted:', data);
        // Optionally, update the cart state or UI here
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };

  const incrementProductCount = (productCode) => {
    fetch(`http://213.142.159.49:8083/api/basket/increase/quantity/${productCode}`, {
      method: 'GET', // or 'POST' if that's what your API expects
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        if (response.ok) {
          setProductCount(prevCount => prevCount + 1);
        } else {
          console.error('Error incrementing product count');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  
  const decrementProductCount = (productCode) => {
      fetch(`http://213.142.159.49:8083/api/basket/decrease/quantity/${productCode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(response => {
          if (response.ok) {
            setProductCount(prevCount => prevCount - 1);
          } else {
            console.error('Error decrementing product count');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
  };

    if (loading) {
    return (
      <div className="d-flex justify-content-center" style={{ height: '50vh', alignItems: 'center' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
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
            {loading ? (
                <p>Loading...</p>
              ) : (
                cartItems.map((item) => (
              <div className="sepet-ozet-card row">
                
                <div className="col-lg-3 col-md-3">
                  <a href="#">
                  <img src={`data:image/jpeg;base64,${item.image.bytes}`} className="img-fluid w-100 sepet-resim" alt="" />
                  </a>
                </div>
                <div className="col-lg-5 col-md-5 ozet-card-col-2">
                  <p className="ozet-card-col-2-p1">{item.productName} </p>
                  <p className="ozet-card-col-2-p2">Ürün Kodu : {item.productCode} </p>
                  <p className="ozet-card-col-2-p2">Beden : {item.size} </p>
                </div>
                <div className="col-lg-4 col-md-4 ozet-card-col-3">
                  <button className="ozet-card-col-3-sil-btn" onClick={()=>deleteItemFromBasket(item.productCode)}>
                    <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" fill="gray" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"/></svg>
                    <span>Sil</span>
                  </button>
                    <div className="updown">
                        <button onClick={() => decrementProductCount(item.productCode)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => incrementProductCount(item.productCode)}>+</button>
                    </div>
                    <div className="ozet-card-fiyat-flex">
                      <div className="ozet-card-fiyat-indirim">%20</div>
                      <div className="ozet-card-fiyat-1">{item.priceWithDiscount}₺</div>
                      <div className="ozet-card-fiyat-2">{item.priceWithOutDiscount}₺</div>
                    </div>
                </div>
              </div>
        ))
      )}



            </div>
                {/* <div className="row sepeti-bosalt-flex" >
                  <button className="ozet-card-col-3-sil-btn">
                    <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" fill="gray" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"/></svg>
                    <span>Sepeti Boşalt</span>
                  </button>
                  </div> */}
          </div>
            <div className="col-lg-4 ozet-sag-col">
                  <Sepet_ozeti />
                  <button className="button-next-step primary" onClick={()=>window.location.href="/siparis/kargo"} id="stepper" >
                    Sonraki Adım
                  </button>
            </div>
        </div>
    )
  }


export default Odeme1;