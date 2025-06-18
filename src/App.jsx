import {BrowserRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import FrequentlyAskedQuestions from './pages/FrequentlyAskedQuestions.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import Payment from './pages/Payment.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import OrderSituation from './pages/OrderSituation.jsx';
import Informations from './pages/Informations.jsx';
import ErrorPage from './pages/errorPage';
import {useEffect} from 'react';
import {getCookie} from './components/cookie/cookie';
import PropTypes from 'prop-types';
import {ToastContainer} from "react-toastify";
import Navbar from "./components/other/navbar/navbar.jsx";
import Footer from "./components/other/Footer.jsx";
import RefreshPassword from "./pages/RefreshPassword.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

const AppLayout = ({children}) => {
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
                    <Route path="/" element={<Home />} />
                    <Route path="/error" element={<ErrorPage />} />
                    <Route path="*" element={<Navigate to="/error" state={{errorMessage: 'Sayfa bulunamadı'}} />} />
                    <Route path="/urunler/:category" element={<Products />} />
                    <Route path="/urunler-detay/:id" element={<ProductDetail />} />
                    <Route path="/hakkimizda" element={<About />} />
                    <Route path="/iletisim" element={<Contact />} />
                    <Route path="/girisyap" element={<Login />} />
                    <Route path="/parola-yenile" element={<UnprotectedRoute element={<RefreshPassword />} />} />
                    <Route path="/profilim" element={<Profile />} />
                    <Route path="/siparis/:type" element={<ProtectedRoute element={<Payment />} />} />
                    <Route path="/siparis-durumu" element={<ProtectedRoute element={<OrderSituation />} />} />
                    <Route path="/sss" element={<ProtectedRoute element={<FrequentlyAskedQuestions />} />} />
                    <Route path="/bilgilendirmeler" element={<ProtectedRoute element={<Informations />} />} />
                </Routes>
            </AppLayout>
        </BrowserRouter>
    );
}

export default App;