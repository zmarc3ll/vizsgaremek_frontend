import { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
    render() {
        return <><section>
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
                                    <button className="btn btn-success btn-lg " role="button" aria-pressed="false">Bejelentkezés</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Nincs fiókja? <Link to={'/register'} className="link-danger">Regisztrálok</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section></>
        
    }
    
}