import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import Sepet_ozeti from './sepet-ozeti';

const Odeme3 = () => {
  const [cardNumber, setCardNumber] = useState(["", "", "", ""]);
  const [cardHolder, setCardHolder] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [ccv, setCcv] = useState("");

  useEffect(() => {
    const focusNextInput = (index) => {
      if (cardNumber[index].length === 4 && index < 3) {
        document.getElementById(`card-number-${index + 1}`).focus();
      }
    };

    cardNumber.forEach((_, index) => {
      focusNextInput(index);
    });
  }, [cardNumber]);

  const handleCardNumberChange = (index, value) => {
    const newCardNumber = [...cardNumber];
    newCardNumber[index] = value;
    setCardNumber(newCardNumber);
  };

  const handleCardHolderChange = (e) => {
    setCardHolder(e.target.value);
  };

  const handleExpirationMonthChange = (e) => {
    setExpirationMonth(e.target.value);
  };

  const handleExpirationYearChange = (e) => {
    setExpirationYear(e.target.value);
  };

  const handleCcvChange = (e) => {
    setCcv(e.target.value);
  };




  const copyText = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };


  return (
    <div className='row'>
            <Helmet>
            <title>Ödeme Yap</title>
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
      <div className="col-lg-8">
        <div className="odeme-secenekleri-parent">
          <nav>
            <div className="nav nav-tabs odeme-nav-tab" id="nav-tab" role="tablist">
              <button className="nav-link active" id="nav-havale-tab" data-bs-toggle="tab" data-bs-target="#nav-havale" type="button" role="tab" aria-controls="nav-havale" aria-selected="true">Havale</button>
              <button className="nav-link" id="nav-credit-tab" data-bs-toggle="tab" data-bs-target="#nav-credit" type="button" role="tab" aria-controls="nav-credit" aria-selected="false">Kredi Kartı</button>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-havale" role="tabpanel" aria-labelledby="nav-havale-tab" tabIndex="0">
              <div className="row">
                <div className="col-12">
                  <div className="havale-card">
                    <div className='havale-card-metin'>
                      İBAN: <span>TR340004600786888000080896</span> 
                      <button className='kopyala-btn-havale' onClick={() => copyText("TR340004600786888000080896")}><svg clipRule="evenodd" fill='blue' width="20" height="20" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm1.5-10.5v13h13v-13zm9-1.5v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z" fillRule="nonzero"/></svg></button>
                    </div>
                    <div className='havale-card-metin'>
                      Referans Numarası (Açıklama): <span>97762</span> 
                      <button className='kopyala-btn-havale' onClick={() => copyText("97762")}><svg clipRule="evenodd" fill='blue' width="20" height="20" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm1.5-10.5v13h13v-13zm9-1.5v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z" fillRule="nonzero"/></svg></button>
                    </div>
                    <div className='havale-card-metin'>
                      Alıcı Adı: <span>Mahir</span> 
                      <button className='kopyala-btn-havale' onClick={() => copyText("Mahir")}><svg clipRule="evenodd" fill='blue' width="20" height="20" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm1.5-10.5v13h13v-13zm9-1.5v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z" fillRule="nonzero"/></svg></button>
                    </div>           
                  </div>
                </div>
              </div>



            </div>
            <div className="tab-pane fade" id="nav-credit" role="tabpanel" aria-labelledby="nav-credit-tab" tabIndex="0">
              <div className="checkout">
                <div className="credit-card-box">
                  <div className="flip">
                    <div className="front">
                      <div className="chip"></div>
                      <div className="logo">
                        <svg version="1.1" id="visa" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                          width="47.834px" height="47.834px" viewBox="0 0 47.834 47.834" style={{ enableBackground: "new 0 0 47.834 47.834" }}>
                          <g>
                            <g>
                              <path d="M44.688,16.814h-3.004c-0.933,0-1.627,0.254-2.037,1.184l-5.773,13.074h4.083c0,0,0.666-1.758,0.817-2.143
                                c0.447,0,4.414,0.006,4.979,0.006c0.116,0.498,0.474,2.137,0.474,2.137h3.607L44.688,16.814z M39.893,26.01
                                c0.32-0.819,1.549-3.987,1.549-3.987c-0.021,0.039,0.317-0.825,0.518-1.362l0.262,1.23c0,0,0.745,3.406,0.901,4.119H39.893z
                                M34.146,26.404c-0.028,2.963-2.684,4.875-6.771,4.875c-1.743-0.018-3.422-0.361-4.332-0.76l0.547-3.193l0.501,0.228
                                c1.277,0.532,2.104,0.747,3.661,0.747c1.117,0,2.313-0.438,2.325-1.393c0.007-0.625-0.501-1.07-2.016-1.77
                                c-1.476-0.683-3.43-1.827-3.405-3.876c0.021-2.773,2.729-4.708,6.571-4.708c1.506,0,2.713,0.31,3.483,0.599l-0.526,3.092
                                l-0.351-0.165c-0.716-0.288-1.638-0.566-2.91-0.546c-1.522,0-2.228,0.634-2.228,1.227c-0.008,0.668,0.824,1.108,2.184,1.77
                                C33.126,23.546,34.163,24.783,34.146,26.404z M0,16.962l0.05-0.286h6.028c0.813,0.031,1.468,0.29,1.694,1.159l1.311,6.304
                                C7.795,20.842,4.691,18.099,0,16.962z M17.581,16.812l-6.123,14.239l-4.114,0.007L3.862,19.161
                                c2.503,1.602,4.635,4.144,5.386,5.914l0.406,1.469l3.808-9.729L17.581,16.812L17.581,16.812z M19.153,16.8h3.89L20.61,31.066
                                h-3.888L19.153,16.8z" />
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div className="number">{cardNumber.join(" ")}</div>
                      <div className="card-holder">
                        <label>Card holder</label>
                        <div>{cardHolder}</div>
                      </div>
                      <div className="card-expiration-date">
                        <label>Expires</label>
                        <div>{expirationMonth}/{expirationYear.slice(2)}</div>
                      </div>
                    </div>
                    <div className="back">
                      <div className="strip"></div>
                      <div className="logo">
                        <svg version="1.1" id="visa" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                          width="47.834px" height="47.834px" viewBox="0 0 47.834 47.834" style={{ enableBackground: "new 0 0 47.834 47.834" }}>
                          <g>
                            <g>
                              <path d="M44.688,16.814h-3.004c-0.933,0-1.627,0.254-2.037,1.184l-5.773,13.074h4.083c0,0,0.666-1.758,0.817-2.143
                                c0.447,0,4.414,0.006,4.979,0.006c0.116,0.498,0.474,2.137,0.474,2.137h3.607L44.688,16.814z M39.893,26.01
                                c0.32-0.819,1.549-3.987,1.549-3.987c-0.021,0.039,0.317-0.825,0.518-1.362l0.262,1.23c0,0,0.745,
                                3.406,0.901,4.119H39.893z
                                M34.146,26.404c-0.028,2.963-2.684,4.875-6.771,4.875c-1.743-0.018-3.422-0.361-4.332-0.76l0.547-3.193l0.501,0.228
                                c1.277,0.532,2.104,0.747,3.661,0.747c1.117,0,2.313-0.438,2.325-1.393c0.007-0.625-0.501-1.07-2.016-1.77
                                c-1.476-0.683-3.43-1.827-3.405-3.876c0.021-2.773,2.729-4.708,6.571-4.708c1.506,0,2.713,0.31,3.483,0.599l-0.526,3.092
                                l-0.351-0.165c-0.716-0.288-1.638-0.566-2.91-0.546c-1.522,0-2.228,0.634-2.228,1.227c-0.008,0.668,0.824,1.108,2.184,1.77
                                C33.126,23.546,34.163,24.783,34.146,26.404z M0,16.962l0.05-0.286h6.028c0.813,0.031,1.468,0.29,1.694,1.159l1.311,6.304
                                C7.795,20.842,4.691,18.099,0,16.962z M17.581,16.812l-6.123,14.239l-4.114,0.007L3.862,19.161
                                c2.503,1.602,4.635,4.144,5.386,5.914l0.406,1.469l3.808-9.729L17.581,16.812L17.581,16.812z M19.153,16.8h3.89L20.61,31.066
                                h-3.888L19.153,16.8z" />
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div className="ccv">
                        <label className='cvv-label'>CCV</label>
                        <div>{ccv}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <form className="credit-form" autoComplete="off" noValidate>
                  <fieldset className='input-fieldset'>
                    <label htmlFor="card-number" id='card-number-label'>Kart Numarası</label>
                    <input type="text" id="card-number" className="input-cart-number" maxLength="4" value={cardNumber[0]} onChange={(e) => handleCardNumberChange(0, e.target.value)} />
                    <input type="text" id="card-number-1" className="input-cart-number" maxLength="4" value={cardNumber[1]} onChange={(e) => handleCardNumberChange(1, e.target.value)} />
                    <input type="text" id="card-number-2" className="input-cart-number" maxLength="4" value={cardNumber[2]} onChange={(e) => handleCardNumberChange(2, e.target.value)} />
                    <input type="text" id="card-number-3" className="input-cart-number" maxLength="4" value={cardNumber[3]} onChange={(e) => handleCardNumberChange(3, e.target.value)} />
                  </fieldset>
                  <fieldset className='sahip-fieldset'>
                    <label htmlFor="card-holder">Kart Sahibi</label>
                    <input type="text" id="card-holder" value={cardHolder} onChange={handleCardHolderChange} />
                  </fieldset>
                  <fieldset className="fieldset-expiration date-fieldset">
                    <div>
                    <label style={{height:'10px'}} htmlFor="card-expiration-month">Tarih</label>
                    <div className="select">
                      <select id="card-expiration-month" className='selects' value={expirationMonth} onChange={handleExpirationMonthChange}>
                        <option value="">Month</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>
                    </div>
                    <div className="select">
                      <select id="card-expiration-year" className='selects' value={expirationYear} onChange={handleExpirationYearChange}>
                        <option value="">Year</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                        {/* Add more years as needed */}
                      </select>
                    </div>
                    <div>
                    </div>


                    </div>
                    <fieldset className="fieldset-ccv">
                    <label htmlFor="card-ccv" style={{margin:'0px'}}>CVV</label>
                    <input type="text" id="card-ccv" maxLength="3" value={ccv} onChange={handleCcvChange} />
                  </fieldset>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="sozlesme-card">
          <div className="sozlesme-checkbox"><input type="checkbox" id='sozlesme-check' /><label htmlFor="sozlesme-check">Ön Bilgilendirme Formu ve Mesafeli Satış Sözleşmesi’ni okudum ve kabul ediyorum.</label></div>
          <hr />
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  Ön Bilgilendirme Formu
                </button>
              </h2>
              <div id="flush-collapseOne" className="accordion-collapse collapse sozlesme-content" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  Ön Bilgilendirme Formu

1. Satıcı Bilgileri


ADI	:	Ozyo Pazarlama Maden İnş.İth.İhr.Ltd.Şti
ADRESİ	:	MTK Sitesi 5747/10 SOKAK NO:3 Çamdibi Bornova / İZMİR
TEL	:	0850 441 82 07
E-POSTA	:	info@aksesuarix.com
2. Alıcı Bilgileri (Bundan sonra ALICI olarak anılacaktır.)


ADI SOYADI	:	canan çakır
ADRESİ	:	şehitlertepesi mah salkım evleri Tarsus/Mersin
TEL	:	5054419206
E-POSTA	:	canan7733@hotmail.com
3. Konu

İşbu Ön Bilgilendirme Formunun ("Form") konusu aşağıda nitelik ve satış fiyatı belirtilen Ürünlerin ("Ürünler") satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicilerin Korunması Hakkında Kanun ve 27 Kasım 2014 tarihli ve 29188 sayılı Resmî Gazetede yayımlanan Mesafeli Sözleşmelere Dair Yönetmelik hükümleri gereğince tarafların hak ve yükümlülüklerini kapsamaktadır.
ALICI iş bu ön bilgilendirme formunu kabul etmekle, sözleşme konusu siparişi onayladığı takdirde siparişe konu olan bedeli ve varsa kargo ücreti, vergi gibi belirtilen ek ücretleri ödeme yükümlülüğü altına gireceğini ve bu konuda bilgilendirildiğini peşinen kabul eder.

4. Sözleşme Konusu Ürün/Ürünler Bilgileri

4.1. Malın / Ürün / Ürünlerin / Hizmetin temel özellikleri (türü, miktarı, marka/modeli, rengi, adedi) SATICI’ya ait internet sitesinde yer almaktadır. Ürünün temel özelliklerini kampanya süresince inceleyebilirsiniz.
4.2. Listelenen ve sitede ilan edilen fiyatlar satış fiyatıdır. İlan edilen fiyatlar ve vaatler güncelleme yapılana ve değiştirilene kadar geçerlidir. Süreli olarak ilan edilen fiyatlar ise belirtilen süre sonuna kadar geçerlidir.
4.3. Sözleşme konusu mal ya da hizmetin tüm vergiler dâhil satış fiyatı aşağıdaki tabloda gösterilmiştir.

SATIN ALINAN ÜRÜNLER
Ürün Adı	Miktar	Toplam Fiyat
Ukhwd Fitilli Erkek Atlet UK1310BY	1	182,50 TL
Tahsilat Tutarı	277,50 TL

ÖDEME ŞEKLİ	:	** Henüz Belirtilmedi **
TESLİMAT BİLGİSİ	:	canan çakır
TELEFON NUMARASI	:	5054419206
TESLİMAT ADRESİ	:	şehitlertepesi mah salkım evleri Tarsus/Mersin
FATURA ÜNVANI	:	canan çakır
FATURA ADRESİ	:	şehitlertepesi mah salkım evleri Tarsus/Mersin
5. Genel Hükümler

5.1. ALICI, SATICI’ya ait internet sitesinde sözleşme konusu ürünün temel nitelikleri, satış fiyatı ve ödeme şekli ile teslimata ilişkin ön bilgileri okuyup, bilgi sahibi olduğunu, elektronik ortamda gerekli teyidi verdiğini kabul, beyan ve taahhüt eder. ALICININ; Ön Bilgilendirmeyi elektronik ortamda teyit etmesi, mesafeli satış sözleşmesinin kurulmasından evvel, SATICI tarafından ALICI' ya verilmesi gereken adresi, siparişi verilen ürünlere ait temel özellikleri, ürünlerin vergiler dâhil fiyatını, ödeme ve teslimat bilgilerini de doğru ve eksiksiz olarak edindiğini kabul, beyan ve taahhüt eder.

5.2. Sözleşme konusu her bir ürün, 30 günlük yasal süreyi aşmamak kaydı ile ALICI' nın yerleşim yeri uzaklığına bağlı olarak internet sitesindeki ön bilgiler kısmında belirtilen süre zarfında ALICI veya ALICI’ nın gösterdiği adresteki kişi ve/veya kuruluşa teslim edilir. Bu süre içinde ürünün ALICI’ya teslim edilememesi durumunda, ALICI’nın sözleşmeyi feshetme hakkı saklıdır.

5.3. SATICI, sözleşme konusu ürünü eksiksiz, siparişte belirtilen niteliklere uygun ve varsa garanti belgeleri, kullanım kılavuzları ile teslim etmeyi, her türlü ayıptan arî olarak yasal mevzuat gereklerine sağlam, standartlara uygun bir şekilde işin gereği olan bilgi ve belgeler ile işi doğruluk ve dürüstlük esasları dâhilinde ifa etmeyi, hizmet kalitesini koruyup yükseltmeyi, işin ifası sırasında gerekli dikkat ve özeni göstermeyi, ihtiyat ve öngörü ile hareket etmeyi kabul, beyan ve taahhüt eder.
5.4. SATICI, sözleşmeden doğan ifa yükümlülüğünün süresi dolmadan ALICI’yı bilgilendirmek ve açıkça onayını almak suretiyle eşit kalite ve fiyatta farklı bir ürün tedarik edebilir.

5.5. SATICI, sipariş konusu ürün veya hizmetin yerine getirilmesinin imkânsızlaşması halinde sözleşme konusu yükümlülüklerini yerine getiremezse, bu durumu, öğrendiği tarihten itibaren 3 gün içinde yazılı olarak ALICI’ya bildireceğini, 14 günlük süre içinde toplam bedeli ALICI’ya iade edeceğini kabul, beyan ve taahhüt eder.

5.6. ALICI, sözleşme konusu ürünün teslimatı için işbu Ön Bilgilendirme Formunu elektronik ortamda teyit edeceğini, herhangi bir nedenle sözleşme konusu ürün bedelinin ödenmemesi ve/veya banka kayıtlarında iptal edilmesi halinde, SATICI’nın sözleşme konusu ürünü teslim yükümlülüğünün sona ereceğini kabul, beyan ve taahhüt eder.

5.7. ALICI, Sözleşme konusu ürünün ALICI veya ALICI’nın gösterdiği adresteki kişi ve/veya kuruluşa tesliminden sonra ALICI'ya ait kredi kartının yetkisiz kişilerce haksız kullanılması sonucunda sözleşme konusu ürün bedelinin ilgili banka veya finans kuruluşu tarafından SATICI'ya ödenmemesi halinde, ALICI Sözleşme konusu ürünü 3 gün içerisinde nakliye gideri SATICI’ya ait olacak şekilde SATICI’ya iade edeceğini kabul, beyan ve taahhüt eder.

5.8. SATICI, tarafların iradesi dışında gelişen, önceden öngörülemeyen ve tarafların borçlarını yerine getirmesini engelleyici ve/veya geciktirici hallerin oluşması gibi mücbir sebepler halleri nedeni ile sözleşme konusu ürünü süresi içinde teslim edemez ise, durumu ALICI' ya bildireceğini kabul, beyan ve taahhüt eder. ALICI da siparişin iptal edilmesini, sözleşme konusu ürünün varsa emsali ile değiştirilmesini ve/veya teslimat süresinin engelleyici durumun ortadan kalkmasına kadar ertelenmesini SATICI’dan talep etme hakkını haizdir. ALICI tarafından siparişin iptal edilmesi halinde ALICI’nın nakit ile yaptığı ödemelerde, ürün tutarı 14 gün içinde kendisine nakden ve defaten ödenir. ALICI’nın kredi kartı ile yaptığı ödemelerde ise, ürün tutarı, siparişin ALICI tarafından iptal edilmesinden sonra 14 gün içerisinde ilgili bankaya iade edilir. ALICI, SATICI tarafından kredi kartına iade edilen tutarın banka tarafından ALICI hesabına yansıtılmasına ilişkin ortalama sürecin 2 ile 3 haftayı bulabileceğini, bu tutarın bankaya iadesinden sonra ALICI’ nın hesaplarına yansıması halinin tamamen banka işlem süreci ile ilgili olduğundan, ALICI, olası gecikmeler için SATICI’yı sorumlu tutamayacağını kabul, beyan ve taahhüt eder.

6. Cayma Hakkı

6.1. ALICI; mal satışına ilişkin mesafeli sözleşmelerde, ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa teslim tarihinden itibaren 14 (on dört) gün içerisinde, SATICI’ya bildirmek şartıyla hiçbir hukuki ve cezai sorumluluk üstlenmeksizin ve hiçbir gerekçe göstermeksizin malı reddederek sözleşmeden cayma hakkını kullanabilir. Hizmet sunumuna ilişkin mesafeli sözleşmelerde ise, bu süre sözleşmenin imzalandığı tarihten itibaren başlar. Cayma hakkı süresi sona ermeden önce, Alıcı’nın onayı ile hizmetin ifasına başlanan hizmet sözleşmelerinde cayma hakkı kullanılamaz. Cayma hakkının kullanımından kaynaklanan masraflar SATICI’ ya aittir. ALICI, iş bu sözleşmeyi kabul etmekle, cayma hakkı konusunda bilgilendirildiğini peşinen kabul eder.

6.2. Cayma hakkının kullanılması için 14 (on dört) günlük süre içinde SATICI' ya iadeli taahhütlü posta, faks veya eposta ile yazılı bildirimde bulunulması ve ürünün işbu sözleşmede düzenlenen "Cayma Hakkı Kullanılamayacak Ürünler" hükümleri çerçevesinde kullanılmamış olması şarttır. Bu hakkın kullanılması halinde,
6.2.1. 3. kişiye veya ALICI’ ya teslim edilen ürünün faturası, (İade edilmek istenen ürünün faturası kurumsal ise, geri iade ederken kurumun düzenlemiş olduğu iade faturası ile birlikte gönderilmesi gerekmektedir. Faturası kurumlar adına düzenlenen sipariş iadeleri İADE FATURASI kesilmediği takdirde tamamlanamayacaktır.)
6.2.2. İade formu,
6.2.3. İade edilecek ürünlerin kutusu, ambalajı, varsa standart aksesuarları ile birlikte eksiksiz ve hasarsız olarak teslim edilmesi gerekmektedir.
6.2.4. SATICI, cayma bildiriminin kendisine ulaşmasından itibaren en geç 10 günlük süre içerisinde toplam bedeli ve ALICI’ yı borç altına sokan belgeleri ALICI’ ya iade etmek ve 20 günlük süre içerisinde malı iade almakla yükümlüdür.
6.2.5. ALICI’ nın kusurundan kaynaklanan bir nedenle malın değerinde bir azalma olursa veya iade imkânsızlaşırsa ALICI kusuru oranında SATICI’ nın zararlarını tazmin etmekle yükümlüdür. Ancak cayma hakkı süresi içinde malın veya ürünün usulüne uygun kullanılmasın sebebiyle meydana gelen değişiklik ve bozulmalardan ALICI sorumlu değildir.

6.2.6. Cayma hakkının kullanılması nedeniyle SATICI tarafından düzenlenen kampanya limit tutarının altına düşülmesi halinde kampanya kapsamında faydalanılan indirim miktarı iptal edilir.

7. Cayma Hakkı Kullanılamayacak Ürünler
7.1.
a) Fiyatı finansal piyasalardaki dalgalanmalara bağlı olarak değişen ve satıcı veya sağlayıcının kontrolünde olmayan mal veya hizmetlere ilişkin sözleşmeler. b) Alıcı’nın istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan mallara ilişkin sözleşmeler. c) Çabuk bozulabilen veya son kullanma tarihi geçebilecek malların teslimine ilişkin sözleşmeler. ç) Tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu unsurları açılmış olan mallardan; iadesi sağlık ve hijyen açısından uygun olmayanların teslimine ilişkin sözleşmeler. d) Tesliminden sonra başka ürünlerle karışan ve doğası gereği ayrıştırılması mümkün olmayan mallara ilişkin sözleşmeler. e) Malın tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu unsurları açılmış olması halinde maddi ortamda sunulan kitap, dijital içerik ve bilgisayar sarf malzemelerine, veri kaydedebilme ve veri depolama cihazlarına ilişkin sözleşmeler. f) Abonelik sözleşmesi kapsamında sağlananlar dışında, gazete ve dergi gibi süreli yayınların teslimine ilişkin sözleşmeler. g) Belirli bir tarihte veya dönemde yapılması gereken, konaklama, eşya taşıma, araba kiralama, yiyecek-içecek tedariki ve eğlence veya dinlenme amacıyla yapılan boş zamanın değerlendirilmesine ilişkin sözleşmeler. ğ) Elektronik ortamda anında ifa edilen hizmetler veya Alıcı’ya anında teslim edilen gayri maddi mallara ilişkin sözleşmeler. h) Cayma hakkı süresi sona ermeden önce, Alıcı’nın onayı ile ifasına başlanan hizmetlere ilişkin sözleşmeler. Kozmetik ve kişisel bakım ürünleri, iç giyim ürünleri, mayo, bikini, kitap, kopyalanabilir yazılım ve programlar, DVD, VCD, CD ve kasetler ile kırtasiye sarf malzemeleri (toner, kartuş, şerit vb.) iade edilebilmesi için ambalajlarının açılmamış, denenmemiş, bozulmamış ve kullanılmamış olmaları gerekir.

