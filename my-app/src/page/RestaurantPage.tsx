// my-app/src/components/RestaurantPage.tsx
import { useEffect } from 'react';
import { Restaurant } from '../models/Restaurant';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRestaurants } from '../redux/features/restaurantsSlice';
import { Button } from '../components';
import { grid } from '../assets'
import { Camera } from 'lucide-react';

const TableHeaders = ({className}:any) => {
  return (
    <thead>
      <tr>
        <th className={className}>ID</th>
        <th className={className}>NAME</th>
        <th className={className}>ADDRESS</th>
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
      <div className='font-Roboto font-extralight text-4xl justify-center items-center mt-15 mb-15'>RESTAURANTS</div>
      <div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">
        <img
          className="absolute top-0 left-0 w-full"
          src={grid}
          width={550}
          height={550}
          alt="Grid"
        />
        <table className='table-auto border-separate border-spacing-x-15 font-Roboto font-extralight text-2xl'>
            <TableHeaders className='font-extralight border-b-2'/>
            <tbody>
              {restaurants.map((restaurant:Restaurant) => (
                <TableRowComponent restaurant={restaurant} />
              ))}
            </tbody>
        </table>
      </div>
      <div className='mt-10 font-Roboto font-extralight text-2xl'>
        <Button className="hidden lg:flex font-Roboto font-extralight text-2xl m-5" href="/">
          <div><Camera className="inline-flex"/><span className="px-5"/>BACK TO HOME</div>
        </Button>
      </div>
    </div>
  );
};

export default RestaurantPage;