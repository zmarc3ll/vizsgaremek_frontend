import { Component } from "react";
import { Link } from "react-router-dom";

export default class Main extends Component {
  render() {
    return <><div id="carouselExampleCaptions" className="carousel slide " data-bs-ride="false">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={'slideshow1.jpg'} className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>TeAutod.hu</h5>
            <p>Megbízható flottakezelés, akár több autóra is</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={'slideshow2.jpg'} className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>TeAutod.hu</h5>
            <p>Felhasználó barát felület, a legjobb élményért</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={'slideshow3.jpg'} className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>TeAutod.hu</h5>
            <p>Mobil és asztali alkalmazás is, a felhasználók kénylmére</p>
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
      <div className="container mt-5" >
        <div className="row">
          <div className="col-lg-12">
            <h2 className="text-center">Kezelje autóját velünk!</h2>
            <p className="text-center fst-italic">Ennyire könnyű és átlátható még sosem volt! <br />Mutatjuk mit nyer ha minket választ!</p>
          </div>
          <div className="col-lg-12 row mt-5">
            <img src={'example.jpg'} alt="" className="shadow-lg p-3 mb-5 bg-body mx-auto d-block" id="exampleImg" />
          </div>
        </div>
      </div>
      <div className="col-lg-12 text-center pb-3">
        <h2>Miért válasszon minket?</h2>
        <p className="fw-light">Itt van minden amiért érdemes a TeAutod.hu -t választani!</p>
      </div>
      <div className="row container-fluid mt-5 mx-auto" id="reasonGallery">
        <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Boat on Calm Water"
          />

          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp"
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Wintry Mountain Landscape"
          />
        </div>

        <div className="col-lg-4 mb-4 mb-lg-0">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain2.webp"
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Mountains in the Clouds"
          />

          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Boat on Calm Water"
          />
        </div>

        <div className="col-lg-4 mb-4 mb-lg-0">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(18).webp"
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Waves at Sea"
          />

          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp"
            className="w-100 shadow-1-strong rounded mb-4"
            alt="Yosemite National Park"
          />
        </div>
      </div>
      <div className="card  mx-auto d-block mt-5 mb-3" id="homeRegisterCard">
        <div className="card-body text-center">
        <img src={'mechanicSplashart.png'} alt="" className="img-fluid"/> <br />
          <h5 className="card-title">Online flottakezelés</h5>
          <p className="card-text fw-light">Kezdje meg akár mátol autói karbantartását!</p>
          <Link to={'/register'}><button className="btn btn-success">Regisztrálok</button></Link>
        </div>
      </div>
    </>
  };

}