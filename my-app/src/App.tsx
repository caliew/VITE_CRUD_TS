import React, { useState, useEffect } from 'react';

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
  
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  useEffect(() => {
    console.log('useEffect hook is being called');
    fetch('http://localhost:3001/api/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error('Error:', error));
  }, []);
  useEffect(() => {
    fetch('http://localhost:3001/api/workers')
      .then(response => response.json())
      .then(data => setWorkers(data))
      .catch(error => console.error(error));
  }, []);

  const handleSelectRestaurant = (restaurant:any) => {
    setSelectedRestaurant(restaurant);
  };

  const handleSelectWorker = (worker:any) => {
    setSelectedWorker(worker);
  };

  const handleCreateRestaurant = () => {
    const newRestaurant = {
      name: 'New Restaurant',
      address: '123 Main St',
    };
    fetch('http://localhost:3001/api/restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRestaurant),
    })
      .then(response => response.json())
      .then(data => {
        setRestaurants([...restaurants, data]);
      })
      .catch(error => console.error(error));
  };

  const handleCreateWorker = () => {
    const newWorker = {
      name: 'New Worker',
      restaurantId: selectedRestaurant.id,
    };
    fetch('http://localhost:3001/api/workers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWorker),
    })
      .then(response => response.json())
      .then(data => {
        setWorkers([...workers, data]);
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Restaurants</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <span>{restaurant.name}</span>
            <button onClick={() => handleSelectRestaurant(restaurant)}>Select</button>
          </li>
        ))}
      </ul>
      <button onClick={handleCreateRestaurant}>Create Restaurant</button>

      <h1>Workers</h1>
      <ul>
        {workers.map((worker) => (
          <li key={worker.id}>
            <span>{worker.name}</span>
            <button onClick={() => handleSelectWorker(worker)}>Select</button>
          </li>
        ))}
      </ul>
      <button onClick={handleCreateWorker}>Create Worker</button>

      {selectedRestaurant && (
        <div>
          <h2>Selected Restaurant: {selectedRestaurant.name}</h2>
          <ul>
            {workers.filter((worker) => worker.restaurantId === selectedRestaurant.id).map((worker) => (
              <li key={worker.id}>
                <span>{worker.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;