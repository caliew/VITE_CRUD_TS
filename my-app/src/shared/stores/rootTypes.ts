import { CombinedState, Store, AnyAction as ReduxAnyAction, Reducer } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

import { store } from '@shared/stores';

/**
 * A generic type for representing any API status
 *  idle: API is not called yet
 *  pending: API has been called and response is pending
 *  success: API response is returned successfully
 *  error: API encounters error to return expected response
 * Use this to indicate the status of API call on the page, e.g. showing loading spinner/ skeleton for "pending"
 */

// export type IApiStatus = { [key in ApiStatus]: string };

export enum ApiStatus {
  idle,
  pending,
  succeeded,
  failed,
  add,
  update,
  partiallySucceeded,
}

/**
  * A generic type to make every object property nullable in Typescript
  * reference: https://typeofnan.dev/making-every-object-property-nullable-in-typescript/
  *
  * e.g.
  * type Person = {
   name: string;
   email: string;
   age: number;
   admin: boolean;
   dog: {
     name: string;
     age: number;
   };
 };

 * Now if we implement this on our new Person type, we can see that our object can be nullable all the way down.

 const nullablePerson: DeepNullable<Person> = {
   name: 'Daffodil',
   email: null,
   age: null,
   admin: true,
   dog: {
     name: 'Fido',
     age: null,
   },
 };

 This allows us not declaring NULL type for all the fields for the object
  */
export type DeepNullable<T> = {
  [K in keyof T]: DeepNullable<T[K]> | null;
};

/**
 * A generic item representing form data item.
 *
 * Used for easy rendering on the UI
 * "id" : used as key of component
 * "text" : UI-friendly name for this data item.
 */
export interface IterableElement {
  id: string | number;
  text: string;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
/**
 * The Redux store type
 */
export type RootStore = Store<CombinedState<RootState>, ReduxAnyAction>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface IAppPaths {
  [key: string]: IAppRoutingPath;
}

export interface IAppRoutingPath {
  path: string;
}

export interface BackendError {
  type: string;
  title: string;
  status: number;
  traceId: string;
}

export interface RejectedPayload {
  errorMsg: string | null;
  errorCode: string | null;
}

export interface CombineReducer {
  [key: string]: Reducer;
}
