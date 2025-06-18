import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getCookie, deleteCookie} from "../cookie/cookie"; // Çerez fonksiyonlarını ekliyoruz
import {toast} from "react-toastify";
import {GetUserProfileRequest, UpdateProfileRequest} from "../../API/ProfileApi.js";

const ProfileInfo = () => {
    const token = getCookie("token");

    const updateProfile = async () => {
        const userDTO1 = {
            nameSurname: document.getElementById('bilgilerim-isim').value,
            phoneNumber: document.getElementById('bilgilerim-tel').value
        };

        const changePasswordDTO1 = {
            password: document.getElementById('bilgilerim-password').value,
            confirmPassword: document.getElementById('bilgilerim-confirm').value
        };

        const formData = new FormData();
        formData.append('UserDTO', new Blob([JSON.stringify(userDTO1)], {type: 'application/json'}));
        formData.append('ChangePasswordDTO', new Blob([JSON.stringify(changePasswordDTO1)], {type: 'application/json'}));

        try {
            UpdateProfileRequest(formData)
            toast.success('Profil bilgilerin başarıyla güncellendi!')
        } catch {
            toast.error('Profil bilgilerin güncellenemedi!')

        }
    };

    const navigate = useNavigate();

    const cikisyap = () => {
        deleteCookie("SESSIONID");
        deleteCookie("ID");
        navigate('/girisyap');
    };

    const loadProfile = async () => {
        try {
            const data = await GetUserProfileRequest();
            if (data) {
                document.getElementById('bilgilerim-isim').value = data.nameSurname;
                document.getElementById('bilgilerim-tel').value = data.phoneNumber;
            }
        }catch (error) {
            console.log(error);
        }
    };

    if (token) {
        loadProfile();
    }

    useEffect(() => {
    }, [token]);

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
                    <div className="col-lg-8">
                        <input
                            type="text"
                            id="bilgilerim-isim"
                            className="profilim-inputs"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <label htmlFor="bilgilerim-tel">Telefon Numaranız</label>
                    </div>
                    <div className="col-lg-8">
                        <input
                            type="tel"
                            id="bilgilerim-tel"
                            className="profilim-inputs"
                        />
                    </div>
                </div>
                <div>
                    <button type="button" onClick={cikisyap} id="cikis-btn">Çıkış Yap</button>
                </div>
            </div>
            <div className="col-lg-6 profilim-column">
                <div className="row">
                    <div className="col-lg-4">
                        <label htmlFor="bilgilerim-password">Şifreniz</label>
                    </div>
                    <div className="col-lg-8">
                        <input
                            type="password"
                            id="bilgilerim-password"
                            className="profilim-inputs"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <label htmlFor="bilgilerim-confirm">Şifreniz Tekrar</label>
                    </div>
                    <div className="col-lg-8">
                        <input
                            type="password"
                            id="bilgilerim-confirm"
                            className="profilim-inputs"
                        />
                    </div>
                </div>
                <div>
                    <button onClick={() => window.location.href = "../iletisim"} type="button"
                            id="uyeligi-sil-btn">Üyeliğimi Sil
                    </button>
                </div>
            </div>
            <div className="col-12 guncelle-flex">
                <button type="button" id="bilgileri-guncelle-btn-profile" onClick={updateProfile}>
                    Bilgilerimi Güncelle
                </button>
            </div>
            <div>
            </div>
        </div>

    )
}


export default ProfileInfo;