import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Admin_product from './admin-product';
import Admin_product_detail from './admin-product-detail';
import Admin_anasayfa from './admin-anasayfa';
import Admin_users from './admin-users';
import Admin_raporlar from './admin-raporlar';
import Admin_sayfalar from './admin-sayfalar';
import Admin_kategoriler from './admin-kategoriler';
import Admin_aktif_siparis from './admin-aktif-siparis';
import Admin_mesajlar from './admin-mesajlar';
import Admin_kampanyalar from './admin-kampanyalar';
import Admin_login from './admin-login';

const Admin_Router = () => {

  const ProtectedRoute = ({ element }) => {

    const token = localStorage.getItem('token');
    return token ? element : <Navigate to="/giris" replace />;
  };

  return (
    <Routes>
      <Route path="/giris" element={<Admin_login />} />
      <Route path="/urunler" element={<ProtectedRoute element={<Admin_product />} />} />
      <Route path="/urunler-guncelle/:id" element={<ProtectedRoute element={<Admin_product_detail />} />} />
      <Route path="/genel" element={<ProtectedRoute element={<Admin_anasayfa />} />} />
      <Route path="/kullanicilar" element={<ProtectedRoute element={<Admin_users />} />} />
      <Route path="/raporlar" element={<ProtectedRoute element={<Admin_raporlar />} />} />
      <Route path="/sayfalar" element={<ProtectedRoute element={<Admin_sayfalar />} />} />
      <Route path="/kampanyalar" element={<ProtectedRoute element={<Admin_kampanyalar />} />} />
      <Route path="/kategoriler" element={<ProtectedRoute element={<Admin_kategoriler />} />} />
      <Route path="/aktif-siparisler" element={<ProtectedRoute element={<Admin_aktif_siparis />} />} />
      <Route path="/mesajlar" element={<ProtectedRoute element={<Admin_mesajlar />} />} />
    </Routes>
  );
};

export default Admin_Router;
