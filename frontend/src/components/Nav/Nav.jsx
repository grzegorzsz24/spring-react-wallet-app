import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function Nav(props) {
  const [loggedOut, setLoggedOut] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
            <button className="btn btn-link text-white nav-link" style={{ textDecoration: 'none' }} onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
