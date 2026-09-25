import { useLocation, useNavigate } from 'react-router-dom';
import './css/ErrorPage.css';
import { HiOutlineArrowLeft, HiOutlineHome } from "react-icons/hi2";

const ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const errorMessage = state?.errorMessage || 'Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı kalmış olabilir.';
  const errorCode = state?.errorCode || '404';

  return (
    <div className="error-page-wrapper">
      {/* Hafif arka plan ambiyansı */}
      <div className="error-bg-glow" />

      <div className="error-card-container" data-aos="fade-up">
        <span className="error-code-badge">Hata Kodu: {errorCode}</span>
        
        <h1 className="error-main-number">{errorCode}</h1>
        
        <div className="error-text-block">
          <h2 className="error-title">Bir Şeyler Ters Gitti</h2>
          <p className="error-description">{errorMessage}</p>
        </div>

        <div className="error-actions-group">
          <button 
            type="button" 
            className="error-btn-secondary" 
            onClick={() => navigate(-1)}
          >
            <HiOutlineArrowLeft size={18} />
            <span>Geri Dön</span>
          </button>

          <a href="/" className="error-btn-primary">
            <HiOutlineHome size={18} />
            <span>Ana Sayfaya Git</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
