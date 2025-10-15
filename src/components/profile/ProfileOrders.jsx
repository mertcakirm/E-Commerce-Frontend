import kampanya from "../../assets/kampanya.jpg";
import { useEffect, useState } from "react";
import { GetMyOrdersRequest } from "../../API/OrderApi.js";
import { FaBoxOpen, FaCheckCircle, FaClock, FaTimesCircle, FaTruck } from "react-icons/fa";

const ProfileOrders = () => {
    const [orders, setOrders] = useState([]);

    const GetOrders = async () => {
        try {
            const response = await GetMyOrdersRequest();
            console.log(response.data.data.data);
            setOrders(response.data.data.data || []);
        } catch (error) {
            console.error("Siparişler alınamadı:", error);
            setOrders([]);
        }
    };

    useEffect(() => {
        GetOrders();
    }, []);

    return (
        <div className="row siparislerim-row">
            {orders.length === 0 ? (
                <div className="text-center fw-medium mt-4">Sipariş bulunamadı.</div>
            ) : (
                orders.map((order) => (
                    <div className="col-lg-3 col-md-6 mb-3" key={order.id}>
                        <div className="d-flex flex-column justify-content-between border fw-medium shadow-sm rounded-3">
                            {/* Üst Bilgiler */}
                            <div
                                className="d-flex justify-content-between align-items-center p-2"
                                style={{ borderBottom: "1px solid #ccc" }}
                            >
                                <div className="d-flex flex-column">
                                    <div>
                                        {new Date(order.orderDate).toLocaleDateString("tr-TR")}
                                    </div>
                                    <div>
                                        Toplam:{" "}
                                        <span style={{ color: "orange" }}>
                                            {order.totalAmount.toFixed(2)} ₺
                                        </span>
                                    </div>
                                </div>
                                <a
                                    className="text-decoration-none"
                                    href={`/siparis-durumu/${order.id}`}
                                    style={{ color: "orange" }}
                                >
                                    Detaylar
                                </a>
                            </div>

                            {/* Sipariş İçeriği */}
                            <div className="d-flex justify-content-between align-items-center p-2">
                                <div className="d-flex flex-column gap-2">
                                    <div className="d-flex align-items-center gap-2">
                                        {(() => {
                                            const status = order.status?.toLowerCase().trim();

                                            if (status === "onaylandı")
                                                return <FaCheckCircle style={{ color: "green" }} />;
                                            if (status === "hazırlanıyor")
                                                return <FaClock style={{ color: "orange" }} />;
                                            if (status === "yolda")
                                                return <FaTruck style={{ color: "green" }} />;
                                            if (status === "teslim edildi")
                                                return <FaBoxOpen style={{ color: "#28a745" }} />;
                                            if (status === "iptal edildi")
                                                return <FaTimesCircle style={{ color: "red" }} />;
                                            return null;
                                        })()}

                                        <span>{order.status}</span>
                                    </div>

                                    {/* Ürün Görselleri */}
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
                                        {order.orderItem?.reduce(
                                            (sum, item) => sum + (item.quantity || 0),
                                            0
                                        )}{" "}
                                        ürün {order.status.toLowerCase()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProfileOrders;