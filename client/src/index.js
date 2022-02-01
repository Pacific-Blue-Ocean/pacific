import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { render } from 'react-dom';

import App from './components/App.jsx';
import Friends from './components/friends.jsx';
import Events from './components/events/events.js';
import Interests from './components/interests';
import NotFound from './components/notfound';

import { Register } from './components/register.jsx';
import Preferences from './components/preferences/Preferences.jsx';
import EventDetail from './components/eventDetail';

render(
  <BrowserRouter>
  <ChakraProvider>
  <Routes>
      <Route path="/" element={<App />} />
      <Route path="friends" element={<Friends />} />
      <Route path="events" element={<Events />} />
      <Route path="/events/:eventId" element={<EventDetail />} />
      <Route path="interests" element={<Interests />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="preferences" element={<Preferences userId={1} />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </ChakraProvider>
  </BrowserRouter>
  , document.getElementById('app'));
