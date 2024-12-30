import React, {useRef, useState} from 'react';
import {AdresGuncelle} from "./api/adresapi.js";
import {NotificationCard, showNotification} from "../childcomponents/notification.jsx";

const ProfilAdreslerimPopupComp = ({popupCloser,updateAdress}) => {
    const [updatedAddress, setUpdatedAddress] = useState({
        AddressTitle: "",
        NameSurname: "",
        Email: "",
        Tel: "",
        City: "",
        Town: "",
        Address: "",
        IdentityNumber: ""
    });
    const notificationRef = useRef(null);
    const [selectedAddress, setSelectedAddress] = useState(updateAddress)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedAddress((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleOpenPopup = (address) => {
        setSelectedAddress(address);
        setAddressTitle(address.addressTitle || "");
        setNameSurname(address.nameSurname || "");
        setEmail(address.email || "");
        setPhoneNumber(address.phoneNumber || "");
        setCity(address.city || "");
        setTown(address.town || "");
        setAddress(address.address || "");
        setIdentityNumber(address.identityNumber || "");
        setShowPopup(true);
    };

    const updateAddress = async (event) => {
        event.preventDefault();

        const addressDTO = {
            addressTitle:updateAddress.addressTitle,
            nameSurname:updateAddress.nameSurname,
            email:updateAddress.email,
            phoneNumber:updateAddress.phoneNumber,
            city:updateAddress.city,
            town:updateAddress.town,
            address:updateAddress.address,
            identityNumber:updateAddress.identityNumber,
        };

        const result = await AdresGuncelle(selectedAddress.id, addressDTO);

        if (result.success) {
            console.log("Address updated successfully:", result.data);
            popupCloser(false)
            showNotification(notificationRef, 'Adres başarıyla güncellendi!');

        } else {
            console.error("Failed to update address:", result.message);
            showNotification(notificationRef, 'Adresiniz güncellenemedi!');

        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={()=>popupCloser(false)}>
                    &times;
                </span>
                <div>
                    <div className="row yeni-adres-row">
                        <div className="col-12">
                            <input
                                className="adres-input"
                                type="text"
                                placeholder="Adres Başlığı"
                                name="AddressTitle"
                                value={updatedAddress.AddressTitle}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-12">
                            <input
                                className="adres-input"
                                type="text"
                                placeholder="Ad Soyad"
                                name="NameSurname"
                                value={updatedAddress.NameSurname}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-lg-6">
                            <input
                                className="adres-input"
                                type="text"
                                placeholder="E-Posta Adresi"
                                name="Email"
                                value={updatedAddress.Email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-lg-6">
                            <input
                                className="adres-input"
                                type="text"
                                placeholder="Telefon Numarası"
                                name="Tel"
                                value={updatedAddress.Tel}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-lg-6">
                            <input
                                className="adres-input"
                                type="text"
                                placeholder="İl"
                                name="City"
                                value={updatedAddress.City}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-lg-6">
                            <input
                                className="adres-input"
                                type="text"
                                placeholder="İlçe"
                                name="Town"
                                value={updatedAddress.Town}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-12">
                            <textarea
                                className="adres-input"
                                placeholder="Adres Tarifi"
                                name="Address"
                                value={updatedAddress.Address}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-12">
                            <textarea
                                className="adres-input"
                                placeholder="T.C. Kimlik Numaranız"
                                name="IdentityNumber"
                                value={updatedAddress.IdentityNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button id="popup-adresi-kaydet-btn" onClick={() => updateAddress(updatedAddress)}>
                            Adresi Güncelle
                        </button>
                    </div>
                </div>
            </div>
            <NotificationCard ref={notificationRef} message="" />
        </div>
    );
};

export default ProfilAdreslerimPopupComp;
