import StaticApi from '../api/StaticApi';
import getDistance from 'geolib/es/getPreciseDistance';
import useStore from '../store/store';

const GetLocation = () => {
  const { data } = StaticApi();
  const coordinates = data?.venueCoordinates;

  // const totalDistanceInMeters = useRef<number | null>(null);
  // const [errorMessage, setErrorMessage] = useState('');

  const { setTotalDistanceInMeters, setErrorMessage,  } = useStore.getState();

  const userLocation = useStore((state) => state.userCoordinates);
    // console.log(userLocation, 'userCoordinate', userLocation?.latitude, userLocation?.longitude);

  const CalculateDistance = () => {
    // console.log("distance calculation");
    
    if (coordinates) {
      try {
        const venueCoordinate = { latitude: coordinates[1], longitude: coordinates[0] };

        // Replace `values` with actual user coordinates
        // const values = { userLatitude: 60.1699, userLongitude: 24.9384 }; // Example coordinates for Helsinki

        if (userLocation?.latitude && userLocation?.longitude) {
          const userCoordinate = { latitude: userLocation.latitude, longitude: userLocation.longitude };
          const distance = getDistance(venueCoordinate, userCoordinate);
          setTotalDistanceInMeters(distance);
          console.log(distance, 'total distance:');
          
          // totalDistanceInMeters.current = distance;
          setErrorMessage('');
          // console.log(totalDistanceInMeters.current, 'distance meter');
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
      {/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {totalDistanceInMeters.current !== null && (
        <p>Total Distance: {totalDistanceInMeters.current} meters</p>
      )} */}
    </div>
  );
};

export default GetLocation;
