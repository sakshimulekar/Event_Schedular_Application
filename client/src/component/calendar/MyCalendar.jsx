import React, { useEffect, useRef, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddEvent from './AddEvent';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent, editEventData, getEvent } from '../../redux/todoReducer/action';
import EditEvent from './EditEvent';
import { Box, Button, Center, Flex, Icon, Tooltip, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

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
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const events = useSelector((store) => store.todoReducer.events);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setisModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [isrender,setIsRender]=useState(false)

  useEffect(() => {
    dispatch(getEvent());
    
  }, [dispatch,isrender]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const onEditEvent = (event) => {
    console.log(event, '49');
    setSelectedEvent(event.event)
    setisModalOpen(true);
    
  };
  const onCloseEditModal = () => {
    setisModalOpen(false); // Close the edit modal
    // You may perform any additional actions needed when closing the modal here
  };
  

  const onDeleteEvent = (event) => {
    const id = event.event._id;
    dispatch(deleteEvent(id));
    //dispatch(getEvent());
    setIsRender(p=>!p)
  };

  const handleEditSave = (updateEvent) => {
    console.log(updateEvent,'65');
    dispatch(editEventData(updateEvent._id,updateEvent))
    
    setIsRender(p=>!p)
    // Close the modal after saving
  };

  return (
    <Box w={'80%'} m={'auto'} boxShadow={'lg'}>
      <Flex mr={10} justifyContent={'flex-end'}><AddEvent isrender={isrender} setIsRender={setIsRender}/></Flex>
      <Center>
        <Box w={'80%'} h={'120vh'}>
          <Calendar
            localizer={localizer}
            events={Array.isArray(events)
              ? events.map((event) => ({
                  ...event,
                  start: new Date(event.start),
                  end: new Date(event.end),
                }))
              : []}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleSelectEvent}
            style={{ margin: '20px' }}
            components={{
              event: (event) => (
                <Box>
                  <Flex justifyContent={'space-between'}>
                    <Box>
                      <strong>{event.title}</strong>
                      <div>{event.description}</div>
                    </Box>
                    <Box>
                      {/* Edit and Delete Buttons */}
                      <Button
                       
                        onClick={() => onEditEvent(event)}
                        // backgroundColor={'green'}
                        
                        backgroundColor={'transparent'}
                      >
                        <Icon as={EditIcon} />
                      </Button>
                      <Button
                        onClick={() => onDeleteEvent(event)}
                        // backgroundColor={'red'}
                        color={'red'}
                        backgroundColor={'transparent'}
                      >
                        <Icon as={DeleteIcon} />
                      </Button>
                    </Box>
                  </Flex>
                </Box>
              ),
            }}
          />
        </Box>
      </Center>

      {/* Edit Event Modal */}
      {isModalOpen && selectedEvent && (
        <EditEvent event={selectedEvent} onSave={handleEditSave} onClose={onCloseEditModal} />
      )}
    </Box>
  );
};

export default MyCalendar;
