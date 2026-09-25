import { useState, useMemo } from "react";
import Navbar from "../components/other/navbar/navbar.jsx";
import "./css/FrequentlyAskedQuestions.css";
import { 
    HiOutlineChevronDown, 
    HiOutlineMagnifyingGlass, 
    HiOutlineChatBubbleLeftRight,
    HiOutlineShoppingBag,
    HiOutlineTruck,
    HiOutlineCreditCard,
    HiOutlineArrowPath,
    HiOutlineUser,
    HiOutlineQuestionMarkCircle
} from "react-icons/hi2";

const FAQ_DATA = [
    {
        category: "SİPARİŞLERİM",
        icon: HiOutlineShoppingBag,
        items: [
            {
                id: "siparislerim-1",
                question: "Nasıl sipariş verebilirim?",
                answer: "Beğendiğiniz ürünlerin bedenini seçip 'Sepete Ekle' butonuna tıkladıktan sonra sepet sayfanızdan teslimat ve ödeme bilgilerinizi girerek siparişinizi saniyeler içinde tamamlayabilirsiniz."
            },
            {
                id: "siparislerim-2",
                question: "Siparişim tarafıma ulaşmadı, ne yapmalıyım?",
                answer: "Hesabım sayfasındaki 'Siparişlerim' sekmesinden kargo takip numaranızı kontrol edebilir veya müşteri hizmetlerimizle iletişime geçerek anlık durum sorgulaması yapabilirsiniz."
            },
            {
                id: "siparislerim-3",
                question: "Sipariş vermek için üye olmalı mıyım?",
                answer: "Hayır, misafir kullanıcı olarak da siparişinizi oluşturabilirsiniz. Ancak sipariş takibi ve kampanyalardan yararlanmak için üye olmanızı öneririz."
            },
            {
                id: "siparislerim-4",
                question: "Siparişimi iptal edebilir miyim?",
                answer: "Siparişiniz kargoya verilmeden önce 'Siparişlerim' ekranından veya destek hattımız üzerinden iptal talebi oluşturabilirsiniz."
            }
        ]
    },
    {
        category: "KARGO",
        icon: HiOutlineTruck,
        items: [
            {
                id: "kargo-1",
                question: "Kargo ücretsiz mi?",
                answer: "Belirli sepet tutarı üzerindeki tüm siparişlerinizde kargo tamamen ücretsizdir. Kampanya altındaki siparişlerde standart kargo ücreti ödeme adımında yansıtılır."
            },
            {
                id: "kargo-2",
                question: "Siparişim hangi kargo ile teslim edilecek?",
                answer: "Anlaşmalı olduğumuz Yurtiçi Kargo ve MNG Kargo güvencesiyle siparişleriniz adresinize ulaştırılmaktadır."
            },
            {
                id: "kargo-3",
                question: "Kargom ne zaman ulaşır?",
                answer: "Siparişleriniz 1-3 iş günü içinde kargoya teslim edilir. Kargo firması bulunduğunuz şehre göre 1-2 iş günü içinde teslimatı gerçekleştirir."
            },
            {
                id: "kargo-4",
                question: "Teslimat adresinde bulunmazsam ne olur?",
                answer: "Kargo görevlisi adreste kimseyi bulamazsa bildirim notu bırakır ve paketinizi en yakın kargo şubesinden 3 iş günü içinde teslim alabilirsiniz."
            }
        ]
    },
    {
        category: "ÖDEME",
        icon: HiOutlineCreditCard,
        items: [
            {
                id: "odeme-1",
                question: "Hangi ödeme yöntemlerini kullanabilirim?",
                answer: "Tüm kredi kartları, banka kartları (debit) ve anlaşmalı bankaların sanal kartlarıyla 256-bit SSL korumalı güvenli ödeme yapabilirsiniz."
            },
            {
                id: "odeme-2",
                question: "Taksit imkânı bulunuyor mu?",
                answer: "Anlaşmalı bankaların kredi kartlarına 3, 6 ve 9 aya varan taksit seçeneklerimiz mevcuttur."
            },
            {
                id: "odeme-3",
                question: "Kapıda ödeme seçeneği var mı?",
                answer: "Şu an için ödemeler yalnızca sitemiz üzerinden online kredi/banka kartı veya havale/EFT yoluyla alınmaktadır."
            }
        ]
    },
    {
        category: "İADE & DEĞİŞİM",
        icon: HiOutlineArrowPath,
        items: [
            {
                id: "iade-1",
                question: "Ürünleri nasıl iade edebilirim?",
                answer: "Faturanız ve orijinal ambalajı ile birlikte siparişinizi teslim aldığınız tarihten itibaren 14 gün içinde anlaşmalı kargo kodu ile ücretsiz gönderebilirsiniz."
            },
            {
                id: "iade-2",
                question: "İade süresi ne kadar?",
                answer: "Yasal cayma hakkı süresi ürünün tarafınıza ulaştığı tarihten itibaren 14 gündür."
            },
            {
                id: "iade-3",
                question: "İade kargo ücretini kim öder?",
                answer: "Anlaşmalı kargo firmamız ve size iletilen iade kodu kullanıldığı sürece kargo ücreti tamamen firmamıza aittir."
            }
        ]
    },
    {
        category: "ÜYELİK",
        icon: HiOutlineUser,
        items: [
            {
                id: "uyelik-1",
                question: "Üye olmanın avantajları nelerdir?",
                answer: "Siparişlerinizi ve kargo durumunuzu anlık izleyebilir, favori ürünlerinizi kaydedebilir ve üyelere özel indirim kuponlarından faydalanabilirsiniz."
            },
            {
                id: "uyelik-2",
                question: "Şifremi unuttum, ne yapmalıyım?",
                answer: "Giriş yap ekranında bulunan 'Şifremi Unuttum' bağlantısına tıklayarak kayıtlı e-posta adresinize sıfırlama linki gönderebilirsiniz."
            },
            {
                id: "uyelik-3",
                question: "Kişisel verilerim güvende mi?",
                answer: "Verileriniz KVKK standartlarına uygun olarak yüksek güvenlikli sunucularda saklanmakta ve üçüncü şahıslarla paylaşılmamaktadır."
            }
        ]
    },
    {
        category: "DİĞER",
        icon: HiOutlineQuestionMarkCircle,
        items: [
            {
                id: "diger-1",
                question: "Müşteri hizmetlerine nasıl ulaşabilirim?",
                answer: "Hafta içi 09:00 - 18:00 saatleri arasında destek@siteniz.com üzerinden ya da WhatsApp destek hattımızdan bize ulaşabilirsiniz."
            },
            {
                id: "diger-2",
                question: "Toptan alım yapıyor musunuz?",
                answer: "Toptan veya kurumsal alım talepleriniz için iletişim sayfamızdaki formu doldurabilir veya kurumsal e-posta hattımızdan teklif alabilirsiniz."
            }
        ]
    }
];

