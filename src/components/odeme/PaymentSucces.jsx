import {Helmet} from "react-helmet";

const PaymentSucces = () => {
    return (
        <div className='row'>
            <Helmet>
                <title>Onay</title>
                <meta
                    name="description"
                    content="Mob Wear olarak yeni modaya hitap ediyor ve buna göre ürünleri sizler için üretiyoruz."
                />
                <meta
                    name="keywords"
                    content="tişört,pantolon,giyim,moda,erkek giyim"
                />
                <meta name="author" content="MOB WEAR"/>
                <meta property="og:title" content="Kaliteli Kıyafetler"/>
                <meta
                    property="og:description"
                    content="Mob Wear olarak yeni modaya hitap ediyor ve buna göre ürünleri sizler için üretiyoruz."
                />
                <meta property="og:image" content="URL_of_image"/>
                <meta property="og:url" content="URL_of_your_website"/>
                <meta property="og:type" content="website"/>
            </Helmet>
            <div className="col-12 onay-svg-parent">
                <svg className='onay-svg' clipRule="evenodd" fill='green' width="100" fillRule="evenodd"
                     strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-5.049 10.386 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z"
                        fillRule="nonzero"/>
                </svg>
                <h2 className='onay-metin'>Siparişiniz Onaylandı</h2>
                <a href="/">Anasayfaya Gitmek İçin Tıklayınız</a>
            </div>
        </div>
    )
}


export default PaymentSucces;