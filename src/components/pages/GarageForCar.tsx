import { Component } from "react";
import { Link } from "react-router-dom";
import LineChart from "../Chart-component";

interface carPictureResponse {
    pictures: CarPicture[];
}

interface carListResponse {
    cars: Car[];
}

interface CarPicture {
    picId: number;
    carPic: string;
    carsId: number;
}

interface Car {
    carId: number;
    brand: string;
    model: string;
    modelYear: number;
    fuelType: string;
    carPower: number;
    gearType: string;
    color: string;
    chassisType: string;
    doors: number;
    fuelEconomy: string;
    license_plate: string;
    givenName: string;
}

interface State {
    carPic: string;
    cars: Car[];
    pictures: CarPicture[];
    carLoaded: boolean;
}

export default class GarageForCar extends Component<{}, State> {

    state: State = {
        carPic: '',
        cars: [],
        pictures: [],
        carLoaded: false,
    }

    async loadCarPics() {
        let userId = localStorage.getItem('userId');
        let response = await fetch('http://localhost:3001/carPic/${userId}');
        let responseUrl: string = response.url.substring(0, 29) + userId;
        let responseOk = await fetch(responseUrl);
        let data = await responseOk.json() as carPictureResponse;
        if (responseOk.ok && Object.keys(data).length > 0) {
            let datas = Object.values(data);
            const carPic = datas[0].carPic;
            this.setState({
                carPic: carPic,
            })
        }
    }

    async loadUsersCars() {
        try {
            const thisUserId = localStorage.getItem('userId');
            let response = await fetch('http://localhost:3001/usersCar/${thisUserId}');
            let responseUrl: string = response.url.substring(0, 31) + thisUserId;
            let responseOk = await fetch(responseUrl);
            if (!responseOk.ok) {
                throw new Error('Network response was not ok');
            }
            let data = await responseOk.json() as carListResponse;
            this.setState({
                cars: data.cars,
                carLoaded: true,
            });
            console.log('thisstate:', typeof this.state.cars);
            if (response === null) {
                this.setState({
                    carLoaded: false,
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    componentDidMount() {
        this.loadUsersCars();
        this.loadCarPics();
    }

    render() {
        const data = [12, 19, 3, 5, 2, 3];
        const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
        return <body id="undoBlockContent">
            <div className="container-fluid" id="garageContainer">
                <div className="row">
                    <div className="col-lg-4 ps-4">
                        <div className="card">
                            {/* cars picture */}
                            <div className="card-body">
                                <img
                                    src={`http://localhost:3001/uploadedFiles/cars/${this.state.carPic}`}
                                    alt="Töltsön fel autójáról képet!"
                                    className=" rounded shadow-lg bg-body ms-0 img-fluid"
                                    id="carsImage"
                                />
                            </div>
                        </div>
                        <div className="card mt-4">
                            <div className="card-body">
                                {/* cars details */}
                                {this.state.cars.map((car: Car) => (
                                    <h4 key={car.carId} className={'text-center pb-2'}>
                                        <span><img src={'informationBlack.png'} alt="i" className="img-fluid float-start"/><strong>{car.givenName} adatai:</strong></span>
                                    </h4>
                                ))}
                                <ul id="carDataList">
                                    <ul id="carDataList" className="ps-3 ms-2">
                                        {this.state.cars.map((car: Car) => (
                                            <><li key={car.carId}>
                                                <span>Márka: {car.brand}</span><br />
                                            </li><li key={car.carId}>
                                                    <span>Modell: {car.model}</span><br />
                                                </li><li key={car.carId}>
                                                    <span>Évjárat: {car.modelYear}</span><br />
                                                </li><li key={car.carId}>
                                                    <span>Üzemanyag típusa: {car.fuelType}</span><br />
                                                </li><li key={car.carId}>
                                                    <span>Lóerő: {car.carPower}</span><br />
                                                </li><li key={car.carId}>
                                                    <span>Váltó típusa: {car.gearType}</span><br />
                                                </li><li key={car.carId}><span>Szín: {car.color}</span><br />
                                                </li><li key={car.carId}>
                                                    <span>Kaszni típusa: {car.chassisType}</span><br />
                                                </li><li key={car.carId}>
                                                    <span>Ajtók száma: {car.doors}</span><br />
                                                </li><li key={car.carId}>
                                                    <span>Fogyasztás: {car.fuelEconomy}</span><br />
                                                </li><li key={car.carId}>
                                                    <span>Rendszám: {car.license_plate}</span><br />
                                                </li></>
                                        ))}
                                    </ul>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card">
                            <div className="card-body">
                            <LineChart data={data} labels={labels} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="card mt-4">
                                    <div className="card-body">
                                        <h5 className="text-center mb-4">Közelgő események   <img src={'calendar.png'} className="img-fluid float-end" /></h5>
                                        <ul className="mb-4">
                                            <li>Tankolas - 2023.05.06 - Teli tank, 20000 Ft</li>
                                            <hr />
                                            <li>Egyéb - Dátum - Comment</li>
                                            <hr />
                                            <li>Bizotsítás - Dátum - Comment</li>
                                            <hr />
                                            <li>Szervíz - Dátum - Comment</li>
                                        </ul>
                                        <Link to={'/calendar'}><button className="btn btn-dark" id="calButton">Ugrás a naptárra</button></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card mt-4">
                                    <div className="card-body">
                                        <h5 className="text-center mb-4">Felvétel a diagrammra <img src={'chart.png'} className="img-fluid float-end" /></h5>
                                        <form className="form-control text-center">
                                            <label htmlFor="numInput" className="form-label fw-light">Kilóméter óra</label>
                                            <input type="number" id="numInput" placeholder="Írja be a kilóméter óra jelenlegi állását!" required className="form-control mb-3"/>
                                            <input type="submit" value='Rögzítés' className="btn btn-dark form-control"/>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    }
}