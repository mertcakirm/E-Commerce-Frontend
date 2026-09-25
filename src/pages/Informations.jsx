import "./css/Informations.css";
import { 
  HiOutlineDocumentText, 
  HiOutlineShieldCheck, 
  HiOutlineScale, 
  HiOutlineTruck, 
  HiOutlineFingerPrint,
  HiOutlineInformationCircle
} from "react-icons/hi2";

const Informations = () => {
  return (
    <div className="informations-page-wrapper">
      <div className="container bilgilendirmeler-container">
        {/* Üst Başlık Alanı */}
        <div className="info-hero-header text-center" data-aos="fade-up">
          <span className="info-tagline">Yasal & Kurumsal</span>
          <h1 className="info-main-title">Bilgilendirmeler ve Sözleşmeler</h1>
          <p className="info-lead-text">
            Siparişleriniz, kişisel verileriniz ve yasal haklarınız ile ilgili tüm kuralları ve şartları inceleyebilirsiniz.
          </p>
        </div>

        {/* Akordeon Kart Alanı */}
        <div className="row justify-content-center" data-aos="fade-up">
          <div className="col-12 col-xl-10">
            <div className="accordion accordion-flush modern-info-accordion" id="accordionFlushExample">
              
              {/* 1. Kullanım Koşulları */}
              <div className="accordion-item modern-info-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed modern-info-btn"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    <div className="info-btn-content">
                      <div className="info-icon-badge">
                        <HiOutlineDocumentText size={20} />
                      </div>
                      <div className="text-start">
                        <span className="info-title-main">Kullanım Koşulları</span>
                        <span className="info-title-sub">Web sitemizin kullanım kuralları ve genel şartlar</span>
                      </div>
                    </div>
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body modern-info-body">
                    <p>
                      Bu web sitesini ziyaret ederek ve kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız:
                    </p>
                    <ul>
                      <li>Web sitemizde yer alan tüm görsel, logo ve tasarımların telif hakları firmamıza aittir.</li>
                      <li>Kullanıcılar, site üzerindeki işlemlerinde yasalara ve genel ahlak kurallarına uygun hareket etmeyi taahhüt eder.</li>
                      <li>Ürün stok durumu, fiyatlandırma ve kampanyalar önceden haber verilmeksizin güncellenebilir.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 2. Gizlilik ve Güvenlik */}
              <div className="accordion-item modern-info-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed modern-info-btn"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    <div className="info-btn-content">
                      <div className="info-icon-badge">
                        <HiOutlineShieldCheck size={20} />
                      </div>
                      <div className="text-start">
                        <span className="info-title-main">Gizlilik ve Güvenlik</span>
                        <span className="info-title-sub">Ödeme güvenliği, SSL sertifikaları ve veri koruma</span>
                      </div>
                    </div>
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body modern-info-body">
                    <p>
                      Müşterilerimizin kişisel ve finansal bilgilerinin gizliliği bizim için en yüksek önceliktir.
                    </p>
                    <ul>
                      <li>Ödeme sayfalarımızda 256-bit SSL güvenlik sertifikası kullanılmakta ve banka entegrasyonu doğrudan sağlanmaktadır.</li>
                      <li>Kredi kartı bilgileriniz hiçbir şekilde sunucularımızda saklanmaz veya üçüncü şahıslarla paylaşılmaz.</li>
                      <li>Sitemizde işlem yaparken kullandığınız bilgiler yalnızca sipariş sürecinin tamamlanması amacıyla kullanılır.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 3. Tüketici Hakları */}
              <div className="accordion-item modern-info-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed modern-info-btn"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    <div className="info-btn-content">
                      <div className="info-icon-badge">
                        <HiOutlineScale size={20} />
                      </div>
                      <div className="text-start">
                        <span className="info-title-main">Tüketici Haklarının Korunması Kanunu</span>
                        <span className="info-title-sub">6502 Sayılı Kanun kapsamındaki yasal haklarınız</span>
                      </div>
                    </div>
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body modern-info-body">
                    <p>
                      6502 sayılı Tüketicinin Korunması Hakkında Kanun uyarınca sahip olduğunuz temel haklar:
                    </p>
                    <ul>
                      <li>Sipariş ettiğiniz ürünleri teslim aldığınız tarihten itibaren 14 gün içinde hiçbir gerekçe göstermeksizin iade etme hakkına sahipsiniz.</li>
                      <li>Ayıplı, hatalı veya hasarlı ürün gönderimi durumunda kargo masrafları firmamıza aittir.</li>
                      <li>İade edilen ürünün bedeli, ürünün depomuza ulaşmasını takip eden 10 iş günü içerisinde ödeme aracınıza iade edilir.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 4. Mesafeli Satış Sözleşmesi */}
              <div className="accordion-item modern-info-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed modern-info-btn"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                  >
                    <div className="info-btn-content">
                      <div className="info-icon-badge">
                        <HiOutlineTruck size={20} />
                      </div>
                      <div className="text-start">
                        <span className="info-title-main">Mesafeli Satış Sözleşmesi</span>
                        <span className="info-title-sub">Sipariş süreci, teslimat ve tarafların yükümlülükleri</span>
                      </div>
                    </div>
                  </button>
                </h2>
                <div
                  id="flush-collapseFour"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body modern-info-body">
                    <p>
                      Alıcı ve Satıcı arasındaki mesafeli satış akdi hükümleri:
                    </p>
                    <ul>
                      <li><strong>Teslimat:</strong> Sipariş edilen ürünler, yasal 30 günlük süreyi aşmamak koşuluyla bildirilen adrese kargo aracılığıyla teslim edilir.</li>
                      <li><strong>Cayma Hakkı İstisnaları:</strong> Hijyen kuralları gereği iç giyim, küpe ve kişiye özel üretilen ürünlerde ambalaj açıldıktan sonra iade kabul edilmemektedir.</li>
                      <li><strong>Uyuşmazlıklar:</strong> İhtilaf durumunda Sanayi ve Ticaret Bakanlığı tarafından ilan edilen değere kadar Tüketici Hakem Heyetleri yetkilidir.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 5. KVKK */}
              <div className="accordion-item modern-info-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed modern-info-btn"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFive"
                    aria-expanded="false"
                    aria-controls="flush-collapseFive"
                  >
                    <div className="info-btn-content">
                      <div className="info-icon-badge">
                        <HiOutlineFingerPrint size={20} />
                      </div>
                      <div className="text-start">
                        <span className="info-title-main">KVKK Aydınlatma Metni</span>
                        <span className="info-title-sub">6698 Sayılı Kişisel Verilerin Korunması Kanunu bilgilendirmesi</span>
                      </div>
                    </div>
                  </button>
                </h2>
                <div
                  id="flush-collapseFive"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body modern-info-body">
                    <p>
                      6698 sayılı KVKK uyarınca verilerinizin işlenmesine dair bilgilendirme:
                    </p>
                    <ul>
                      <li>İsim, adres, telefon ve e-posta bilgileriniz sadece sipariş teslimatı ve yasal faturalandırma için işlenmektedir.</li>
                      <li>Kişisel verileriniz, açık rızanız olmaksızın pazarlama amacıyla üçüncü taraflarla paylaşılmaz.</li>
                      <li>Kanun'un 11. maddesi uyarınca dilediğiniz zaman tarafımıza başvurarak kayıtlı verilerinizin silinmesini talep edebilirsiniz.</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            {/* Alt Bilgi Kutusu */}
            <div className="info-support-card text-center mt-5">
              <HiOutlineInformationCircle size={28} className="text-muted mb-2" />
              <p className="mb-0 text-muted">
                Sözleşmeler veya yasal haklarınız ile ilgili daha fazla bilgi almak için{" "}
                <a href="/iletisim" className="text-dark fw-bold text-decoration-underline">
                  Müşteri Hizmetleri
                </a>{" "}
                ile iletişime geçebilirsiniz.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Informations;
