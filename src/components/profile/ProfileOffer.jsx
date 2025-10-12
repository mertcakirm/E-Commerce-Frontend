import {useEffect, useState} from "react";
import {GetOffersRequest} from "../../API/ProfileApi.js";
import LoadingComponent from "../other/Loading.jsx";

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
            setLoading(false);
        } catch (error) {
            console.error("Kampanyalar alınamadı:", error);
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

    if (loading && offers.length === 0) return <LoadingComponent/>;

    return (
        <div className="row kampanya-row">
            {offers.length > 0 ? (
                offers.map((offer, index) => (
                    <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <a href={`/urunler/kampanya/${offer.id}`} className="kampanya-card shadow-sm rounded-2 border" data-aos="fade-up">
                            <img
                                src={getImageUrl(offer.imageUrl)}
                                className="img-fluid w-100  ratio-1x1 object-fit-cover"
                                style={{height:'300px'}}
                                alt={offer.name}
                            />
                            <div className="text-center">
                                {offer.description || "Kampanya Detayı Yok"} <br/>
                                <strong>%{offer.discountRate} indirim</strong>
                            </div>
                        </a>
                    </div>
                ))
            ) : (
                <div className="text-center">
                    Kampanya yok
                </div>
            )}
        </div>
    );
};

export default ProfileOffer;