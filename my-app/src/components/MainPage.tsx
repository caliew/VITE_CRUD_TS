import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
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
};

export default MainPage;