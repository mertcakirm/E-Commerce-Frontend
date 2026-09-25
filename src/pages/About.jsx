import "./css/About.css";
import PageLogo from "../components/other/PageLogo.jsx";
import { 
    HiOutlineSparkles, 
    HiOutlineEye, 
    HiOutlineCheckCircle, 
    HiOutlineShieldCheck,
    HiOutlineGlobeAlt,
    HiOutlineHeart
} from "react-icons/hi2";

const About = () => {
  return (
    <div className="about-page-wrapper">
      <div className="container hakkimizda-container">
        
        {/* Hero Başlık Alanı */}
        <div className="about-hero-block text-center" data-aos="fade-up">
          <span className="about-tagline">Hikâyemiz & Felsefemiz</span>
          <h1 className="hakkimizda-baslik">Hakkımızda</h1>
          <p className="about-lead-statement">
            Click & Collect olarak, en son moda trendlerini ve kaliteli ürünleri
            müşterilerimize sunmayı hedefleyen yenilikçi bir e-ticaret platformuyuz.
          </p>
        </div>

        {/* Marka Manifestosu / Tanıtım Kartı */}
        <div className="about-intro-card" data-aos="fade-up">
          <p className="about-intro-text">
            Kullanıcı dostu arayüzümüz ve güvenilir alışveriş deneyimimizle, moda tutkunlarının
            ihtiyaçlarını karşılamak için buradayız. Siz değerli müşterilerimizle birlikte daha güzel
            yarınlara adım atmak için çalışıyor; modaya yön verirken kendi tarzınızı özgürce yaratmanıza
            aracılık ediyoruz.
          </p>
          <div className="about-metrics-row">
            <div className="metric-item">
              <HiOutlineShieldCheck size={26} className="metric-icon" />
              <span>Güvenli Alışveriş</span>
            </div>
            <div className="metric-item">
              <HiOutlineSparkles size={26} className="metric-icon" />
              <span>Trend Koleksiyonlar</span>
            </div>
            <div className="metric-item">
              <HiOutlineHeart size={26} className="metric-icon" />
              <span>Müşteri Memnuniyeti</span>
            </div>
          </div>
        </div>

        {/* Misyon & Vizyon Çift Kart Izgarası */}
        <div className="row g-4 about-pillars-grid">
          
          {/* Misyonumuz */}
          <div className="col-lg-6" data-aos="fade-up">
            <div className="pillar-card mission-card">
              <div className="pillar-header">
                <div className="pillar-icon-box">
                  <HiOutlineSparkles size={22} />
                </div>
                <h2 className="pillar-title">Misyonumuz</h2>
              </div>
              
              <p className="pillar-desc">
                Click & Collect mağazasının misyonu; müşterilerimize kaliteli, uygun fiyatlı ve
                trend ürünleri sunarak onların tarzlarını özgürce ifade edebilmelerini sağlamaktır.
              </p>

              <ul className="pillar-list">
                <li>
                  <HiOutlineCheckCircle size={18} className="list-check-icon" />
                  <span>Müşteri memnuniyetini her zaman ön planda tutuyoruz.</span>
                </li>
                <li>
                  <HiOutlineCheckCircle size={18} className="list-check-icon" />
                  <span>Geniş ürün yelpazesiyle her zevke ve ihtiyaca hitap ediyoruz.</span>
                </li>
                <li>
                  <HiOutlineCheckCircle size={18} className="list-check-icon" />
                  <span>Güvenli ve kolay bir alışveriş deneyimi sunuyoruz.</span>
                </li>
                <li>
                  <HiOutlineCheckCircle size={18} className="list-check-icon" />
                  <span>Modayı herkes için erişilebilir kılmak amacıyla uygun fiyat politikası izliyoruz.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Vizyonumuz */}
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <div className="pillar-card vision-card">
              <div className="pillar-header">
                <div className="pillar-icon-box dark">
                  <HiOutlineEye size={22} />
                </div>
                <h2 className="pillar-title">Vizyonumuz</h2>
              </div>

              <p className="pillar-desc">
                Click & Collect olarak vizyonumuz, e-ticaret sektöründe öncü, ilham veren ve
                güvenilir bir moda markası olmaktır.
              </p>

              <ul className="pillar-list">
                <li>
                  <HiOutlineCheckCircle size={18} className="list-check-icon" />
                  <span>Teknolojik yenilikleri takip ederek, kullanıcı deneyimini sürekli geliştiriyoruz.</span>
                </li>
                <li>
                  <HiOutlineCheckCircle size={18} className="list-check-icon" />
                  <span>Sürdürülebilir moda anlayışını benimseyerek, çevreye duyarlı adımlar atıyoruz.</span>
                </li>
                <li>
                  <HiOutlineCheckCircle size={18} className="list-check-icon" />
                  <span>Global bir marka olma yolunda ilerleyerek, dünya standartlarında müşteri memnuniyetini hedefliyoruz.</span>
                </li>
                <li>
                  <HiOutlineCheckCircle size={18} className="list-check-icon" />
                  <span>Moda dünyasında trendleri belirleyen ve takip edilen bir platform olmayı amaçlıyoruz.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Logo / Footer Geçişi */}
        <div className="about-footer-logo text-center py-5">
          <PageLogo size="25" />
        </div>

      </div>
    </div>
  );
};

export default About;
