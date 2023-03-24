import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/common';
import huLocale from '@fullcalendar/core/locales/hu';

const MyCalendar = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [events, setEvents] = useState<EventInput[]>([]);

  const handleDateSelect = (selectInfo: any) => {
    setStart(selectInfo.startStr);
    setEnd(selectInfo.endStr);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setTitle('');
    setStart('');
    setEnd('');
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newEvent = {
      title,
      start,
      end,
    };
    setEvents([...events, newEvent]);
    handleModalClose();
  };
  const eventSource = { events };

  return (
    <body id='undoBlockContent'>
      <div className="card ms-5 me-5">
        <div className="card-body">
          <div className='container-fluid'>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              selectable={true}
              events={[eventSource]}
              select={handleDateSelect}
              locale={huLocale}
              locales={[huLocale]}
            />
            {showModal && (
              <div className="modal" style={{ display: 'block' }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <form onSubmit={handleFormSubmit}>
                      <div className="modal-header">
                        <h5 className="modal-title">Esemény hozzáadása</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={handleModalClose}></button>
                      </div>
                      <div className="modal-body">
                        <div className="form-group">
                          <label htmlFor='selectEvent'>Válasszon eseményt</label>
                          <select name='selectEvent' className='form-control' onChange={(e) => setTitle(e.target.value)} required >
                            <option hidden>Válasszon az alábbiak közül</option>
                            <option value="Tankolás">Tankolás</option>
                            <option value="Büntetés">Büntetés</option>
                            <option value="Biztosítás">Biztosítás</option>
                            <option value="Szervíz">Szervíz</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Start</label>
                          <input type="datetime-local" className="form-control" value={start} onChange={(e) => setStart(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label>End</label>
                          <input type="datetime-local" className="form-control" value={end} onChange={(e) => setEnd(e.target.value)} required />
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
      </div>
      <div className="container-fluid">
        <div className="card ms-4 me-4 mt-4 ">
          <div className="card-body text-center">
            {events.map((event, index) => (
              <div key={index}>
                <p><strong>{event.title}:</strong> {event.start && event.start.toString()} {event.end && event.end.toString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </body>
  );
};

export default MyCalendar;
