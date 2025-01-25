// import useStore from '../store/store';
// import DynamicApi from '../api/DynamicApi';

// interface DistanceRange {
//     min: number;
//     max: number;
//     a: number;
//     b: number;
// }

// interface CalculatePriceResult {
//     success: boolean;
//     errorMessage?: string;
// }


// const { data: dynamicData } = DynamicApi();
// const { noSurCharge, basePrice, distanceRange }: { noSurCharge: boolean, basePrice: number, distanceRange: DistanceRange[] } = dynamicData || { noSurCharge: false, basePrice: 0, distanceRange: [] };


// const { setUserCoordinates, setErrorMessage, setDeliveryFee} = useStore.getState();

// const totalDistanceInMeters = useStore((state) => state.totalDistanceInMeters);
// const errorMessage = useStore((state) => state.errorMessage);
// const deliveryFee = useStore((state) => state.deliveryFee)



// export const calculatePrice = (totalDistanceInMeters: number | null, errorMessage: string, distanceRange: DistanceRange[], deliveryFee: (fee: number) => void): Promise<CalculatePriceResult> => {
   

//     if (errorMessage !== "") {

//         console.log(errorMessage, 'errorMessage in the calculatePrice');
//         return Promise.resolve({ success: false, errorMessage });
//     }

//     const range: DistanceRange | undefined = distanceRange.find((range: DistanceRange) => 
//         totalDistanceInMeters !== null && totalDistanceInMeters >= range.min && (range.max === 0 || totalDistanceInMeters < range.max)
//     );

    

//     if (range && range.max !== 0) {
//         if (totalDistanceInMeters !== null) {
//             setDeliveryFee (
//                 (Math.round(totalDistanceInMeters * range.b / 10) + basePrice + range.a) / 100
//             );
//         }
        
//         setErrorMessage('');
//         return Promise.resolve({ success: true });
//     } else {
//         setErrorMessage('Delivery is not available at this location'); 
//         return Promise.resolve({ success: false, errorMessage: 'Delivery is not available at this location' });
//     }
// };

// // export default calculatePrice;



import useStore from '../store/store';
import DynamicApi from '../api/DynamicApi';

interface DistanceRange {
  min: number;
  max: number;
  a: number;
  b: number;
}

// interface CalculatePriceResult {
//   success: boolean;
//   errorMessage?: string;
// }

// Fetch data from DynamicApi
// const { data: dynamicData } = DynamicApi();
// const { basePrice, distanceRange }: { 
// //   noSurCharge: boolean, 
//   basePrice: number, 
//   distanceRange: DistanceRange[] 
// } = dynamicData || { noSurCharge: false, basePrice: 0, distanceRange: [] };

// Access store methods and state
const { setErrorMessage, setDeliveryFee } = useStore.getState();


const getdata = () => {
    
    const { data: dynamicData } = DynamicApi();
    const { noSurCharge, basePrice, distanceRange } = dynamicData || {};
    return [noSurCharge, basePrice, distanceRange];
}

// const useTotalDistance = () => {
//   return useStore((state) => state.totalDistanceInMeters);
// };

// const errorMessage = useStore((state) => state.errorMessage);
// const deliveryFee = useStore((state) => state.deliveryFee);
// const totalDistanceInMeters = useStore((state) => state.totalDistanceInMeters);
// console.log(totalDistanceInMeters, 'totalDistanceInMeters in the calculatePrice');
const useCalculatePrice = (totalDistanceInMeters:number 
) => {

    const [noSurCharge, basePrice, distanceRange] = getdata();
console.log(noSurCharge, basePrice, distanceRange);
    
    // const totalDistanceInMeters = useStore((state) => state.totalDistanceInMeters);

//   if (errorMessage !== "") {
//     console.log(errorMessage, 'errorMessage in the calculatePrice');
//     // return { success: false, errorMessage };
//   }

    // const { data: dynamicData } = DynamicApi();
    // const { basePrice, distanceRange }: { 
    // //   noSurCharge: boolean, 
    // basePrice: number, 
    // distanceRange: DistanceRange[] 
    // } = dynamicData || { noSurCharge: false, basePrice: 0, distanceRange: [] };
    
    

    console.log(totalDistanceInMeters, 'totalDistanceInMeters in the calculatePrice');
    

  const range: DistanceRange | undefined = distanceRange.find((range: DistanceRange) =>
    totalDistanceInMeters !== null && totalDistanceInMeters >= range.min && 
    (range.max === 0 || totalDistanceInMeters < range.max)
  );

  

  if (range && range.max !== 0) {
    if (totalDistanceInMeters !== null) {
      setDeliveryFee(
        (Math.round(totalDistanceInMeters * range.b / 10) + basePrice + range.a) / 100
      );
    }

    console.log(range, 'range in the calculatePrice');


    setErrorMessage('');
    // return { success: true };
  } else {
    setErrorMessage('Delivery is not available at this location'); 
    // return { success: false, errorMessage: 'Delivery is not available at this location' };
  }
};

// Export the calculatePrice function as default
export default useCalculatePrice;