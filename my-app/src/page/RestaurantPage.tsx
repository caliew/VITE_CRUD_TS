// my-app/src/components/RestaurantPage.tsx
import { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { grid } from '../assets'
import { Restaurant } from '../models/Restaurant';
import { fetchRestaurants } from '../redux/features/restaurantsSlice';
import { Button, HeaderTitle } from '../components';
import { GetIcon, GetToken } from '../utils';

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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const restaurants = useSelector((state: any) => state.restaurants.restaurants);

  useEffect(()=>{
    const token = GetToken();
    if (!token) {
      navigate('/login', { replace: true, state: { error: 'Invalid or expired token' } });
    }
  },[])

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <div className='mt-15 font-Roboto flex flex-col items-center justify-center'>
      <HeaderTitle Icon={GetIcon('restaurants')} className="inline-flex size-24" title='RESTAURANTS'/>
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
              {restaurants && restaurants.map((restaurant:Restaurant) => (
                <TableRowComponent restaurant={restaurant} />
              ))}
            </tbody>
        </table>
      </div>
      <div className='mt-10 font-Roboto font-extralight text-2xl'>
        <Button Icon={GetIcon('home')} className="hidden lg:flex font-Roboto font-extralight text-2xl m-5" href="/">BACK TO HOME</Button>
      </div>
    </div>
  );
};

export default RestaurantPage;