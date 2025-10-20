import kampanya from "../../assets/kampanya.jpg";
import { useEffect, useState } from "react";
import { GetMyOrdersRequest } from "../../API/OrderApi.js";
import { FaBoxOpen, FaCheckCircle, FaClock, FaTimesCircle, FaTruck } from "react-icons/fa";

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
            const newItems = response.data.data.data.items || [];

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

    return (
        <div className="row siparislerim-row">

            {orders.length === 0 && !hasMore ? (
                <div className="text-center fw-medium mt-4">Sipariş bulunamadı.</div>
            ) : (
                orders.map((order) => (
                    <div className="col-lg-3 col-md-6 mb-3" key={order.id}>
                        <div className="d-flex flex-column justify-content-between border fw-medium shadow-sm rounded-3">
                            <div className="d-flex justify-content-between align-items-center p-2" style={{ borderBottom: "1px solid #ccc" }}>
                                <div className="d-flex flex-column">
                                    <div>{new Date(order.orderDate).toLocaleDateString("tr-TR")}</div>
                                    <div>Toplam: <span style={{ color: "orange" }}>{order.totalAmount.toFixed(2)} ₺</span></div>
                                </div>
                                <a className="text-decoration-none" href={`/siparis-durumu/${order.id}`} style={{ color: "orange" }}>
                                    Detaylar
                                </a>
                            </div>

                            <div className="d-flex justify-content-between align-items-center p-2">
                                <div className="d-flex flex-column gap-2">
                                    <div className="d-flex align-items-center gap-2">
                                        {(() => {
                                            const status = order.status?.toLowerCase().trim();
                                            if (status === "onaylandı") return <FaCheckCircle style={{ color: "green" }} />;
                                            if (status === "hazırlanıyor") return <FaClock style={{ color: "orange" }} />;
                                            if (status === "yolda") return <FaTruck style={{ color: "green" }} />;
                                            if (status === "teslim edildi") return <FaBoxOpen style={{ color: "#28a745" }} />;
                                            if (status === "iptal edildi") return <FaTimesCircle style={{ color: "red" }} />;
                                            return null;
                                        })()}
                                        <span>{order.status}</span>
                                    </div>

                                    <div className="d-flex align-items-center gap-1 flex-wrap">
                                        {order.orderItem?.flatMap((item) =>
                                            item.orderItemProduct?.map((product) => (
                                                <img
                                                    key={product.id}
                                                    src={
                                                        product.imageUrl
                                                            ? `https://localhost:7050${product.imageUrl}`
                                                            : kampanya
                                                    }
                                                    className="siparis-card-resim"
                                                    alt={product.name}
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                        borderRadius: "8px",
                                                        objectFit: "cover",
                                                        border: "1px solid #ddd",
                                                    }}
                                                />
                                            ))
                                        )}
                                    </div>

                                    <div className="text-muted" style={{ fontSize: "12px" }}>
                                        {order.orderItem?.reduce((sum, item) => sum + (item.quantity || 0), 0)} ürün {order.status.toLowerCase()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}

            {hasMore && !loading && (
                <div className="text-center my-3">
                    <button
                        onClick={loadMore}
                        className="btn btn-outline-dark px-4 fw-medium"
                    >
                        Daha Fazla Yükle
                    </button>
                </div>
            )}

            {loading && <div className="text-center fw-medium my-3">Yükleniyor...</div>}
        </div>
    );
};

export default ProfileOrders;