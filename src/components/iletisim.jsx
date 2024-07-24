import React, { Component } from 'react'
import Navbar from './navbar'
import Footer from './footer'
import './css/iletisim.css';
const iletisim=()=> {
    return (
      <div>
        <Navbar />

        <div className="container iletisim-container">
            <div className="row">
                <div className="col-12">
                    <p className='hakkimizda-baslik'>İLETİŞİM</p>
                    <form>
                        <div className="row iletisim-row">
                            <div className="col-12">
                                <input type="text" className='adres-input' placeholder='Ad Soyad' />
                            </div>
                            <div className="col-12">
                                <input type="text" className='adres-input' placeholder='E-Posta Adresiniz' />
                            </div>
                            <div className="col-12">
                                <input type="text" className='adres-input' placeholder='Telefon Numaranız' />
                            </div>
                            <div className="col-12">
                                <input type="text" className='adres-input' placeholder='Konu' />
                            </div>
                            <div className="col-12">
                                <textarea style={{paddingLeft:'1%', height:'150px'}} name="mesajiniz" id="mesajiniz" placeholder='Mesajınız'></textarea>
                            </div>
                        </div>
                        <div className='iletisim-form-submit'>
                            <button type='submit'>GÖNDER</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <Footer />
      </div>
    )
  }


export default iletisim;