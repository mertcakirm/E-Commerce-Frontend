import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Anasayfa from './pages/anasayfa';
import Urunler from './pages/urunler';
import Urun_detay from './pages/urun-detay';
import Sss from './pages/sss';
import Profile from './pages/profile';
import Giris from './pages/giris';
import Odeme from './pages/odeme';
import Hakkimizda from './pages/hakkimizda';
import Iletisim from './pages/iletisim';
import SiparisDurumu from './pages/siparisDurumu';
import Parola_yenile from './pages/parola-yenile';
import Bilgilendirmeler from './pages/bilgilendirmeler';
import ErrorPage from './pages/errorPage';
import { useEffect } from 'react';
import { getCookie, deleteCookie } from './components/cookie/cookie'; // Çerez fonksiyonlarını ekliyoruz

function App() {
  const ProtectedRoute = ({ element }) => {
    const token = getCookie('token'); // Çerezden token'ı al
    return token ? element : <Navigate to="/girisyap" replace />;
  };

  const UnprotectedRoute = ({ element }) => {
    const token = getCookie('token'); // Çerezden token'ı al
    return token ? <Navigate to="/profilim" replace /> : element;
  };

  useEffect(() => {
    const token = getCookie('token'); // Çerezden token'ı al

    if (!token) return;

    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1])); // JWT kullanıyorsanız token payload'ını alır
      const currentTime = Math.floor(Date.now() / 1000); // Şu anki zaman (saniye cinsinden)
      
      if (tokenPayload.exp < currentTime) {
        deleteCookie('token'); // Token süresi dolmuşsa çerezden sil
      }
    } catch (e) {
      console.error('Geçersiz token:', e);
      deleteCookie('token'); // Geçersiz token ise sil
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Anasayfa />} />
        <Route path="/error" element={<ErrorPage />} />
        
        <Route path="*" element={<Navigate to="/error" state={{ errorMessage: 'Sayfa bulunamadı' }} />} />
        
        {/* Dinamik kategoriye göre ürünlerin listelendiği sayfa */}
        <Route path="/urunler/:category" element={<Urunler />} />
        <Route path="/urunler-detay/:id" element={<Urun_detay />} />
        <Route path="/hakkimizda" element={<Hakkimizda />} />
        <Route path="/iletisim" element={<Iletisim />} />

        {/* Unprotected Routes */}
        <Route path="/girisyap" element={<UnprotectedRoute element={<Giris />} />} />
        <Route path="/parola-yenile" element={<UnprotectedRoute element={<Parola_yenile />} />} />

        {/* Protected Routes */}
        <Route path="/profilim" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/siparis/kargo" element={<ProtectedRoute element={<Odeme />} />} />
        <Route path="/siparis/ozet" element={<ProtectedRoute element={<Odeme />} />} />
        <Route path="/siparis-durumu" element={<ProtectedRoute element={<SiparisDurumu />} />} />
        <Route path="/siparis/odeme" element={<ProtectedRoute element={<Odeme />} />} />
        <Route path="/siparis/onay" element={<ProtectedRoute element={<Odeme />} />} />
        <Route path="/sss" element={<ProtectedRoute element={<Sss />} />} />
        <Route path="/bilgilendirmeler" element={<ProtectedRoute element={<Bilgilendirmeler />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
