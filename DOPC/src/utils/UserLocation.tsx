
import React from 'react';
import useStore from '../store/store';
import getDistance from 'geolib/es/getPreciseDistance';
import StaticApi from '../api/StaticApi';




interface UserLocationProps {
  setLongitude: (longitude: number) => void;
  setLatitude: (latitude: number) => void;
}

const UserLocation: React.FC<UserLocationProps> = ({
  setLongitude,
  setLatitude,

}) => {
  
  const { setErrorMessage, setTotalDistanceInMeters} = useStore.getState();
  const { data } = StaticApi();

  if (!data) {
    return null;
  }
  const coordinates = data.venueCoordinates;
  const venueCoordinate = { latitude: coordinates[1], longitude: coordinates[0] };


  const GetLocation = async () => {

      try {

        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const userCoordinate = { latitude: position.coords.latitude, longitude: position.coords.longitude };

        const distance = getDistance(venueCoordinate, userCoordinate);
        console.log(distance, 'distance meter');
        setTotalDistanceInMeters(distance);
        
      
        
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
   
      } catch (error) {
        if (!navigator.geolocation) {
          setErrorMessage(`please Allow location in your browser`);
        } else {
          setErrorMessage(`${error}`);
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
