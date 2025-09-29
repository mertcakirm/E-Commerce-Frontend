import { useState } from "react";
import { ResetPasswordRequest } from "../../API/ProfileApi.js";
import {toast} from "react-toastify";

const PasswordResetPopup = ({ onClose }) => {
    const [reset, setReset] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleSubmit = async () => {
        if (reset.newPassword !== reset.confirmPassword) {
            toast.error("Parolalar eşleşmiyor!")
            return;
        }

        try {
            await ResetPasswordRequest(reset.oldPassword, reset.newPassword);
            toast.success("Parola başarıyla değiştirildi!")
        } catch (error) {
            console.log(error);
            toast.error("Parola değiştirilirken bir sorun oluştu! Daha sonra tekrar deneyin!")
        }
        onClose(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReset(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="modal">
            <div className="modal-content" style={{ width: 'fit-content' }}>
                <div className="d-flex justify-content-between">
                    <h3>Şifre Değiştir</h3>
                    <span className="close" onClick={() => onClose(false)}>&times;</span>
                </div>

                <div>
                    <div className="popup-form no-scroll">
                        <div className="popup-content" style={{ height: 'fit-content', minHeight: 'auto' }}>
                            <input
                                type="password"
                                name="oldPassword"
                                placeholder="Eski Şifreniz"
                                value={reset.oldPassword}
                                onChange={handleChange}
                                className="profilim-inputs adres-input"
                            />
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="Yeni Şifreniz"
                                value={reset.newPassword}
                                onChange={handleChange}
                                className="profilim-inputs adres-input"
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Yeni Şifreniz Tekrar"
                                value={reset.confirmPassword}
                                onChange={handleChange}
                                className="profilim-inputs adres-input"
                            />
                            <div className="guncelle-flex" style={{ marginTop: "20px" }}>

                                <button onClick={handleSubmit}>Gönder</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordResetPopup;