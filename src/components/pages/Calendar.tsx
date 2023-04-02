import { Component } from "react";
import CalendarComponent from "../Calendar-component";
import MyCalendar from "../Calendar-component";
import { Link } from "react-router-dom";

interface carListResponse {
    cars: Car[];
}

interface State {
    cars: Car[];
    carLoaded: boolean;
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

export default class Calendar extends Component<{}, State> {

    state: State = {
        cars: [],
        carLoaded: false,
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
            if (data.cars.length > 0) {
            this.setState({
                cars: data.cars,
                carLoaded: true,
            });
        }
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
    }

    render() {

        if(this.state.carLoaded) {
            return <body id="undoBlockContentForCalendar">
                    {this.state.cars.map((car: Car) => (
                        <h1 key={car.carId} className=" text-center">
                            <Link to={'/carpage'} id="carPageLink"><span>{car.givenName}</span></Link>
                        </h1>
                ))}
                <div className="container-fluid">
                    <CalendarComponent/>
                    </div>
            </body>
        } else {
            return <body id="undoBlockContent">
                <div className="container text-center">
                    <div className="card">
                        <img src={'calendarSplashart.jpg'} alt="" id="calSplash" className="img-fluid mt-5"/>
                        <div className="card-body">
                            <h4>Nincs még auótja?</h4>
                            <br />
                            <h5 className="fw-light">Adjon hozzá újat!</h5>
                            <p className="fw-lighter">Itt tudja majd kezelni a naptárat mely autójához kapcsolódik!</p>
                            <Link to={'/garage'}><button className="btn btn-success mb-2">+ Autó hozzáadása</button></Link>
                        </div>
                    </div>
                </div>
            </body>
        }
    }
}