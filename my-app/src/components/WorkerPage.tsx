import React, { useState, useEffect } from 'react';
import { Worker } from '../models/Worker';
import { Link, useNavigate } from 'react-router-dom';

const WorkerPage = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/workers')
      .then((response) => response.json())
      .then((data) => setWorkers(data))
      .catch((error) => console.error(error));
  }, []);

  const handleBackToHome = () => {
      navigate('/');
  };

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
        <p>
            <button onClick={handleBackToHome}>Back to Home</button>
        </p> 
    </div>
  );
};

export default WorkerPage;