7.2. ALICI, şikâyet ve itirazları konusunda başvurularını, aşağıdaki kanunda belirtilen parasal sınırlar dâhilinde Alıcı’nın yerleşim yerinin bulunduğu veya alıcı işleminin yapıldığı yerdeki tüketici sorunları hakem heyetine veya tüketici mahkemesine yapabilir. Parasal sınıra ilişkin bilgiler aşağıdadır:
01/01/2021 tarihinde yürürlüğe girecek olan “6502 Sayılı Tüketicinin Korunması Hakkında Kanunun 68. Ve Tüketici Hakem Heyetleri Yönetmeliği’nin 6’ncı maddelerinde yer alan Parasal Sınırların Artırılmasına İlişkin Tebliğ” 26.12.2020 tarihli Resmî Gazetede yayımlandı. Tüketici hakem heyetlerine yapılacak başvurularda; a) Büyükşehir statüsünde olan illerde değeri 7 bin 550 liranın altında bulunan uyuşmazlıkların ilçe tüketici hakem heyetleri, b) Büyükşehir statüsünde olan illerde değeri 7 bin 550 ile 11 bin 330 lira arasındaki uyuşmazlıklarda il tüketici hakem heyetleri, c) Büyükşehir statüsünde olmayan illerin merkezlerinde ve bağlı ilçelerde değeri 11 bin 330 liranın altında bulunan uyuşmazlıklarda il tüketici hakem heyetleri, görevli olacaktır.

