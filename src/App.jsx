import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Anasayfa from './components/anasayfa';
import Urunler from './components/urunler';  
import Urun_detay from './components/urun-detay';
import Sss from './components/sss';
import Profile from './components/profile';
import Giris from './components/giris';
import Odeme from './components/odeme/odeme';
import Hakkimizda from './components/hakkimizda';
import Iletisim from './components/iletisim';
import Admin_product from './components/admin/admin-product';
import Admin_product_detail from './components/admin/admin-product-detail';
import Admin_anasayfa from './components/admin/admin-anasayfa';
import Admin_users from './components/admin/admin-users';
import Admin_raporlar from './components/admin/admin-raporlar';
import SiparisDurumu from './components/siparisDurumu';
import Admin_sayfalar from './components/admin/admin-sayfalar';
import Admin_kategoriler from './components/admin/admin-kategoriler';
import Parola_yenile from './components/parola-yenile';
import Admin_aktif_siparis from './components/admin/admin-aktif-siparis';
import Admin_mesajlar from './components/admin/admin-mesajlar';
import Bilgilendirmeler from './components/bilgilendirmeler';
import Admin_login from './components/admin/admin-login';
import ErrorPage from './components/errorPage';


function checkTokenExpiration() {
  const token = localStorage.getItem('token');

  if (!token) return false;

  try {
    const tokenPayload = JSON.parse(atob(token.split('.')[1])); // JWT kullanıyorsanız tokenin payload'ını alır
    const currentTime = Math.floor(Date.now() / 1000); // Şu anki zaman (saniye cinsinden)
    
    if (tokenPayload.exp < currentTime) {
      localStorage.removeItem('token'); // Tokenin süresi dolmuşsa sil
      return true; // Süresi dolmuş
    }

    return false; // Süresi dolmamış
  } catch (e) {
    console.error('Geçersiz token:', e);
    localStorage.removeItem('token'); // Geçersiz token ise sil
    return true; // Süresi dolmuş veya geçersiz
  }
}

function App() {
  const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem('token');
    return token ? element : <Navigate to="/girisyap" replace />;
  };

  const UnprotectedRoute = ({ element }) => {
    const token = localStorage.getItem('token');
    return token ? <Navigate to="/profilim" replace /> : element;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Anasayfa />} />
        <Route path="/admin-giris" element={<Admin_login />} />
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
        
        {/* Admin Routes */}
        <Route path="/admin-urunler" element={<ProtectedRoute element={<Admin_product />} />} />
        <Route path="/admin-urunler-guncelle/:id" element={<ProtectedRoute element={<Admin_product_detail />} />} />
        {/* <Route path="/admin-kategori-guncelle" element={<ProtectedRoute element={<Admin_kategori_detail />} />} /> */}
        <Route path="/admin-genel" element={<ProtectedRoute element={<Admin_anasayfa />} />} />
        <Route path="/admin-kullanicilar" element={<ProtectedRoute element={<Admin_users />} />} />
        <Route path="/admin-raporlar" element={<ProtectedRoute element={<Admin_raporlar />} />} />
        <Route path="/admin-sayfalar" element={<ProtectedRoute element={<Admin_sayfalar />} />} />
        <Route path="/admin-kategoriler" element={<ProtectedRoute element={<Admin_kategoriler />} />} />
        <Route path="/admin-aktif-siparisler" element={<ProtectedRoute element={<Admin_aktif_siparis />} />} />
        <Route path="/admin-mesajlar" element={<ProtectedRoute element={<Admin_mesajlar />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
