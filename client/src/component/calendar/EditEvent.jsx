import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from '@chakra-ui/react';

const EditEvent = ({ event, onSave, onClose }) => {
  const [editedEvent, setEditedEvent] = useState(event || {});

  // Ensure that the component updates when the event prop changes
  useEffect(() => {
    setEditedEvent(event || {});
  }, [event]);

  const handleSave = () => {
    console.log(editedEvent,'23')
    onSave(editedEvent);
    onClose();
  };

  return (
    <div>
      <Modal isOpen={true} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <label>Title:</label>
            <Input
              type="text"
              value={editedEvent.title}
              onChange={(e) =>
                setEditedEvent({ ...editedEvent, title: e.target.value })
              }
            />
            {/* Add input fields for other event properties (description, start, end) */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={()=>handleSave()}>
              Save Changes
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditEvent;