İşbu Sözleşme ticari amaçlarla yapılmaktadır.

Tarih: 27/07/2024</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  Mesafeli Satış Sözleşmesi
                </button>
              </h2>
              <div id="flush-collapseTwo" className="accordion-collapse collapse sozlesme-content" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                Madde 1- Taraflar
1.1. Satıcı

ADI	:	Ozyo Pazarlama Maden İnş.İth.İhr.Ltd.Şti
ADRESİ	:	MTK Sitesi 5747/10 SOKAK NO:3 Çamdibi Bornova / İZMİR
TEL	:	0850 441 82 07
E-POSTA	:	info@aksesuarix.com

1.2. Alıcı
ADI SOYADI	:	canan çakır
ADRESİ	:	şehitlertepesi mah salkım evleri Tarsus/Mersin
TEL	:	5054419206
E-POSTA	:	canan7733@hotmail.com
Madde 2- Konu-Mesafeli Satış Sözleşmesi

İşbu sözleşmenin konusu, ALICI’nın SATICI’ya ait www.aksesuarix.com internet sitesinden elektronik ortamda siparişini yaptığı aşağıda nitelikleri ve satış ücreti belirtilen ürünün satışı ve teslimi ile ilgili olarak 4077 sayılı Tüketicilerin Korunması Hakkındaki Kanun ve Mesafeli Sözleşmelere Dair Yönetmelik hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.

