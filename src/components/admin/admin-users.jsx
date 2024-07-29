import React, { useState } from 'react';
import Admin_sidebar from './admin-sidebar';
import './admin-css/admin-genel.css';

const usersData = [
  { id: 1, name: "Furkan Geren", phone: "05213236456", email: "furkangeren@gmail.com", harcama: "30000", siparis: "50" },
  { id: 2, name: "Furkan Geren", phone: "05213236456", email: "furkangeren@gmail.com", harcama: "30000", siparis: "50" },
  { id: 3, name: "Furkan Geren", phone: "05213236456", email: "furkangeren@gmail.com", harcama: "30000", siparis: "50" },
  { id: 4, name: "Furkan Geren", phone: "05213236456", email: "furkangeren@gmail.com", harcama: "30000", siparis: "50" },
  { id: 5, name: "Furkan Geren", phone: "05213236456", email: "furkangeren@gmail.com", harcama: "30000", siparis: "50" },
  { id: 6, name: "Mert Çakır",   phone: "05213236456", email: "furkangeren@gmail.com", harcama: "30000", siparis: "50" },
  { id: 7, name: "Furkan Geren", phone: "05213236456", email: "furkangeren@gmail.com", harcama: "30000", siparis: "50" },
  { id: 8, name: "Furkan Geren", phone: "05213236456", email: "furkangeren@gmail.com", harcama: "30000", siparis: "50" },
  { id: 9, name: "Furkan Geren", phone: "05213236456", email: "furkangeren@gmail.com", harcama: "30000", siparis: "50" },
  { id: 10, name: "Furkan Geren", phone: "05213236456", email: "furkangeren@gmail.com", harcama: "30000", siparis: "50" },
  { id: 11, name: "Furkan Geren", phone: "05213236456", email: "furkangeren@gmail.com", harcama: "30000", siparis: "50" },
  { id: 12, name: "Furkan Geren", phone: "05213236456", email: "furkangeren@gmail.com", harcama: "30000", siparis: "50" },
];

const Admin_users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const usersPerPage = 10;

  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery) ||
    user.email.toLowerCase().includes(searchQuery)
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleClick = (event, pageNumber) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Admin_sidebar />
      <div className="admin-sag-container">
        <div className="row admin-genel-row">
          <div className="col-12 alt-basliklar-admin">
            <p>Kullanıcı Listesi</p>
            <input
              type="text"
              className="admin-search-inp"
              placeholder="Ara..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-12 mt-5">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Ad Soyad</th>
                    <th scope="col">Telefon</th>
                    <th scope="col">E-Posta</th>
                    <th scope="col">Toplam Harcama</th>
                    <th scope="col">Toplam Sipariş</th>
                    <th scope="col">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map(user => (
                    <tr key={user.id}>
                      <th scope="row">{user.id}</th>
                      <td>{user.name}</td>
                      <td>{user.phone}</td>
                      <td>{user.email}</td>
                      <td>{user.harcama}</td>
                      <td>{user.siparis}</td>
                      <td>
                        <div className="user-duzenle-row">

                          <button className="user-sil-btn">
                            <svg clipRule="evenodd" fillRule="evenodd" width="30" height="30" fill="white" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="row col-12 justify-content-center">
                <nav aria-label="Page navigation example" className="col-5">
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <a className="page-link" href="#" aria-label="Previous" onClick={(e) => handleClick(e, currentPage - 1)}>
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <a className="page-link" href="#" onClick={(e) => handleClick(e, index + 1)}>{index + 1}</a>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <a className="page-link" href="#" aria-label="Next" onClick={(e) => handleClick(e, currentPage + 1)}>
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin_users;
