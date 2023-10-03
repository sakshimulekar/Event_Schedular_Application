import React, { useState } from 'react';
import {useDispatch} from "react-redux"
import { addEvent } from '../../redux/todoReducer/action';

const AddEvent = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc,setEventDesc] = useState("")
  const [eventStart, setEventStart] = useState(new Date().toISOString().substring(0, 16));
  const [eventEnd, setEventEnd] = useState(new Date().toISOString().substring(0, 16));
  const dispatch = useDispatch()
  const handleAddEvent = () => {
    // Create an event object with the input data
    const newEvent = {
      title: eventTitle,
      description:eventDesc,
      start: eventStart,
      end: eventEnd,
    };

    // Pass the new event to the parent component's callback function
    dispatch(addEvent(newEvent));

    // Clear the form fields
    setEventTitle('');
    setEventDesc("")
    setEventStart(new Date().toISOString().substring(0, 16));
    setEventEnd(new Date().toISOString().substring(0, 16));
  };

  return (
    <div>
      <h2>Add Event</h2>
      <form>
        <div>
          <label>Event Title:</label>
          <input
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Event Description:</label>
          <input
            type="text"
            value={eventDesc}
            onChange={(e) => setEventDesc(e.target.value)}
          />
        </div>
        <div>
          <label>Event Start:</label>
          <input
            type="datetime-local"
            value={eventStart}
            onChange={(e) => setEventStart(e.target.value)}
          />
        </div>
        <div>
          <label>Event End:</label>
          <input
            type="datetime-local"
            value={eventEnd}
            onChange={(e) => setEventEnd(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleAddEvent}>
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
