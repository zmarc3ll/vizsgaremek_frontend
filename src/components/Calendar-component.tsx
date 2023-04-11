import React, { useCallback, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/common';
import huLocale from '@fullcalendar/core/locales/hu';

//--TODO:-- valahogy megtudni component be hogyan kell state et atadni, majd megcsinalni az eventek fetltését.
interface calendarDataResponse {
  calDatas: CalendarData[]
}

interface CalendarData {
    calId:number;
    eventName: string;
    eventDate: Date;
    comment: string;
}

interface State {
  calDatas: CalendarData[];
  eventName: string;
  evetDate: Date;
  comment: string;
}

const MyCalendar = (State: {}) => {
  state: State = {
    calDatas:[],
    eventName: '',
    eventDate: '',
    comment: '',
  }
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [start, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [events, setEvents] = useState<EventInput[]>([]);

  const handleDateSelect = (selectInfo: any) => {
    setDate(selectInfo.start.toLocaleDateString());
      setShowModal(true);
    };

  const handleModalClose = () => {
    setShowModal(false);
    setTitle('');
    setDate('');
    setComment('');
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newEvent = {
      title,
      start: new Date(Date.parse(start)),
      extendedProps: {
        comment
      }
    };
    setEvents([...events, newEvent]);
    handleModalClose();
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleUpload = async () => {
    // const {eventName, eventDate, comment} = this.state
    /* const dbData = {
      title: eventName,
      start: eventDate,
      comment: comment,
    } */
  }
  let userId = localStorage.getItem('userId');

  /* const handleEventDelete {
    //TODO
  } */

  /* const sortedEvents = [...events].sort((a, b) => {
    if (a.date && b.date) {
      return new Date(a.date?.toString()).getTime() - new Date(b.date?.toString()).getTime();
    }
    return 0;
  }); */

  const renderEventContent = (eventInfo: any) => {
    return (
      <>
        <span>{eventInfo.event.title}</span>
        {eventInfo.event.extendedProps && eventInfo.event.extendedProps.comment && (
          <>
            <br />
            <small>{eventInfo.event.extendedProps.comment}</small>
          </>
        )}
      </>
    );
  };
  
  
  /* const calendarEvents = events.map((event, index) => ({
    id: index,
    title: event.title,
    date: event.date,
  })); */

  const calendarEvents = events.map((event, index) => ({
    id: index.toString(),
    title: event.title,
    start: event.start,
    extendedProps: {
      comment: event.comment
    },
    classNames: ['event-' + index % 3]
  }));

  
  return (
      <><div className="card ms-5 me-5 pt-2 mt-4">
      <div className="card-body">
        <div className='container-fluid'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            editable={false}
            droppable={false}
            events={calendarEvents}
            eventContent={renderEventContent}
            eventClassNames={['event-2']}
            select={handleDateSelect}
            locale={huLocale}
            locales={[huLocale]} />
          {showModal && (
            <div className="modal" style={{ display: 'block' }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <form onSubmit={handleFormSubmit}>
                    <div className="modal-header">
                      <h5 className="modal-title">Esemény hozzáadása - {start}</h5>
                      <button type="button" className="btn-close" aria-label="Close" onClick={handleModalClose}></button>
                    </div>
                    <div className="modal-body">
                      <div className="form-group">
                        <label htmlFor='selectEvent'>Válasszon eseményt</label>
                        <select name='selectEvent' className='form-select' onChange={(e) => setTitle(e.target.value)} required>
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
                          <option value="Egyéb">Egyéb</option>
                        </select>
                      </div>
                      <div className="input-group ms-1 me-1 pt-3">
                        <span className='input-group-text'>További információk:</span>
                        <textarea className='form-control' aria-label='További információk:' onChange={handleTextareaChange}></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary">Save</button>
                      <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Cancel</button>
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
          <div className="text-center">
            <h4 className='fw-light mb-3'>Felvett események</h4>
            {events.map((event, index) => (
              <div key={index}>
                <p className='bg-light rounded'><strong>{event.title}:</strong><p className='text-success'>{event.extendedProps?.comment}</p> <i className='text-danger'>{event.start && new Date(Array.isArray(event.start) ? event.start[0] : event.start).toLocaleDateString('hu-HU').replace(/\./g, '.')}
</i></p><button className='btn btn-danger float-end' /* onClick={handleEventDelete} */><strong>törlés</strong></button> <br />
<hr className='mt-4'/>
              </div>
            ))}
          </div>
          <ul className='text-start'>
            <p className='fw-lighter'>Jelmagyarázat:</p>
              <li><strong>Esemény</strong></li>
              <li className='text-success'>Infó</li>
              <li className='text-danger'><i>Dátum</i></li>
            </ul>
        </div>
      </div></>
  );
};
export default MyCalendar;

