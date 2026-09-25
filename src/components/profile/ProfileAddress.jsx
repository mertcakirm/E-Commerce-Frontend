import { useEffect, useState } from "react";
import LoadingComponent from "../other/Loading.jsx";
import { toast } from "react-toastify";
import { DeleteAddressRequest, GetAddressRequest } from "../../API/AddressApi.js";
import AddAddressPopup from "../Popups/AddAddressPopup.jsx";
import { HiPlus, HiOutlinePencilSquare, HiOutlineTrash, HiOutlineMapPin } from "react-icons/hi2";

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
            setAddresses(data.data || []);
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

    if (loading) return <LoadingComponent />;

    return (
        <div className="profile-addresses-container">
            <div className="addresses-header">
                <div>
                    <h3 className="section-title mb-1">Adreslerim</h3>
                    <p className="section-subtitle mb-0">Sipariş teslimatlarında kullanılacak kayıtlı adresleriniz</p>
                </div>
                <button
                    className="btn-add-address"
                    onClick={() => {
                        setSelectedAddressId(null);
                        setShowPopup(true);
                    }}
                >
                    <HiPlus size={18} />
                    <span>Yeni Adres Ekle</span>
                </button>
            </div>

            <div className="addresses-content">
                {addresses.length === 0 ? (
                    <div className="profile-empty-state">
                        <HiOutlineMapPin size={48} className="empty-icon text-muted mb-2" />
                        <h4>Henüz Adres Yok</h4>
                        <p>Kayıtlı teslimat adresiniz bulunmuyor. Yeni bir adres ekleyerek başlayabilirsiniz.</p>
                    </div>
                ) : (
                    <div className="row g-3">
                        {addresses.map((address) => (
                            <div key={address.id} className="col-12 col-md-6">
                                <div className="modern-address-card">
                                    <div className="address-card-header">
                                        <div className="address-title-box">
                                            <HiOutlineMapPin size={18} className="address-icon" />
                                            <span className="address-title-text">{address.addressTitle}</span>
                                        </div>
                                        <div className="address-card-actions">
                                            <button
                                                className="btn-icon-action edit"
                                                onClick={() => {
                                                    setSelectedAddressId(address.id);
                                                    setShowPopup(true);
                                                }}
                                                title="Düzenle"
                                            >
                                                <HiOutlinePencilSquare size={16} />
                                            </button>
                                            <button
                                                className="btn-icon-action delete"
                                                onClick={() => DeleteAddress(address.id)}
                                                title="Sil"
                                            >
                                                <HiOutlineTrash size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="address-card-body">
                                        <p className="address-line-text">{address.addressLine}</p>
                                        <p className="address-phone-text">{address.phoneNumber}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showPopup && (
                <AddAddressPopup
                    id={selectedAddressId}
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
