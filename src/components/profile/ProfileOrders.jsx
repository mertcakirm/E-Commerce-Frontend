import kampanya from "../../assets/kampanya.jpg";
import { useEffect, useState } from "react";
import { GetMyOrdersRequest } from "../../API/OrderApi.js";
import { FaBoxOpen, FaCheckCircle, FaClock, FaTimesCircle, FaTruck } from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";

const ProfileOrders = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const GetOrders = async (pageNum = 1) => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await GetMyOrdersRequest(pageNum);
            const newItems = response.data?.data?.data?.items || [];

            if (newItems.length === 0) {
                setHasMore(false);
            } else {
                setOrders(prev => [...prev, ...newItems]);
            }
        } catch (error) {
            console.error("Siparişler alınamadı:", error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetOrders(1);
    }, []);

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        GetOrders(nextPage);
    };

    const getStatusBadge = (statusStr) => {
        const s = statusStr?.toLowerCase().trim();
        let badgeClass = "badge-status-neutral";
        let icon = null;

        if (s === "onaylandı") {
            badgeClass = "badge-status-success";
            icon = <FaCheckCircle size={13} />;
        } else if (s === "hazırlanıyor") {
            badgeClass = "badge-status-warning";
            icon = <FaClock size={13} />;
        } else if (s === "yolda") {
            badgeClass = "badge-status-info";
            icon = <FaTruck size={13} />;
        } else if (s === "teslim edildi") {
            badgeClass = "badge-status-done";
            icon = <FaBoxOpen size={13} />;
        } else if (s === "iptal edildi") {
            badgeClass = "badge-status-danger";
            icon = <FaTimesCircle size={13} />;
        }

        return (
            <span className={`order-status-badge ${badgeClass}`}>
                {icon}
                <span>{statusStr}</span>
            </span>
        );
    };

    return (
        <div className="orders-wrapper">
            {orders.length === 0 && !hasMore ? (
                <div className="profile-empty-state">
                    <FaBoxOpen size={48} className="empty-icon text-muted mb-2" />
                    <h4>Kayıtlı Sipariş Yok</h4>
                    <p>Henüz verilmiş bir siparişiniz bulunmamaktadır.</p>
                </div>
            ) : (
                <div className="row g-3">
                    {orders.map((order) => {
                        const totalItemCount = order.orderItem?.reduce(
                            (sum, item) => sum + (item.quantity || 0),
                            0
                        ) || 0;

                        return (
                            <div className="col-lg-4 col-md-6" key={order.id}>
                                <div className="modern-order-card">
                                    <div className="order-card-header">
                                        <div className="order-date-wrap">
                                            <span className="order-date-label">Tarih</span>
                                            <span className="order-date-value">
                                                {new Date(order.orderDate).toLocaleDateString("tr-TR")}
                                            </span>
                                        </div>
                                        <div className="order-amount-wrap">
                                            <span className="order-amount-label">Toplam</span>
                                            <span className="order-amount-value">
                                                {order.totalAmount.toFixed(2)} ₺
                                            </span>
                                        </div>
                                    </div>

                                    <div className="order-card-body">
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            {getStatusBadge(order.status)}
                                            <span className="order-item-count-text">
                                                {totalItemCount} ürün
                                            </span>
                                        </div>

                                        <div className="order-thumbnails-row">
                                            {order.orderItem?.flatMap((item) =>
                                                item.orderItemProduct?.map((product) => (
                                                    <img
                                                        key={product.id}
                                                        src={
                                                            product.imageUrl
                                                                ? `https://localhost:7050${product.imageUrl}`
                                                                : kampanya
                                                        }
                                                        className="order-product-thumb"
                                                        alt={product.name || "Ürün"}
                                                        title={product.name}
                                                    />
                                                ))
                                            )}
                                        </div>
                                    </div>

                                    <div className="order-card-footer">
                                        <a
                                            className="order-detail-link"
                                            href={`/siparis-durumu/${order.id}`}
                                        >
                                            <span>Sipariş Detayı</span>
                                            <IoChevronForward size={14} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {hasMore && !loading && (
                <div className="text-center mt-4">
                    <button onClick={loadMore} className="modern-btn-outline">
                        Daha Fazla Yükle
                    </button>
                </div>
            )}

            {loading && <div className="text-center py-4 text-muted fw-medium">Yükleniyor...</div>}
        </div>
    );
};

export default ProfileOrders;
