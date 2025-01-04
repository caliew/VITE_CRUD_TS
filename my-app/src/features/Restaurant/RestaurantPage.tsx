// my-app/src/components/RestaurantPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useErrorHandler } from "react-error-boundary";

import { grid } from "@assets/index";
import { Button, HeaderTitle } from "@shared/components";
import { GetJWTToken } from "@utils/index";
import { GetIcon } from "@utils/icon";
import { PageClasses, PageHeaderClasses, ButtonLINKClasses, PageContainClasses, GridClasses } from "@shared/utils/classname";

import { Restaurant } from "./types/restaurant.types";
import { fetchRestaurants } from "@features/Restaurant/stores/restaurantSlice";

const TableHeaders = ({ className }: any) => {
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

const TableRowComponent = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <tr key={restaurant.id}>
      <td className="">{restaurant.id}</td>
      <td className="">{restaurant.name}</td>
      <td className="">{restaurant.address}</td>
    </tr>
  );
};

const RestaurantPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleError = useErrorHandler();

  const restaurants = useSelector(
    (state: any) => state.restaurants.restaurants
  );

  useEffect(() => {
    const token = GetJWTToken();
    if (!token) {
      navigate("/login", {
        replace: true,
        state: { error: "Invalid or expired token" },
      });
    }
  }, []);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <div className={PageClasses}>
      <HeaderTitle
        Icon={GetIcon("restaurants")}
        className={PageHeaderClasses}
        title="RESTAURANTS"
      />
      <div className={PageContainClasses}>
        <img className={GridClasses} src={grid} alt="Grid" />
        <table className="table-auto border-separate border-spacing-x-15 font-Roboto font-extralight text-2xl">
          <TableHeaders className="font-extralight border-b-2" />
          <tbody>
            {restaurants &&
              restaurants.map((restaurant: Restaurant) => (
                <TableRowComponent restaurant={restaurant} />
              ))}
          </tbody>
        </table>
      </div>
      <div className="mt-15 flex flex-wrap flex-col">
        <Button Icon={GetIcon("home")} className={ButtonLINKClasses} to="/">
          BACK TO HOME
        </Button>
        <Button
          Icon={GetIcon("404")}
          className={ButtonLINKClasses}
          onClick={() => {
            handleError(new Error("Simulated error"));
          }}
        >
          SIMULATE ERROR
        </Button>
      </div>
    </div>
  );
};

export default RestaurantPage;
