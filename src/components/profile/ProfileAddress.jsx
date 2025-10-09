import {useEffect, useState} from "react";
import LoadingComponent from "../other/Loading.jsx";
import {toast} from "react-toastify";
import {
    DeleteAddressRequest,
    GetAddressRequest,
} from "../../API/AddressApi.js";
import AddAddressPopup from "../Popups/AddAddressPopup.jsx";

const ProfileAdresses = () => {
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refleshData, setRefleshData] = useState(false);

    const GetAdresses = async () => {
        try {
            setLoading(true);
            const data = await GetAddressRequest();
            setAddresses(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetAdresses();
    }, [refleshData]);

    const DeleteAddress = async (id) => {
        try {
            await DeleteAddressRequest(id);
            setAddresses(addresses.filter((address) => address.id !== id));
            toast.success("Adres başarıyla silindi!");
        } catch (error) {
            console.log(error);
            toast.error("Adres silinemedi!");
        }
    };

    if (loading) return <LoadingComponent/>;

    return (
        <div
            className="row col-12 py-3 w-100 adres-ekle-row top-0"
            style={{justifyContent: "end", textAlign: "center"}}
        >
            <div className="d-flex w-100 align-items-center justify-content-between col-12">
                <div className="text-center fs-4 adreslerim-profil-baslik">
                    ADRESLERİM
                </div>
                <button
                    className="btn giris-yap-btn fs-6 w-auto"
                    onClick={() => {
                        setSelectedAddressId(null); // ✅ yeni adres ekleme modu
                        setShowPopup(true);
                    }}
                >
                    + Yeni Adres Ekle
                </button>
            </div>

            <div className="col-12 mt-3 row justify-content-center adreslerim-row-parent" >
                {addresses.length === 0 ? (
                    <div className="text-center">Henüz adres eklenmemiş.</div>
                ) : (
                    addresses.map((address) => (
                        <div
                            key={address.id}
                            className="address-card col-12 border mb-2"
                        >
                            <div className="d-flex flex-column flex-lg-row align-items-center gap-5 w-75">
                                <div className="fw-bold address-card-title">
                                    {address.addressTitle}
                                </div>
                                <div>{address.addressLine}</div>
                                <div>{address.phoneNumber}</div>
                            </div>
                            <div className="d-flex align-items-center">
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => {
                                        setSelectedAddressId(address.id);
                                        setShowPopup(true);
                                    }}
                                >
                                    Düzenle
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => DeleteAddress(address.id)}
                                >
                                    Sil
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showPopup && (
                <AddAddressPopup
                    id={selectedAddressId} // ✅ id gönderiliyor
                    onClose={() => {
                        setShowPopup(false);
                        setRefleshData(!refleshData);
                    }}
                />
            )}
        </div>
    );
};

export default ProfileAdresses;