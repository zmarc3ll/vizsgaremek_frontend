import axios from "axios";
import { Component } from "react";

interface State {
    selectedFile: File | null;
    carPic: string;
    loading: boolean;
}

export default class Garage extends Component<{}, State> {

    state: State = {
        // Initially, no file is selected
        selectedFile: null,
        carPic: "",
        loading: true,
    };
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

            // Details of the uploaded file

            // Request made to the backend api
            // Send formData object
            axios.post("http://localhost:3001/uploadfile", formData).then((res) => {
                // Set the carPic state to the filename returned by the server
                this.setState({ carPic: res.data.carPic, loading: false });
            }).catch((err) => {
                console.log(err);
                this.setState({ loading: false });
            });
            this.setState({ loading: true });
        } else {
            this.setState({ loading: false });
        }
    };
    render() {
        return <body id="undoBlockContent">
            <div className="container-fluid" id="garageContainer">
                <div className="row">
                    <div className="col-md-4 ps-4">
                        <div className="card">
                            {/* cars picture */}
                            <div className="card-body">
                                {this.state.loading ? (
                                    <div>Loading...</div>
                                ) : (
                                    <img
                                        src={`http://localhost:3001/uploadedFiles/cars/${this.state.carPic}`}
                                        alt=""
                                        className=" rounded shadow-lg bg-body ms-0 img-fluid"
                                    />
                                )}
                                <div>
                                    <input type="file" onChange={this.onFileChange} />
                                    <button onClick={this.onFileUpload}>
                                        Upload!
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card mt-4">
                            <div className="card-body">
                                {/* cars details */}
                                <h4 className={'text-center pb-2'}>Az autó adatai:</h4>
                                <ul id="carDataList">
                                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. </li>
                                    <li>Deserunt, ut ducimus! Molestiae laboriosam, dolore rerum perspiciatis ducimus eaque inventore,</li>
                                    <li>Dolor molestias quidem ex rerum similique, repellendus, ea amet doloribus obcaecati quas </li>
                                    <li>Magnam earum inventore officia vero quo eos nemo provident molestias nostrum </li>
                                    <li>Officiis voluptas molestias explicabo. Ut consequuntur omnis quas a doloribus deleniti </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* chart here */}
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <img src="https://picsum.photos/id/400/1200/340" alt="" className=" rounded shadow-lg bg-body ms-0 img-fluid" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card mt-4">
                                    <div className="card-body">
                                        <img src="https://picsum.photos/id/301/400/300" alt="" className=" rounded shadow-lg bg-body ms-0 img-fluid" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card mt-4">
                                    <div className="card-body">
                                        <img src="https://picsum.photos/id/302/400/300" alt="" className=" rounded shadow-lg bg-body ms-0 img-fluid" />
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