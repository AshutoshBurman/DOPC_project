import StaticApi from '../api/StaticApi';
import getDistance from 'geolib/es/getPreciseDistance';
import useStore from '../store/store';

const GetLocation = () => {
  const { data } = StaticApi();
  const coordinates = data?.venueCoordinates;

  const { setTotalDistanceInMeters, setErrorMessage,  } = useStore.getState();

  const userLocation = useStore((state) => state.userCoordinates);

  const CalculateDistance = () => {
    
    if (coordinates) {
      try {
        const venueCoordinate = { latitude: coordinates[1], longitude: coordinates[0] };
        // console.log("venue",venueCoordinate, venueCoordinate.latitude, 'latitude', venueCoordinate.longitude, 'longitude');

        if (userLocation?.latitude && userLocation?.longitude) {
          const userCoordinate = { latitude: userLocation.latitude, longitude: userLocation.longitude };
          // console.log("latitude", userCoordinate.latitude,'logitude' ,userCoordinate.longitude);
          const distance = getDistance(venueCoordinate, userCoordinate);
          // console.log(distance, 'distance meter');
          setTotalDistanceInMeters(distance);

          console.log(distance, 'distance meter');
          
          
          setErrorMessage('');
          return true;
        } else {
          setErrorMessage('Please enter correct coordinates');
          return false;
        }
      } catch (error) {
        console.log('Error calculating distance', error);
        setErrorMessage('Error calculating distance');
        return false;
      }
    } else {
      console.log('Venue coordinates are not available.');
      setErrorMessage('Venue coordinates are not available.');
      return false;
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={CalculateDistance}
        className="bg-[hsla(198,100%,44%,0.9)] h-14 text-white max-w-36 w-32 font-sans p-2 font-medium text-[16px] rounded-lg hover:bg-[hsla(198,100%,44%,1)]"
      >
        Get location
      </button>
    </div>
  );
};

export default GetLocation;
