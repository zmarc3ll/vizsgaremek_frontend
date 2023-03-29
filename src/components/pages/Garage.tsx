import axios from "axios";
import { Component } from "react";

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

/* interface User {
    userId:number;
} */

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
    filesUploaded: boolean;
}

interface User {
    id: number;
    username: string;
    password: string;
    passwordAuth: string;
    email: string;
    birthDate: Date;
}

interface UserListResponse {
    users: User[];
}

interface carListResponse {
    cars: Car[];
}

interface carPictureResponse {
    pictures: CarPicture[];
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
        filesUploaded: false,
    };


    async loadCarPics() {
        try{
        const response = await fetch('http://localhost:3001/carPic');
        const data = await response.json() as carPictureResponse;
        console.log('dataPic:', data);
        if(response.ok && data.pictures.length > 0) {
            const image = new Image();
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;
                const context = canvas.getContext('2d');
                if (context) {
                    context.drawImage(image, 0, 0);
                    const dataUrl = canvas.toDataURL();
                    this.setState({
                        carPic: dataUrl,
                        filesUploaded: false
                    });
                } else {
                    console.log('Failed to get canvas context');
                    this.setState({
                        filesUploaded: false
                    });
                }
            };
            image.onerror = () => {
              console.log('Failed to load image');
            };
            image.src = data.pictures[0].carPic;
          } else {
            console.log('No car pictures found');
          }
        } catch (error) {
          console.error('Error loading car pictures:', error);
        }
    }

    async loadusersCars() {
        try {
            const thisUserId = localStorage.getItem('userId');
            let response = await fetch('http://localhost:3001/usersCar/${thisUserId}');
            let responseUrl: string = response.url.substring(0, 31) + thisUserId; //cant pass the user id
            let responseOk = await fetch(responseUrl);
            if (!responseOk.ok) {
                throw new Error('Network response was not ok');
            }
            let data = await responseOk.json() as carListResponse;
            this.setState({
                cars: data.cars,
                carLoaded: true,
            });
            if (response == null) {
                this.setState({
                    carLoaded: false,
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    componentDidMount() {
        this.loadusersCars();
        this.loadCarPics();
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

        let response = await fetch('http://localhost:3001/car', {
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
        await this.loadusersCars();
    }

    onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update the state
        this.setState({ selectedFile: event.target.files?.[0] || null });
    };


    onFileUpload = () => {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        if (this.state.selectedFile) {
            formData.append(
                "carFile",
                this.state.selectedFile,
                this.state.selectedFile.name
            );
            axios.post("http://localhost:3001/uploadfile", formData).then((res) => {
                // Set the carPic state to the filename returned by the server
                this.setState({ 
                    carPic: res.data.carPic, 
                    filesUploaded: true,
                });
            }).catch((err) => {
                console.log(err);
            });
        } else {
            console.log('Error on upload!');
        }
    };


    render() {
        const { brandInput, modelInput, modelYearInput, fuelTypeInput, carPowerInput, gearTypeInput, colorInput, chassisTypeInput, doorsInput, fuelEconomyInput, licensePlateInput, givenNameInput, carLoaded, cars } = this.state;

        let uploadComponent;
        if (this.state.filesUploaded) {
            uploadComponent = (
                <div className="ps-3 pe-3 pt-2 pb-2 row">
                    <label htmlFor="carPic" className="text-center"><strong>Töltsön fel autójáról egy képet!</strong></label><br />
                    <input type="file" required onChange={this.onFileChange} id="carPic" />
                    <button onClick={this.onFileUpload} className="btn btn-dark">
                        Feltöltés!
                    </button> 
                </div>)
        } 
        let myCar;
        let newCarAdd;
        if (carLoaded) {
            myCar = (
                <div className="col">
                    <div className="card">
                         <img src={`http://localhost:3001/uploadedfiles/cars/${this.state.carPic}`} alt="" className="bd-placeholder-img card-img-top" />
                        {uploadComponent}
                        <div className="card-body">
                            <p className="card-text">
                            </p>
                        </div>
                    </div>
                </div>)
        } else {
            newCarAdd = (
                <div className="col ps-3 mt-5">
                    <div className="card">
                        <button type="button" className="btn btn-dark mt-5 ms-5 me-5 mb-5" data-bs-toggle="modal" data-bs-target="#addCarModal">+ Autó hozzáadása</button>
                    </div>
                </div>
            )
        }

        return <>
            <body id="undoBlockContent">
                <div className="container-fluid">
                    <section className="text-center container">
                        <h1 className="fw-light">Garázs</h1>
                        <p className="lead text-muted"> Kezelje autóit, vagy vegyen fel újabbat!</p>
                    </section>
                    <div className="album py-5 bg-light">
                        <div className="container">
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                {myCar}
                                {newCarAdd}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="addCarModal" aria-labelledby="addCarModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addCarModalLabel">+ Autó hozzáadása</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className="form-control" onSubmit={(e) => {
                                    this.handleUpload();
                                    window.location.href='/garage';
                                }}>
                                    <div className="mb-3">
                                        <label htmlFor="carName" className="form-label"><strong>Autó neve</strong></label>
                                        <input type="text" className="form-control" id="carName" placeholder="Írja be az autója nevét" required value={givenNameInput} onChange={e => this.setState({ givenNameInput: e.currentTarget.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="carBrand" className="form-label"><strong>Autó márkája</strong></label>
                                        <input type="text" className="form-control" id="carBrand" placeholder="Írja be az autó márkáját" required value={brandInput} onChange={e => this.setState({ brandInput: e.currentTarget.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="carType" className="form-label"><strong>Autó típusa</strong></label>
                                        <input type="text" className="form-control" id="carType" placeholder="Írja be az autó típusát" required value={modelInput} onChange={e => this.setState({ modelInput: e.currentTarget.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="carYear" className="form-label"><strong>Évjárat</strong></label>
                                        <input type="number" className="form-control" id="carYear" placeholder="Írja be az autó évjáratát" value={modelYearInput} onChange={e => this.setState({ modelYearInput: e.currentTarget.valueAsNumber })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="carFuel" className="form-label"><strong>Üzemanyag típusa</strong></label>
                                        <input type="text" className="form-control" id="carFuel" placeholder="Írja be az autó üzemanyagának a típusát" required value={fuelTypeInput} onChange={e => this.setState({ fuelTypeInput: e.currentTarget.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="carPower" className="form-label"><strong>Lóerő</strong></label>
                                        <input type="number" className="form-control" id="carPower" placeholder="Írja be az autó lóerejét" required value={carPowerInput} onChange={e => this.setState({ carPowerInput: e.currentTarget.valueAsNumber })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="carGear" className="form-label"><strong>Váltó típusa</strong></label>
                                        <input type="text" className="form-control" id="carGear" placeholder="Írja be az autó váltójának típusát" required value={gearTypeInput} onChange={e => this.setState({ gearTypeInput: e.currentTarget.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="carColor" className="form-label"><strong>Adja meg az autó színét</strong></label>
                                        <input type="text" className="form-control" id="carColor" placeholder="Írja be az autó színét" value={colorInput} onChange={e => this.setState({ colorInput: e.currentTarget.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="carChassis" className="form-label"><strong>Autó felépítése</strong> <i className="fw-lighter">(Pl.: szedán, kupé, stb...)</i></label>
                                        <input type="text" className="form-control" id="carChassis" placeholder="Írja be az autó felépítését" value={chassisTypeInput} onChange={e => this.setState({ chassisTypeInput: e.currentTarget.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="carDoors" className="form-label"><strong>Autó ajtainak száma</strong></label>
                                        <input type="number" className="form-control" id="carDoors" placeholder="Írja be az autó ajtajainak számát" value={doorsInput} onChange={e => this.setState({ doorsInput: e.currentTarget.valueAsNumber })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="carFuele" className="form-label"><strong>Autó fogyasztása</strong> <i className="fw-lighter">(x liter/ 100 kilóméter)</i></label>
                                        <input type="text" className="form-control" id="carFuele" placeholder="Írja be az autó fogyasztását" value={fuelEconomyInput} onChange={e => this.setState({ fuelEconomyInput: e.currentTarget.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="carLicense" className="form-label"><strong>Autó rendszáma</strong></label>
                                        <input type="text" className="form-control" id="carLicense" placeholder="Írja be az autó rendszámát" required value={licensePlateInput} onChange={e => this.setState({ licensePlateInput: e.currentTarget.value })} />
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Bezárás</button>
                                        <button type="submit" className="btn btn-primary">Mentés</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </>
    }
}