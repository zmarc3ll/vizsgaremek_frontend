import axios from "axios";
import { Component, FormEvent } from "react";
import { Link } from "react-router-dom";

interface UserListResponse {
    users: User[];
}

interface carListResponse {
    cars: Car[];
}

interface carPictureResponse {
    pictures: CarPicture[];
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

interface CarPicture {
    picId: number;
    carPic: string;
    carsId: number;
}

interface State {
    selectedFile: File | null;
    carPic: string;
    givenNameInput: string;
    brandInput: string;
    modelInput: string;
    modelYearInput: number;
    fuelTypeInput: string;
    carPowerInput: number;
    gearTypeInput: string;
    colorInput: string;
    chassisTypeInput: string;
    doorsInput: number;
    fuelEconomyInput: string;
    licensePlateInput: string;
    cars: Car[];
    carLoaded: boolean;
    pictures: CarPicture[];
    users: User[];
    hasCarPic: boolean;
}

interface User {
    id: number;
    username: string;
    password: string;
    passwordAuth: string;
    email: string;
    birthDate: Date;
}

export default class Garage extends Component<{}, State> {
    state: State = {
        // Initially, no file is selected
        selectedFile: null,
        carPic: '',
        givenNameInput: '',
        brandInput: '',
        modelInput: '',
        modelYearInput: 0,
        fuelTypeInput: '',
        carPowerInput: 0,
        gearTypeInput: '',
        colorInput: '',
        chassisTypeInput: '',
        doorsInput: 0,
        fuelEconomyInput: '',
        licensePlateInput: '',
        cars: [],
        carLoaded: false,
        pictures: [],
        users: [],
        hasCarPic: false,
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
                hasCarPic: true,
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
            let datas = Object.values(data);
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
        this.loadCarPics();
        window.scrollTo(0, 0);
    }

    handleUpload = async () => {
        const { brandInput, modelInput, modelYearInput, fuelTypeInput, carPowerInput, gearTypeInput, colorInput, chassisTypeInput, doorsInput, fuelEconomyInput, licensePlateInput, givenNameInput } = this.state;
        const dbData = {
            brand: brandInput,
            model: modelInput,
            modelYear: modelYearInput,
            fuelType: fuelTypeInput,
            carPower: carPowerInput,
            gearType: gearTypeInput,
            color: colorInput,
            chassisType: chassisTypeInput,
            doors: doorsInput,
            fuelEconomy: fuelEconomyInput,
            license_plate: licensePlateInput,
            givenName: givenNameInput,
        }
        let userId = localStorage.getItem('userId');
        let responseOk = await fetch('http://localhost:3001/car/${userId}')
        let responseUrl: string = responseOk.url.substring(0, 26) + userId;
        console.log('url:', responseUrl);
        let response = await fetch(responseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dbData),
        });

