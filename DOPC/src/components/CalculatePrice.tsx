// // import {useEffect} from 'react'
// // import DynamicApi from '../api/DynamicApi'
// // import useStore from '../store/store';


// // const calculatePrice = () => {

// //     interface DistanceRange {
// //         min: number;
// //         max: number;
// //         a: number;
// //         b: number;
// //     }

// //     // const range: DistanceRange | undefined = distanceRange.find((range: DistanceRange) => 
// //     //     totalDistanceInMeters.current !== null && totalDistanceInMeters.current >= range.min && (range.max === 0 || totalDistanceInMeters.current < range.max)
// //     // );

// //     const { data: dynamicData } = DynamicApi();
// //     const { noSurCharge, basePrice, distanceRange } = dynamicData || {};
  
// //     const { setSurCharge, setErrorMessage, setDeliveryFee  } = useStore.getState();

// //     const totalDistanceInMeters = useStore((state) => state.totalDistanceInMeters);
// //     console.log(totalDistanceInMeters); 

// //     const cartValue = useStore((state) => state.cartValue);
// //     console.log(cartValue);
    

// //     useEffect(() => {
// //         let surcharge = 0;

// //         if (cartValue !== null && cartValue.toString().includes(",")) {
// //             // Code to execute if userLatitude contains a comma
// //             console.log("Contain comma not allowed");
// //             return setErrorMessage("Please use dot; comma is not allowed");
// //           }
        
// //         if (cartValue !== null && cartValue < noSurCharge ) {
// //             const cartValueNumeric = cartValue;
            
// //             surcharge = (noSurCharge - (cartValueNumeric * 100));            
// //             surcharge = surcharge < 0 ? 0 : surcharge;            
// //             surcharge = surcharge / 100;            
// //         }
// //         else {
// //             surcharge = 0;
// //         }
    
        
// //         setSurCharge(surcharge);
// //     }, [cartValue, noSurCharge, setErrorMessage, setSurCharge]);



// //     // const Calculate = () => {
        
// //         const range: DistanceRange | undefined = distanceRange.find((range: DistanceRange) => 
// //             totalDistanceInMeters !== null && totalDistanceInMeters >= range.min && (range.max === 0 || totalDistanceInMeters < range.max)
// //         );
// //         console.log('number');
// //         console.log(range);
    
// //         if (range && range.max !== 0){
// //             if (totalDistanceInMeters !== null) {
// //                 setDeliveryFee(
// //                     (Math.round(totalDistanceInMeters * range.b / 10) + basePrice + range.a) / 100
// //                 );
// //             }
// //             console.log(setDeliveryFee,'fee log in calculation price');
    
            
// //             console.log(totalDistanceInMeters, 'total distance adlsjfkansdfsdfasd');
// //             setErrorMessage('')
// //             return true
// //         }  
// //         else {
// //             console.log('   is not available');
// //             setErrorMessage('Delivery is not available at this location');
// //             return false;
// //         }
// //         // return Calculate
// //     // }


    


// // //   return Calculate
// // //     <div>
// // //     <button type='button' 
// // //         onClick={CalculatePrice}
// // //         className='bg-[hsla(198,100%,44%,0.9)] h-14 text-white max-w-52 w-full p-2 text-[16px] font-sans font-medium rounded-lg hover:bg-[hsla(198,100%,44%,1)]'>Calculate delivery price</button>
                
// // //     </div>
// // //   )
// // }

// // export default calculatePrice;

// import { useEffect } from 'react';
// import DynamicApi from '../api/DynamicApi';
// import useStore from '../store/store';

// const useCalculatePrice = () => {
//     interface DistanceRange {
//         min: number;
//         max: number;
//         a: number;
//         b: number;
//     }
//     const { data: dynamicData } = DynamicApi();
//     const { noSurCharge, basePrice, distanceRange } = dynamicData || {};

//     const { setSurCharge, setErrorMessage, setDeliveryFee } = useStore.getState();

//     const totalDistanceInMeters = useStore((state) => state.totalDistanceInMeters);
//     const cartValue = useStore((state) => state.cartValue);

//     useEffect(() => {
//         let surcharge = 0;

//         if (cartValue !== null && cartValue.toString().includes(",")) {
//             setErrorMessage("Please use dot; comma is not allowed");
//             return;
//         }

//         if (cartValue !== null && cartValue < noSurCharge) {
//             const cartValueNumeric = cartValue;
//             surcharge = (noSurCharge - (cartValueNumeric * 100));
//             surcharge = surcharge < 0 ? 0 : surcharge;
//             surcharge = surcharge / 100;
//         } else {
//             surcharge = 0;
//         }

//         setSurCharge(surcharge);
//     }, [cartValue, noSurCharge, setErrorMessage, setSurCharge]);

//     // useEffect(() =>
//     if (distanceRange !== undefined) {
//         const range = distanceRange.find((range: DistanceRange) =>
//             totalDistanceInMeters !== null && totalDistanceInMeters >= range.min && (range.max === 0 || totalDistanceInMeters < range.max)
//         );
    
//         if (range && range.max !== 0) {
//             if (totalDistanceInMeters !== null) {
//                 setDeliveryFee(
//                     (Math.round(totalDistanceInMeters * range.b / 10) + basePrice + range.a) / 100
//                 );
//             }
//             setErrorMessage('');
//         } else {
//             setErrorMessage('Delivery is not available at this location');
//         }
//         return true
//     }

        
//         return true;
//     // }, [totalDistanceInMeters, distanceRange, basePrice, setDeliveryFee, setErrorMessage]);
// };

// export default useCalculatePrice;
