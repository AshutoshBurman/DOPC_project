// import { number } from 'yup';
import {create} from 'zustand';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface StoreState {
  userCoordinates: Coordinates | null;
  venueCoordinates: Coordinates | null;
  totalDistanceInMeters: number | null;
  errorMessage: string | null;
//   totalPrice: number | null;
  cartValue: number | null;
  surCharge: number | null;
  deliveryFee: number | null;
  venueSlug: string | null;

  setTotalDistanceInMeters: (distance: number) => void;
  setErrorMessage: (message: string) => void;
  setUserCoordinates: (latitude: number, longitude: number) => void;
//   setTotalPrice: (price: number) => void;
  setCartValue: (value: number) => void;
  setSurCharge: (value: number) => void;
  setDeliveryFee: (value: number) => void;
//   resetAll: (values: number | string) => void;
  setVenueSlug: (value: string) => void;
}

const useStore = create<StoreState>((set) => ({
  userCoordinates: null,
  venueCoordinates: null,
  totalDistanceInMeters: null,
  errorMessage: null,
//   totalPrice: null,
  cartValue: null,
  surCharge: null,
  deliveryFee: null,
  venueSlug: null,

//   setTotalDistanceInMeters: null,
  

//   data: null,

  setUserCoordinates: (latitude: number, longitude: number) => 
    set({ userCoordinates: {latitude, longitude} }),

  setTotalDistanceInMeters: (distance: number) => 
    set(
        { totalDistanceInMeters: distance }
    ),


   setCartValue: (value: number) =>
    set({
      cartValue: value,
    }),
   setSurCharge: (value: number) =>
    set({
      surCharge: value,
    }),
    setDeliveryFee: (value: number) =>
        set({
      deliveryFee: value,
    }),

  // setTotalDistanceInMeters: (distance: number | null) =>

//   setTotalDistanceInMeters: (distance: number | null) =>


//   setUserCoordinates: (latitude: number, longitude: number) =>
//     set({
//       userCoordinates: { latitude, longitude },
//     }),

  setVenueCoordinates: (coordinates: Coordinates | null) =>
    set({
      venueCoordinates: coordinates,
    }),

//   setTotalDistance: (distance: number | null) =>
//     set({
//       totalDistanceInMeters: distance,
//     }),

  setErrorMessage: (message: string | null) =>
    set({
      errorMessage: message,
    }),

//   setTotalPrice: (price: number | null) =>
//     set({
//         totalPrice: price,
//     }),

 setVenueSlug: (value: string | null) =>
    set({
        venueSlug: value,
    }),

//   resetAll: () => 
//     set({
//         userCoordinates: null,
//         venueCoordinates: null,
//         totalDistanceInMeters: null,
//         errorMessage: null,
//         cartValue: null,
//         deliveryFee: null,
//         surCharge: null,
//         totalPrice: null,
//     }),
}));

export default useStore;
