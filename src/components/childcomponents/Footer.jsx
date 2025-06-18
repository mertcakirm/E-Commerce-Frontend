import React, {Component} from 'react'
import './css/footer.css';

const Footer = () => {
    return (
        <div>
            <div className="container-fluid footer-container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="footer-col">
                            <p className='footer-baslik'>YARDIM DESTEK</p>
                            <a href='/sss' className='footer-icerik'>Üyelik</a>
                            <a href='/sss' className='footer-icerik'>Sipariş</a>
                            <a href='/sss' className='footer-icerik'>Ödeme</a>
                            <a href='/sss' className='footer-icerik'>Kargo ve Teslimat</a>
                            <a href='/sss' className='footer-icerik'>İade Ve Değişim</a>
                            <a href='/sss' className='footer-icerik'>Sık Sorulan Sorular</a>
                            <a href='/sss' className='footer-icerik'>İşlem Rehberi</a>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="footer-col">
                            <p className='footer-baslik'>KURUMSAL</p>
                            <a href='/' className='footer-icerik'>Anasayfa</a>
                            <a href='../hakkimizda' className='footer-icerik'>Hakkımızda</a>
                            <a href='/urunler/tum-urunler' className='footer-icerik'>Ürünler</a>
                            <a href='../iletisim' className='footer-icerik'>İletişim</a>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="footer-col">
                            <p className='footer-baslik'>BİZİ TAKİP EDİN</p>
                            <div className='bizi-takip-edin-footer-flex'>
                                <a href='#' className='bizi-takip-edin-item'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path
                                            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </a>
                                <a href='#' className='bizi-takip-edin-item'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path
                                            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                                    </svg>
                                </a>
                                <a href='#' className='bizi-takip-edin-item'>
                                    <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision"
                                         textRendering="geometricPrecision" imageRendering="optimizeQuality"
                                         fillRule="evenodd" clipRule="evenodd" viewBox="-200 -200 900 900">
                                        <path fillRule="nonzero"
                                              d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"/>
                                    </svg>
                                </a>
                                <a href='#' className='bizi-takip-edin-item'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path
                                            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                    </svg>
                                </a>
                            </div>
                            <p className='footer-baslik-odeme'>ÖDEME YÖNTEMLERİ</p>
                            <div className='odeme-yontemleri-flex'>
                                <img
                                    src="data:image/png;base64,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"
                                    alt=""/>
                                <img
                                    src="https://www.businessworldglobal.com/wp-content/uploads/2019/06/1559305839_MC_Logo__1.jpg"
                                    alt=""/>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="kvkk-flex">
                    <a className='kvkk-item' href="/bilgilendirmeler">Kullanım Koşulları</a>
                    <a className='kvkk-item' href="/bilgilendirmeler">Gizlilik ve Güvenlik</a>
                    <a className='kvkk-item' href="/bilgilendirmeler">Tüketici Haklarının Korunması Kanunu</a>
                    <a className='kvkk-item' href="/bilgilendirmeler">Mesafeli Satış Sözleşmesi</a>
                    <a className='kvkk-item' href="/bilgilendirmeler">KVKK</a>
                </div>
            </div>
        </div>
    )
}

export default Footer;