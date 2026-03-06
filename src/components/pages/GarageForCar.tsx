import { Component, FormEvent } from "react";
import { Link } from "react-router-dom";
import LineChart from "../Chart-component";
import * as bootstrap from 'bootstrap';
import { NavLink } from "react-router-dom";
import React from 'react';


interface chartDataResponse {
    chart: ChartData[];
}

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
interface Props {
    carId?: string;
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
    pictures: CarPicture[];
}

interface ChartData {
    chartId: number;
    speedometer: number;
    date: string;
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
    car: Car | null;
    carPic: string;
    cars: Car[];
    pictures: CarPicture[];
    carLoaded: boolean;
    calDatas: CalendarData[];
    title: string;
    start: string;
    comment: string;
    eventsLoaded: boolean;
    chart: ChartData[];
    hasSpeedometer: boolean;
    speedometer: number;
    date: string;
    carsCollapseOpen: { [key: number]: boolean }; // carId -> true/false
    selectedFiles: { [carId: number]: File | null };
    showEditModal: boolean;       // modal láthatósága
    editedCar: Partial<Car>;      // az aktuálisan szerkesztett autó adatai
}

const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 10);


export default class GarageForCar extends Component<Props, State> {

    state: State = {
        car: null,
        carPic: '',
        cars: [],
        pictures: [],
        carLoaded: false,
        calDatas: [],
        title: '',
        start: '',
        comment: '',
        eventsLoaded: false,
        chart: [],
        hasSpeedometer: false,
        speedometer: 0,
        date: formattedDate,
        carsCollapseOpen: {},
        selectedFiles: {},
        showEditModal: false,
        editedCar: {},

    }
    toggleCollapse = (carId: number) => {
        this.setState(prev => ({
            carsCollapseOpen: {
                ...prev.carsCollapseOpen,
                [carId]: !prev.carsCollapseOpen[carId],
            },
        }));
    };



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
        const userId = localStorage.getItem('userId');
        const carId = this.props.carId; // ide fontos hozzáadni a parametert

