import {useState} from 'react';
import {AddAddressRequest} from "../../API/AddressApi.js";
import {toast} from "react-toastify";

const AddAddressPopup = ({onClose}) => {
    const [newAddress, setNewAddress] = useState({
        addressTitle: "",
        city: "",
        addressLine: "",
        postalCode: "",

    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setNewAddress((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const HandlenewAddress = async (event) => {
        event.preventDefault();
        try {
            await AddAddressRequest(newAddress);
            toast.success("Adres başarıyla eklendi!")
            onClose(false);
        } catch (error) {
            console.error("Adres eklenirken hata:", error);
            toast.error("Adres eklenirken bir hata oluştu!")
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="d-flex justify-content-between">
                    <div className="fs-3 fw-bold">Adres Ekle</div>
                    <span className="close" onClick={() => onClose(false)}>&times;</span>
                </div>

                <div className="row yeni-adres-row">
                    {[
                        {name: "addressTitle", placeholder: "Adres Başlığı"},
                        {name: "city", placeholder: "İl / İlçe"},
                        {name: "postalCode", placeholder: "Posta Kodu"},
                    ].map((input, i) => (
                        <div className="col-12" key={i}>
                            <input
                                className="adres-input"
                                type={input.type || "text"}
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


                    <button id="popup-adresi-kaydet-btn" onClick={HandlenewAddress}>
                        Adresi Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddAddressPopup;