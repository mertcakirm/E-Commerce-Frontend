import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom'; // 👈 eklendi
import {
    AddAddressRequest,
    GetAddressSingleRequest,
    UpdateAddressRequest
} from "../../API/AddressApi.js";
import { toast } from "react-toastify";
import { HiXMark } from "react-icons/hi2";

const AddAddressPopup = ({ onClose, id }) => {
    const [newAddress, setNewAddress] = useState({
        addressTitle: "",
        city: "",
        addressLine: "",
        postalCode: "",
    });

    const [loading, setLoading] = useState(false);

    const fetchAddress = async () => {
        try {
            setLoading(true);
            const response = await GetAddressSingleRequest(id);
            const data = response.data || response;
            setNewAddress({
                addressTitle: data.addressTitle || "",
                city: data.city || "",
                addressLine: data.addressLine || "",
                postalCode: data.postalCode || "",
            });
        } catch (error) {
            console.error("Adres bilgisi alınamadı:", error);
            toast.error("Adres bilgisi alınamadı!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchAddress();
        } else {
            setNewAddress({
                addressTitle: "",
                city: "",
                addressLine: "",
                postalCode: "",
            });
        }
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewAddress((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveAddress = async (event) => {
        event.preventDefault();
        if (!newAddress.addressTitle.trim() || !newAddress.addressLine.trim()) {
            toast.warn("Lütfen adres başlığı ve açık adres alanlarını doldurunuz!");
            return;
        }

        try {
            if (id) {
                await UpdateAddressRequest(id, newAddress);
                toast.success("Adres başarıyla güncellendi!");
            } else {
                await AddAddressRequest(newAddress);
                toast.success("Adres başarıyla eklendi!");
            }
            onClose(false);
        } catch (error) {
            console.error("Adres kaydedilirken hata:", error);
            toast.error("Adres kaydedilirken bir hata oluştu!");
        }
    };

    // Body'nin en altına ışınlıyoruz
    return createPortal(
        <div 
            className="modern-modal-overlay" 
            onClick={(e) => {
                // Sadece koyu alana tıklanınca kapansın
                if (e.target === e.currentTarget) onClose(false);
            }}
        >
            <div className="modern-modal-dialog">
                <div className="modern-modal-header">
                    <h3 className="modern-modal-title">
                        {id ? "Adresi Güncelle" : "Yeni Adres Ekle"}
                    </h3>
                    <button
                        type="button"
                        className="modern-modal-close"
                        onClick={() => onClose(false)}
                        aria-label="Kapat"
                    >
                        <HiXMark size={20} />
                    </button>
                </div>

                <form onSubmit={handleSaveAddress}>
                    <div className="modern-modal-body">
                        {loading ? (
                            <div className="text-center py-4 text-muted fw-medium">
                                Adres bilgileri yükleniyor...
                            </div>
                        ) : (
                            <>
                                <div className="modern-input-group">
                                    <label htmlFor="addressTitle">Adres Başlığı</label>
                                    <input
                                        id="addressTitle"
                                        className="modern-form-input adres-input"
                                        type="text"
                                        name="addressTitle"
                                        placeholder="Örn: Evim, İş Yeri vb."
                                        value={newAddress.addressTitle}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="row g-2">
                                    <div className="col-7">
                                        <div className="modern-input-group">
                                            <label htmlFor="city">İl / İlçe</label>
                                            <input
                                                id="city"
                                                className="modern-form-input adres-input"
                                                type="text"
                                                name="city"
                                                placeholder="İl / İlçe"
                                                value={newAddress.city}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-5">
                                        <div className="modern-input-group">
                                            <label htmlFor="postalCode">Posta Kodu</label>
                                            <input
                                                id="postalCode"
                                                className="modern-form-input adres-input"
                                                type="text"
                                                name="postalCode"
                                                placeholder="34000"
                                                value={newAddress.postalCode}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="modern-input-group">
                                    <label htmlFor="adres-uzun">Açık Adres Tarifi</label>
                                    <textarea
                                        name="addressLine"
                                        id="adres-uzun"
                                        className="modern-form-textarea"
                                        placeholder="Mahalle, cadde, sokak, bina ve daire no..."
                                        value={newAddress.addressLine}
                                        onChange={handleInputChange}
                                        rows={3}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    {!loading && (
                        <div className="modern-modal-footer">
                            <button
                                type="button"
                                className="modern-btn-secondary"
                                onClick={() => onClose(false)}
                            >
                                Vazgeç
                            </button>
                            <button
                                type="submit"
                                id="popup-adresi-kaydet-btn"
                                className="modern-btn-primary"
                            >
                                {id ? "Adresi Güncelle" : "Adresi Kaydet"}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>,
        document.body // 👈 Hedef DOM düğümü
    );
};

export default AddAddressPopup;
