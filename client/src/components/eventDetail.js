import {
  Box,
  Stack,
  HStack,
  VStack,
  Flex,
  Heading,
  Image,
  Text,
  Button,
  Icon,
  Spacer,
  extendTheme,
  ChakraProvider,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Header } from "./header";
import Map from "./map";
import { MdAddBox, MdOutlineGroupAdd } from "react-icons/md";
import moment from "moment";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const EventDetail = ({ userId }) => {
  const [user, loading, error] = useAuthState(auth);
  const params = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState([]);
  const [reserved, isReserved] = useState(false);
  const address = `${event.address_line_1} ${event.address_state} ${event.address_zip}`;

  useEffect(() => {
    if (params.eventId) {
      axios.get(`/api/events/${params.eventId}`).then((res) => {
        if (res.data[0]) {
          setEvent(res.data[0]);
        } else {
          navigate("/events", { event_id: params.eventId });
        }
      });
    }
  }, []);

  const ReserveEvent = (e) => {
    e.preventDefault();
    if (user) {
      axios.post('/api/events/users', { user_id: user.email, event_id: params.eventId });
      isReserved(true);
    }
  };

  return (
    <Box>
      <Header />
      <Flex flexDirection="column" margin="0">
        <Flex
          flexDirection="row"
          w="100%"
          justifyContent="space-around"
          marginTop="5vw"
          marginLeft="5vw"
        >
          <Image
            bg="tomato"
            w="50%"
            h="30vw"
            objectFit="cover"
            borderRadius='5%'
            align="center"
            src={event.mainphoto}
            alt="event image"
          />
          <Flex flexDirection="column" w="40%" justifyContent="space-evenly">
            <Flex flexDirection="column">
              <Heading fontSize="3vw">{event.title}</Heading>
              <Box fontSize="1.5vw">
                <Text fontWeight="bold" display="inline-block">
                  Price:{" "}
                </Text>
                {event.price ? ` $${event.price}` : " Free"}
              </Box>
              <Box fontSize="1.5vw">
                <Text fontWeight="bold" display="inline-block">
                  Time:{" "}
                </Text>
                  {` ${moment(event.date).format("MMMM Do YYYY")}, ${event.start_time}`}
              </Box>
              <Box fontSize="1.5vw">
                <Text fontWeight="bold" display="inline-block">
                  {`Duration: `}
                </Text>
                {event.event_length_minutes ? ` ${event.event_length_minutes} min` : " TBA"}
              </Box>
              <Box fontSize="1.5vw">
                <Text fontWeight="bold" display="inline-block">
                  Type:{" "}
                </Text>
                {event.digital ? " Digital" : " In Person"}
              </Box>
            </Flex>
            <Flex flexDirection="row" w="40%" justifyContent="space-between">
                {!reserved ? (
                  <Button
                  backgroundColor="brand.400"
                  color="brand.500"
                  size="lg"
                  fontSize="1vw"
                  textStyle="button"
                  _hover={{
                    background: "white",
                    color: "brand.400",
                  }}
                  fontWeight="bold"
                  variant="solid"
                  w="100%"
                  onClick={(e) => {
                    ReserveEvent(e);
                  }}
                  >
                    {" "}
                    RSVP Now <Icon as={MdAddBox} w={6} h={6} pl="2px" />
                  </Button>
                ) : (
                  <Button
                  backgroundColor="brand.400"
                  color="brand.500"
                  size="lg"
                  fontSize="1vw"
                  textStyle="button"
                  _hover={{
                    background: "white",
                    color: "brand.400",
                  }}
                  fontWeight="bold"
                  variant="solid"
                  >
                    {" "}
                    Thank You!
                  </Button>
                )}
                <Button
                  backgroundColor="brand.400"
                  color="brand.500"
                  size="lg"
                  fontSize="1vw"
                  textStyle="button"
                  _hover={{
                    background: "white",
                    color: "brand.400",
                  }}
                  fontWeight="bold"
                  variant="solid"
                  onClick={() => {
                    navigate("/friends", {
                      state: { event_id: event.id },
                    });
                  }}
                  >
                  Add Friends{" "}
                  <Icon as={MdOutlineGroupAdd} w={6} h={6} pl="2px" />
                </Button>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          flexDirection="row"
          w="100%"
          h="45vw"
          justifyContent="space-around"
          marginTop="5vw"
          marginLeft="5vw"
          marginRight="5vw"
        >
          <Flex flexDirection="column" w="45%" alignContent="flex-start" marginLeft="2.5vw" marginTop="1.5vw">
            <Heading size="lg" fontSize="1.5vw">Detail:</Heading>
            <Text fontSize="1.5vw" marginBottom="3vw">
              {event.details}
            </Text>
            <Heading size="lg" fontSize="1.5vw"> About this event:</Heading>
            <Text fontSize="1.5vw">
              {event.description}
            </Text>
          </Flex>
          {address !== "null null null" ? (
            <Flex flexDirection="column" w="40%" h="45vw" justifyContent="space-evenly" marginRight="5vw">
              <Heading size="lg" fontSize="1.5vw">Location:</Heading>
              <Text fontSize="1.5vw" marginBottom="1vw">
                {address}
              </Text>
              <Map address={address} />
            </Flex>
          ) : (
            <Flex flexDirection="column" w="40%" h="45vw" justifyContent="space-evenly" marginRight="5vw">
              <Heading size="lg" fontSize="1.5vw">Location:</Heading>
              <Text fontSize="1.5vw">
                Online Only
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default EventDetail;
