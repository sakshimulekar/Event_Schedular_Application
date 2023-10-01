import React from 'react'
import {Calendar,momentLocalizer} from "react-big-calendar"
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const MyCalendar = () => {
    const localizer = momentLocalizer(moment)
    const events = [
        {
          title: 'Event 1',
          start: new Date(2023, 9, 10, 10, 0), // October 10, 2023, 10:00 AM
          end: new Date(2023, 9, 10, 12, 0),   // October 10, 2023, 12:00 PM
        },
        // Add more events here
      ];
  return (
    <div>
        <div style={{ height: '500px' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ margin: '20px' }}
            />
        </div>
    </div>
  )
}

export default MyCalendar
