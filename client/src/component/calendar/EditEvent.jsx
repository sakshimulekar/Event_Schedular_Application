// EditEvent.js
import React, { useState } from 'react';

const EditEvent = ({ event, onSave, onDelete, onClose }) => {
  const [editedEvent, setEditedEvent] = useState(event);

  const handleSave = () => {
    // Call the onSave function with the edited event
    onSave(editedEvent);
    onClose();
  };

  const handleDelete = () => {
    // Call the onDelete function with the event ID
    onDelete(event.id);
    onClose();
  };

  return (
    <div>
      <h2>Edit Event</h2>
      <label>Title:</label>
      <input
        type="text"
        value={editedEvent.title}
        onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
      />
      {/* Add input fields for other event properties (description, start, end) */}
      <button onClick={handleSave}>Save Changes</button>
      <button onClick={handleDelete}>Delete Event</button>
    </div>
  );
};

export default EditEvent;