Alıcı, satıcının isim, unvan, açık adres, telefon ve diğer erişim bilgileri , satışa konu malın temel nitelikleri, vergiler dahil olmak üzere satış fiyatı , ödeme sekli, teslimat koşulları ve masrafları vs. satışa konu mal ile ilgili tüm ön bilgiler ve “cayma” hakkının kullanılması ve bu hakkın nasıl kullanılacağı , şikayet ve itirazlarını iletebilecekleri resmi makamlar vs. konusunda açık , anlaşılır ve internet ortamına uygun şekilde satıcı tarafından bilgilendirildiğini , bu ön bilgileri elektronik ortamda teyit ettiğini ve sonrasında mal sipariş verdiğini is bu sözleşme hükümlerince kabul ve beyan eder.

www.aksesuarix.com sitesinde yer alan ön bilgilendirme ve alıcı tarafından verilen sipariş üzerine düzenlenen fatura is bu sözleşmenin ayrılmaz parçalarıdır.

Madde 3- Sözleşme Konusu Ürün/Ödeme/Teslimat Bilgileri

Elektronik ortamda alınan ürün/ürünlerin cinsi ve türü, miktarı, marka/modeli, satış bedeli, ödeme şekli, teslim alacak kişi, teslimat adresi, fatura bilgileri, kargo ücreti aşağıda belirtildiği gibidir.Fatura edilecek kişi ile sözleşmeyi yapan kişi aynı olmak zorundadır.Aşağıda yer alan bilgiler doğru ve eksiksiz olmalıdır. Bu bilgilerin doğru olmadığı veya noksan olduğu durumlardan doğacak zararları tamamıyla karşılamayı alıcı kabul eder ve ayrıca bu durumdan oluşabilecek her türlü sorumluluğu alıcı kabul eder.

