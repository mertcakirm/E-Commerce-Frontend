import {useEffect, useState} from "react";
import ProfileAddressesPopup from "./ProfileAddressPopup.jsx";
import LoadingComponent from "../other/Loading.jsx";
import {toast} from "react-toastify";
import {
    DeleteAddressRequest,
    GetAddressRequest,
} from "../../API/AddressApi.js";

const ProfileAdresses = () => {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refleshData, setRefleshData] = useState(false);

    const GetAdresses = async () => {
        try {
            setLoading(true);
            const data = await GetAddressRequest();
            console.log(data.data)
            setAddresses(data.data)
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
            className="row col-12 py-3 w-100 adres-ekle-row  top-0"
            style={{justifyContent: "end", textAlign: "center"}}
        >
            <div className="d-flex  w-100 align-items-center justify-content-between col-12  ">
                <div className="text-center fs-4 adreslerim-profil-baslik">
                    ADRESLERİM
                </div>
                <button
                    className="btn giris-yap-btn fs-6 w-auto"
                    onClick={() => {
                        setSelectedAddress(null);
                        setShowPopup(true);
                    }}
                >
                    + Yeni Adres Ekle
                </button>
            </div>

            <div className="col-12 row mt-3 justify-content-center adreslerim-row-parent">
                {addresses.length === 0 ? (
                    <div className="text-center">Henüz adres eklenmemiş.</div>
                ) : (
                    addresses.map((address) => (
                        <div
                            key={address.id}
                            className="col-12 border p-3 mb-2 d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <div className="fw-bold">{address.title}</div>
                                <div>{address.addressLine}</div>
                                <div>{address.phoneNumber}</div>
                            </div>
                            <div>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => {
                                        setSelectedAddress(address);
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
                <ProfileAddressesPopup
                    popupCloser={() => setShowPopup(false)}
                    updateAdress={selectedAddress}
                    reflesh={() => setRefleshData((prev) => !prev)}
                />
            )}
        </div>
    );
};

export default ProfileAdresses;