        this.setState({
            givenNameInput: '',
            brandInput: '',
            modelInput: '',
            modelYearInput: 0,
            fuelTypeInput: '',
            carPowerInput: 0,
            gearTypeInput: '',
            colorInput: '',
            chassisTypeInput: '',
            doorsInput: 0,
            fuelEconomyInput: '',
            licensePlateInput: '',
            cars: [],
        })
        await this.loadUsersCars();
    }

    onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update the state
        this.setState({ selectedFile: event.target.files?.[0] || null });
    };


    onFileUpload = async () => {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        if (this.state.selectedFile) {
            formData.append(
                "carFile",
                this.state.selectedFile,
                this.state.selectedFile.name
            );
            let userId = localStorage.getItem('userId');
            let responseOk = await fetch('http://localhost:3001/uploadfile/${userId}')
            let responseUrl: string = responseOk.url.substring(0, 33) + userId;
            axios.post(responseUrl, formData).then((res) => {
                // Set the carPic state to the filename returned by the server
                this.setState({
                    carPic: res.data.carPic,
                    hasCarPic: true,
                });
            }).catch((err) => {
                console.log(err);
            });
        } else {
            console.log('Error on upload!');
        }
    };

    render() {
        const { brandInput, modelInput, modelYearInput, fuelTypeInput, carPowerInput, gearTypeInput, colorInput, chassisTypeInput, doorsInput, fuelEconomyInput, licensePlateInput, givenNameInput, carLoaded } = this.state;
        let uploadComponent: JSX.Element | null = null;
        if (!this.state.hasCarPic) {
            uploadComponent = (
                <div className="ps-3 pe-3 pt-2 pb-2 row">
                    <label htmlFor="carPic" className="text-center"><strong>Töltsön fel autójáról egy képet!</strong></label><br />
                    <input type="file" required onChange={this.onFileChange} id="carPic" />
                    <button onClick={this.onFileUpload} onInput={this.loadCarPics} className="btn btn-dark">
                        Feltöltés!
                    </button>
                </div>)
        }
        let myCar = (
            this.state.cars.map((car: Car) => (
                <div className="col-auto mb-4 d-flex justify-content-center py-3" key={car.carId} style={{ width: "350px" }}>
                    <div className="card garage-card">

                        {!this.state.hasCarPic && uploadComponent}

                        <Link
                            to={`/garage/${car.carId}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >

                            <img
                                src={`http://localhost:3001/uploadedfiles/cars/${this.state.carPic}`}
                                alt=""
                                className="bd-placeholder-img card-img-top"
                                id="albumPicture"
                            />

                            <div className="card-body text-center">
                                <ul className="list-unstyled mb-0">
                                    <li>
                                        <strong>{car.givenName}</strong><br />
                                        <hr className="glass-hr" />
                                        Márka: <i>{car.brand}</i><br />
                                        Modell: <i>{car.model}</i><br />
                                        Évjárat: <i>{car.modelYear}</i><br />
                                        Üzemanyag: <i>{car.fuelType}</i><br />
                                        Lóerő: <i>{car.carPower}</i><br />
                                        Váltó: <i>{car.gearType}</i><br />
                                        Rendszám: <i>{car.license_plate}</i>
                                    </li>
                                </ul>
                            </div>

                        </Link>

                    </div>
                </div>
            ))
        );
        let newCarAdd = (
            <div className="m-3" style={{ width: "350px" }}>
                <div className="card garage-card add-car-card d-flex align-items-center justify-content-center"
                    data-bs-toggle="modal"
                    data-bs-target="#addCarModal"
                    style={{ cursor: "pointer" }}
                >
                    <div className="text-center p-4">
                <h1 className="fw-light">+</h1>
                <p className="fw-semibold">Új autó hozzáadása</p>
            </div>
                </div>
            </div>
        )
        return <>
            <main
                id="undoBlockContent"
                style={{
                    backgroundImage: 'url("/garageBg.png")',
                    backgroundSize: 'cover',        // kitölti az egész felületet
                    backgroundPosition: 'center',   // középre igazítja
                    backgroundRepeat: 'no-repeat',  // ne ismétlődjön
                    minHeight: '100vh',             // legalább a teljes viewport magasság
                    width: '100%',                  // szélesség 100%
                }}
            >
                <div className="container-fluid" id="garageHeight">
                    <section className="text-center container">
                        <h1 className="fw-light">Garázs</h1>
                        <p className="lead text-muted"> Kezelje autóját, vagy vegyen fel újat!</p>
                    </section>

                    <div className="py-5">
                        <div className="container">
                            <div className="d-flex flex-wrap justify-content-center">
                                {myCar}
                                {newCarAdd}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="addCarModal" aria-labelledby="addCarModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header bg-dark border-0">
                                <h5 className="modal-title text-white" id="addCarModalLabel">+ Autó hozzáadása</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body bg-dark">
                                <form className="form-control bg-light" onSubmit={(e) => {
                                    this.handleUpload();
                                    window.location.href = '/garage';
                                }}>
                                    <div className="mb-3">
                                        <img src={"nameplate.png"} alt="" className="img-fluid float-end mb-2" />
                                        <label htmlFor="carName" className="form-label ms-2 me-2"><strong>Autó neve*</strong></label>
                                        <input type="text" className="form-control" id="carName" placeholder="Írja be az autója nevét" required value={givenNameInput} onChange={e => this.setState({ givenNameInput: e.currentTarget.value })} />
                                    </div><hr />
                                    <div className="mb-3">
                                        <img src={"carbrand.png"} alt="" className="img-fluid float-end mb-2" />
                                        <label htmlFor="carBrand" className="form-label ms-2 me-2"><strong>Autó márkája*</strong></label>
                                        <input type="text" className="form-control" id="carBrand" placeholder="Írja be az autó márkáját" required value={brandInput} onChange={e => this.setState({ brandInput: e.currentTarget.value })} />
                                    </div><hr />
                                    <div className="mb-3">
                                        <img src={"cartype.png"} alt="" className="img-fluid float-end mb-2" />
                                        <label htmlFor="carType" className="form-label ms-2 me-2"><strong>Autó típusa*</strong></label>
                                        <input type="text" className="form-control" id="carType" placeholder="Írja be az autó típusát" required value={modelInput} onChange={e => this.setState({ modelInput: e.currentTarget.value })} />
                                    </div><hr />
                                    <div className="mb-3">
                                        <img src={"caryear.png"} alt="" className="img-fluid float-end mb-2" />
                                        <label htmlFor="carYear" className="form-label ms-2 me-2"><strong>Évjárat</strong></label>
                                        <input type="number" className="form-control" id="carYear" placeholder="Írja be az autó évjáratát" value={modelYearInput} onChange={e => this.setState({ modelYearInput: e.currentTarget.valueAsNumber })} />
                                    </div><hr />
                                    <div className="mb-3">
                                        <img src={"fuel.png"} alt="" className="img-fluid float-end mb-2" />
                                        <label htmlFor="carFuel" className="form-label ms-2 me-2"><strong>Üzemanyag típusa*</strong></label>
                                        <input type="text" className="form-control" id="carFuel" placeholder="Írja be az autó üzemanyagának a típusát" required value={fuelTypeInput} onChange={e => this.setState({ fuelTypeInput: e.currentTarget.value })} />
                                    </div><hr />
                                    <div className="mb-3">
                                        <img src={"horses.png"} alt="" className="img-fluid float-end mb-2" />
                                        <label htmlFor="carPower" className="form-label ms-2 me-2"><strong>Lóerő*</strong></label>
                                        <input type="number" className="form-control" id="carPower" placeholder="Írja be az autó lóerejét" required value={carPowerInput} onChange={e => this.setState({ carPowerInput: e.currentTarget.valueAsNumber })} />
                                    </div><hr />
                                    <div className="mb-3">
                                        <img src={"gear.png"} alt="" className="img-fluid float-end mb-2" />
                                        <label htmlFor="carGear" className="form-label ms-2 me-2"><strong>Váltó típusa*</strong></label>
                                        <input type="text" className="form-control" id="carGear" placeholder="Írja be az autó váltójának típusát" required value={gearTypeInput} onChange={e => this.setState({ gearTypeInput: e.currentTarget.value })} />
                                    </div><hr />
                                    <div className="mb-3">
                                        <img src={"color-palette.png"} alt="" className="img-fluid float-end mb-2" />
                                        <label htmlFor="carColor" className="form-label ms-2 me-2"><strong>Adja meg az autó színét</strong></label>
                                        <input type="text" className="form-control" id="carColor" placeholder="Írja be az autó színét" value={colorInput} onChange={e => this.setState({ colorInput: e.currentTarget.value })} />
                                    </div><hr />
                                    <div className="mb-3">
                                        <img src={"car.png"} alt="" className="img-fluid float-end mb-2" />
                                        <label htmlFor="carChassis" className="form-label ms-2 me-2"><strong>Autó felépítése</strong> <i className="fw-lighter">(Pl.: szedán, kupé, stb...)</i></label>
                                        <input type="text" className="form-control" id="carChassis" placeholder="Írja be az autó felépítését" value={chassisTypeInput} onChange={e => this.setState({ chassisTypeInput: e.currentTarget.value })} />
                                    </div><hr />
                                    <div className="mb-3">
                                        <img src={"car-door.png"} alt="" className="img-fluid float-end mb-2" />
                                        <label htmlFor="carDoors" className="form-label ms-2 me-2"><strong>Autó ajtainak száma</strong></label>
                                        <input type="number" className="form-control" id="carDoors" placeholder="Írja be az autó ajtajainak számát" value={doorsInput} onChange={e => this.setState({ doorsInput: e.currentTarget.valueAsNumber })} />
                                    </div><hr />
                                    <img src={"fuelEco.png"} alt="" className="img-fluid float-end mb-2" />                             <div className="mb-3">
                                        <label htmlFor="carFuele" className="form-label ms-2 me-2"><strong>Autó fogyasztása</strong> <i className="fw-lighter">(x liter/ 100 kilóméter)</i></label>
                                        <input type="text" className="form-control" id="carFuele" placeholder="Írja be az autó fogyasztását" value={fuelEconomyInput} onChange={e => this.setState({ fuelEconomyInput: e.currentTarget.value })} />
                                    </div>
                                    <hr />
                                    <div className="mb-3">
                                        <img src={"license-plate.png"} alt="" className="img-fluid float-end mb-2" />
                                        <label htmlFor="carLicense" className="form-label ms-2 me-2"><strong>Autó rendszáma*</strong></label>
                                        <input type="text" className="form-control" id="carLicense" placeholder="Írja be az autó rendszámát" required value={licensePlateInput} onChange={e => this.setState({ licensePlateInput: e.currentTarget.value })} />
                                    </div>
                                    <button type="submit" className="btn btn-primary fw-semibold mb-3 mt-3" id="saveBtn">Felvétel</button>
                                </form>
                            </div>
                            <div className="modal-footer bg-dark border-0">
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    }
}