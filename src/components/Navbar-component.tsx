import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const NavbarComponent: React.FC = () => {
  // const [token, setAuthToken] = useState<string | null>(localStorage.getItem('token'));

  //  const handleLogout = async () => {
  //   const token = localStorage.getItem('token');
  //   if (token === null) return;
  
  //   const response = await fetch('http://localhost:3001/auth/logout', {
  //     method: 'DELETE',
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   });
    
  //   if (response.ok) {
  //     localStorage.removeItem('token');
  //     setAuthToken(null);
  //   }
  // }


const handleLogout = async () => {
  const token = localStorage.getItem('token');
  if (token === null) return;
  try {
    const response = await axios.get('http://localhost:3001/login', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 204) {
      localStorage.removeItem('token');
      window.location.href = "/";
    }
  } catch (error) {
    // handle error
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
              <li className="nav-item">
                <Link to={'/garage'} className="nav-link">Garázs</Link>
              </li>
              <li className="nav-item">
                <Link to='./calendar' className="nav-link">Naptár</Link>
              </li>
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
                  <li><h6 className="dropdown-header">Profil</h6></li>
                  <li><Link to='/login' className="dropdown-item">Belépés</Link></li>
                  <li><Link to='/register' className="dropdown-item">Regisztráció</Link></li>
                  <li><Link to={'/'} className="dropdown-item" onClick={handleLogout} >Kijelentkezés</Link></li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    );
};
export default NavbarComponent;