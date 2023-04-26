import { Component, FormEvent } from "react";
import { Link } from "react-router-dom";
import { EventInput } from "@fullcalendar/common";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import huLocale from '@fullcalendar/core/locales/hu';

interface carListResponse {
    cars: Car[];
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
    calId: number
    title: string;
    start: string;
    comment: string;
}

interface documentDataResponse {
    docDatas: DocumentData[]
}

interface DocumentData {
    docId: number;
    name: string;
    date: string;
}

interface State {
    cars: Car[];
    carLoaded: boolean;
    calDatas: CalendarData[];
    title: string;
    start: string;
    comment: string;
    showModal: boolean;
    events: EventInput[];
    eventsLoaded: boolean;
    docDatas: DocumentData[];
    name: string;
    date: string;
    docsLoaded: boolean;
}

const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 10);

export default class Calendar extends Component<{}, State> {
    
    state: State = {
        cars: [],
        carLoaded: false,
        calDatas: [],
        title: '',
        start: '',
        comment: '',
        showModal: false,
        events: [],
        eventsLoaded: false,
        docDatas: [],
        name: '',
        date: formattedDate,
        docsLoaded: false,
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

    async loadCarsEvents() {
        try {
            const thisUserId = localStorage.getItem('userId');
            let response = await fetch('http://localhost:3001/calendarEvent/${thisUserId}');
            let responseUrl: string = response.url.substring(0, 36) + thisUserId + "?limit=50"; /* max 50 */
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

    async loadDocuments() {
        try {
            const thisUserId = localStorage.getItem('userId');
            let response = await fetch('http://localhost:3001/documents/${thisUserId}');
            let responseUrl: string = response.url.substring(0, 32) + thisUserId
            let responseOk = await fetch(responseUrl);
            if (!responseOk.ok) {
                throw new Error('Network response was not ok');
            }
            let data = await responseOk.json() as documentDataResponse;
            if (data.docDatas.length > 0) {
                this.setState({
                    docDatas: data.docDatas,
                    docsLoaded: true,
                });
            }
            if (data.docDatas.length <= 0) {
                this.setState({
                    docsLoaded: false,
                });
            }
            if (response === null) {
                this.setState({
                    docsLoaded: false,
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    handleDateClick = (selectInfo: any) => {
        const selectedDate = new Date(selectInfo.date);
        const formattedDate = selectedDate.toLocaleDateString("hu-HU").split('.').join('.');
        this.setState({
            start: formattedDate,
            showModal: true,
        });
    };

    handleDateSelect = (selectInfo: any) => {
        this.setState({
            start: selectInfo.start.toLocaleDateString(),
            showModal: true,

        })
    };

    handleModalClose = () => {
        this.setState({
            showModal: false,
            title: '',
            start: '',
            comment: '',
        })
    };

    handleEventDelete = async (eventId: number) => {
        try {
            const response = await fetch(`http://localhost:3001/calendarEvent/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            this.setState(prevState => ({
                calDatas: prevState.calDatas.filter(event => event.calId !== eventId)
            }));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    }

    handleDocsUpload = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {name, date} = this.state;
        const dbData = {
            name: name,
            date: date,
        }
        let userId = localStorage.getItem('userId');
        let responseOk = await fetch('http://localhost:3001/documents/${userId}')
        let responseUrl: string = responseOk.url.substring(0, 32) + userId;
        let response = await fetch(responseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dbData),
        });
        this.setState({
            name: '',
            date: formattedDate,
        })
        await this.loadDocuments();
    }

    handleDocsDelete = async (docsId: number) => {
        try {
            const response = await fetch(`http://localhost:3001/documents/${docsId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            this.setState(prevState => ({
                docDatas: prevState.docDatas.filter(event => event.docId !== docsId)
            }));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    }

    handleUpload = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { title, start, comment } = this.state;
        const dbData = {
            title: title,
            start: start,
            comment: comment,
        }
        let userId = localStorage.getItem('userId');
        let responseOk = await fetch('http://localhost:3001/calendarEvent/${userId}')
        let responseUrl: string = responseOk.url.substring(0, 36) + userId;
        let response = await fetch(responseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dbData),
        });
        this.setState({
            title: '',
            start: '',
            comment: '',
        })
        await this.handleModalClose();
        await this.loadCarsEvents();
    }

    handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newEvent = {
            title: this.state.title,
            start: new Date(Date.parse(this.state.start)),
            extendedProps: {
                comment: this.state.comment,
            }
        };
        this.setState({ events: [...this.state.events, newEvent] })
        this.handleModalClose();
    };

    handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ comment: e.target.value })
    };

