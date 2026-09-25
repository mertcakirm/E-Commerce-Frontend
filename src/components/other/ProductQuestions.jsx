import { useEffect, useState } from 'react';
import { GetProductQuestionsRequest, PostProductQuestionRequest } from "../../API/ProductApi.js";
import { getCookie } from "../cookie/cookie.js";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import { toast } from "react-toastify";
import { IoHelpCircleOutline, IoCheckmarkCircle, IoTimeOutline, IoPaperPlaneOutline } from "react-icons/io5";

const ProductQuestions = ({ productId }) => {
    const [questions, setQuestions] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [newQuestion, setNewQuestion] = useState("");
    const [lastPage, setLastPage] = useState(1);

    const token = getCookie("token");

    const GetQuestions = async () => {
        try {
            const response = await GetProductQuestionsRequest(productId, pageNum);
            if (response && response.data.items) {
                setQuestions(response.data.items || []);
                setLastPage(response.data.totalPages || 0);
            }
        } catch (error) {
            console.error("Sorular alınamadı:", error);
        }
    };

    const SendQuestion = async () => {
        if (!newQuestion.trim()) return toast.error("Lütfen sorunuzu yazınız!");
        const body = {
            productId: productId,
            questionText: newQuestion
        };

        try {
            await PostProductQuestionRequest(body);
            setNewQuestion("");
            toast.success("Sorunuz satıcıya iletildi!");
            GetQuestions();
        } catch (error) {
            console.error(error);
            toast.error("Soru gönderilirken bir hata oluştu!");
        }
    };

    useEffect(() => {
        GetQuestions();
    }, [pageNum]);

    return (
        <div className="product-tab-subwrapper">
            {/* Soru Gönderme Alanı (Giriş Yapılmışsa) */}
            {token ? (
                <div className="modern-ask-card">
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <IoHelpCircleOutline size={20} className="text-primary" />
                        <span className="modern-form-heading">Ürün Hakkında Soru Sorun</span>
                    </div>
                    <textarea
                        className="modern-form-textarea"
                        rows={3}
                        placeholder="Beden kalıbı, kumaş türü veya kargo hakkında merak ettikleriniz..."
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                    />
                    <div className="d-flex justify-content-end mt-2">
                        <button
                            type="button"
                            className="modern-submit-action-btn"
                            onClick={SendQuestion}
                        >
                            <IoPaperPlaneOutline size={16} />
                            <span>Soruyu Gönder</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="modern-auth-prompt-card">
                    <p className="mb-0">
                        Bu ürünle ilgili satıcıya soru sormak için{" "}
                        <a href="/girisyap" className="fw-bold text-dark text-decoration-underline">
                            giriş yapmalısınız
                        </a>.
                    </p>
                </div>
            )}

            {/* Soru & Cevap Listesi */}
            <div className="modern-qa-feed">
                {questions.length === 0 ? (
                    <div className="modern-empty-state">
                        <IoHelpCircleOutline size={36} className="text-muted mb-2" />
                        <p className="mb-0 text-muted">Bu ürüne henüz soru sorulmamış. İlk soruyu sen sor!</p>
                    </div>
                ) : (
                    questions.map((q) => (
                        <div key={q.id} className="modern-qa-item-card">
                            {/* Üst Bilgi */}
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="modern-user-badge">
                                    {q.userEmail ? q.userEmail.replace(/(.{2})(.*)(?=@)/, "$1***") : "Kullanıcı"}
                                </span>
                                <span className="modern-date-tag">
                                    {new Date(q.created).toLocaleDateString("tr-TR")}
                                </span>
                            </div>

                            {/* Kullanıcı Sorusu */}
                            <div className="modern-q-text-block">
                                <span className="qa-letter-badge q-badge">S</span>
                                <p className="mb-0 qa-text">{q.question}</p>
                            </div>

                            {/* Satıcı Cevabı veya Bekleme Durumu */}
                            {q.answer ? (
                                <div className="modern-a-text-block">
                                    <span className="qa-letter-badge a-badge">C</span>
                                    <div className="d-flex flex-column">
                                        <div className="d-flex align-items-center gap-1 mb-1">
                                            <IoCheckmarkCircle size={14} color="#16a34a" />
                                            <span className="qa-seller-title">Satıcı Yanıtı</span>
                                        </div>
                                        <p className="mb-0 qa-text">{q.answer}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="modern-pending-pill">
                                    <IoTimeOutline size={14} />
                                    <span>Satıcıdan yanıt bekleniyor</span>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Sayfalama Kontrolleri */}
            {lastPage > 1 && (
                <div className="modern-tab-pagination">
                    <button
                        type="button"
                        className="modern-pag-btn"
                        disabled={pageNum <= 1}
                        onClick={() => setPageNum(pageNum - 1)}
                        aria-label="Önceki Sayfa"
                    >
                        <HiOutlineChevronLeft size={16} />
                    </button>
                    <span className="modern-pag-indicator">
                        {pageNum} / {lastPage}
                    </span>
                    <button
                        type="button"
                        className="modern-pag-btn"
                        disabled={pageNum >= lastPage}
                        onClick={() => setPageNum(pageNum + 1)}
                        aria-label="Sonraki Sayfa"
                    >
                        <HiOutlineChevronRight size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductQuestions;
