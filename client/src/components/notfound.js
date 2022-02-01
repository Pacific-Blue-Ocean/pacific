import { Box, Flex, Heading, Button, Spacer, extendTheme, ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Header } from './header';
import { Link } from 'react-router-dom';


const NotFound = () => {

  const theme = extendTheme({
    colors: {
      brand: {
        100: "#2E2F30",  //black {header}
        200: "#8DD8E0",  //blue {border color}
        300: "#E3444B",  //red  {buttons}
        400: "#EC7C71",  //orange {button border}
        500: "#FBFAFA",  //white {subheaders, text}
      },
    },
  })

  return (
  <Box>
    <Header />
    <Flex p={4} m={4} border='1px' borderRadius='10px' borderColor='#8F8F8F'>
      <Heading>You seem to be lost...</Heading>
      <Spacer />
      <Link to='/'><Button colorScheme='blue' size='lg'>Go Home</Button></Link>
    </Flex>
  </Box>
  )
}

export default NotFound;