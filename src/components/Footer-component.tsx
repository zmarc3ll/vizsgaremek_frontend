import { Link } from "react-router-dom"

const FooterComponent: React.FC = () => {
    return (
        <footer className="text-center text-lg-start text-muted footer">
        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4 text-center">
                  <i className="fas fa-gem me-3"></i>TeAutod.hu
                </h6>
                <Link to={'/'}><img src={'TeAutod.hu.png'} alt="TeAutod.hu" title="TeAutod.hu" className='d-block mx-auto pe-4 pb-3' id='footerLogo' /></Link>
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
                  <Link to='/aboutus' className="text-reset">Rólunk</Link>
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  Partnerek
                </h6>
                <p>
                  <a href="#!" className="text-reset">Partner1</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Partner2</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Partner3</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Partner4</a>
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
    );
};
export default FooterComponent;