import { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "bootstrap";
import { NavLink } from "react-router-dom";

interface IMainState {
  showWelcome: boolean;
  username: string;
  fadeOut: boolean;
}

export default class Main extends Component<{}, IMainState> {

  constructor(props: {}) {
    super(props);

    this.state = {
      showWelcome: false,
      username: "",
      fadeOut: false,
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);

    if (params.get("login") === "true") {
      const username = localStorage.getItem("username") || "";

      this.setState({ showWelcome: true, username, fadeOut: false });

      // 2.5 mp után kezdődjön a kifade-elés animáció
      setTimeout(() => {
        this.setState({ fadeOut: true });
      }, 2500);

      // 3 mp után töröljük teljesen a popupot
      setTimeout(() => {
        this.setState({ showWelcome: false });
      }, 3000);

      // URL tisztítás
      window.history.replaceState({}, document.title, "/");
    }
  }

  render() {
    let endOfPage
    if (localStorage.getItem('accessToken')) {
      endOfPage = (
        <div className="card bg-dark mx-auto d-block mt-5 mb-3" id="homeRegisterCard">
          <div className="card-body text-center">
            <img src={'mechanicSplashart.png'} alt="" className="img-fluid" /> <br />
            <h5 className="card-title text-white">Online autókezelés</h5>
            <p className="card-text fw-light text-white">Lépjen be a garázsba autója karbantartásához!</p>
            <Link to={'/garage'}><button className="btn btn-info">Garázs</button></Link>
          </div>
        </div>
      )
    } else {
      endOfPage = (
        <div className="card bg-light mx-auto d-block mt-5 mb-3" id="homeRegisterCard">
          <div className="card-body text-center">
            <img src={'mechanicSplashart.png'} alt="" className="img-fluid" /> <br />
            <h5 className="card-title">Online autókezelés</h5>
            <p className="card-text fw-light">Kezdje meg akár mátol autója karbantartását!</p>
            <Link to={'/register'}><button className="btn btn-success">Regisztrálok</button></Link>
          </div>
        </div>
      )
    }
    return <>
      {this.state.showWelcome && (
        <div className={`welcome-toast ${this.state.fadeOut ? "fade-out" : ""}`}>
          <span className="welcome-text">Üdvözöljük, <strong>{this.state.username}</strong>!</span>
        </div>
      )}
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="7000">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={'header2.jpg'} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>TeAutod.hu</h5>
              <p>Megbízható autókezelés, hasznos információk</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={'bmw-header.jpg'} className="d-block w-100 mt-1" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>TeAutod.hu</h5>
              <p>Felhasználó barát felület, a legjobb élményért</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={'header3.jpg'} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>TeAutod.hu</h5>
              <p>Mobilos kinézet és asztali alkalmazás is, a felhasználók kényelmére</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <br />
      <div className="container mt-5 mb-3" >
        <div className="row">
          <div className="col-lg-12">
            <h2 className="text-center">Kezelje autóját velünk!</h2>
            <p className="text-center fst-italic">Ennyire könnyű és átlátható még sosem volt! <br />Mutatjuk mit nyer ha minket választ!</p>
          </div>
          <div className="col-lg-12 row mt-5 mb-3">
            <img src={'carPage.png'} alt="" className="shadow-lg p-3 mb-5 bg-body mx-auto d-block" id="exampleImg" />
          </div>
        </div>
      </div>
      <div className="col-lg-12 text-center pb-3">
        <h2>Miért válasszon minket?</h2>
        <p className="fw-light">Itt van minden amiért érdemes a TeAutod.hu -t választani!</p>
      </div>
      <div className="row container-fluid mt-5 mx-auto" id="reasonGallery">
        <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
          <div className="card bg-dark text-white mb-4">
            <div className="card-header"><img src={'money.png'} alt="" className="float-start ms-3 mt-2" id="cardImg" /></div>
            <div className="card-body">
              <div className="card-text">
                <h4 className="fw-light text-white">Könnyítheti autója majdani <strong>eladását</strong> az autó adatai részletes nyomonkövetésével.</h4>
              </div>
            </div>
          </div>
          <div className="card bg-light mb-4">
            <img src={'clock.png'} alt="" className="float-end ms-3 mt-2" id="cardImg" />
            <div className="card-body">
              <div className="card-text">
                <h3>Hatékony, gyors autókezelés</h3>
                <h4 className="fw-light pb-5 pt-1">
                  A z autókezelő rendszerünk lehetővé teszi az autója rendelkezésre állásának ellenőrzését, a költségek nyomon követését és a bérleti szerződések kezelését is. Az egyszerű és intuitív kezelőfelület segítségével a felhasználók könnyen és hatékonyan kezelhetik autóikat.</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-4 mb-lg-0">
          <div className="card bg-light mb-4 pb-3">
            <img src={'car.png'} alt="" className="float-end ms-3 mt-2" id="cardImg" />
            <div className="card-body">
              <div className="card-text">
                <h4 className="fw-light">
                  <strong>Az oldalunkon könnyen nyomon követheti járműveit</strong>, kezelheti azok karbantartását, ellenőrizheti az üzemanyagfogyasztást, és még sok más hasznos funkciót talál. Bízunk benne, hogy az általunk kínált szolgáltatásokkal sikerül majd javítani autóparkja hatékonyságát és csökkenteni az üzemeltetési költségeket.
                </h4>
              </div>
            </div>
          </div>
          <div className="card bg-dark text-white mb-4">
            <div className="card-header"><img src={'information.png'} alt="i" className="float-end ms-3 mt-2" id="cardImg" /></div>
            <div className="card-body">
              <div className="card-text">
                <h4 className="fw-light pb-4 text-white">Tartsa számon a legfontosabb <strong>információkat</strong> a diagramm és naptár segítségével! </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-4 mb-lg-0">
          <div className="card bg-dark text-white mb-4">
            <div className="card-header"><img src={'easy.png'} alt="" className="float-end ms-3 mt-2" id="cardImg" /></div>
            <div className="card-body">
              <div className="card-text">
                <h4 className="fw-light text-white">Tegye <strong>könnyebé</strong> és érdekesebbé az autóival kapcsolatos teendők, információk vezetését.</h4>
              </div>
            </div>
          </div>
          <div className="card bg-light mb-5">
            <img src={'calendar.png'} alt="" className="float-end ms-3 mt-2" id="cardImg" />
            <div className="card-body">
              <div className="card-text">
                <h3>Hatékony naptár a weboldalunkon</h3>
                <h4 className="fw-light">
                  Az oldal kiválóan alkalmas autókezelésre, valamint egy funkcionális naptárral rendelkezik, amely lehetővé teszi az új események hozzáadását a karbantartáshoz és bármely más tevékenységhez. A naptár használata egyszerű, így a felhasználóknak könnyedén használható.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      {endOfPage}
    </>
  };

}