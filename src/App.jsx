import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Anasayfa from './components/anasayfa';
import Urunler from './components/urunler';
import Urun_detay from './components/urun-detay';
import Sss from './components/sss';
import Profile from './components/profile';
import Giris from './components/giris';
import Odeme from './components/odeme/odeme';
import Hakkimizda from './components/hakkimizda';
import Iletisim from './components/iletisim';
import Admin_login from './components/admin/admin-login';
import Admin_product from './components/admin/admin-product';
import Admin_anasayfa from './components/admin/admin-anasayfa';
import Admin_users from './components/admin/admin-users';
import Admin_raporlar from './components/admin/admin-raporlar';
import SiparisDurumu from './components/siparisDurumu';
import Admin_sayfalar from './components/admin/admin-sayfalar';
import Admin_kategoriler from './components/admin/admin-kategoriler';
import Parola_yenile from './components/parola-yenile';
import Admin_aktif_siparis from './components/admin/admin-aktif-siparis';
import Admin_mesajlar from './components/admin/admin-mesajlar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Anasayfa />} />
          <Route path="/ürünler" element={<Urunler />} />
          <Route path="/hakkimizda" element={<Hakkimizda />} />
          <Route path="/iletisim" element={<Iletisim />} />
          <Route path="/ürünler-detay" element={<Urun_detay />} />
          <Route path="/profilim" element={<Profile />} />
          <Route path="/girisyap" element={<Giris />} />
          <Route path="/siparis/kargo" element={<Odeme />} />
          <Route path="/siparis/ozet" element={<Odeme />} />
          <Route path="/siparis-durumu" element={<SiparisDurumu />} />
          <Route path="/siparis/odeme" element={<Odeme />} />
          <Route path="/siparis/onay" element={<Odeme />} />
          <Route path="/sss" element={<Sss />} />
          <Route path="/parola-yenile" element={<Parola_yenile />} />
          <Route path="/admin-login" element={<Admin_login />} />
          <Route path="/admin-girisyap" element={<Admin_login />} />
          <Route path="/admin-urunler" element={<Admin_product />} />
          <Route path="/admin-genel" element={<Admin_anasayfa />} />
          <Route path="/admin-kullanicilar" element={<Admin_users />} />
          <Route path="/admin-raporlar" element={<Admin_raporlar />} />
          <Route path="/admin-sayfalar" element={<Admin_sayfalar />} />
          <Route path="/admin-kategoriler" element={<Admin_kategoriler />} />
          <Route path="/admin-aktif-siparisler" element={<Admin_aktif_siparis />} />
          <Route path="/admin-mesajlar" element={<Admin_mesajlar />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;