import {useEffect, useState} from 'react';
import {GetProductQuestionsRequest, PostProductQuestionRequest} from "../../API/ProductApi.js";
import {getCookie} from "../cookie/cookie.js";
import {HiOutlineChevronLeft, HiOutlineChevronRight} from "react-icons/hi";
import {toast} from "react-toastify";

const ProductQuestions = ({productId}) => {
    const [questions, setQuestions] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [newQuestion, setNewQuestion] = useState("");
    const [lastPage, setLastPage] = useState(1);

    const token = getCookie("token");

    const GetQuestions = async () => {
        const response = await GetProductQuestionsRequest(productId, pageNum);
        if (response && response.data.items) {
            setQuestions(response.data.items || []);
            setLastPage(response.data.totalPages || 0);
        }
    };

    const SendQuestion = async () => {
        if (!newQuestion.trim()) return toast.error("Lütfen sorunuzu yazınız!!");
        const body = {
            productId: productId,
            questionText: newQuestion
        };

        try {
            await PostProductQuestionRequest(body);
            setNewQuestion("");
            toast.success("Soru başarıyla gönderildi!")
            GetQuestions();
        } catch (error) {
            console.log(error);
            toast.error("Soru gönderilirken bir hata oluştu!")
        }

    };

    useEffect(() => {
        GetQuestions();
    }, [pageNum]);

    return (
        <div className="d-flex flex-column gap-3">

            {token && (
                <div className="card p-3 shadow-sm mb-2">
                    <textarea
                        className="mb-2"
                        rows={3}
                        style={{height: '150px', resize: 'none'}}
                        placeholder="Bu ürün hakkında soru sor..."
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                    />
                    <button className="btn btn-dark w-100" onClick={SendQuestion}>
                        Gönder
                    </button>
                </div>
            )}

            <div className="d-flex align-items-center flex-wrap gap-2">
                {questions.length === 0 && (
                    <p className="text-muted text-center w-100">Bu ürüne ait soru bulunmamaktadır.</p>
                )}

                {questions.map((q) => (
                    <div key={q.id} className="card p-3 mb-2 shadow-sm" style={{minWidth: '250px', maxWidth: '100%'}}>
                        <div className="d-flex justify-content-between">
                            <span className="fw-bold">{q.userEmail}</span>
                            <span className="text-muted" style={{fontSize: "12px"}}>
                                {new Date(q.created).toLocaleDateString("tr-TR")}
                            </span>
                        </div>
                        <p className="mt-2 mb-1"
                           style={{maxWidth: '100%', textWrap: 'wrap', wordBreak: 'break-all'}}>{q.question}</p>
                        {q.answer ? (
                            <p className="text-success small" style={{
                                maxWidth: '100%',
                                textWrap: 'wrap',
                                wordBreak: 'break-all'
                            }}>Cevap: {q.answer}</p>
                        ) : (
                            <p className="text-danger small">Henüz cevaplanmadı</p>
                        )}
                    </div>
                ))}

            </div>
            <div className="d-flex gap-2 justify-content-center">
                {pageNum > 1 &&
                    <button className="btn pag-btn d-flex justify-content-center align-items-center"
                            onClick={() => setPageNum(pageNum - 1)}>
                        <HiOutlineChevronLeft size={20}/>
                    </button>
                }
                <button className="btn pag-btn">{pageNum}</button>
                {pageNum < lastPage &&
                    <button className="btn pag-btn d-flex justify-content-center align-items-center"
                            onClick={() => setPageNum(pageNum + 1)}>
                        <HiOutlineChevronRight size={20}/>
                    </button>
                }
            </div>
        </div>
    );
};

export default ProductQuestions;