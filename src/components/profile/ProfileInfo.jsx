import { useEffect, useState } from "react";
import { deleteCookie } from "../cookie/cookie";
import { GetUserProfileRequest } from "../../API/ProfileApi.js";
import ResetPasswordPopup from "./ResetPasswordPopup.jsx";
import { IoPersonCircleOutline, IoKeyOutline, IoLogOutOutline, IoTrashOutline } from "react-icons/io5";

const ProfileInfo = () => {
    const [isPopup, setPopup] = useState(false);
    const [userData, setUserData] = useState({});

    const cikisyap = () => {
        deleteCookie("token");
        window.location.href = "/girisyap";
    };

    const getProfile = async () => {
        try {
            const response = await GetUserProfileRequest();
            setUserData(response.data || {});
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div className="profile-info-wrapper">
            <div className="profile-info-card">
                <div className="profile-avatar-header">
                    <div className="avatar-icon-wrap">
                        <IoPersonCircleOutline size={72} />
                    </div>
                    <h3 className="profile-user-name">{userData.name || "Kullanıcı"}</h3>
                    <span className="profile-user-email">{userData.email || "-"}</span>
                </div>

                <div className="profile-field-list">
                    <div className="profile-field-row">
                        <span className="field-label">Ad Soyad</span>
                        <span className="field-value">{userData.name || "-"}</span>
                    </div>

                    <div className="profile-field-row">
                        <span className="field-label">Telefon</span>
                        <span className="field-value">
                            {userData.phoneNumber || userData.phone || userData.name || "-"}
                        </span>
                    </div>

                    <div className="profile-field-row">
                        <span className="field-label">E-Posta</span>
                        <span className="field-value">{userData.email || "-"}</span>
                    </div>
                </div>

                <div className="profile-actions-panel">
                    <div className="profile-actions-grid">
                        <button
                            className="btn-action-primary"
                            type="button"
                            onClick={() => setPopup(true)}
                        >
                            <IoKeyOutline size={18} />
                            <span>Şifremi Güncelle</span>
                        </button>

                        <button
                            className="btn-action-danger-soft"
                            onClick={() => (window.location.href = "../iletisim")}
                            type="button"
                        >
                            <IoTrashOutline size={18} />
                            <span>Üyeliğimi Sil</span>
                        </button>
                    </div>

                    <button
                        className="btn-action-logout"
                        type="button"
                        onClick={cikisyap}
                    >
                        <IoLogOutOutline size={20} />
                        <span>Güvenli Çıkış Yap</span>
                    </button>
                </div>
            </div>

            {isPopup && <ResetPasswordPopup onClose={() => setPopup(false)} />}
        </div>
    );
};

export default ProfileInfo;
