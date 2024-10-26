import {useEffect, useState, useRef} from 'react';
import { Helmet } from "react-helmet";
import "../../pages/css/odeme.css";
import { adetArttir, adetAzalt, sepetiGetir, sepettenSil } from '../childcomponents/api/sepetapi';
import Sepet_ozeti from "./sepet-ozeti";

const Odeme1 = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const fUpdater = useRef(null);


  useEffect(() => {
    fetchSepetData();
  }, []);


  const fetchSepetData = async () => {
    try {
      const data = await sepetiGetir();
      setCartItems(data.bucketItems);
      setLoading(false);
    } catch (error) {
      console.error('Sepet verileri alınamadı:', error);
    }
  };

  const deleteItemFromBasket = async (productCode) => {
    try {
      await sepettenSil(productCode);
      const updatedItems = cartItems.filter(item => item.productCode !== productCode);
      setCartItems(updatedItems);

    } catch (error) {
      console.error('Ürün silinemedi:', error);
    }
  };
  
  const incrementProductCount = async (productCode) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.productCode === productCode) {
        const newQuantity = item.quantity + 1;
        const newPriceWithDiscount = (item.priceWithDiscount / item.quantity) * newQuantity;
        const newPriceWithOutDiscount = (item.priceWithOutDiscount / item.quantity) * newQuantity;
        return { 
          ...item, 
          quantity: newQuantity, 
          priceWithDiscount: newPriceWithDiscount,
          priceWithOutDiscount: newPriceWithOutDiscount
        }; 
      }
      return item;
    });
    setCartItems(updatedCartItems);
  
    try {
      await adetArttir(productCode);
      fUpdater.current()
    } catch (error) {
      console.error('Ürün adedi arttırılamadı:', error);
    }

  };
  
  
  const decrementProductCount = async (productCode) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.productCode === productCode && item.quantity > 1) {
        const newQuantity = item.quantity - 1;
        const newPriceWithDiscount = (item.priceWithDiscount / item.quantity) * newQuantity;
        const newPriceWithOutDiscount = (item.priceWithOutDiscount / item.quantity) * newQuantity;
        return { 
          ...item, 
          quantity: newQuantity, 
          priceWithDiscount: newPriceWithDiscount,
          priceWithOutDiscount: newPriceWithOutDiscount
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  
    try {
      await adetAzalt(productCode);
      fUpdater.current()
    } catch (error) {
      console.error('Ürün adedi azaltılamadı:', error);
    }

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
        <meta name="description" content="Mob Wear olarak yeni modaya hitap ediyor ve buna göre ürünleri sizler için üretiyoruz." />
        <meta name="keywords" content="tişört,pantolon,giyim,moda,erkek giyim" />
        <meta name="author" content="MOB WEAR" />
        <meta property="og:title" content="Kaliteli Kıyafetler" />
        <meta property="og:description" content="Mob Wear olarak yeni modaya hitap ediyor ve buna göre ürünleri sizler için üretiyoruz." />
        <meta property="og:image" content="URL_of_image" />
        <meta property="og:url" content="URL_of_your_website" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="col-lg-8">
        <p className="ozet-baslik">Ürünlerim</p>
        <div className="sepet-ozet-flex">
          {cartItems.map((item, index) => (
            <div key={index} className="sepet-ozet-card row">
              <div className="col-lg-3 col-md-3">
                <a href="#">
                  <img src={`data:image/jpeg;base64,${item.image.bytes}`} className="img-fluid w-100 sepet-resim" alt="" />
                </a>
              </div>
              <div className="col-lg-5 col-md-5 ozet-card-col-2">
                <p className="ozet-card-col-2-p1">{item.productName}</p>
                <p className="ozet-card-col-2-p2">Ürün Kodu: {item.productCode}</p>
                <p className="ozet-card-col-2-p2">Beden: {item.size}</p>
              </div>
              <div className="col-lg-4 col-md-4 ozet-card-col-3">
                <button className="ozet-card-col-3-sil-btn" onClick={() => deleteItemFromBasket(item.productCode)}>
                  <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" fill="gray" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero" />
                  </svg>
                  <span>Sil</span>
                </button>
                <div className="updown">
                  <button onClick={() => decrementProductCount(item.productCode)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementProductCount(item.productCode)}>+</button>
                </div>
                <div className="ozet-card-fiyat-flex">
                  <div className="ozet-card-fiyat-indirim">%{item.quantity}</div>
                  <div className="ozet-card-fiyat-1">{item.priceWithDiscount}₺</div>
                  <div className="ozet-card-fiyat-2">{item.priceWithOutDiscount}₺</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-lg-4 ozet-sag-col">
        <Sepet_ozeti updateTrigger={(f) => fUpdater.current = f} />
        <button className="button-next-step primary" onClick={() => window.location.href = "/siparis/kargo"} id="stepper">
          Sonraki Adım
        </button>
      </div>
    </div>
  );
};

export default Odeme1;