    componentDidMount() {
        this.loadUsersCars();
        this.loadCarsEvents();
        this.loadDocuments();
    }

    render() {
        const calendarEvents = this.state.calDatas.map((event, index) => {
            const startParts = event.start.split('. '); // Split the string into parts using the period and space characters
            const startDate = new Date(`${startParts[0]}-${startParts[1]}-${startParts[2]}`); // Create a Date object from the formatted string
            return {
                id: index.toString(),
                title: event.title,
                start: startDate,
                extendedProps: {
                    comment: event.comment
                },
                classNames: ['event-' + index % 3]
            };
        });

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);
        function calculateDaysLeft(expirationDate: Date): string {
            const currentDate = new Date();
            const daysLeft = Math.ceil(
              (expirationDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
            );
            return daysLeft <= 0 ? 'Már lejárt' : `${daysLeft} nap múlva.`;
          }
        let docs;
        if (this.state.docsLoaded) {
            docs = (
              <>
                {this.state.docDatas.map((docs: DocumentData) => {
                  const expirationDate = new Date(docs.date);
                  const daysLeft = Math.ceil(
                    (expirationDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
                  );
                  let status;
                  let statusClass;
                  let statusClassDate;
                  if (daysLeft < 0) {
                    status = "Már lejárt.";
                    statusClass = "text-danger";
                    statusClassDate = "text-danger"
                  } else if (daysLeft === 0) {
                    status = "Mai napon jár le!";
                    statusClass = "text-danger";
                    statusClassDate = "text-warning"
                  } else {
                    status = `${daysLeft} nap múlva`;
                    statusClass = "text-primary";
                    statusClassDate = "text-success"
                  }
                  return (
                    <div className="contriner-fluid text-center" key={docs.docId}>
                      <span>
                        <strong>{docs.name}</strong>&emsp;
                        <i className={statusClassDate}>
                          {new Date(docs.date).toLocaleDateString("hu-HU", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }).replace(/\//g, ". ")}
                        </i>
                      </span>
                      <br />
                      <span>
                        <h6 className="mt-3">
                          Lejár: &ensp;<b className={statusClass}>{status}</b>
                        </h6>
                        <button className="link-danger float-end pt-2 border-0 bg-white" onClick={() => this.handleDocsDelete(docs.docId)}>Törlés</button>
                      </span>
                      <hr className="mt-5"/>
                    </div>
                  );
                })}
              </>
            );
          } else {
            docs = (
              <>
                <h6 className="text-center text-warning mt-3">
                  Még nincs felvéve dokumentum.
                </h6>
              </>
            );
          }

        if (this.state.carLoaded) {
            return <main id="undoBlockContentForCalendar">
                {this.state.cars.map((car: Car) => (
                    <h1 key={car.carId} className=" text-center">
                        <Link to={'/carpage'} id="carPageLink"><span><img src={'car.png'} alt="" className="img-fluid me-3" />{car.givenName}<img src={'car.png'} alt="" className="img-fluid ms-3" id="flippedCar" /></span></Link>
                    </h1>
                ))}
                <div className="container-fluid">
                    <div className="card ms-5 me-5 pt-2 mt-4">
                        <div className="card-body">
                            <div className='container-fluid'>
                                <FullCalendar
                                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                    initialView="dayGridMonth"
                                    selectable={true}
                                    editable={false}
                                    droppable={false}
                                    displayEventTime={false}
                                    events={calendarEvents}
                                    eventClassNames={['event-2']}
                                    select={this.handleDateSelect}
                                    locale={huLocale}
                                    locales={[huLocale]}
                                    dateClick={this.handleDateClick} />
                                {this.state.showModal && (
                                    <div className="modal" style={{ display: 'block' }}>
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <form onSubmit={this.handleUpload}>
                                                    <div className="modal-header">
                                                        <h5 className="modal-title">Esemény hozzáadása - {this.state.start}</h5>
                                                        <button type="button" className="btn-close" aria-label="Close" onClick={this.handleModalClose}></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="form-group">
                                                            <label htmlFor='selectEvent'>Válasszon eseményt</label>
                                                            <select name='selectEvent' className='form-select' onChange={(e) => this.setState({ title: e.target.value })} required>
                                                                <option hidden value={''}>Válasszon az alábbiak közül</option>
                                                                <option value="Tankolás">Tankolás</option>
                                                                <option value="Büntetés">Büntetés</option>
                                                                <option value="Biztosítás">Biztosítás</option>
                                                                <option value="Szervíz">Szervíz</option>
                                                                <option value="Műszaki vizsga">Műszaki vizsga</option>
                                                                <option value="Havi szemle">Havi szemle</option>
                                                                <option value="Pályamatrica">Pályamatrica</option>
                                                                <option value="Gépjárműadó">Gépjárműadó</option>
                                                                <option value="Parkolás">Parkolás</option>
                                                                <option value="Autómosás">Autómosás</option>
                                                                <option value="Befizetés">Befizetés</option>
                                                                <option value="Egyéb">Egyéb</option>
                                                            </select>
                                                        </div>
                                                        <div className="input-group ms-1 me-1 pt-3">
                                                            <span className='input-group-text'>További információk:</span>
                                                            <textarea className='form-control' aria-label='További információk:' onChange={this.handleTextareaChange} maxLength={100}></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="submit" className="btn btn-primary">Save</button>
                                                        <button type="button" className="btn btn-secondary" onClick={this.handleModalClose}>Cancel</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div><div className="container-fluid">
                        <div className="ms-4 me-4 mt-4 ">
                                <div className="col-lg-12">

                                    <div className="row">
                                        <div className="col-lg-3">
                                            <div className="card mt-5 ms-3">
                                                <div className="card-header">
                                                    <h5 className="fw-semibold mt-3 mb-3 ms-4 text-center">Dokumentumok <img src={'document.png'} alt="" className="img-fluid float-end" /></h5>
                                                </div>
                                                <div className="card-body">
                                                   {docs}
                                                </div>
                                                <div className="card-footer">
                                                    <h5 className="fw-semibold mb-3 mt-2 text-center">+ Dokumentum hozzáadása</h5>
                                                   <form action="submit" className="form-control bg-light border-0" onSubmit={this.handleDocsUpload}>
                                                    <label htmlFor="documentName" className="form-label fw-light">Dokumentum neve:</label>
                                                    <input type="text" id="documentName" className="form-control fw-lighter" required placeholder="Adja meg a dokumentum nevét!" onChange={(e) => this.setState({ name: e.target.value })}/>
                                                    <label htmlFor="documentDate" className="fw-light mt-3 mb-2">Lejárati dátum:</label>
                                                    <input type="date" id="documentDate" className="form-control fw-lighter" defaultValue={formattedDate} required onChange={(e) => this.setState({ date: e.target.value })}/>
                                                    <button type="submit" className="btn btn-dark mt-4 mb-1 d-block m-auto"> Hozzáadás </button>
                                                   </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-9 text-center">
                                            <h4 className='fw-light mb-5'>Felvett események</h4>
                                            {this.state.calDatas.map((event, index) => (
                                                <div key={index}>
                                                    <p className='bg-light rounded'>
                                                        <strong>{event.title}:</strong>
                                                        <p className='text-success'>{event.comment}</p>
                                                        <i className='text-danger'>
                                                            {event.start &&
                                                                (new Date(Array.isArray(event.start) ? event.start[0] : event.start).toLocaleDateString('hu-HU').replace(/\./g, '.') === new Date().toLocaleDateString('hu-HU').replace(/\./g, '.')
                                                                    ? <strong>Mai napon!</strong> /* wrap the text in a strong tag */
                                                                    : new Date(Array.isArray(event.start) ? event.start[0] : event.start).toLocaleDateString('hu-HU').replace(/\./g, '.'))
                                                            }
                                                        </i>
                                                    </p>
                                                    <button className='btn btn-danger float-end' onClick={() => this.handleEventDelete(event.calId)}><strong>törlés</strong></button>
                                                    <br />
                                                    <hr className='mt-4' />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                            </div>
                            <ul className='text-start mt-3'>
                                <p className='fw-lighter'>Jelmagyarázat:</p>
                                <li><strong>Esemény</strong></li>
                                <li className='text-success'>Infó</li>
                                <li className='text-danger'><i>Dátum</i></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        } else {
            return <body id="undoBlockContent">
                <div className="container text-center">
                    <div className="card">
                        <img src={'calendarSplashart.jpg'} alt="" id="calSplash" className="img-fluid mt-5" />
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