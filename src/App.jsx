import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import ErrorPage from './pages/errorPage.jsx';
import RefreshPassword from './pages/RefreshPassword.jsx';
import ProductDetail from './pages/ProductDetail.jsx';

import { useEffect } from 'react';
import { getCookie } from './components/cookie/cookie';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import Navbar from "./components/other/navbar/navbar.jsx";
import Footer from "./components/other/Footer.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

// Layout
const AppLayout = ({ children }) => {
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

const ProtectedRoute = ({ children }) => {
    const token = getCookie('token');
    if (!token) {
        return <Navigate to="/girisyap" replace />;
    }
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

const UnprotectedRoute = ({ children }) => {
    const token = getCookie('token');
    if (token) {
        return <Navigate to="/profilim" replace />;
    }
    return children;
};

UnprotectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};


function App() {
    useEffect(() => {
        AOS.init({ duration: 500 });
    }, []);

    return (
        <BrowserRouter>
            <AppLayout>
                <ToastContainer theme="colored" closeOnClick position="bottom-right" autoClose={3000} />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/error" element={<ErrorPage />} />
                    <Route path="/urunler/:category" element={<Products />} />
                    <Route path="/urunler/kampanya/:id" element={<Products />} />
                    <Route path="/urunler-detay/:id" element={<ProductDetail />} />
                    <Route path="/hakkimizda" element={<About />} />
                    <Route path="/iletisim" element={<Contact />} />

                    <Route path="/girisyap" element={
                        <UnprotectedRoute>
                            <Login />
                        </UnprotectedRoute>
                    } />
                    <Route path="/parola-yenile" element={
                        <UnprotectedRoute>
                            <RefreshPassword />
                        </UnprotectedRoute>
                    } />

                    <Route path="/profilim" element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    } />
                    <Route path="/siparis/:type" element={
                        <ProtectedRoute>
                            <Payment />
                        </ProtectedRoute>
                    } />
                    <Route path="/siparis-durumu/:id" element={
                        <ProtectedRoute>
                            <OrderSituation />
                        </ProtectedRoute>
                    } />
                    <Route path="/sss" element={
                        <ProtectedRoute>
                            <FrequentlyAskedQuestions />
                        </ProtectedRoute>
                    } />
                    <Route path="/bilgilendirmeler" element={
                        <ProtectedRoute>
                            <Informations />
                        </ProtectedRoute>
                    } />

                    <Route path="*" element={<Navigate to="/error" state={{ errorMessage: 'Sayfa bulunamadı' }} />} />
                </Routes>
            </AppLayout>
        </BrowserRouter>
    );
}

export default App;