import { useEffect, useState } from 'react';
import BasketSummary from './BasketSummary.jsx';
import LoadingComponent from "../other/Loading.jsx";
import { GetAddressRequest } from "../../API/AddressApi.js";
import AddAddressPopup from "../Popups/AddAddressPopup.jsx";
import {toast} from "react-toastify";

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
            setAddresses(data.data);
        } catch (error) {
            console.error("Adresler alınamadı:", error);
            setAddresses([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetAdresses();
    }, [refresh]);

    useEffect(() => {
        localStorage.setItem("address", JSON.stringify(selectedAddressId));
    },[selectedAddressId])

    const nextStep = async () => {
        const addressCheck = localStorage.getItem("address");

        if (!addressCheck || addressCheck === "null" || addressCheck === "undefined") {
            toast.warning("Adres seçiniz!")
            return;
        }

        window.location.href = "/siparis/odeme";
    };

    if (loading) return <LoadingComponent />;

    return (
        <div className="row">
            <div className="col-lg-7">
                <p className="ozet-baslik">Teslimat Bilgilerim</p>
                <div className="teslimat-bilgileri-panel-parent">
                    <div className="kayitli-adreslerim-parent">
                        <div className="d-flex justify-content-between">
                            <p className="kayitli-adresleri-genel-baslik">Kayıtlı Adreslerim</p>
                            <button id="yeni-adres-ekle-btn" onClick={()=>setShowModal(true)}>
                                Yeni Adres Ekle
                            </button>
                        </div>

                        {addresses.length > 0 ? (
                            addresses.map((address) => (
                                <div key={address.id} className="kayitli-adreslerim-card sepet-ozet-card">
                                    <p className="kayitli-adreslerim-card-p1">
                                        {address.addressTitle || "Adres Başlığı Yok"}
                                    </p>
                                    <p className="cut-text">{address.addressLine}</p>
                                    <button onClick={() => setSelectedAddressId(address.id)}>
                                        {selectedAddressId === address.id ? "Vazgeç" : "Kullan"}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>Henüz kayıtlı adresiniz bulunmuyor.</p>
                        )}
                    </div>


                </div>

            </div>

            <div className="col-lg-5 ozet-sag-col">
                <BasketSummary />
                <button onClick={nextStep} className="button-next-step primary" id="stepper">
                    Ödemeye Geç
                </button>
            </div>


            {showModal && (
                <AddAddressPopup onClose={(b)=>{
                    if (b===false){
                        setShowModal(false);
                        setRefresh(!refresh);
                    }
                }} />
            )}
        </div>
    );
};

export default PaymentAddress;