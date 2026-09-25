import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { AddCommentRequest, GetProductCommentsRequest } from "../../API/ProductApi.js";
import { getCookie } from "../cookie/cookie.js";
import { FaStar } from "react-icons/fa";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import { IoChatbubbleEllipsesOutline, IoPaperPlaneOutline } from "react-icons/io5";

const ProductComments = ({ productId }) => {
    const [newComment, setNewComment] = useState({ rating: 0, comment: "" });
    const [hoverRating, setHoverRating] = useState(0);
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
        const token = getCookie("token");

        if (!newComment.rating || !newComment.comment.trim()) {
            toast.error("Lütfen yorum puanı ve açıklamasını doldurun!");
            return;
        }

        if (!token) {
            window.location.href = "/girisyap";
            return;
        }

        try {
            await AddCommentRequest(productId, newComment);
            setNewComment({ rating: 0, comment: "" });
            toast.success('Değerlendirmeniz paylaşıldı!');
            setCurrentPage(1);
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
        <div className="product-tab-subwrapper">
            {/* Yorum Ekleme Kartı */}
            <div className="modern-ask-card mb-4">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                    <span className="modern-form-heading">Deneyiminizi Paylaşın</span>

                    {/* Yıldız Puanı Seçici (1 - 10) */}
                    <div className="d-flex align-items-center gap-1">
                        <span className="modern-rating-counter">
                            {hoverRating || newComment.rating || 0} / 10
                        </span>
                        <div className="modern-interactive-stars">
                            {[...Array(10)].map((_, i) => {
                                const starValue = i + 1;
                                return (
                                    <button
                                        type="button"
                                        key={starValue}
                                        className="star-pick-btn"
                                        onClick={() => setNewComment({ ...newComment, rating: starValue })}
                                        onMouseEnter={() => setHoverRating(starValue)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        aria-label={`${starValue} Puan`}
                                    >
                                        <FaStar
                                            size={16}
                                            color={
                                                starValue <= (hoverRating || newComment.rating)
                                                    ? "#f59e0b"
                                                    : "#e2e8f0"
                                            }
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <textarea
                    className="modern-form-textarea"
                    rows={3}
                    placeholder="Ürünün kalitesi, kumaşı, kalıbı ve duruşu hakkında görüşlerinizi paylaşın..."
                    value={newComment.comment}
                    maxLength={235}
                    onChange={(e) =>
                        setNewComment({ ...newComment, comment: e.target.value })
                    }
                />

                <div className="d-flex align-items-center justify-content-between mt-2">
                    <span className="modern-char-counter">
                        {235 - (newComment.comment?.length || 0)} karakter kaldı
                    </span>
                    <button
                        type="button"
                        className="modern-submit-action-btn"
                        onClick={commentSubmit}
                    >
                        <IoPaperPlaneOutline size={16} />
                        <span>Değerlendir</span>
                    </button>
                </div>
            </div>

            {/* Yorum Akışı */}
            <div className="modern-comments-feed">
                {comments.length === 0 ? (
                    <div className="modern-empty-state">
                        <IoChatbubbleEllipsesOutline size={36} className="text-muted mb-2" />
                        <p className="mb-0 text-muted">Bu ürüne henüz yorum yapılmamış.</p>
                    </div>
                ) : (
                    comments.map((comment, index) => (
                        <div className="modern-comment-row" key={comment.id || index}>
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <span className="modern-user-badge">{comment.userName || "Müşteri"}</span>
                                <div className="detail-rating-pill">
                                    <FaStar size={12} color="#f59e0b" />
                                    <span>{comment.rating} / 10</span>
                                </div>
                            </div>
                            <p className="modern-comment-text mb-0">{comment.commentText}</p>
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
                        disabled={currentPage <= 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        aria-label="Önceki Sayfa"
                    >
                        <HiOutlineChevronLeft size={16} />
                    </button>
                    <span className="modern-pag-indicator">
                        {currentPage} / {lastPage}
                    </span>
                    <button
                        type="button"
                        className="modern-pag-btn"
                        disabled={currentPage >= lastPage}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        aria-label="Sonraki Sayfa"
                    >
                        <HiOutlineChevronRight size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductComments;