const FrequentlyAskedQuestions = () => {
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const [openItem, setOpenItem] = useState(null);

    const toggleAccordion = (id) => {
        setOpenItem(prev => (prev === id ? null : id));
    };

    // Arama ve Kategori Filtresi
    const filteredCategories = useMemo(() => {
        return FAQ_DATA.map(cat => {
            const matchesCategory = selectedCategory === "ALL" || cat.category === selectedCategory;
            if (!matchesCategory) return null;

            const matchingItems = cat.items.filter(item => 
                item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.answer.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (matchingItems.length === 0) return null;

            return {
                ...cat,
                items: matchingItems
            };
        }).filter(Boolean);
    }, [selectedCategory, searchQuery]);

    return (
        <div className="faq-page-wrapper">
            <Navbar />

            <div className="faq-main-container">
                {/* Minimalist Hero Alanı */}
                <div className="faq-hero-section text-center" data-aos="fade-up">
                    <span className="faq-subheading">Yardım & Destek</span>
                    <h1 className="faq-main-title">Sıkça Sorulan Sorular</h1>
                    <p className="faq-lead-text">
                        Aklınıza takılan soruların yanıtlarını bulun veya doğrudan bize ulaşın.
                    </p>

                    {/* Arama Input Bar */}
                    <div className="faq-search-box">
                        <HiOutlineMagnifyingGlass size={20} className="faq-search-icon" />
                        <input
                            type="text"
                            placeholder="Soru veya anahtar kelime arayın..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                className="faq-search-clear"
                                onClick={() => setSearchQuery("")}
                            >
                                &times;
                            </button>
                        )}
                    </div>
                </div>

                {/* Kategori Filtre Butonları (Pills) */}
                <div className="faq-category-pills" data-aos="fade-up">
                    <button
                        type="button"
                        className={`faq-pill-btn ${selectedCategory === "ALL" ? "active" : ""}`}
                        onClick={() => setSelectedCategory("ALL")}
                    >
                        Tümü
                    </button>
                    {FAQ_DATA.map((cat) => (
                        <button
                            key={cat.category}
                            type="button"
                            className={`faq-pill-btn ${selectedCategory === cat.category ? "active" : ""}`}
                            onClick={() => setSelectedCategory(cat.category)}
                        >
                            <cat.icon size={16} />
                            <span>{cat.category}</span>
                        </button>
                    ))}
                </div>

                {/* Akordeon Soru Listesi */}
                <div className="faq-content-grid" data-aos="fade-up">
                    {filteredCategories.length === 0 ? (
                        <div className="faq-no-results text-center py-5">
                            <p className="text-muted mb-0">Aradığınız kriterlere uygun soru bulunamadı.</p>
                        </div>
                    ) : (
                        filteredCategories.map((group) => (
                            <div key={group.category} className="faq-category-group">
                                <div className="faq-group-header">
                                    <group.icon size={20} className="faq-group-icon" />
                                    <h2 className="faq-group-title">{group.category}</h2>
                                </div>

                                <div className="faq-accordion-stack">
                                    {group.items.map((item) => {
                                        const isOpen = openItem === item.id;
                                        return (
                                            <div
                                                key={item.id}
                                                className={`faq-accordion-item ${isOpen ? "open" : ""}`}
                                            >
                                                <button
                                                    type="button"
                                                    className="faq-accordion-question"
                                                    onClick={() => toggleAccordion(item.id)}
                                                    aria-expanded={isOpen}
                                                >
                                                    <span>{item.question}</span>
                                                    <HiOutlineChevronDown
                                                        size={18}
                                                        className={`faq-arrow-icon ${isOpen ? "rotate" : ""}`}
                                                    />
                                                </button>
                                                {isOpen && (
                                                    <div className="faq-accordion-answer">
                                                        <p className="mb-0">{item.answer}</p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Alt İletişim Kutusu (Card) */}
                <div className="faq-contact-card text-center" data-aos="fade-up">
                    <div className="faq-contact-icon-wrap">
                        <HiOutlineChatBubbleLeftRight size={28} />
                    </div>
                    <h3 className="faq-contact-title">Başka Bir Sorunuz Mu Var?</h3>
                    <p className="faq-contact-desc">
                        Yanıtını bulamadığınız sorularınız için destek ekibimiz size yardımcı olmaktan memnuniyet duyar.
                    </p>
                    <a href="/iletisim" className="faq-contact-btn">
                        Bize Ulaşın
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FrequentlyAskedQuestions;
