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
import SiparisDurumu from './components/siparisDurumu';

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
          <Route path="/admin-login" element={<Admin_login />} />
          <Route path="/sss" element={<Sss />} />
          <Route path="/admin-login" element={<Admin_login />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;