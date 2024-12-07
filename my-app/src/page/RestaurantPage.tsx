// my-app/src/components/RestaurantPage.tsx
import { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { grid } from '../assets'
import { Button, HeaderTitle } from '../components';
import { GetIcon, GetJWTToken, PageClasses, HeaderClasses, ButtonClasses, ButtonLINKClasses, PageContainClasses, GridClasses } from '../utils';

import { Restaurant } from '../models/Restaurant';
import { fetchRestaurants } from '../redux/features/restaurantsSlice';

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
    const token = GetJWTToken();
    if (!token) {
      navigate('/login', { replace: true, state: { error: 'Invalid or expired token' } });
    }
  },[])

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <div className={PageClasses}>
      <HeaderTitle Icon={GetIcon('restaurants')} className={HeaderClasses} title='RESTAURANTS'/>
      <div className={PageContainClasses} >
        <img
          className={GridClasses}
          src={grid}
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
      <div className=''>
        <Button Icon={GetIcon('home')} className={ButtonLINKClasses} to="/">BACK TO HOME</Button>
      </div>
    </div>
  );
};

export default RestaurantPage;