import { getRestaurant, getRestaurants, createRestaurant, updateRestaurant, deleteRestaurant } from './restaurantApi';
import { getWorkers, getWorker, createWorker, updateWorker, deleteWorker, getWorkersByRestaurantId } from './workerApi';
import { getIOTPortal } from './iotPortalApi';
import { loginApi } from './loginApi';
import { getAccessCode } from './auth'

export { getRestaurant, getRestaurants, createRestaurant, updateRestaurant, deleteRestaurant,
         getWorkers, getWorker, createWorker, updateWorker, deleteWorker, getWorkersByRestaurantId,
         getIOTPortal, getAccessCode,
         loginApi };