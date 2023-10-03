// MyCalendar.js
import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddEvent from './AddEvent';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent, getEvent } from '../../redux/todoReducer/action';
import EditEvent from './EditEvent';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MyCalendar = () => {
  //const [events, setEvents] = useState([]); // State to manage the list of events
  const events = useSelector((store)=>store.todoReducer.events)
  const [selectedEvent, setSelectedEvent] = useState(null);
  const dispatch = useDispatch()
  //console.log(event,'28')
  useEffect(()=>{
    dispatch(getEvent())
    console.log(events,'33')
  },[])


  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const onEditEvent=(event)=>{
    //console.log(event)
  }
  const onDeleteEvent=(event)=>{
    const id = event.event._id
    console.log(event,id)

    dispatch(deleteEvent(id))
    dispatch(getEvent())
  }
  return (
    <div>
      <AddEvent /> {/* Pass the callback to the form */}
      <div style={{ height: '500px' }}>
      <Calendar
  localizer={localizer}
  events={Array.isArray(events) ? events.map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  })) : []}
  startAccessor="start"
  endAccessor="end"
  onSelectEvent={handleSelectEvent}
  style={{ margin: '20px' }}
  components={{
    event: (event) => (
      <div>
        <strong>{event.title}</strong>
        <div>{event.description}</div>
        {/* Edit and Delete Buttons */}
        <button onClick={() => onEditEvent(event)}>Edit</button>
        <button onClick={() => onDeleteEvent(event)}>Delete</button>
      </div>
    ),
  }}
/>


      
      </div>
    </div>
  );
};

export default MyCalendar;
