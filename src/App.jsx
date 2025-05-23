import {BrowserRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom';
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
import {useEffect} from 'react';
import {getCookie} from './components/cookie/cookie';
import PropTypes from 'prop-types';
import {ToastContainer} from "react-toastify";
import Navbar from "./components/childcomponents/navbar.jsx";
import Footer from "./components/childcomponents/footer.jsx";

function AppLayout({children}) {
    const location = useLocation();
    const hideComponentsForPaths = ['/sss', '/girisyap', '/error'];

    const shouldHide = hideComponentsForPaths.includes(location.pathname) ||
        location.pathname === '*' ||
        location.pathname.startsWith('/error');

    return (
        <>
            {!shouldHide && <Navbar />}
            {children}
            {!shouldHide && <Footer />}
        </>
    );
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

const ProtectedRoute = ({element}) => {
    const sessionid = getCookie('SESSIONID');
    return sessionid ? element : <Navigate to="/girisyap" replace />;
};

ProtectedRoute.propTypes = {
    element: PropTypes.node.isRequired,
};

const UnprotectedRoute = ({element}) => {
    const sessionid = getCookie('SESSIONID');
    return sessionid ? <Navigate to="/profilim" replace /> : element;
};

UnprotectedRoute.propTypes = {
    element: PropTypes.node.isRequired,
};

function App() {
    useEffect(() => {
        const sessionid = getCookie('SESSIONID');
        if (!sessionid) return;
    }, []);

    return (
        <BrowserRouter>
            <AppLayout>
                <ToastContainer theme="colored" closeOnClick position="bottom-right" autoClose={3000} />

                <Routes>
                    <Route path="/" element={<Anasayfa />} />
                    <Route path="/error" element={<ErrorPage />} />
                    <Route path="*" element={<Navigate to="/error" state={{errorMessage: 'Sayfa bulunamadı'}} />} />
                    <Route path="/urunler/:category" element={<Urunler />} />
                    <Route path="/urunler-detay/:id" element={<Urun_detay />} />
                    <Route path="/hakkimizda" element={<Hakkimizda />} />
                    <Route path="/iletisim" element={<Iletisim />} />
                    <Route path="/girisyap" element={<Giris />} />
                    <Route path="/parola-yenile" element={<UnprotectedRoute element={<Parola_yenile />} />} />
                    <Route path="/profilim" element={<Profile />} />
                    <Route path="/siparis/:type" element={<ProtectedRoute element={<Odeme />} />} />
                    <Route path="/siparis-durumu" element={<ProtectedRoute element={<SiparisDurumu />} />} />
                    <Route path="/sss" element={<ProtectedRoute element={<Sss />} />} />
                    <Route path="/bilgilendirmeler" element={<ProtectedRoute element={<Bilgilendirmeler />} />} />
                </Routes>
            </AppLayout>
        </BrowserRouter>
    );
}

export default App;