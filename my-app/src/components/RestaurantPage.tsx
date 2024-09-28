import React, { useState, useEffect } from 'react';
import { Restaurant } from './models/Restaurant';
import { Link, useNavigate } from 'react-router-dom';
import { getRestaurants } from '../utils/api/restaurants';

const RestaurantPage = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getRestaurants()
          .then((data) => setRestaurants(data))
          .catch((error) => console.error(error));
      }, []);

    const handleBackToHome = () => {
        navigate('/');
    };

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
            <p>
                <button onClick={handleBackToHome}>Back to Home</button>
            </p>
        </div>
    );
};

export default RestaurantPage;