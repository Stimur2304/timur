import React from 'react';
import { Route, Routes } from "react-router-dom";
import Weather from './pages/weather/weather'
import Homepage from './pages/homepage/homepage';
import Currence from './pages/Currence/currence'
import './App.css';

function App() {
 return (
  <div className="App" >
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/weather" element={<Weather />} />
      <Route exact path="/currence" element={<Currence />} />
    </Routes>
  </div>
 )
 };

export default App;
