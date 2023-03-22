import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/common';

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
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        events={[eventSource]}
        select={handleDateSelect}
      />
      {showModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleFormSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Add Event</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={handleModalClose}></button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
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
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <div>{event.title}</div>
            <div>{event.start && event.start.toString()}</div>
            <div>{event.end && event.end.toString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCalendar;
