import { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
    render() {
        return <><nav className="navbar navbar-expand-sm bg-light fixed-top">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page"><Link to={'/'}>Főoldal</Link></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Garázs</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Naptár</a>
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
                                <Link to='/login'><li><a className="dropdown-item">Belépés</a></li></Link>
                                <Link to='/register'><li><a className="dropdown-item">Regisztráció</a></li></Link>
                                <li><a className="dropdown-item" href="#">Profil szerkesztése</a></li>
                            </ul>
                        </div>
                    </ul>
                </div>
            </div>
        </nav><section>
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100" id="fillPage">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src={'auto-removebg-preview.png'} className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                <div className="divider d-flex align-items-center my-4">
                                    <h2 className="text-center fw-bold mx-1 mb-3 pt-2">Belépés</h2>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="email" id="form3Example3" className="form-control form-control-lg"
                                        placeholder="Adja meg a felhsználónevét" />
                                    <label className="form-label" htmlFor="form3Example3">Felhasználónév</label>
                                </div>

                                <div className="form-outline mb-3">
                                    <input type="password" id="form3Example4" className="form-control form-control-lg"
                                        placeholder="Adja meg a jelszót" />
                                    <label className="form-label" htmlFor="form3Example4">Jelszó</label>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Emlékezz rám
                                        </label>
                                    </div>
                                    <a href="#!" className="text-body">Elfelejtette a jelszót?</a>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <a href="index.html" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Bejelentkezés</a>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Nincs fiókja? <Link to={'/register'}><a className="link-danger">Regisztrálok</a></Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section><footer className="text-center text-lg-start bg-light text-muted footer">
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
                                    <a href="#!" className="text-reset">Főoldal</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Garázs</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Naptár</a>
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
                                    teautod@gmail.com
                                </p>
                                <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
                                <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="text-center p-4">
                    © 2023 Copyright:
                    <a className="text-reset fw-bold" href="#">TeAutod.hu</a>
                </div>
            </footer></>
        
    }
    
}