import React, { Component } from 'react'
import Navbar from './navbar';
import Footer from './footer';
import './css/giris.css'
const Parola_yenile =()=> {
    return (
      <div>
        <Navbar />
            <div className="container parola-yenile-container">
                <div className="row">
                    <div className="col-12 text-center parola-yenile-flex">
                        <h2>E-Posta Gönder</h2>
                        <input type="text" name="parola-yenile-inp" id="parola-yenile-inp" placeholder='E-Posta adresinizi giriniz...' />
                        <button className='e-posta-gonder'>Gönder</button>
                    </div>
                </div>
            </div>

        <Footer />
      </div>
    )
  }


export default Parola_yenile;