import { useEffect, useState } from "react";
import { GetOffersRequest } from "../../API/ProfileApi.js";
import LoadingComponent from "../other/Loading.jsx";
import { MdOutlineLocalOffer } from "react-icons/md";

const ProfileOffer = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);

    const GetOffers = async () => {
        try {
            const response = await GetOffersRequest();
            if (response?.data?.data) {
                setOffers(response.data.data);
            } else {
                setOffers([]);
            }
        } catch (error) {
            console.error("Kampanyalar alınamadı:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetOffers();
    }, []);

    const getImageUrl = (url) => {
        if (url && url !== "string") {
            if (url.startsWith("http")) {
                return url;
            }
            return `https://localhost:7050${url.startsWith("/offers/") ? url : `/offers/${url}`}`;
        }
        return "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg";
    };

    if (loading && offers.length === 0) return <LoadingComponent />;

    return (
        <div className="offers-container">
            {offers.length > 0 ? (
                <div className="row g-4">
                    {offers.map((offer, index) => (
                        <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                            <a
                                href={`/urunler/kampanya/${offer.id}`}
                                className="modern-offer-card"
                            >
                                <div className="offer-image-box">
                                    <img
                                        src={getImageUrl(offer.imageUrl)}
                                        className="offer-image"
                                        alt={offer.name || "Kampanya"}
                                    />
                                    {offer.discountRate && (
                                        <span className="offer-badge">
                                            %{offer.discountRate} İndirim
                                        </span>
                                    )}
                                </div>
                                <div className="offer-card-body">
                                    <p className="offer-description">
                                        {offer.description || "Kampanya Detayı Yok"}
                                    </p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="profile-empty-state">
                    <MdOutlineLocalOffer size={48} className="empty-icon text-muted mb-2" />
                    <h4>Aktif Kampanya Yok</h4>
                    <p>Şu anda hesabınıza tanımlı aktif bir kampanya bulunmuyor.</p>
                </div>
            )}
        </div>
    );
};

export default ProfileOffer;
