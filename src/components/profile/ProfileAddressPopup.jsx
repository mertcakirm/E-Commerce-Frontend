import {useState} from 'react';
import {toast} from "react-toastify";
import {UpdateAddressRequest} from "../../API/AddressApi.js";

const ProfileAddressesPopup = ({popupCloser, updateAdress, reflesh}) => {
    const [updatedAddress, setUpdatedAddress] = useState({
        AddressTitle: updateAdress.addressTitle,
        NameSurname: updateAdress.nameSurname,
        Email: updateAdress.email,
        Tel: updateAdress.phoneNumber,
        City: updateAdress.city,
        Town: updateAdress.town,
        Address: updateAdress.address,
        IdentityNumber: updateAdress.identityNumber,
    });

    const [selectedAddress, setSelectedAddress] = useState(updateAddress)

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUpdatedAddress((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const updateAddress = async (event) => {
        event.preventDefault();

        const addressDTO = {
            addressTitle: updatedAddress.AddressTitle,
            nameSurname: updatedAddress.NameSurname,
            email: updatedAddress.Email,
            phoneNumber: updatedAddress.Tel,
            city: updatedAddress.City,
            town: updatedAddress.Town,
            address: updatedAddress.Address,
            identityNumber: updatedAddress.IdentityNumber,
        };

        try {
            const result = await UpdateAddressRequest(selectedAddress.id, addressDTO);

            if (result.success) {
                console.log("Address updated successfully:", result.data);
                reflesh(true)
                popupCloser(false)
                toast.success('Adres başarıyla güncellendi!')

            } else {
                console.error("Failed to update address:", result.message);
                reflesh(true)
                popupCloser(false)
                toast.error('Adresiniz güncellenemedi!')
            }
        }catch (error) {
            console.log(error);
            toast.error('Adresiniz güncellenemedi!')
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => popupCloser(false)}>
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
        </div>
    );
};

export default ProfileAddressesPopup;