        try {
            let response = await fetch(`http://localhost:3001/usersCar/${userId}`);
            let data = await response.json() as carListResponse;

            // Csak a kiválasztott autót keressük
            const selectedCar = data.cars.find(c => c.carId === Number(carId)) || null;

            this.setState({
                car: selectedCar,
                carLoaded: true
            });
        } catch (error) {
            console.error('Error fetching cars:', error);
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
            let responseUrl: string = response.url.substring(0, 36) + thisUserId + "?limit=3&from=" + dateString;
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

    async loadChartData() {
        if (!this.props.carId) return;

        try {
            const response = await fetch(
                `http://localhost:3001/chart/car/${this.props.carId}`
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json() as chartDataResponse;

            this.setState({
                chart: data.chart,
                hasSpeedometer: data.chart.length > 0,
            });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async loadCar() {
        if (!this.props.carId) return;

        try {
            const response = await fetch(
                `http://localhost:3001/car/${this.props.carId}`
            );

            if (!response.ok) throw new Error("Hiba a lekérésnél");

            const data = await response.json();

            this.setState({
                cars: [data], // csak 1 autó
                carLoaded: true
            });

        } catch (error) {
            console.error("Hiba:", error);
        }
    }

    /*async componentDidMount() {
        await this.loadCar();
        await this.loadChartData();
    }*/

    componentDidMount() {
        this.loadUsersCars();
        this.loadCar();
        this.loadCarPics();
        this.loadCarsEvents();
        this.loadChartData();
        window.scrollTo(0, 0);
    }

    onFileUpload = async (carId: number) => {
        const file = this.state.selectedFiles[carId];
        if (!file) {
            console.log("Nincs kiválasztott fájl!");
            return;
        }

        const formData = new FormData();
        formData.append("carFile", file);

        try {
            const response = await fetch(`http://localhost:3001/uploadfile/${carId}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error("Upload sikertelen");

            console.log("Upload sikeres:", await response.json());

            // Újratöltjük az autókat, hogy megjelenjen a kép
            await this.loadUsersCars();
            //await this.loadCar();

            // töröljük a feltöltött fájlt a state-ből
            this.setState(prev => ({
                selectedFiles: {
                    ...prev.selectedFiles,
                    [carId]: null
                }
            }));
        } catch (err) {
            console.error("Upload hiba:", err);
        }
    };

    onFileChange = (carId: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const maxSize = 2 * 1024 * 1024; // 2MB

        // Méret ellenőrzés
        if (file.size > maxSize) {
            alert("A kép túl nagy! Maximum 2MB lehet.");
            return;
        }

        // Típus ellenőrzés
        if (!file.type.startsWith("image/")) {
            alert("Csak képfájl tölthető fel!");
            return;
        }

        this.setState(prev => ({
            selectedFiles: {
                ...prev.selectedFiles,
                [carId]: file
            }
        }));
    };

    handleUpload = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!this.props.carId) return;

        const { speedometer, date } = this.state;

        const dbData = {
            speedometer,
            date,
        };

        try {
            const response = await fetch(
                `http://localhost:3001/chart/car/${this.props.carId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dbData),
                }
            );

            if (!response.ok) throw new Error("Hiba mentéskor");

            this.setState({
                speedometer: 0,
                date: formattedDate,
            });

            await this.loadChartData();

        } catch (error) {
            console.error("Upload hiba:", error);
        }
    };

    deleteCarImage = async (picId: number) => {
        try {
            const response = await fetch(`http://localhost:3001/deleteCarImage/${picId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Kép törlése sikertelen");
            }

            console.log("Kép törölve");

            // újratöltjük az autót hogy eltűnjön a kép
            await this.loadUsersCars();
            await this.loadCar();

        } catch (error) {
            console.error("Törlés hiba:", error);
        }
    };

    handleEditClick = (car: Car) => {
        this.setState({
            showEditModal: true,
            editedCar: { ...car }, // másolat a jelenlegi autóról
        });
    };

    handleSaveEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { editedCar, car } = this.state;

        if (!editedCar || !car) {
            alert('Hiba: nincs szerkesztett autó vagy aktuális autó adat.');
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:3001/cars/${car.carId}`, // car biztosan nem null
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editedCar),
                }
            );

            if (!response.ok) throw new Error('Hiba történt a frissítés során');

            const updatedCar = await response.json();

            this.setState({
                car: updatedCar,
                showEditModal: false,
            });
        } catch (err) {
            console.error(err);
            alert('Hiba történt a frissítés során');
        }
    };

    render() {
        const data = this.state.chart.map((chart) => (chart.speedometer));
        const labels = this.state.chart.map((chart) => (chart.date));
        const car = this.state.cars[0];
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);
        let kmSection;
        if (!this.state.carLoaded) {
            return <div className="text-center mt-5 py-5">Betöltés...</div>;
        }
        if (this.state.hasSpeedometer) {
            kmSection = (<>
                <div className="card-header rounded-4">
                    <h5 className="text-center mb-3 mt-3 fw-semibold">
                        Felvétel a diagrammra
                        <img src="/chart.png" className="img-fluid float-end" />
                    </h5>
                </div>
                <div className="card-body">
                    <form className="text-center">
                        <label htmlFor="numInput" className="form-label fw-light">Kilóméter óra</label>
                        <input
                            type="number"
                            id="numInput"
                            placeholder="Írja be a kilóméter óra jelenlegi állását!"
                            required
                            className="form-control mb-2 interactive"
                            max={10000000}
                            onChange={(e) => this.setState({ speedometer: parseInt(e.target.value) })}
                        />

                        <label htmlFor="dateInput" className="fw-light mb-2">Dátum</label>
                        <input
                            type="date"
                            id="datumInput"
                            className="form-control mb-4 fw-light text-center interactive"
                            defaultValue={formattedDate}
                            required
                            onChange={(e) => this.setState({ date: e.target.value })}
                        />

                        <input
                            type="submit"
                            value='Rögzítés'
                            className="btn btn-dark form-control mb-2 interactive"
                        />
                        <p className="fw-light mb-2"><i>Érdemes hónaponta rögzíteni!</i></p>
                    </form>
                </div>
            </>)
        } else {
            kmSection = (
                <div className="mt-4">
                    <div className="card-header rounded-4">
                        <h5 className="text-center mb-3 mt-3 fw-semibold">
                            Kilóméter óra beállítása
                            <img src="/chart.png" className="img-fluid float-end" />
                        </h5>
                    </div>
                    <div className="card-body">
                        <form className="text-center" onSubmit={this.handleUpload}>
                            <label htmlFor="numInput" className="form-label fw-light">Kilóméter óra</label>
                            <input
                                type="number"
                                id="numInput"
                                placeholder="Írja be a kilóméter óra jelenlegi állását!"
                                required
                                className="form-control mb-2 interactive"
                                max={10000000}
                                onChange={(e) => this.setState({ speedometer: parseInt(e.target.value) })}
                            />
                            <input
                                type="submit"
                                value="Rögzítés"
                                className="btn btn-dark form-control mb-2 interactive"
                            />

                            <p className="fw-light mb-2"><i>Érdemes hónaponta rögzíteni!</i></p>
                        </form>
                    </div>
                </div>
            );
        }

        let closeEventsCard;

        if (this.state.eventsLoaded) {
            closeEventsCard = (
                <div className="card-body">
                    {this.state.calDatas.map((caldatas: CalendarData) => (
                        <>
                            <div key={caldatas.id} className="mb-4 ms-4 me-4 event-card" id="closeEvents">
                                <span>
                                    <strong>{caldatas.title}</strong> - <i className="text-danger">{caldatas.start}</i>
                                    <p className="fw-light mt-2">{caldatas.comment}</p>
                                </span>
                            </div>
                        </>
                    ))}
                    {this.state.car && (
                        <Link to={`/calendar?carId=${this.state.car.carId}`}>
                            <button className="btn btn-dark" id="calButton">
                                Ugrás a naptárra
                            </button>
                        </Link>
                    )}
                </div>
            );
        } else {
            closeEventsCard = (
                <div className="card-body">
                    <p className="fw-semibold text-success text-center mt-3 mb-4">
                        Minden kész, <br />
                        Nincsen kőzelgő esemény!
                    </p>
                    <Link to={'/calendar'}>
                        <button className="btn btn-dark" id="calButton">
                            Ugrás a naptárra
                        </button>
                    </Link>
                </div>
            );
        }

        return <main
            id="undoBlockContent"
            style={{
                backgroundImage: 'url("/garageBg.png")',
                backgroundSize: 'cover',        // kitölti az egész felületet
                backgroundPosition: 'center',   // középre igazítja
                backgroundRepeat: 'repeat',
                minHeight: '100vh',             // legalább a teljes viewport magasság
                width: '100%',                  // szélesség 100%
            }}
        >
            <div className="container-fluid" id="garageContainer">
                <div className="row">
                    <div className="col-lg-4 ps-4">
                        {this.state.car && (
                            <div className="card mt-4 mb-4" key={this.state.car.carId}>
                                {/* Kép / feltöltés */}
                                <div className="card-body p-2">
                                    {this.state.car.pictures && this.state.car.pictures.length > 0 ? (
                                        <div className="car-image-container text-center rounded shadow-lg img-fluid d-block mx-auto">
                                            <img
                                                src={`http://localhost:3001/uploadedfiles/cars/${this.state.car.pictures[0].carPic}`}
                                                alt={this.state.car.givenName}
                                                className="rounded shadow-lg bg-body img-fluid"
                                                id="carsImage"
                                            />

                                            <button
                                                className="delete-car-image"
                                                onClick={() => this.deleteCarImage(this.state.car!.pictures[0].picId)}
                                            >
                                                🗑
                                            </button>

                                        </div>


                                    ) : (
                                        <div className="ps-3 pe-3 pt-2 pb-2 text-center">
                                            <img src="/no-image.jpg" alt="no-imgae" id="albumPicture" className="rounded-4" />
                                            <input
                                                type="file"
                                                accept="image/png, image/jpeg, image/webp"
                                                onChange={(e) => this.onFileChange(this.state.car!.carId, e)}
                                                className="form-control mb-2"
                                            />
                                            <button
                                                className="btn btn-dark w-100"
                                                onClick={() => this.onFileUpload(this.state.car!.carId)}
                                            >
                                                Kép feltöltése
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Collapse opener */}
                                <div
                                    className="card-header d-flex justify-content-between align-items-center rounded-4"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => this.toggleCollapse(this.state.car!.carId)}
                                >
                                    <div className="d-flex align-items-center">
                                        <strong className="me-2">{this.state.car.givenName} adatai</strong>
                                        <button
                                            className="btn btn-sm btn-outline-none me-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                this.handleEditClick(this.state.car!);
                                                this.setState({ showEditModal: true });
                                            }}
                                        >
                                            ✏️
                                        </button>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '20px' }}>
                                            {this.state.carsCollapseOpen[this.state.car.carId] ?? true ? '▲' : '▼'}
                                        </span>
                                    </div>
                                </div>

                                {/* Adatok */}
                                <div
                                    className="card-body"
                                    style={{
                                        display: this.state.carsCollapseOpen[this.state.car.carId] ?? true ? 'block' : 'none',
                                        backgroundColor: 'transparent',
                                    }}
                                >
                                    <ul>
                                        <li>Márka: {this.state.car.brand}</li>
                                        <li>Modell: {this.state.car.model}</li>
                                        <li>Évjárat: {this.state.car.modelYear}</li>
                                        <li>Üzemanyag: {this.state.car.fuelType}</li>
                                        <li>Lóerő: {this.state.car.carPower}</li>
                                        <li>Váltó: {this.state.car.gearType}</li>
                                        <li>Szín: {this.state.car.color}</li>
                                        <li>Felépítés: {this.state.car.chassisType}</li>
                                        <li>Ajtók: {this.state.car.doors}</li>
                                        <li>Fogyasztás: {this.state.car.fuelEconomy}</li>
                                        <li>Rendszám: {this.state.car.license_plate}</li>
                                    </ul>
                                </div>
                            </div>
                        )}
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
                                    <div className="card-header rounded-4">
                                        <h5 className="text-center mb-3 mt-3 fw-semibold">Közelgő események   <img src="/calendar.png" className="img-fluid float-end" /></h5>
                                    </div>
                                    {closeEventsCard}
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card mt-4">
                                    {kmSection}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {this.state.showEditModal && (
                <div className="modal show d-block" tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Autó szerkesztése</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => this.setState({ showEditModal: false })}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(e) => this.handleSaveEdit(e)}>
                                    <div className="mb-3">
                                        <label className="form-label">Autó neve*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.editedCar.givenName || ''}
                                            onChange={(e) =>
                                                this.setState({
                                                    editedCar: { ...this.state.editedCar, givenName: e.target.value },
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Márka*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.editedCar.brand || ''}
                                            onChange={(e) =>
                                                this.setState({
                                                    editedCar: { ...this.state.editedCar, brand: e.target.value },
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Modell*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.editedCar.model || ''}
                                            onChange={(e) =>
                                                this.setState({
                                                    editedCar: { ...this.state.editedCar, model: e.target.value },
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Évjárat</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={this.state.editedCar.modelYear || ''}
                                            onChange={(e) =>
                                                this.setState({
                                                    editedCar: { ...this.state.editedCar, modelYear: e.target.valueAsNumber },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Üzemanyag*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.editedCar.fuelType || ''}
                                            onChange={(e) =>
                                                this.setState({
                                                    editedCar: { ...this.state.editedCar, fuelType: e.target.value },
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Lóerő*</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={this.state.editedCar.carPower || ''}
                                            onChange={(e) =>
                                                this.setState({
                                                    editedCar: { ...this.state.editedCar, carPower: e.target.valueAsNumber },
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Váltó*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.editedCar.gearType || ''}
                                            onChange={(e) =>
                                                this.setState({
                                                    editedCar: { ...this.state.editedCar, gearType: e.target.value },
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Szín</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.editedCar.color || ''}
                                            onChange={(e) =>
                                                this.setState({
                                                    editedCar: { ...this.state.editedCar, color: e.target.value },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Felépítés</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.editedCar.chassisType || ''}
                                            onChange={(e) =>
                                                this.setState({
                                                    editedCar: { ...this.state.editedCar, chassisType: e.target.value },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Ajtók száma</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={this.state.editedCar.doors || ''}
                                            onChange={(e) =>
                                                this.setState({
                                                    editedCar: { ...this.state.editedCar, doors: e.target.valueAsNumber },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Fogyasztás (liter/100km)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.editedCar.fuelEconomy || ''}
                                            onChange={(e) =>
                                                this.setState({
                                                    editedCar: { ...this.state.editedCar, fuelEconomy: e.target.value },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Rendszám*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.editedCar.license_plate || ''}
                                            onChange={(e) =>
                                                this.setState({
                                                    editedCar: { ...this.state.editedCar, license_plate: e.target.value },
                                                })
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => this.setState({ showEditModal: false })}
                                        >
                                            Mégse
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Mentés
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    }
}