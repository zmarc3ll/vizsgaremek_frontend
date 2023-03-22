import { Component } from "react";

export default class Garage extends Component {
    render() {
        return <body id="undoBlockContent">
            <div className="container-fluid" id="garageContainer">
                <div className="row">
                    <div className="col-md-4 ps-4">
                        <div className="card">
                            {/* cars picture */}
                            <div className="card-body"><img src="https://picsum.photos/id/405/500/315" alt="" className=" rounded shadow-lg bg-body ms-0 img-fluid" /></div>
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