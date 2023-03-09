import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Calendar from './Calendar';

class App extends Component {

  render() {
    return <div>
      <nav className="navbar navbar-expand-sm bg-light fixed-top">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={'/'} className="nav-link active" aria-current="page">Főoldal</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Garázs</a>
              </li>
              <li className="nav-item">
                <Link to='./calendar' className="nav-link">Naptár</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Rólunk</a>
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
                  <li><a className="dropdown-item" href="#">Profil szerkesztése</a></li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <main>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/calendar' element={<Calendar />} />
        </Routes>
      </main>
      <footer className="text-center text-lg-start text-muted footer">
        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>TeAutod.hu
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer content. Lorem ipsum
                  dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  Oldalak
                </h6>
                <p>
                  <Link to={'/'} className="text-reset">Főoldal</Link>
                </p>
                <p>
                  <a href="#!" className="text-reset">Garázs</a>
                </p>
                <p>
                  <Link to='./calendar' className="text-reset">Naptár</Link>
                </p>
                <p>
                  <a href="#!" className="text-reset">Rólunk</a>
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  Useful links
                </h6>
                <p>
                  <a href="#!" className="text-reset">Pricing</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Settings</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Orders</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Help</a>
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Kapcsolat</h6>
                <p><i className="fas fa-home me-3"></i> Budapest, 14.kerület, HU</p>
                <p>
                  <i className="fas fa-envelope me-3"></i>
                  teautod@example.com
                </p>
                <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
                <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
              </div>
            </div>
          </div>
        </section>
        <div className="text-center p-4">
          © 2023 Copyright:
          <Link to={'/'} className="text-reset fw-bold">TeAutod.hu</Link>
        </div>
      </footer>

      {/*  <h2>Új user felvétele</h2>
    Username: <input type="text" value={usernameInput} onChange={e => this.setState({ usernameInput: e.currentTarget.value})} /> <br />
    Jelszó: <input type="text" value={passwordInput} onChange={e => this.setState({ passwordInput: e.currentTarget.value })}/> <br />
    Jelszó újra: <input type="text" value={passwordAuthInput} onChange={e => this.setState({passwordAuthInput: e.currentTarget.value })}/> <br />
    Email: <input type="text" value={emailInput} onChange={e => this.setState({emailInput: e.currentTarget.value })}/> <br /> 
    Születési Év: <input type="date" value={birthDateInput} onChange={e => this.setState({ birthDateInput: e.currentTarget.value })}/> <br /> 
    <button onClick={this.handleUpload}>Hozzáaddás</button> <br />
      <h2>Adatbázis tábla tartalmazza:</h2>
      <ul>{
        this.state.users.map(user =>
        <li>{user.username}, {user.email} </li>
        )
        }</ul> */}
    </div>
  }
}

export default App;
