import { Component } from "react";
import App from "./App";

export default class Main extends Component {
    render() {
        return <nav className="navbar navbar-expand-sm bg-light fixed-top">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Főoldal</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Autók</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Karbantartás</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Naptár</a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <div className="btn-group dropstart">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <img className="img-fluid img-thumbnail nav-item" src={'bxs-user-circle.png'} alt="userProfile" title="User"/>
                </button>
                <ul className="dropdown-menu">
                  <li><h6 className="dropdown-header">Profil</h6></li>
                  <li><a className="dropdown-item" href="./login.html">Belépés</a></li>
                  <li><a className="dropdown-item" href="./register.html">Regisztráció</a></li>
                  <li><a className="dropdown-item" href="#">Profil szerkesztése</a></li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    };
}