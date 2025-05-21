import Navbar from "../components/childcomponents/navbar";
import Footer from "../components/childcomponents/footer";
import "./css/hakkimizda.css";
import { Helmet } from "react-helmet";

const Hakkimizda = () => {
  return (
    <div>
      <Helmet>
        <title>Hakkımızda</title>
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

      <div className="container hakkimizda-container">
        <div className="row">
          <div className="col-12">
            <div className="hakkimizda-baslik">hakkımızda</div>
            <div className="hakkimizda-icerik">
              <p className="hakkimizda-icerik-p1">
                Mob-Wear olarak, en son moda trendlerini ve kaliteli ürünleri
                müşterilerimize sunmayı hedefleyen yenilikçi bir e-ticaret
                platformuyuz. Kullanıcı dostu arayüzümüz ve güvenilir alışveriş
                deneyimimizle, moda tutkunlarının ihtiyaçlarını karşılamak için
                buradayız.
              </p>
              <div className="hakkimizda-icerik-baslik">
                <span>|</span>Misyonumuz
              </div>
              <p className="hakkimizda-icerik-p1">
                Mob-Wear'ın misyonu, müşterilerimize kaliteli, uygun fiyatlı ve
                trend ürünleri sunarak, onların tarzlarını özgürce ifade
                edebilmelerini sağlamaktır. Bu misyon doğrultusunda:
              </p>
              <li className="hakkimizda-icerik-p1">
                Müşteri memnuniyetini her zaman ön planda tutuyoruz.
              </li>
              <li className="hakkimizda-icerik-p1">
                Geniş ürün yelpazesiyle her zevke ve ihtiyaca hitap ediyoruz.
              </li>
              <li className="hakkimizda-icerik-p1">
                Güvenli ve kolay bir alışveriş deneyimi sunuyoruz.
              </li>
              <li className="hakkimizda-icerik-p1">
                Modayı herkes için erişilebilir kılmak amacıyla uygun fiyat
                politikası izliyoruz.
              </li>

              <div className="hakkimizda-icerik-baslik">
                <span>|</span>Vizyonumuz
              </div>
              <p className="hakkimizda-icerik-p1">
                Mob-Wear olarak vizyonumuz, e-ticaret sektöründe öncü ve
                güvenilir bir marka olmaktır. Bu vizyonu gerçekleştirmek için:
              </p>
              <li className="hakkimizda-icerik-p1">
                Teknolojik yenilikleri takip ederek, kullanıcı deneyimini
                sürekli geliştiriyoruz.
              </li>
              <li className="hakkimizda-icerik-p1">
                Sürdürülebilir moda anlayışını benimseyerek, çevreye duyarlı
                ürünler sunuyoruz.
              </li>
              <li className="hakkimizda-icerik-p1">
                Global bir marka olma yolunda adımlar atarak, dünya çapında
                müşteri memnuniyetini hedefliyoruz.
              </li>
              <li className="hakkimizda-icerik-p1">
                Moda dünyasında trendleri belirleyen ve takip edilen bir
                platform olmayı amaçlıyoruz.
              </li>
              <p className="hakkimizda-icerik-p1">
                Mob-Wear olarak, siz değerli müşterilerimizle birlikte daha
                güzel yarınlara adım atmak için çalışıyoruz. Bizimle alışveriş
                yaparak, modaya yön verin ve kendi tarzınızı yaratın!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Hakkimizda;
