import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent } from '../../redux/todoReducer/action';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';

const AddEvent = ({isrender,setIsRender}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventStart, setEventStart] = useState(
    new Date().toISOString().substring(0, 16)
  );
  const [eventEnd, setEventEnd] = useState(
    new Date().toISOString().substring(0, 16)
  );
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleAddEvent = () => {
    // Validate input fields
    if (!eventTitle || !eventDesc || !eventStart || !eventEnd) {
      setError('All fields are required');
      return;
    }

    const currentDateTime = new Date().toISOString().substring(0, 16);

    if (eventStart < currentDateTime) {
      setError('Event start time cannot be in the past');
      return;
    }

    if (eventEnd <= eventStart) {
      setError('Event end time should be after event start time');
      return;
    }

    // Create an event object with the input data
    const newEvent = {
      title: eventTitle,
      description: eventDesc,
      start: eventStart,
      end: eventEnd,
    };

    // Pass the new event to the parent component's callback function
    dispatch(addEvent(newEvent));
    setIsRender(p=>!p)
    // Clear the form fields and error message
    setEventTitle('');
    setEventDesc('');
    setEventStart(currentDateTime);
    setEventEnd(currentDateTime);
    setError('');

    // Close the modal
    onClose();
    
  };

  return (
    <>
      <Button backgroundColor={"#FF0080"} color={'white'} onClick={onOpen}>
        Add Event
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Event</ModalHeader>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Event Title:</FormLabel>
                <Input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Event Description:</FormLabel>
                <Input
                  type="text"
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Event Start:</FormLabel>
                <Input
                  type="datetime-local"
                  value={eventStart}
                  onChange={(e) => setEventStart(e.target.value)}
                  min={new Date().toISOString().substring(0, 16)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Event End:</FormLabel>
                <Input
                  type="datetime-local"
                  value={eventEnd}
                  onChange={(e) => setEventEnd(e.target.value)}
                  min={eventStart}
                />
              </FormControl>
              {error && <Box color="red">{error}</Box>}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleAddEvent}>
              Save Changes
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEvent;
