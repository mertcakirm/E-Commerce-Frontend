import React, { Component, useEffect, useState } from 'react'
import { getCookie } from '../cookie/cookie';
const Sepet_ozeti =()=>{
    const [totalprice, setTotalprice] = useState(0);
    const token = getCookie("token");

    useEffect(() => {
        fetch('http://213.142.159.49:8083/api/basket/get', {
          headers: {
            'Authorization': `Bearer ${token}`, 
            "Content-Type": "application/json",
          }
        })
          .then(response => response.json())
          .then(data => {
            console.log('Fetched data:', data);  
            // setCartItems(data.bucketItems); 
            setTotalprice(data.price)
            // setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching cart data:', error);
            setLoading(false);
          });
      }, []);
    return (
        <>
        <p className="ozet-baslik">Sepet Özetim</p>
        <div className="ozet-panel">
          <div className="ozet-panel-item">
            <p className="ozet-panel-item-p1">Ara Toplam</p>
            <p className="ozet-panel-item-p2">{totalprice}₺</p>
          </div>
        </div>

        </>
    )
  }


export default Sepet_ozeti