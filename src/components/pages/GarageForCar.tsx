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

interface calendarDataResponse {
    calDatas: CalendarData[]
}

interface CalendarData {
    id: number
    title: string;
    start: string;
    comment: string;
}

interface State {
    carPic: string;
    cars: Car[];
    pictures: CarPicture[];
    carLoaded: boolean;
    calDatas: CalendarData[];
    title: string;
    start: string;
    comment: string;
    eventsLoaded:boolean;
}

export default class GarageForCar extends Component<{}, State> {

    state: State = {
        carPic: '',
        cars: [],
        pictures: [],
        carLoaded: false,
        calDatas: [],
        title: '',
        start: '',
        comment: '',
        eventsLoaded: false,
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
            if (response === null) {
                this.setState({
                    carLoaded: false,
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async loadCarsEvents() {
        try {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            const dateString = `${year}. ${month}. ${day}`;
            console.log('date:', dateString)
            const thisUserId = localStorage.getItem('userId');
            let response = await fetch('http://localhost:3001/calendarEvent/${thisUserId}');
            let responseUrl: string = response.url.substring(0, 36) + thisUserId+"?limit=3&from="+dateString;
            let responseOk = await fetch(responseUrl);
            if (!responseOk.ok) {
                throw new Error('Network response was not ok');
            }
            let data = await responseOk.json() as calendarDataResponse;
            if (data.calDatas.length > 0) {
            this.setState({
                calDatas: data.calDatas,
                eventsLoaded: true,
            });
        }
            if (response === null) {
                this.setState({
                    eventsLoaded: false,
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    componentDidMount() {
        this.loadUsersCars();
        this.loadCarPics();
        this.loadCarsEvents();
    }

    render() {
        const data = [100, 50, 70, 200, 40, 10, 90, 250, 30, 80, 150, 40];
        const labels = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember','Október','November','December'];
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
                        <div className="card mt-4 mb-4">
                            <div className="card-body">
                                {/* cars details */}
                                {this.state.cars.map((car: Car) => (
                                    <h4 key={car.carId} className={'text-center pb-2'}>
                                        <span><strong>{car.givenName} adatai:</strong></span>
                                        <img src={'informationBlack.png'} alt="i" className="img-fluid float-end position-absoulute"/>
                                    </h4>
                                ))}
                                <ul id="carDataList">
                                    <ul id="carDataList" className="ps-3 ms-2">
                                        {this.state.cars.map((car: Car) => (
                                            <><li key={car.carId} className={'mt-2'}>
                                                <span>Márka: {car.brand}</span>
                                            </li><li key={car.carId} className={'mt-2'}>
                                                    <span>Modell: {car.model}</span>
                                                </li><li key={car.carId} className={'mt-2'}>
                                                    <span>Évjárat: {car.modelYear}</span>
                                                </li><li key={car.carId} className={'mt-2'}>
                                                    <span>Üzemanyag típusa: {car.fuelType}</span>
                                                </li><li key={car.carId} className={'mt-2'}>
                                                    <span>Lóerő: {car.carPower}</span>
                                                </li><li key={car.carId} className={'mt-2'}>
                                                    <span>Váltó típusa: {car.gearType}</span>
                                                </li><li key={car.carId} className={'mt-2'}><span>Szín: {car.color}</span>
                                                </li><li key={car.carId} className={'mt-2'}>
                                                    <span>Autó felépítése: {car.chassisType}</span>
                                                </li><li key={car.carId} className={'mt-2'}>
                                                    <span>Ajtók száma: {car.doors}</span>
                                                </li><li key={car.carId} className={'mt-2'}>
                                                    <span>Fogyasztás: {car.fuelEconomy}</span>
                                                </li><li key={car.carId} className={'mt-2'}>
                                                    <span>Rendszám: {car.license_plate}</span>
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
                              <LineChart data={data} labels={labels}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="card mt-4">
                                    <div className="card-body">
                                        <h5 className="text-center mb-4 mt-1 fw-semibold">Közelgő események   <img src={'calendar.png'} className="img-fluid float-end" /></h5>
                                     {/* i want to map cars calendar events here */}
                                     <div>
                                       { this.state.calDatas.map((caldatas: CalendarData) => (
                                            <>
                                            <div key={caldatas.id} className="mb-4 ms-4 me-4" id="closeEvents">
                                                <span><strong>{caldatas.title}</strong> - <i className="text-danger">{caldatas.start}</i><p className="fw-light mt-2">{caldatas.comment}</p></span>
                                            </div>
                                            <hr />
                                            </>
                                       ))}
                                     </div>
                                        <Link to={'/calendar'}><button className="btn btn-dark" id="calButton">Ugrás a naptárra</button></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card mt-4">
                                    <div className="card-body">
                                        <h5 className="text-center mb-4 fw-semibold">Felvétel a diagrammra <img src={'chart.png'} className="img-fluid float-end" /></h5>
                                        <form className="form-control text-center">
                                            <label htmlFor="numInput" className="form-label fw-light">Kilóméter óra</label>
                                            <input type="number" id="numInput" placeholder="Írja be a kilóméter óra jelenlegi állását!" required className="form-control mb-3"/>
                                            <input type="submit" value='Rögzítés' className="btn btn-dark form-control"/>
                                            <p className="fw-lighter mt-3"><i>(Ajánlott minden hónap végén megadni!)</i></p>
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