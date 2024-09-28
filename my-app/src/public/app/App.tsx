import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../components/MainPage';
import RestaurantPage from '../../components/RestaurantPage';
import WorkerPage from '../../components/WorkerPage';
import './app.css';

const App = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/restaurants" element={<RestaurantPage />} />
        <Route path="/workers" element={<WorkerPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;