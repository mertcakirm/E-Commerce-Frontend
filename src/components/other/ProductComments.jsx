import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { AddCommentRequest, GetProductCommentsRequest } from "../../API/ProductApi.js";
import {getCookie} from "../cookie/cookie.js";
import {FaStar} from "react-icons/fa";
import {HiOutlineChevronLeft, HiOutlineChevronRight} from "react-icons/hi";

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
        const token = getCookie("token");

        if (!newComment.rating || !newComment.comment) {
            toast.error("Lütfen yorum puanı ve içeriğini doldurun!");
            return;
        }

        if (!token) window.location.href = "/girisyap";

        try {
            await AddCommentRequest(productId, newComment);
            setNewComment({ rating: 0, comment: "" });
            toast.success('Yorum yapıldı!');
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
                                <FaStar size={24} color="orange" />
                            </div>
                        </div>
                        <p>{comment.commentText}</p>
                    </div>
                ))}

                <div className="d-flex gap-2 justify-content-center">
                    {currentPage > 1 &&
                        <button className="btn pag-btn d-flex justify-content-center align-items-center" onClick={() => setCurrentPage(currentPage - 1)}>
                            <HiOutlineChevronLeft size={20} />
                        </button>
                    }
                    <button className="btn pag-btn">{currentPage}</button>
                    {currentPage < lastPage &&
                        <button className="btn pag-btn d-flex justify-content-center align-items-center" onClick={() => setCurrentPage(currentPage + 1)}>
                            <HiOutlineChevronRight size={20} />
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductComments;