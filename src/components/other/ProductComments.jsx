import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { AddCommentRequest, GetProductCommentsRequest } from "../../API/ProductApi.js";

const ProductComments = ({ productId }) => {
    const [newComment, setNewComment] = useState({ rating: 0, comment: "" });
    const [comments, setComments] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const getComments = async () => {
        try {
            const data = await GetProductCommentsRequest(productId, currentPage);
            setLastPage(data.data.data.totalPages);
            setComments(data.data.data.items);
        } catch (error) {
            console.error(error);
            toast.error("Yorumlar yüklenemedi!");
        }
    };

    const commentSubmit = async () => {
        if (!newComment.rating || !newComment.comment) {
            toast.error("Lütfen yorum puanı ve içeriğini doldurun!");
            return;
        }

        try {
            await AddCommentRequest(productId, newComment);
            setNewComment({ rating: 0, comment: "" });
            toast.success('Yorum yapıldı!');
            setCurrentPage(1); // yeni yorum geldiğinde ilk sayfaya dön
            getComments();
        } catch (error) {
            console.error(error);
            toast.error("Yorum yapılamadı!");
        }
    };

    useEffect(() => {
        getComments();
    }, [productId, currentPage]);

    return (
        <div>
            <div className="urunler-yorum-flex">
                <h3>Yorum Yap</h3>
                <div className="d-flex justify-content-between">
                    <textarea
                        style={{ resize: 'none', height: '80px' }}
                        placeholder="Yorum"
                        value={newComment.comment}
                        maxLength={235}
                        onChange={(e) =>
                            setNewComment({ ...newComment, comment: e.target.value })
                        }
                    />
                    <select
                        value={newComment.rating}
                        onChange={(e) =>
                            setNewComment({ ...newComment, rating: parseInt(e.target.value) })
                        }
                        style={{ border: '0', lineHeight: '50px', marginBottom: '10px' }}
                        className="bg-transparent border-1 shadow-none"
                    >
                        <option value={0}>Puan Seçiniz</option>
                        {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                </div>
                <button className="tumunu-gor-btn" onClick={commentSubmit}>
                    Paylaş
                </button>
            </div>

            <hr />

            <div className="urunler-yorumlar">
                {comments.map((comment, index) => (
                    <div className="urunler-yorum-card" key={index}>
                        <div className="d-flex justify-content-between">
                            <p style={{ fontWeight: "700" }}>{comment.userName}</p>
                            <div className="d-flex align-items-center">
                                <div style={{ lineHeight: '40px', fontWeight: "700" }}>
                                    {comment.rating}/10
                                </div>
                                <svg width="24" height="24" fill="orange"
                                     clipRule="evenodd" fillRule="evenodd"
                                     strokeLinejoin="round" strokeMiterlimit="2"
                                     viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"
                                          fillRule="nonzero" />
                                </svg>
                            </div>
                        </div>
                        <p>{comment.commentText}</p>
                    </div>
                ))}

                <div className="d-flex gap-2 justify-content-center">
                    {currentPage > 1 &&
                        <button className="btn pag-btn d-flex justify-content-center align-items-center" onClick={() => setCurrentPage(currentPage - 1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="black" width="16" height="16" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
                        </button>
                    }
                    <button className="btn pag-btn">{currentPage}</button>
                    {currentPage < lastPage &&
                        <button className="btn pag-btn d-flex justify-content-center align-items-center" onClick={() => setCurrentPage(currentPage + 1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="black" width="16" height="16" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductComments;