import { Component } from "react";
import { Link } from "react-router-dom";

export default class AboutUs extends Component {
    componentDidMount() {
        window.scroll(0, 0);
    }
    render() {
        return <><div className="bg-light">
                <div className="container py-5">
                    <div className="row h-100 align-items-center py-5">
                        <div className="col-lg-6">
                            <h1 className="display-4">Rólunk</h1>
                            <p className="lead text-muted mb-0">Üdvözöljük a TeAutód autó flottakezelő weboldalán! Cégünk azzal a céllal jött létre, hogy segítsünk a vállalatoknak hatékonyan és könnyedén kezelni flottájukat. Az autók kezelése számos kihívást jelenthet, és mi megértjük, hogy az ilyen tevékenységek sok időt és erőforrást igényelhetnek. Ezért alkottuk meg az innovatív autó flottakezelő szolgáltatásunkat, amely egyszerű és hatékony megoldást kínál flottájuk teljes körű kezelésére.</p>
                            <p className="lead text-muted">Tudjon meg többet a linkre kattintva: <Link to='/'><a  className="text-muted">
                                <u>TeAutód.hu</u></a></Link>
                            </p>
                        </div>
                        <div className="col-lg-6 d-none d-lg-block"><img src={'service-splashart.png'} alt="" className="img-fluid" /></div>
                    </div>
                </div>
            </div><div className="bg-white py-5">
                <div className="container py-5">
                    <div className="row align-items-center mb-5">
                        <div className="col-lg-6 order-2 order-lg-1"><i className="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
                            <h2 className="font-weight-light">A TeAutód weboldala felhasználóbarát felületet és kiváló funkciókat biztosít a flotta minden aspektusának kezeléséhez.</h2>
                            <p className="font-italic text-muted mb-4">A flottakezelő rendszerünk lehetővé teszi az autók rendelkezésre állásának ellenőrzését, a költségek nyomon követését és a bérleti szerződések kezelését is. Az egyszerű és intuitív kezelőfelület segítségével a felhasználók könnyen és hatékonyan kezelhetik flottájukat.</p><a href="#" className="btn btn-light px-5 rounded-pill shadow-sm">Tudjon meg többet</a>
                        </div>
                        <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src={'service-splashart-2.png'} alt="" className="img-fluid mb-4 mb-lg-0"/></div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-5 px-5 mx-auto"><img src={'service-splashart-3.png'} alt="" className="img-fluid mb-4 mb-lg-0" /></div>
                        <div className="col-lg-6"><i className="fa fa-leaf fa-2x mb-3 text-primary"></i>
                            <h2 className="font-weight-light">Célunk, hogy segítsünk Önnek hatékonyabban kezelni és felügyelni flottáját</h2>
                            <p className="font-italic text-muted mb-4">Az oldalunkon könnyen nyomon követheti járműveit, kezelheti azok karbantartását, ellenőrizheti az üzemanyagfogyasztást, és még sok más hasznos funkciót talál. Bízunk benne, hogy az általunk kínált szolgáltatásokkal sikerül majd javítani autóparkja hatékonyságát és csökkenteni az üzemeltetési költségeket.</p><a href="#" className="btn btn-light px-5 rounded-pill shadow-sm">Tudjon meg többet</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-light py-5">
                <div className="container py-5">
                    <div className="row mb-4">
                        <div className="col-lg-5">
                            <h2 className="display-4 font-weight-light">A csapatunk</h2>
                            <p className="font-italic text-muted">Az oldal fejlesztői és tulajdonos csapata:</p>
                        </div>
                    </div>

                    <div className="row text-center">
                        <div className="col-xl-4 col-sm-6 mb-5">
                            <div className="bg-white rounded shadow-sm py-5 px-4"><img src="https://bootstrapious.com/i/snippets/sn-about/avatar-3.png" alt="" width="100" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                <h5 className="mb-0">Bóta Levente</h5><span className="small text-uppercase text-muted">CEO - Tulajdonos</span>
                                <ul className="social mb-0 list-inline mt-3">
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-facebook-f"></i></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-twitter"></i></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-instagram"></i></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-4 col-sm-6 mb-5">
                            <div className="bg-white rounded shadow-sm py-5 px-4"><img src="https://bootstrapious.com/i/snippets/sn-about/avatar-2.png" alt="" width="100" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                <h5 className="mb-0">Zuber Marcell</h5><span className="small text-uppercase text-muted">CEO - Tulajdonos</span>
                                <ul className="social mb-0 list-inline mt-3">
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-facebook-f"></i></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-twitter"></i></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-instagram"></i></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-linkedin"></i></a></li>
                                </ul>
                                </div>
                        </div>
                        <div className="col-xl-4 col-sm-6 mb-5">
                            <div className="bg-white rounded shadow-sm py-5 px-4"><img src="https://bootstrapious.com/i/snippets/sn-about/avatar-1.png" alt="" width="100" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                <h5 className="mb-0">Pfeffer Botond</h5><span className="small text-uppercase text-muted">CEO - Tulajdonos</span>
                                <ul className="social mb-0 list-inline mt-3">
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-facebook-f"></i></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-twitter"></i></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-instagram"></i></a></li>
                                    <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    }
}