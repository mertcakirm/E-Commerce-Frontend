import Navbar from "../components/childcomponents/navbar";
import Footer from "../components/childcomponents/footer";
import { Helmet } from "react-helmet";
import "./css/giris.css";
const Parola_yenile = () => {
  return (
    <div>
      <Helmet>
        <title>Parola Yenile</title>
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
      <Navbar />
      <div className="container parola-yenile-container">
        <div className="row">
          <div className="col-12 text-center parola-yenile-flex">
            <h2>E-Posta Gönder</h2>
            <input
              type="text"
              name="parola-yenile-inp"
              id="parola-yenile-inp"
              placeholder="E-Posta adresinizi giriniz..."
            />
            <button className="e-posta-gonder">Gönder</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Parola_yenile;