SATICI gerekli gördüğü durumlarda, ALICI’nın vermiş olduğu bilgiler gerçekle örtüşmediğinde, siparişi durdurma hakkını saklı tutar. SATICI siparişte sorun tespit ettiği durumlarda ALICI’nın vermiş olduğu telefon, e-posta ve posta adreslerinden ALICI’ya ulaşamadığı takdirde siparişin yürürlüğe koyulmasını 15 (onbeş) gün süreyle dondurur. ALICI’nın bu süre zarfında SATICI ile konuyla ilgili olarak iletişime geçmesi beklenir. Bu süre içerisinde ALICI’dan herhangi bir cevap alınamazsa SATICI, her iki tarafın da zarar görmemesi için siparişi iptal eder. 
SATIN ALINAN ÜRÜNLER
Ürün Adı	Miktar	Toplam Fiyat
Ukhwd Fitilli Erkek Atlet UK1310BY	1	182,50 TL
Tahsilat Tutarı	277,50 TL

ÖDEME ŞEKLİ	:	** Henüz Belirtilmedi **
TESLİMAT BİLGİSİ	:	canan çakır
TELEFON NUMARASI	:	5054419206
TESLİMAT ADRESİ	:	şehitlertepesi mah salkım evleri Tarsus/Mersin
FATURA ÜNVANI	:	canan çakır
FATURA ADRESİ	:	şehitlertepesi mah salkım evleri Tarsus/Mersin

Madde 4- Sözleşme Tarihi ve Mücbir Nedenler
Sözleşme tarihi, alıcı tarafından siparişin verildiği tarih olan 27/07/2024 tarihidir. 
Sözleşmenin imzalandığı tarihte mevcut olmayan veya öngörülmeyen, tarafların kontrolleri dışında gelişen, ortaya çıkmasıyla taraflardan birinin ya da her ikisinin de sözleşme ile yüklendikleri borç ve sorumluluklarını kısmen ya da tamamen yerine getirmelerini ya da bunları zamanında yerine getirmelerini olanaksızlaştıran durumlar, mücbir sebep (Doğal afet, savaş, terör, ayaklanma, değişen mevzuat hükümleri, el koyma veya grev, lokavt, üretim ve iletişim tesislerinde önemli ölçüde arıza vb.) olarak kabul edilecektir. Mücbir sebep şahsında gerçekleşen taraf, diğer tarafa durumu derhal ve yazılı olarak bildirecektir. 

Mücbir sebebin devamı esnasında tarafların edimlerini yerine getirememelerinden dolayı herhangi bir sorumlulukları doğmayacaktır. İşbu mücbir sebep durumu 30 (otuz ) gün süreyle devam ederse, taraflardan her birinin, tek taraflı olarak fesih hakkı doğmuş olacaktır.

