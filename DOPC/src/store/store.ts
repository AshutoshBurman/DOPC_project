// import { number } from 'yup';
import {create} from 'zustand';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface StoreState {
  userCoordinates: Coordinates | null;
  totalDistanceInMeters: number | null;
  errorMessage: string | null;
  userLatitude: number | null;
  userLogitude: number | null;



  setTotalDistanceInMeters: (distance: number) => void;
  setErrorMessage: (message: string) => void;
  setUserCoordinates: (latitude: number, longitude: number) => void;
  setUserLatitude: (userLatitude: number) => void;
  setUserLongitude: (userLogitude: number) => void;

}

const useStore = create<StoreState>((set) => ({
  userCoordinates: null,
  totalDistanceInMeters: null,
  errorMessage: null,
  userLatitude: null,
  userLogitude: null,

  setUserCoordinates: (latitude: number, longitude: number) => 
    set(
        { userCoordinates: {latitude, longitude} }
    ),
  setTotalDistanceInMeters: (distance: number) => 
    set(
        { totalDistanceInMeters: distance }
    ),
  setErrorMessage: (message: string | null) =>
    set({
      errorMessage: message,
    }),
  setUserLatitude: (userLatitude: number) => 
    set({
        userLatitude: userLatitude,
    }),

    setUserLongitude: (userLogitude: number) =>
        set({
            userLogitude: userLogitude,
        })
}));

export default useStore;
