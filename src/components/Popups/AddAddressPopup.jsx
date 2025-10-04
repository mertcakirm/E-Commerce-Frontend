import React, {useState} from 'react';
import {AddAddressRequest} from "../../API/AddressApi.js";

const AddAddressPopup = ({onClose}) => {
    const [newAddress, setNewAddress] = useState({
        addressTitle: "",
        'city/town': "",
        address: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewAddress((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const HandlenewAddress = async (event) => {
        event.preventDefault();
        try {
            await AddAddressRequest(newAddress);
            onClose(false);
        } catch (error) {
            console.error("Adres eklenirken hata:", error);
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
                        { name: "addressTitle", placeholder: "Adres Başlığı" },
                        { name: "city/town", placeholder: "İl / İlçe" },
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
                                        name="address"
                                        id="adres-uzun"
                                        placeholder="Adres Tarifi"
                                        value={newAddress.address}
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