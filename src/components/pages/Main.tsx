import { Component } from "react";
import { Link } from "react-router-dom";

export default class Main extends Component {
    render() { return <div id="carouselExampleCaptions" className="carousel slide " data-bs-ride="false">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={'slideshow1.jpg'} className="d-block w-100" alt="..."/>
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
            <img src={'slideshow3.jpg'} className="d-block w-100" alt="..."/>
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
    };
    
}