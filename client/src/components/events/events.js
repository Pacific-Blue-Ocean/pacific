import { Box, Button, Flex, Heading, Spacer, IconButton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Header } from '../header';
import EventList from './eventList';
import axios from 'axios';
import {HamburgerIcon, ChatIcon, MinusIcon} from '@chakra-ui/icons';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation } from 'react-router-dom';

const Events = () => {
  const [user, loading, error] = useAuthState(auth);
  let [events, setEvents] = useState([]);
  let [listStyle, setListStyle] = useState('block');
  let {state} = useLocation();
  let [title, setTitle] = useState('');
  useEffect(() => {
    if (state) {
      console.log('Passed in user_id: ', state.user_id);
      setTitle(`${state.name}'s Events`);
      getEventData(state.user_id);
    } else if (user) {
      console.log('No user_id passed in, defaulting to logged in user: ', user.email);
      setTitle('My Events');
      getEventData(user.email);
    } else {
      console.log('no data');
    }

  },[state, user])

  const getEventData = (user_id) => {
    axios.get(`/api/events/user/${user_id}`)
    .then((response) => {
      setEvents(response.data);
    })
    .catch((err) => {console.log(err)});
  }

  return (
  <Box>
    <Header />
    <Box p={4} m={4}>
    <Flex>
    <Heading size='lg' mb={4} fontSize='5vh'>{title}</Heading>
    <Spacer />
    <Box>
      <IconButton onClick={() => {setListStyle('list')}} variant='outline' icon={<HamburgerIcon />} mr={3}></IconButton>
      {/* <IconButton onClick={() => {setListStyle('map')}} variant='outline' icon={<MinusIcon />} mr={3}></IconButton> */}
      <IconButton onClick={() => {setListStyle('block')}} variant='outline' icon={<ChatIcon />}></IconButton>
    </Box>
    </Flex>
    <EventList events={events} listStyle={listStyle} />
    </Box>
  </Box>
  )
}

export default Events;