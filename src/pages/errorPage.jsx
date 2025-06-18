import { useLocation } from 'react-router-dom';
import './css/ErrorPage.css';
const ErrorPage = () => {
  const location = useLocation();
  const { state } = location;
  const errorMessage = state?.errorMessage || 'Bir hata oluştu';

  return (
    <div className='error-page-parent'>
    <div className="error-page">
      <h1>Oops! Bir şeyler yanlış gitti.</h1>
      <p>{errorMessage}</p>
      <h3>Hata Kodu:404</h3>
      <a className='error-page-a' href="/">Ana Sayfaya Dön</a>
    </div>
    </div>
  );
};

export default ErrorPage;