import { useState } from "react";
import {ResetPasswordRequest} from "../../API/ProfileApi.js";

const PasswordResetPopup = ({ onClose }) => {
    const [email, setEmail] = useState("");

    const handleSubmit = async () => {
        try {
            await ResetPasswordRequest();
        }catch (error) {
            console.log(error);
        }
        onClose(false);
    };

    return (
        <div className="popup-form no-scroll">
            <div className="popup-content">
                <h3>Şifre Sıfırlama</h3>
                <p>Lütfen şifre sıfırlama bağlantısı için e-posta adresinizi girin.</p>
                <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="profilim-inputs"
                />
                <div className="guncelle-flex" style={{ marginTop: "20px" }}>
                    <button onClick={handleSubmit}>Gönder</button>
                    <button
                        onClick={onClose}
                        style={{
                            marginLeft: "10px",
                            backgroundColor: "#DC143C",
                            color: "#fff",
                        }}
                    >
                        Vazgeç
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PasswordResetPopup;