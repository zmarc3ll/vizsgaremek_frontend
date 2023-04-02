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
  const [date, setDate] = useState('');
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
      date,
      comment
    };
    setEvents([...events, newEvent]);
    handleModalClose();
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    setComment(e.target.value);
  };

  const eventSource = { events };
  return (
      <><div className="card ms-5 me-5 pt-2 mt-4">
      <div className="card-body">
        <div className='container-fluid'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            events={[eventSource]}
            select={handleDateSelect}
            locale={huLocale}
            locales={[huLocale]} />
          {showModal && (
            <div className="modal" style={{ display: 'block' }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <form onSubmit={handleFormSubmit}>
                    <div className="modal-header">
                      <h5 className="modal-title">Esemény hozzáadása - {date}</h5>
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
                        </select>
                      </div>
                      <div className="input-group ms-1 me-1 pt-3">
                        <span className='input-group-text'>További információk:</span>
                        <textarea className='form-control' aria-label='További információk:' onChange={(e) => setComment(e.target.value)}></textarea>
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
        <div className="card ms-4 me-4 mt-4 ">
          <div className="card-body text-center">
            {events.map((event, index) => (
              <div key={index}>
                <p><strong>{event.title}:</strong> {event.start && event.start.toString()} {event.end && event.end.toString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div></>
  );
};
export default MyCalendar;
