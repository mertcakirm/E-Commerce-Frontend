import { useEffect, useState } from 'react';
import BasketSummary from './BasketSummary.jsx';
import LoadingComponent from "../other/Loading.jsx";
import { GetAddressRequest } from "../../API/AddressApi.js";
import AddAddressPopup from "../Popups/AddAddressPopup.jsx";

const PaymentAddress = () => {
    const [showModal, setShowModal] = useState(false);
    const [addresses, setAddresses] = useState([]); // ✅ başlangıç değeri dizi
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

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



    const handleSelectAddress = (index) => {
        setSelectedAddressIndex((prev) => (prev === index ? null : index));
        console.log("Seçilen adres:", addresses[index]);
    };

    if (loading) return <LoadingComponent />;

    return (
        <div className="row">
            <div className="col-lg-7">
                <p className="ozet-baslik">Teslimat Bilgilerim</p>
                <div className="teslimat-bilgileri-panel-parent">
                    <div className="kayitli-adreslerim-parent">
                        <p className="kayitli-adresleri-genel-baslik">Kayıtlı Adreslerim</p>

                        {addresses.length > 0 ? (
                            addresses.map((address, index) => (
                                <div key={index} className="kayitli-adreslerim-card sepet-ozet-card">
                                    <p className="kayitli-adreslerim-card-p1">
                                        {address.addressLine || "Adres Başlığı Yok"}
                                    </p>
                                    <p className="cut-text">{address.address}</p>
                                    <button onClick={() => handleSelectAddress(index)}>
                                        {selectedAddressIndex === index ? "Vazgeç" : "Kullan"}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>Henüz kayıtlı adresiniz bulunmuyor.</p>
                        )}
                    </div>

                    <button id="yeni-adres-ekle-btn" onClick={()=>setShowModal(true)}>
                        Yeni Adres Ekle
                    </button>
                </div>

            </div>

            <div className="col-lg-5 ozet-sag-col">
                <BasketSummary />
                <button className="button-next-step primary" id="stepper">
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