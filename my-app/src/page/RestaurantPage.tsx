// my-app/src/components/RestaurantPage.tsx
import { useEffect } from 'react';
import { Restaurant } from '../models/Restaurant';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRestaurants } from '../redux/features/restaurantsSlice';
import { Button } from '../components';

const TableHeaders = () => {
  return (
    <thead className=''>
      <tr>
        <td>ID</td>
        <td>NAME</td>
        <td>ADDRESS</td>
      </tr>
    </thead>
  );
};

const TableRowComponent = ({restaurant}:{restaurant: Restaurant}) => {
  return (
    <tr key={restaurant.id}>
      <td className='' >{restaurant.id}</td>
      <td className=''>{restaurant.name}</td>
      <td className=''>{restaurant.address}</td>
    </tr>
  );
};

const RestaurantPage = () => {

  const dispatch = useDispatch();
  const restaurants = useSelector((state: any) => state.restaurants.restaurants);

  useEffect(() => {
    console.log('Fetching Restaurants...')
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <div className='mt-5 font-Roboto flex flex-col items-center justify-center'>
      <div className='font-Roboto font-extralight text-5xl justify-center items-center mt-15 mb-15'>RESTAURANTS</div>
      <table className='border-separate border-spacing-x-15 table-auto font-Roboto font-extralight text-2xl'>
          <TableHeaders />
          <tbody>
            {restaurants.map((restaurant:Restaurant) => (
              <TableRowComponent restaurant={restaurant} />
            ))}
          </tbody>
      </table>
      <div className='mt-10 font-Roboto font-extralight text-2xl'>
        <Button className="hidden lg:flex font-Roboto font-extralight text-2xl m-5" href="/">BACK TO HOME</Button>
      </div>
    </div>
  );
};

export default RestaurantPage;