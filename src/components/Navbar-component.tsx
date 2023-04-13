import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const NavbarComponent: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');

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
        window.location.reload();
      } else {
        console.log('Failed to logout')
      }
    }
  }

  return (
    <nav className="navbar navbar-expand-sm bg-light fixed-top">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse ms-3" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={'/'} className="nav-link active" aria-current="page">Főoldal</Link>
            </li>
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link to={'/garage'} className="nav-link">Garázs</Link>
                </li>
                <li className="nav-item">
                  <Link to='./calendar' className="nav-link">Naptár</Link>
                </li>
              </>
            )} 
            <li className="nav-item">
              <Link to={'/aboutus'} className="nav-link" >Rólunk</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <div className="btn-group dropstart">
              <button type="button" className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img className="img-fluid img-thumbnail nav-item" src={'bxs-user-circle.png'} alt="userProfile" title="User" />
              </button>
              <ul className="dropdown-menu">
                {/* Display the username only when it is available */}
              {userName && (
                <li><h6 className="dropdown-header">{userName}</h6></li>
              )}
                {!isLoggedIn && (
                  <>
                    <li><Link to='/login' className="dropdown-item">Belépés</Link></li>
                    <li><Link to='/register' className="dropdown-item">Regisztráció</Link></li>
                  </>
                )}
                {isLoggedIn && (
                  <li><Link to={'/'} className="dropdown-item" onClick={handleLogout} >Kijelentkezés</Link></li>
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