Madde 5- Satıcının Hak ve Yükümlülükleri-Mesafeli Satış Sözleşmesi

5.1. Satıcı, 4077 sayılı Tüketicilerin Korunması Hakkındaki Kanun ve Mesafeli Sözleşmelere Dair Yönetmelik hükümleri uyarınca sözleşmede kendisine yüklenen edimleri mücbir haller dışında eksiksiz yerine getirmeyi kabul ve taahhüt eder.

5.2. 18 (on sekiz) yaşından küçük kişiler www.aksesuarix.com’den alışveriş yapamaz. Satıcı, alıcının sözleşmede belirttiği yaşının doğru olduğunu esas alacaktır. Ancak alıcının yaşını yanlış yazmasından dolayı satıcıya hiçbir şekilde sorumluluk yüklenemeyecektir.

5.2. Sistem hatalarından meydana gelen fiyat yanlışlıklarından Ozyo Pazarlama Maden İnş.İth.İhr.Ltd.Şti sorumlu değildir. Buna istinaden satıcı, internet sitesindeki sistemden, dizayndan veya yasadışı yollarla internet sitesine yapılabilecek müdahaleler sebebiyle ortaya çıkabilecek tanıtım, fiyat hatalarından sorumlu değildir. Sistem hatalarına dayalı olarak alıcı satıcıdan hak iddiasında bulunamaz. 

5.3. www.aksesuarix.com den kredi kartı (Visa, MasterCard , vs. ) ya da banka havalesi ile alışveriş yapılabilir. Sipariş tarihinden itibaren bir hafta içinde havalesi yapılmayan siparişler iptal edilir. Siparişlerin işleme alınma zamanı, siparişin verildiği an değil, kredi kartı hesabından gerekli tahsilatın yapıldığı ya da havalenin (EFT’nin) banka hesaplarına ulaştığı belirlenen andır. Ödemeli gönderi ya da posta çeki gibi müşteri hizmetleri ile görüşülmeden gerçekleştirilen ödeme yöntemleri kabul edilmez.

Madde 6- Alıcının Hak ve Yükümlülükleri - Mesafeli Satış Sözleşmesi
6.1. Alıcı, sözleşmede kendisine yüklenen edimleri mücbir sebepler dışında eksiksiz yerine getirmeyi kabul ve taahhüt eder.

6.2. Alıcı, sipariş vermekle birlikte iş sözleşme hükümlerini kabul etmiş sayıldığını ve sözleşmede belirtilen ödeme şekline uygun ödemeyi yapacağını kabul ve taahhüt eder.

6.3. Alıcı, www.aksesuarix.com internet sitesinden satıcının isim, unvan, açık adres, telefon ve diğer erişim bilgileri , satışa konu malın temel nitelikleri, vergiler dahil olmak üzere satış fiyatı , ödeme sekli, teslimat koşulları ve masrafları vs. satışa konu mal ile ilgili tüm ön bilgiler ve “cayma” hakkının kullanılması ve bu hakkın nasıl kullanılacağı , şikayet ve itirazlarını iletebilecekleri resmi makamlar vs. konusunda açık , anlaşılır ve internet ortamına uygun şekilde bilgi sahibi olduğunu bu ön bilgileri elektronik ortamda teyit ettiğini kabul ve beyan eder. 

6.4. Bir önceki maddeye bağlı olarak Alıcı, ürün sipariş ve ödeme koşullarının, ürün kullanım talimatlarının , olası durumlara karşı alınan tedbirlerin ve yapılan uyarıların olduğu sipariş/ödeme/kullanım prosedürü bilgilerini okuyup bilgi sahibi olduğunu ve elektronik ortamda gerekli teyidi verdiğini beyan eder.

6.5. Alıcı, aldığı ürünü iade etmek istemesi durumunda ne surette olursa olsun ürüne ve ambalajına zarar vermemeyi, iade anında fatura aslını ve irsaliyesini iade etmeyi kabul ve taahhüt eder.

Madde 7- Sipariş/Ödeme Prosedürü
Sipariş: Mesafeli Satış Sözleşmesi

Alışveriş sepetine eklenen ürünlerin KDV dahil tutarı (Taksitli işlemlerde toplam taksit tutarları) alıcı tarafından onaylandıktan sonra, ilgili banka kartının posu üzerinden işleme alınır. Bu nedenle siparişler, sevk edilmeden 
önce müşteriye sipariş onay maili gönderilir. Sipariş Onay maili gönderilmeden sevkiyat yapılmaz.

Süreçteki herhangi bir aksama durumu ya da kredi kartı ile ilgili ortaya çıkabilecek problemler alıcıya sözleşmede belirttiği telefon/faks/e-mail yollarından biri veya bir kaçı kullanılmak sureti ile bildirilir. Gerekirse alıcıdan bankası ile görüşmesi istenebilir. Siparişlerin işleme alınma zamanı, siparişin verildiği an değil, kredi kartı hesabından gerekli tahsilatın yapıldığı ya da havalenin (EFT’ nin) satıcı hesaplarına ulaştığının belirlendiği andır.

İstisnai olarak haklı bir nedenle sözleşme konusu malın tedarik edilemeyeceğinin anlaşılması ve/veya stok problemi ile karşılaşılması durumunda alıcı hemen açık ve anlaşılır bir şekilde bilgilendirilip onay vermesi durumunda alıcıya eşit kalitede ve fiyatta başka bir mal gönderilebilir ya da alıcının arzusu ve seçimi doğrultusunda ; yeni başka bir ürün gönderilebilir, ürünün stoklara girmesi ya da teslime engel diğer engelin ortadan kalkması beklenebilir ve/veya sipariş iptal edilebilir.

Sözleşme konusu malın teslim yükümlülüğünün yerine getirilmesinin imkânsızlaştığı hâllerde alıcı bu durumdan haberdar edilerek ödemiş olduğu toplam bedel ve varsa onu borç altına sokan her türlü belge en geç on gün içinde kendisine iade edilerek sözleşme iptal edilir. Böyle bir durumda alıcının satıcıdan ilave herhangi bir maddi ve manevi zarar talebi olmayacaktır. 

Ödeme: Mesafeli Satış Sözleşmesi

