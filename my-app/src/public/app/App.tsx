import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../components/MainPage';
import RestaurantPage from '../../components/RestaurantPage';
import WorkerPage from '../../components/WorkerPage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './app.css';

const App = () => {
  return (
    <div>
      <Header />
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/restaurants" element={<RestaurantPage />} />
          <Route path="/workers" element={<WorkerPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;