import {useEffect, useState} from "react";
import {deleteCookie} from "../cookie/cookie"; // Çerez fonksiyonlarını ekliyoruz
import {GetUserProfileRequest} from "../../API/ProfileApi.js";
import ResetPasswordPopup from "./ResetPasswordPopup.jsx";

const ProfileInfo = () => {
    const [isPopup, setPopup] = useState(false);
    const [userData, setUserData] = useState({});


    const cikisyap = () => {
        deleteCookie("token");
        window.location.href = ('/girisyap');
    };

    const getProfile = async () => {
        try {
            const response = await GetUserProfileRequest();
            setUserData(response.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (

        <div className="row justify-content-center">

            <div className="col-12 border rounded-3 shadow-sm p-3 d-flex flex-column gap-4" data-aos="fade-up" style={{width:'fit-content'}}>
                <div className="col-12 text-center fs-3">
                    BİLGİLERİM
                </div>
                <div className="d-flex gap-3 w-100 justify-content-center">
                    <label htmlFor="bilgilerim-isim">Ad Soyad : </label>
                    <div>{userData.name}</div>
                </div>
                <div className="d-flex gap-3 w-100 justify-content-center">

                    <label htmlFor="bilgilerim-tel">Telefon Numaranız : </label>
                    <div>{userData.name}</div>
                </div>
                <div className="d-flex gap-3 w-100 justify-content-center">

                    <label htmlFor="bilgilerim-tel">Mail Adresiniz : </label>
                    <div>{userData.email}</div>
                </div>

                <div className="d-flex flex-column gap-1">
                    <div className="d-flex justify-content-center gap-2">
                        <button className="py-2 w-100 text-nowrap" type="button" onClick={() => setPopup(true)} id="cikis-btn">Şifremi Güncelle</button>
                        <button className="py-2 w-100 text-nowrap" onClick={() => window.location.href = "../iletisim"} type="button" id="uyeligi-sil-btn">Üyeliğimi Sil</button>
                    </div>

                    <button className="py-3 mt-1 w-100 text-black fw-bold text-nowrap" type="button" style={{background:'#f5f5f5'}} onClick={cikisyap} id="cikis-btn">Çıkış Yap</button>

                </div>

            </div>

            <div>
            </div>

            {isPopup &&
                <ResetPasswordPopup
                    onClose={() => setPopup(false)}
                />
            }

        </div>

    )
}


export default ProfileInfo;