www.aksesuarix.com ’de, internet ortamında kredi kartı bilgilerini kullanmak istemeyen alıcılara nakit havale ile sipariş imkanları sunulmuştur. Havale ile ödemede alıcı kendisine en uygun bankayı seçip havalesini yapabilir. Eğer EFT yapılmışsa hesaba geçme tarihi dikkate alınacaktır. Havale ve/veya EFT yaparken “Gönderen Bilgileri”nin Fatura Bilgileri ile aynı olması ve sipariş numarasının yazılması gereklidir. 

Ürünün tesliminden sonra Alıcı’ya ait kredi kartının Alıcı’nın kusurundan kaynaklanmayan bir şekilde yetkisiz kişilerce haksız veya hukuka aykırı olarak kullanılması nedeni ile ilgili banka veya finans kuruluşun ürün bedelini Satıcı’ya ödememesi halinde, Alıcı’nın kendisine teslim edilmiş ürünü 10 gün içinde Satıcı’ya göndermesi zorunludur. Bu tür durumlarda nakliye giderleri Alıcı’ya aittir.

Alıcı kredi kartı ile ödeme yapmayı tercih etmiş ise ALICI, ilgili faiz oranlarını ve temerrüt faizi ile ilgili bilgileri bankasından ayrıca teyit edeceğini, yürürlükte bulunan mevzuat hükümleri gereğince faiz ve temerrüt faizi ile ilgili hükümlerin Banka ve ALICI arasındaki “Kredi Kartı Sözleşmesi” kapsamında uygulanacağını kabul, beyan ve taahhüt eder.

Madde 8- Sevkiyat/Teslimat Prosedürü

Sevkiyat:Mesafeli Satış Sözleşmesi

Sipariş onayı mailinin gönderilmesiyle birlikte, ürün/ürünler satıcının anlaşmalı olduğu kargo şirketine verilir.

Teslimat : Mesafeli Satış Sözleşmesi

Ürün/ürünler satıcının anlaşmalı olduğu kargo ile alıcının adresine teslim edilecektir. Teslimat süresi, Sipariş onayı mailinin gönderilmesinden ve sözleşmenin kurulmasından itibaren 30 gündür. Alıcıya önceden yazılı olarak veya bir sürekli veri taşıyıcısıyla bildirilmek koşuluyla bu süre en fazla on gün uzatılabilir. 

Ürünler, Kargo şirketlerinin adres teslimatı yapmadığı bölgelere telefon ihbarlı olarak gönderilir.

Kargo Şirketinin haftada bir gün teslimat yaptığı bölgelerde, sevk bilgilerindeki yanlışlık ve eksiklik olduğu hallerde, bazı sosyal olaylar ve doğal afetler gibi durumlarda belirtilen gün süresinde sarkma olabilir. Bu sarkmalardan dolayı alıcı satıcıya herhangi bir sorumluluk yükleyemez. Ürün, Alıcı’dan başka bir kişi/kuruluşa teslim edilecek ise, teslim edilecek kişi/kuruluşun teslimatı kabul etmemesinden, sevk bilgilerindeki yanlışlık ve/veya Alıcının yerinde olmamasından doğabilecek ekstra kargo bedellerinden satıcı sorumlu değildir. Belirtilen günler içeriğinde ürün/ürünler müşteriye ulaşmadıysa teslimat problemleri müşteri hizmetlerine info@aksesuarix.com e-mail adresi kullanılmak sureti ile derhal bildirilmelidir.

Zarar görmüş paket durumunda; Zarar görmüş paketler teslim alınmayarak Kargo Şirketi yetkilisine tutanak tutturulmalıdır. Eğer Kargo Şirketi yetkilisi paketin hasarlı olmadığı görüşünde ise, paketin orada açılarak ürünlerin hasarsız teslim edildiğini kontrol ettirme ve durumun yine bir tutanakla tespit edilmesini isteme hakkı alıcıda vardır. Paket Alıcı tarafından teslim alındıktan sonra Kargo Şirketinin görevini tam olarak yaptığı kabul edilmiş olur. Paket kabul edilmemiş ve tutanak tutulmuş ise, durum, tutanağın Alıcı’da kalan kopyasıyla birlikte en kısa zamanda satıcı Müşteri Hizmetlerine bildirilmelidir. 

Madde 9- Ürün İade ve Cayma Hakkına İlişkin Prosedürü
Ürün İade:Mesafeli Satış Sözleşmesi
Almış olduğunuz ürünün kutu içeriğini tahrip etmeden/bozmadan, ürünü kullanmadan teslim tarihinden itibaren on dört (14) günlük süre içinde teslim aldığınız şekli ile iade edebilirsiniz. Ürünü sipariş numarınızıda içeren bir dilekçe ile iade ediniz. Farklı kargo firması ile gönderilen iadelerde kargo ücreti müşteriye aittir. Sipariş aşamasında müşterinin seçeceği yüzük numarasına göre üretim işlemi sağlandığından tüm 14 Ayar ve Pırlanta yüzükler, isim ya da harf yazılan tüm ürünler ve 22 Ayar tüm ürünler kesin sipariş olup iade edilemez. Kullanılmış, tahrip edilmiş vesair şekildeki ürünlerin iadesi kabul edilmez.
385 sayılı vergi usul kanunu genel tebliği uyarınca iade işlemlerinin yapılabilmesi için alıcının  mal ile birlikte teslim edilen satıcıya ait 2 adet faturanın alt kısmındaki iade bölümlerini eksiksiz ve doğru şekilde doldurduktan sonra imzalayarak bir nüshasını ürün ile birlikte satıcıya göndermesi diğer nüshasını da uhdesinde tutması gerekmektedir.Cayma hakkı süresi alıcıya malın teslim edildiği günden itibaren başlar. İade edilen ürün veya ürünlerin geri gönderim bedeli alıcı tarafından karşılanmalıdır.

Alıcının istekleri ve/veya açıkça onun kişisel ihtiyaçları doğrultusunda hazırlanan mallar için cayma hakkı söz konusu değildir.

Alıcının cayma hakkını kullanması halinde satıcı, cayma bildirimini içeren faturanın ürünle birlikte kendisine ulaşmasından itibaren en geç on gün içerisinde almış olduğu toplam bedeli ve varsa tüketiciyi borç altına sokan her türlü belgeyi tüketiciye hiçbir masraf yüklemeden iade edecektir.

