import { useState } from "react";
import { createPortal } from "react-dom";
import { ResetPasswordRequest } from "../../API/ProfileApi.js";
import { toast } from "react-toastify";
import { HiXMark } from "react-icons/hi2";

const PasswordResetPopup = ({ onClose }) => {
    const [reset, setReset] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleSubmit = async () => {
        if (!reset.oldPassword || !reset.newPassword || !reset.confirmPassword) {
            toast.warn("Lütfen tüm alanları doldurun!");
            return;
        }

        if (reset.newPassword !== reset.confirmPassword) {
            toast.error("Parolalar eşleşmiyor!");
            return;
        }

        try {
            await ResetPasswordRequest(reset.oldPassword, reset.newPassword);
            toast.success("Parola başarıyla değiştirildi!");
            onClose(false);
        } catch (error) {
            console.log(error);
            toast.error("Parola değiştirilirken bir sorun oluştu! Daha sonra tekrar deneyin!");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReset(prev => ({ ...prev, [name]: value }));
    };

    // Modal içeriğini doğrudan document.body içine portal ile render ediyoruz
    return createPortal(
        <div className="modern-modal-overlay">
            <div className="modern-modal-dialog">
                <div className="modern-modal-header">
                    <h3 className="modern-modal-title">Şifre Değiştir</h3>
                    <button
                        type="button"
                        className="modern-modal-close"
                        onClick={() => onClose(false)}
                        aria-label="Kapat"
                    >
                        <HiXMark size={20} />
                    </button>
                </div>

                <div className="modern-modal-body">
                    <div className="modern-input-group">
                        <label>Eski Şifre</label>
                        <input
                            type="password"
                            name="oldPassword"
                            placeholder="Mevcut şifreniz"
                            value={reset.oldPassword}
                            onChange={handleChange}
                            className="modern-form-input"
                        />
                    </div>
                    <div className="modern-input-group">
                        <label>Yeni Şifre</label>
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Yeni şifreniz"
                            value={reset.newPassword}
                            onChange={handleChange}
                            className="modern-form-input"
                        />
                    </div>
                    <div className="modern-input-group">
                        <label>Yeni Şifre Tekrar</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Yeni şifrenizi doğrulayın"
                            value={reset.confirmPassword}
                            onChange={handleChange}
                            className="modern-form-input"
                        />
                    </div>
                </div>

                <div className="modern-modal-footer">
                    <button
                        type="button"
                        className="modern-btn-secondary"
                        onClick={() => onClose(false)}
                    >
                        Vazgeç
                    </button>
                    <button
                        type="button"
                        className="modern-btn-primary"
                        onClick={handleSubmit}
                    >
                        Şifreyi Güncelle
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default PasswordResetPopup;
