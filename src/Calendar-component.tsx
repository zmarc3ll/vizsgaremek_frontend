import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type CalendarProps = {};

const CalendarComponent: React.FC<CalendarProps> = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (date: Date) => {
    setDate(date);
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={onChange}
        value={date}
        className="calendar"
        calendarType="US"
        minDetail="month"
      />
    </div>
  );
};

export default CalendarComponent;
