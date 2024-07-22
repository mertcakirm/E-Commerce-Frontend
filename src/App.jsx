import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Anasayfa from './components/anasayfa';
import Urunler from './components/urunler';
import Urun_detay from './components/urun-detay';
import Sss from './components/sss';
import Profile from './components/profile';
import Giris from './components/giris';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Anasayfa />} />
          <Route path="/ürünler" element={<Urunler />} />
          <Route path="/ürünler-detay" element={<Urun_detay />} />
          <Route path="/profilim" element={<Profile />} />
          <Route path="/girisyap" element={<Giris />} />
          <Route path="/sss" element={<Sss />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;