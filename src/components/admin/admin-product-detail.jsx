import React, { Component } from 'react';
import Admin_sidebar from './admin-sidebar';
import './admin-css/admin-genel.css';
const Admin_product_detail=()=> {
    return (
      <div>
        <Admin_sidebar />
        <div className="admin-sag-container">
          <div className="row admin-genel-row">
            <div className="site-icerik-shadow col-12">
              deneme
            </div> 
          </div>
        </div>
      </div>
    )
  }


export default Admin_product_detail;