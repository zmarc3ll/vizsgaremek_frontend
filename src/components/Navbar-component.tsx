import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { NavLink } from "react-router-dom";

const NavbarComponent: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [fadeOutLogout, setFadeOutLogout] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
      axios.get('http://localhost:3001/user', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then(async response => {
        const username = localStorage.getItem('username');
        if (username) {
          setUserName(username);
        } else {
          setUserName('');
        }
      }).catch(error => {
        console.log('Failed to get username')
      });
    }
  }, []);

  // Handle logout
  const handleLogout = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const response = await fetch('http://localhost:3001/auth/logout', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUserName('');
        setShowLogoutPopup(true);
        setFadeOutLogout(false);

        // 2.5 mp után fade-out
        setTimeout(() => setFadeOutLogout(true), 2500);

        // 3 mp után eltüntetjük a popupot
        setTimeout(() => setShowLogoutPopup(false), 3000);

        // opcionálisan ne reload-oljunk, maradjon SPA
        // window.location.reload();
      } else {
        console.log('Failed to logout')
      }
    }
  }

  return (
    <nav className="navbar navbar-expand-sm modern-navbar fixed-top">
      <div className="container-fluid">
        {showLogoutPopup && (
          <div className={`logout-toast ${fadeOutLogout ? "fade-out-logout" : ""}`}>
            <span className="logout-text">Sikeresen kijelentkezett!</span>
          </div>
        )}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse ms-3" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  "nav-link texthover" + (isActive ? " active" : "")
                }
              >
                Főoldal
              </NavLink>
            </li>
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/garage"
                    className={({ isActive }) =>
                      "nav-link texthover" + (isActive ? " active" : "")
                    }
                  >
                    Garázs
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/calendar"
                    className={({ isActive }) =>
                      "nav-link texthover" + (isActive ? " active" : "")
                    }
                  >
                    Naptár
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item">
              <NavLink
                to="/aboutus"
                className={({ isActive }) =>
                  "nav-link texthover" + (isActive ? " active" : "")
                }
              >
                Rólunk
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <div className="btn-group dropstart">
              <button type="button" className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img className="img-fluid img-thumbnail nav-item" src={'profile.png'} alt="Profil" title="User" />
                <p>{userName}</p>
              </button>
              <ul className="dropdown-menu">
                {/* Display the username only when it is available */}
                {userName && (
                  <li><h6 className="dropdown-header">{userName}</h6></li>
                )}
                {!isLoggedIn && (
                  <>
                    <li><Link to='/login' className="dropdown-item texthover">Belépés</Link></li>
                    <li><Link to='/register' className="dropdown-item texthover">Regisztráció</Link></li>
                  </>
                )}
                {isLoggedIn && (
                  <li><Link to={'/'} className="dropdown-item texthover" onClick={handleLogout} >Kijelentkezés</Link></li>
                )}
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavbarComponent;