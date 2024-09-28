import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

interface Restaurant {
  id: number;
  name: string;
  address: string;
}

interface Worker {
  id: number;
  name: string;
  restaurantId: number;
}

function App() {
  // ... (rest of your code remains the same)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/restaurants" element={<RestaurantPage />} />
        <Route path="/workers" element={<WorkerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function MainPage() {
  return (
    <div>
      <h1>Main Page</h1>
      <p>Welcome to our application!</p>
      <ul>
        <li>
          <Link to="/restaurants">Restaurants</Link>
        </li>
        <li>
          <Link to="/workers">Workers</Link>
        </li>
      </ul>
    </div>
  );
}

function RestaurantPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/restaurants')
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Restaurants</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <h2>{restaurant.name}</h2>
            <p>{restaurant.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WorkerPage() {
  const [workers, setWorkers] = useState<Worker[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/workers')
      .then((response) => response.json())
      .then((data) => setWorkers(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Workers</h1>
      <ul>
        {workers.map((worker) => (
          <li key={worker.id}>
            <h2>{worker.name}</h2>
            <p>Working at {worker.restaurantId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;