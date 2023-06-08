import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "axios";

export default function Nav(props) {
  const [loggedOut, setLoggedOut] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [user, setUser] = useState(null); // Dodane pole user

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setLoggedOut(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`http://localhost:8080/api/user/${userId}`);
        const data = await response.data;
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  if (loggedOut) {
    return <Navigate to="/login" />;
  }

  const shouldHideMenuItems = windowWidth <= 768;
  return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
              aria-controls="mobile-nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${shouldHideMenuItems ? '' : 'show'}`} id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              {!shouldHideMenuItems && (
                  <li className="nav-item">
                    <Link className="nav-link" to={`/dashboard`}>
                      Dashboard
                    </Link>
                  </li>
              )}
            </ul>
          </div>

          {!shouldHideMenuItems && (
              <div className="ml-auto">
                {user && ( // Wyświetlenie imienia i nazwiska tylko jeśli dane użytkownika są dostępne
                    <span className="text-white nav-link" style={{ fontSize: 'smaller', marginBottom: '0px' }}>{`${user.firstName} ${user.lastName}`}</span>
                )}
                <button className="btn btn-link text-white nav-link" style={{ textDecoration: 'none', marginTop: '0px' }} onClick={handleLogout}>
                  Logout
                </button>
              </div>
          )}
        </div>
      </nav>
  );
}
