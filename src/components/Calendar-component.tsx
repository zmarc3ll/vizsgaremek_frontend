import React, { useMemo, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';


const CalendarComponent: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date());

  const myLabels = useMemo(() => {
    return [
      {
        date: new Date('2023-03-14'),
        textColor: '#e1528f',
        title: '4 SPOTS',
      },
    ];
  }, []);

  const myInvalid = useMemo(() => {
    return [
      {
        start: new Date('2023-03-14T08:00'),
        end: new Date('2023-03-14T13:00'),
      },
      {
        start: new Date('2023-03-14T15:00'),
        end: new Date('2023-03-14T17:00'),
      },
      {
        start: new Date('2023-03-14T19:00'),
        end: new Date('2023-03-14T20:00'),
      },
    ];
  }, []);

  return (
    <input type='datetime-local' />
    /*
    <DatePicker
      selected={startDate}
      onChange={(date: Date) => setStartDate(date)}
      showTimeSelect
      dateFormat="yyyy-MM-dd HH:mm"
      minDate={new Date('2023-03-14')}
      maxDate={new Date('2023-09-14')}
      minTime={new Date('1970-01-01T08:00')}
      maxTime={new Date('1970-01-01T19:59')}
      timeFormat="HH:mm"
      timeIntervals={60}
      highlightDates={myLabels}
      excludeTimes={myInvalid.map((invalid) => {
        return { start: invalid.start, end: invalid.end };
      })}
    />
    */
  );
};

export default CalendarComponent;
