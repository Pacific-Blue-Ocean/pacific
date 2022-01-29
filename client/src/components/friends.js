import { Box, Flex, Heading, Button, Input, Stack } from '@chakra-ui/react';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Header } from './header';
import Friend from './friends/friend.jsx';

const Friends = () => {
  const [id, setUserId] = useState(1);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios.get('/api/friends', { params: {id}} )
      .then((res) => { setFriends(res.data); })
  }, [id])

  return (
  <Box>
    <Header />
    <Flex p={4} m={4} flexDirection="column" border='1px' borderRadius='10px' borderColor='#8F8F8F'>

      <Heading>Friends</Heading>

      <Flex p={4} m={4} flexDirection="row">
        {friends.length ? friends.map((friend) => (
          <Friend
            key={friend.id}
            friend={friend}
          />
        )) : null}
      </Flex>
    </Flex>
  </Box>
  )
}

export default Friends;
