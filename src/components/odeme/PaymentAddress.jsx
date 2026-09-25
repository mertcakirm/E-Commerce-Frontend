import { useEffect, useState } from 'react';
import BasketSummary from './BasketSummary.jsx';
import LoadingComponent from "../other/Loading.jsx";
import { GetAddressRequest } from "../../API/AddressApi.js";
import AddAddressPopup from "../Popups/AddAddressPopup.jsx";
import { toast } from "react-toastify";
import { HiOutlinePlus, HiOutlineMapPin } from "react-icons/hi2";

const PaymentAddress = () => {
    const [showModal, setShowModal] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        document.body.style.overflow = showModal ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [showModal]);

    const GetAdresses = async () => {
        try {
            const data = await GetAddressRequest();
            const fetchedAddresses = data?.data || [];
            setAddresses(fetchedAddresses);
            
            const savedAddress = localStorage.getItem("address");
            if (savedAddress && savedAddress !== "null" && savedAddress !== "undefined") {
                setSelectedAddressId(parseInt(savedAddress));
            } else if (fetchedAddresses.length > 0) {
                setSelectedAddressId(fetchedAddresses[0].id);
            } else {
                setSelectedAddressId(null);
            }
        } catch (error) {
            console.error("Adresler alınamadı:", error);
            setAddresses([]);
            setSelectedAddressId(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetAdresses();
    }, [refresh]);

    useEffect(() => {
        if (selectedAddressId !== null) {
            localStorage.setItem("address", JSON.stringify(selectedAddressId));
        } else {
            localStorage.removeItem("address");
        }
    }, [selectedAddressId]);

    const nextStep = () => {
        if (!selectedAddressId) {
            toast.warning("Lütfen teslimat adresi seçiniz veya yeni adres ekleyiniz!");
            return;
        }
        window.location.href = "/siparis/odeme";
    };

    if (loading) return <LoadingComponent />;

    return (
        <div className="row g-4 g-xl-5">
            <div className="col-lg-8">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="checkout-section-title">Teslimat Adresi</h2>
                    {/* Adres listesi doluysa sağ üstte küçük ekle butonunu göster */}
                    {addresses?.length > 0 && (
                        <button type="button" className="checkout-btn-text" onClick={() => setShowModal(true)}>
                            <HiOutlinePlus size={18} /> Yeni Adres Ekle
                        </button>
                    )}
                </div>

                {/* Adres Varsa Grid Göster, Yoksa Boş Durum Tasarımını Göster */}
                {addresses?.length > 0 ? (
                    <div className="checkout-address-grid">
                        {addresses.map((address) => {
                            const isSelected = selectedAddressId === address.id;
                            return (
                                <div 
                                    key={address.id} 
                                    className={`checkout-address-card ${isSelected ? 'selected' : ''}`}
                                    onClick={() => setSelectedAddressId(address.id)}
                                >
                                    <div className="address-card-header">
                                        <div className="d-flex align-items-center gap-2">
                                            <HiOutlineMapPin size={20} className={isSelected ? "text-primary" : "text-secondary"} />
                                            <span className="address-card-title">{address.addressTitle || "Kayıtlı Adres"}</span>
                                        </div>
                                        <div className={`address-radio ${isSelected ? 'active' : ''}`}></div>
                                    </div>
                                    <div className="address-card-body">
                                        <p className="address-text-line">{address.addressLine}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="checkout-empty-state">
                        <p>Henüz kayıtlı bir teslimat adresiniz bulunmuyor.</p>
                        <button type="button" className="checkout-btn-outline" onClick={() => setShowModal(true)}>
                            <HiOutlinePlus size={18} style={{ marginRight: '6px' }} />
                            Hemen Adres Ekle
                        </button>
                    </div>
                )}
            </div>

            <div className="col-lg-4">
                <div className="checkout-sidebar-sticky">
                    <BasketSummary />
                    <button 
                        type="button" 
                        onClick={nextStep} 
                        className="checkout-btn-primary w-100 mt-3" 
                        disabled={!selectedAddressId}
                    >
                        Sonraki Adım: Güvenli Ödeme
                    </button>
                </div>
            </div>

            {showModal && (
                <AddAddressPopup onClose={(b) => {
                    if (b === false) {
                        setShowModal(false);
                        setRefresh(!refresh);
                    }
                }} />
            )}
        </div>
    );
};

export default PaymentAddress;
