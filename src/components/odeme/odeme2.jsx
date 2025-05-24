import {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import Sepet_ozeti from './sepet-ozeti';
import LoadingComponent from "../childcomponents/Loading.jsx";
import {AddAddressRequest, GetAddressRequest} from "../../API/AddressApi.js";

const Odeme2 = () => {
    const [showModal, setShowModal] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
    const [newAddress, setNewAddress] = useState({
        addressTitle: "",
        nameSurname: "",
        email: "",
        phoneNumber: "",
        city: "",
        town: "",
        address: "",
        identityNumber: ""
    });
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(true);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setNewAddress((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showModal]);

    const GetAdresses = async () => {
        try {
            const data = await GetAddressRequest();
            setAddresses(data);
        }catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAdresses();
    }, []);

    useEffect(() => {
        GetAdresses();
    }, [refresh]);

    const HandlenewAddress = async (event) => {
        event.preventDefault();

        const addressDTO = {
            addressTitle: newAddress.addressTitle,
            nameSurname: newAddress.nameSurname,
            email: newAddress.email,
            phoneNumber: newAddress.phoneNumber,
            city: newAddress.city,
            town: newAddress.town,
            address: newAddress.address,
            identityNumber: newAddress.identityNumber,
        };
        await AddAddressRequest(addressDTO)
        setRefresh(!refresh);
    };

    const handleSelectAddress = (index) => {
        if (selectedAddressIndex === index) {
            setSelectedAddressIndex(null);
            console.log('No address selected');
        } else {
            setSelectedAddressIndex(index);
            console.log('Selected Address:', addresses[index]);
        }
    };

    if (loading) {
        return <LoadingComponent/>
    }

    return (
        <div className='row'>
            <Helmet>
                <title>Adreslerim</title>
                <meta
                    name="description"
                    content="Mob Wear olarak yeni modaya hitap ediyor ve buna göre ürünleri sizler için üretiyoruz."
                />
                <meta
                    name="keywords"
                    content="tişört,pantolon,giyim,moda,erkek giyim"
                />
                <meta name="author" content="MOB WEAR"/>
                <meta property="og:title" content="Kaliteli Kıyafetler"/>
                <meta
                    property="og:description"
                    content="Mob Wear olarak yeni modaya hitap ediyor ve buna göre ürünleri sizler için üretiyoruz."
                />
                <meta property="og:image" content="URL_of_image"/>
                <meta property="og:url" content="URL_of_your_website"/>
                <meta property="og:type" content="website"/>
            </Helmet>
            <div className="col-lg-7">
                <p className="ozet-baslik">Teslimat Bilgilerim</p>
                <div className="teslimat-bilgileri-panel-parent">
                    <div className="kayitli-adreslerim-parent">
                        <p className='kayitli-adresleri-genel-baslik'>Kayıtlı Adreslerim</p>
                        {addresses.map((address, index) => (
                            <div key={index} className="kayitli-adreslerim-card">
                                <p className='kayitli-adreslerim-card-p1'>{address.addressTitle}</p>
                                <p className="cut-text">{address.address}</p>
                                <button onClick={() => handleSelectAddress(index)}>
                                    {selectedAddressIndex === index ? 'Vazgeç' : 'Kullan'}
                                </button>
                            </div>
                        ))}
                    </div>

                    <button id='yeni-adres-ekle-btn' onClick={handleOpenModal}>Yeni Adres Ekle</button>
                </div>

                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={handleCloseModal}>&times;</span>
                            <div>
                                <div className="row yeni-adres-row">
                                    <div className="col-12">
                                        <input
                                            className="adres-input"
                                            type="text"
                                            placeholder="Adres Başlığı"
                                            name="addressTitle"
                                            value={newAddress.addressTitle}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <input
                                            className="adres-input"
                                            type="text"
                                            placeholder="Ad Soyad"
                                            name="nameSurname"
                                            value={newAddress.nameSurname}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <input
                                            className="adres-input"
                                            type="email"
                                            placeholder="E-Posta Adresi"
                                            name="email"
                                            value={newAddress.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <input
                                            className="adres-input"
                                            type="text"
                                            placeholder="Telefon Numarası"
                                            name="phoneNumber"
                                            value={newAddress.phoneNumber}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <input
                                            className="adres-input"
                                            type="text"
                                            placeholder="İl"
                                            name="city"
                                            value={newAddress.city}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <input
                                            className="adres-input"
                                            type="text"
                                            placeholder="İlçe"
                                            name="town"
                                            value={newAddress.town}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-12">
                    <textarea
                        name="address"
                        id="adres-uzun"
                        placeholder="Adres Tarifi"
                        value={newAddress.address}
                        onChange={handleInputChange}
                    />
                                    </div>
                                    <div className="col-12">
                    <textarea
                        name="identityNumber"
                        id="tc-kimlik"
                        placeholder="T.C. Kimlik Numaranız"
                        value={newAddress.identityNumber}
                        onChange={handleInputChange}
                    />
                                    </div>
                                    <button
                                        id="popup-adresi-kaydet-btn"
                                        onClick={HandlenewAddress}
                                    >
                                        Adresi Kaydet
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
            <div className="col-lg-5 ozet-sag-col">
                <Sepet_ozeti/>
                <button className="button-next-step primary" id="stepper">
                    Ödemeye Geç
                </button>
            </div>
        </div>
    );
};

export default Odeme2;
