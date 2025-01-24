// getUserCoordinates.js
import useStore from '../store/Store';

const useUserCoordinates = () => {
  const userCoordinates = useStore((state) => state.userCoordinates);
  console.log(userCoordinates); // This will log the coordinates set earlier
  const distance = useStore((state) => state.totalDistanceInMeters);
  console.log(distance); // This will log the coordinates set
  
};


// useUserCoordinates()

export default useUserCoordinates;