Teslim alınmış olan malın değerinin azalması veya iadeyi imkânsız kılan bir nedenin varlığı cayma hakkının kullanılmasına engel değildir. Ancak değer azalması veya iadenin imkânsızlaşması tüketicinin kusurundan kaynaklanıyorsa satıcıya malın değerini veya değerindeki azalmayı tazmin etmesi gerekir. 

Sehven alınan her ürün için de genel iade süresi 14 gündür. Bu süre içerisinde, Ambalajı açılmış, kullanılmış, tahrip edilmiş vesaire şekildeki ürünlerin iadesi kabul edilmez. İade, orijinal ambalaj ile yapılmalıdır.

Sehven alınan üründe ve ambalajında herhangi bir açılma, bozulma, kırılma, tahrip, yırtılma, kullanılma ve sair durumlar tespit edildiği hallerde ve ürünün alıcıya teslim edildiği andaki hali ile iade edilememesi durumunda ürün iade alınmaz ve bedeli iade edilmez. 

Ürün iadesi için, durum öncelikli olarak müşteri hizmetlerine iletilmelidir. Ürünün iade olarak gönderilme bilgisi, satıcı tarafından müşteriye iletilir. Bu görüşmeden sonra ürün iade ile ilgili bilgileri içeren fatura ile birlikte alıcı adresine teslimatı yapan Kargo şirketi kanalıyla satıcıya ulaştırmalıdır. Satıcıya ulaşan iade ürün iş bu sözleşmede belirtilen koşulları sağladığı takdirde iade olarak kabul edilir, geri ödemesi de alıcı kredi kartına/hesabına yapılır. Ürün iade edilmeden bedel iadesi yapılmaz. Kredi Kartına yapılan iadelerin kredi kartı hesaplarına yansıma süresi ilgili bankanın tasarrufundadır. 

Alışveriş kredi kartı ile ve taksitli olarak yapılmışsa, kredi kartına iade prosedürü şu şekilde uygulanacaktır: Alıcı ürünü kaç taksit ile satın alma talebini iletmiş ise, Banka alıcıya geri ödemesini taksitle yapmaktadır. Satıcı,bankaya ürün bedelinin tamamını tek seferde ödedikten sonra, Banka poslarından yapılan taksitli harcamaların alıcının kredi kartına iadesi durumundakonuya müdahil tarafların mağdur duruma düşmemesi için talep edilen iade tutarları,yine taksitli olarak hamil taraf hesaplarına Banka tarafından aktarılır.Alıcının satış iptaline kadar ödemiş olduğu taksit tutarları, eğer iade tarihi ile kartın hesap kesim tarihleri çakışmazsa her ay karta 1(bir) iade yansıyacak ve alıcı iade öncesinde ödemiş olduğu taksitleri satışın taksitleri bittikten sonra, iade öncesinde ödemiş olduğu taksit sayısı kadar ay daha alacak ve mevcut borçlarından düşmüş olacaktır.

Kart ile alınmış mal ve hizmetin iadesi durumunda satıcı, Banka ile yapmış olduğu sözleşme gereği alıcıya nakit para ile ödeme yapamaz. Üye işyeri yani satıcı, bir iade işlemi söz konusu olduğunda ilgili yazılım aracılığı ile iadesini yapacak olup, üye işyeri yani satıcı ilgili tutarı Bankaya nakden veya mahsuben ödemekle yükümlü olduğundan yukarıda detayları belirtilen prosedür gereğince alıcıya nakit olarak ödeme yapılamamaktadır. Kredi kartına iade, alıcının Bankaya bedeli tek seferde ödemesinden sonra, Banka tarafından yukarıdaki prosedür gereğince yapılacaktır.

Mesafeli Satış Sözleşmesi

Madde 10-Garanti- Mesafeli Satış Sözleşmesi

Kullanma talimatına uygun şekilde kullanılan ve temizliği yapılan ürünler her türlü üretim hatasına karşı aşağıda belirtilen şartlar dahilinde 2 yıl garantilidir:  Satıcının garanti sorumluluğu yalnızca 4077 sayılı kanun kapsamına giren tüketiciler için geçerlidir. Ticari nitelikteki işler için Türk Ticaret Kanununu hükümleri geçerli olacaktır.
Madde 11- Gizlilik- Mesafeli Satış Sözleşmesi

Alıcı tarafından iş bu sözleşmede belirtilen bilgiler ile ödeme yapmak amacı ile satıcıya bildirdiği bilgiler satıcı tarafından 3. şahıslarla paylaşılmayacaktır.
Satıcı bu bilgileri sadece idari/ yasal zorunluluğun mevcudiyeti çerçevesinde açıklayabilecektir. Araştırma ehliyeti belgelenmiş her türlü adli soruşturma dahilinde satıcı kendisinden istenen bilgiyi elinde bulunduruyorsa ilgili makama sağlayabilir.

Kredi Kartı bilgileri kesinlikle saklanmaz,Kredi Kartı bilgileri sadece tahsilat işlemi sırasında ilgili bankalara güvenli bir şekilde iletilerek provizyon alınması için kullanılır ve provizyon sonrası sistemden silinir.
Alıcıya ait e-posta adresi, posta adresi ve telefon gibi bilgiler yalnızca satıcı tarafından standart ürün teslim ve bilgilendirme prosedürleri için kullanılır. Bazı dönemlerde kampanya bilgileri, yeni ürünler hakkında bilgiler, promosyon bilgileri alıcıya onayı sonrasında gönderilebilir. 

Madde 12- Uyuşmazlık Durumunda Yetkili Mahkeme ve İcra Daireleri
İşbu sözleşmenin uygulanmasından kaynaklanan uyuşmazlık halinde, Sanayi ve Ticaret Bakanlığınca her yıl Aralık ayında ilan edilen değere kadar Tüketici Hakem Heyetleri ile Alıcı’nın veya Satıcı’nın yerleşim yerindeki Tüketici Mahkemeleri yetkilidir.

Siparişin gerçekleşmesi durumunda Alıcı işbu sözleşmenin tüm koşullarını kabul etmiş sayılır. 27/07/2024
                </div>
              </div>
            </div>
            </div>
        </div>
      </div>
      <div className="col-lg-4 ozet-sag-col">
          <Sepet_ozeti />
          <button className="button-next-step primary" id="stepper" >
          Siparişi Onayla
        </button>
            </div>
    </div>
  );
}

export default Odeme3;
