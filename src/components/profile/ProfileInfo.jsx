import {useEffect, useState} from "react";
import {deleteCookie} from "../cookie/cookie"; // Çerez fonksiyonlarını ekliyoruz
import {GetUserProfileRequest} from "../../API/ProfileApi.js";
import ResetPasswordPopup from "./ResetPasswordPopup.jsx";

const ProfileInfo = () => {
    const [isPopup, setPopup] = useState(false);
    const [userData, setUserData] = useState({});


    const cikisyap = () => {
        deleteCookie("token");
        window.location.href=('/girisyap');
    };

    const getProfile = async () => {
        try {
            const response = await GetUserProfileRequest();
            console.log(response.data)
            setUserData(response.data)
        }catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (

        <div className="row">
            <div className="col-12 text-center profil-pills-content-baslik">
                BİLGİLERİM
            </div>
            <div className="col-lg-6 profilim-column">
                <div className="row">
                    <div className="col-lg-4">
                        <label htmlFor="bilgilerim-isim">Ad Soyad</label>
                    </div>
                    <div className="col-lg-8">{userData.name}</div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <label htmlFor="bilgilerim-tel">Telefon Numaranız</label>
                    </div>
                    <div className="col-lg-8">{userData.name}</div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <label htmlFor="bilgilerim-tel">Mail Adresiniz</label>
                    </div>
                    <div className="col-lg-8">{userData.email}</div>
                </div>
                <div>
                    <button type="button" onClick={cikisyap} id="cikis-btn">Çıkış Yap</button>
                </div>
            </div>
            <div className="col-lg-6 profilim-column">
                <div>
                    <button type="button" onClick={cikisyap} id="cikis-btn">Şifremi Güncelle</button>
                </div>
                <div>
                    <button onClick={() => window.location.href = "../iletisim"} type="button"
                            id="uyeligi-sil-btn">Üyeliğimi Sil
                    </button>
                </div>
            </div>

            <div>
            </div>

            {isPopup ??
            <ResetPasswordPopup
                onClose={() => setPopup(false)}
            />
            }

        </div>

    )
}


export default ProfileInfo;