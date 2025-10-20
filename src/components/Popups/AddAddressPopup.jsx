import {useEffect, useState} from 'react';
import {
    AddAddressRequest,
    GetAddressSingleRequest,
    UpdateAddressRequest
} from "../../API/AddressApi.js";
import {toast} from "react-toastify";

const AddAddressPopup = ({onClose, id}) => {
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

            // Eğer { success: true, data: {...} } şeklinde dönüyorsa:
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
        const {name, value} = event.target;
        setNewAddress((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveAddress = async (event) => {
        event.preventDefault();
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

    return (
        <div className="modal" >
            <div className="modal-content" data-aos="fade-up">
                <div className="d-flex justify-content-between">
                    <div className="fs-3 fw-bold">
                        {id ? "Adresi Güncelle" : "Adres Ekle"}
                    </div>
                    <span className="close" onClick={() => onClose(false)}>&times;</span>
                </div>

                {loading ? (
                    <div className="text-center py-3">Adres bilgileri yükleniyor...</div>
                ) : (
                    <div className="row yeni-adres-row">
                        {[
                            {name: "addressTitle", placeholder: "Adres Başlığı"},
                            {name: "city", placeholder: "İl / İlçe"},
                            {name: "postalCode", placeholder: "Posta Kodu"},
                        ].map((input, i) => (
                            <div className="col-12" key={i}>
                                <input
                                    className="adres-input"
                                    type="text"
                                    name={input.name}
                                    placeholder={input.placeholder}
                                    value={newAddress[input.name]}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ))}

                        <div className="col-12">
                            <textarea
                                name="addressLine"
                                id="adres-uzun"
                                placeholder="Adres Tarifi"
                                value={newAddress.addressLine}
                                onChange={handleInputChange}
                            />
                        </div>

                        <button id="popup-adresi-kaydet-btn" onClick={handleSaveAddress}>
                            {id ? "Adresi Güncelle" : "Adresi Kaydet"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddAddressPopup;