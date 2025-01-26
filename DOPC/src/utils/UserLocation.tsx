
import React from 'react';
import useStore from '../store/store';
import getDistance from 'geolib/es/getPreciseDistance';
import StaticApi from '../api/StaticApi';



interface Location {
  latitude: number;
  longitude: number;
}

// interface LocationContextValue {
//   location: Location;
//   GetLocation: () => Promise<void>;
// }

// const LocationContext = createContext<LocationContextValue>({
//   location: { latitude: 0, longitude: 0 },
//   GetLocation: async () => {},
// });

// interface LocationProviderProps {
//   children: ReactNode;
// }


const UserLocation = ({
  setLongitude,
  setLatitude,

}) => {
  
  const { setUserLongitude, setUserLatitude,setErrorMessage, setTotalDistanceInMeters} = useStore.getState();
  const { data } = StaticApi();

  if (!data) {
    return null;
  }
  const coordinates = data.venueCoordinates;
  const venueCoordinate = { latitude: coordinates[1], longitude: coordinates[0] };



  
  // const [location, setLocation] = useState<Location>({ latitude: 0, longitude: 0 });


  const GetLocation = async () => {

      try {

        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const userCoodinate = { latitude: position.coords.latitude, longitude: position.coords.longitude };
        // setLocation({
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        // });
        console.log(location);

        // const venueCoordinate = { latitude: coordinates[1], longitude: coordinates[0] };


        const distance = getDistance(venueCoordinate, userCoodinate);
        setTotalDistanceInMeters(distance);
        console.log(distance);
        

        
        setUserLatitude(position.coords.latitude);
        setUserLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      } catch (error) {
        if (error instanceof GeolocationPositionError) {
          console.error(`Geolocation error: ${error.message}`);
        } else {
          console.error("An unexpected error occurred.");
        }
      }
  
  };

  return (  
    <div>
      <button
        type="button"
        onClick={GetLocation}
        className="bg-[hsla(198,100%,44%,0.9)] h-14 text-white max-w-36 w-32 font-sans p-2 font-medium text-[16px] rounded-lg hover:bg-[hsla(198,100%,44%,1)]"
      >
        Get location
      </button>
    </div>
  );
};

export default UserLocation;
