import {
  Box, Flex, Heading, Button, Input,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from './header';
import Friend from './friends/friend.jsx';

function Friends() {
  const [id, setUserId] = useState(1);
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [event_id, setEventId] = useState(5);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios.get('/api/friends', { params: { id } })
      .then((res) => {
        setFriends(res.data);
        setFilteredFriends(res.data);
      });
  }, [id]);

  useEffect(() => {
    let filteredFriends = friends.filter(friend => {
      const friendName = friend.full_name.toLowerCase();
      return friendName.includes(searchText.toLowerCase());
    });

    setFilteredFriends(filteredFriends);
  }, [searchText])

  const handleChange = (e) => { setSearchText(e.target.value); }

  return (
    <Box>
      <Header />
      <Flex p={4} m={4} flexDirection="column" border="1px" borderRadius="10px" borderColor="#8F8F8F">

        <Heading>Friends</Heading>
        <Flex p={4} m={8} flexDirection="row">
          <Input type="text" placeholder="Search for a user" value={searchText} onChange={handleChange} />
        </Flex>
        <Flex p={4} m={4} flexDirection="row" flexWrap="wrap">
          {filteredFriends.length ? filteredFriends.map((friend) => (
            <Friend
              key={friend.id}
              user_id={id}
              friend={friend}
              event_id={event_id}
            />
          )) : <span>No friends found</span>}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Friends;
