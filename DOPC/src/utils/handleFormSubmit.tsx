// // const handleFormSubmit = async () => { 
// //         await CalculatePrice();

// //         const submit = () => {

// //             if (cartValue !== null && surCharge !== null && totalDistanceInMeters !== null && deliveryFee !== null && venueSlug.current !== null) {
    
// //                 if (deliveryFee !== null) {
// //                     setShowDeliveryFee(deliveryFee);
// //                     console.log(deliveryFee, 'check del fee');
// //                 }
    
// //                 setShowDeliveryDistance(totalDistanceInMeters ?? 0);
// //                 setShowSurcharge(surCharge ?? 0);
// //                 console.log(deliveryFee, 'surcharge');
    
// //                 setShowCartValue(cartValue);
// //                 setTotalPrice((cartValue ?? 0) + (deliveryFee ?? 0) + (surCharge ?? 0));        
    
// //                 setErrorMessage('');
// //                 // setCartValue(null);
// //                 // surCharge(null);
// //                 // totalDistanceInMeters = null;
// //                 // deliveryFee = null;
// //                 // venueSlug = null;
// //                 resetForm();
    
// //             }
// //             else if (cartValue === null || venueSlug === null){
// //                 setErrorMessage('Please fill in all required fields');   
// //                 console.log('Form not valid');
// //                 setShowCartValue(0);
// //                 setShowDeliveryFee(0);
// //                 setShowDeliveryDistance(0);
// //                 setShowSurcharge(0);
// //                 setTotalPrice(0);
// //             }
// //             else if (totalDistanceInMeters === null){
// //                 setErrorMessage('Please Press the "Get location" button first');
// //                 return errorMessage;
// //             }
    
// //             else {
// //                 setShowCartValue(0);
// //                 setShowDeliveryFee(0);
// //                 setShowDeliveryDistance(0);
// //                 setShowSurcharge(0);
// //                 setTotalPrice(0);
// //                 return errorMessage;
// //             }
// //         }

// //         // else if (cartValue.current === null){
// //         //     setErrorMessage('Please enter a cart value');
// //         // }
// //         // else if (venueSlug.current === null){
// //         //     setErrorMessage('Please enter a venue slug');
// //         // }

// //     };


// import React from 'react'
// import CalculatePrice from '../components/CalculatePrice';
// import { useStore } from '../store/store';

// const handleFormSubmit = async () => {
//     await CalculatePrice();

//     const { setUserCoordinates, setCartValue, setErrorMessage,  setDeliveryFee, setSurCharge, setTotalDistanceInMeters, resetAll  } = useStore.getState();

//     const totalDistanceInMeters = useStore((state) => state.totalDistanceInMeters);
//     console.log(totalDistanceInMeters); 
//     const cartValue = useStore((state) => state.cartValue);
//     console.log(cartValue)
//     const surCharge = useStore((state) => state.surCharge);
//     console.log(surCharge)
//     const deliveryFee = useStore((state) => state.deliveryFee);
//     console.log(deliveryFee)
//     const errorMessage = useStore((state) => state.errorMessage);
//     console.log(errorMessage, 'errorMessage' )
//     const venueSlug = useStore((state) => state.venueSlug
//     console.log(venueSlug)
    
//             // const submit = () => {
    
//                 if (cartValue !== null && surCharge !== null && totalDistanceInMeters !== null && deliveryFee !== null && venueSlug !== null) {
        
//                     if (deliveryFee !== null) {
//                         setShowDeliveryFee(deliveryFee);
//                         console.log(deliveryFee, 'check del fee');
//                     }
        
//                     setShowDeliveryDistance(totalDistanceInMeters ?? 0);
//                     setShowSurcharge(surCharge ?? 0);
//                     console.log(deliveryFee, 'surcharge');
        
//                     setShowCartValue(cartValue);
//                     setTotalPrice((cartValue ?? 0) + (deliveryFee ?? 0) + (surCharge ?? 0));        
        
//                     setErrorMessage('');
//                     // setCartValue(null);
//                     // surCharge(null);
//                     // totalDistanceInMeters = null;
//                     // deliveryFee = null;
//                     // venueSlug = null;
//                     resetForm();
        
//                 }
//                 // else if (cartValue.current === null){
//                 //     setErrorMessage('Please enter a cart value');
//                 // }
//                 // else if (venueSlug.current === null){
//                 //     setErrorMessage('Please enter a venue slug');
//                 // }
//                 else if (cartValue === null || venueSlug === null){
//                     setErrorMessage('Please fill in all required fields');   
//                     console.log('Form not valid');
//                     setShowCartValue(0);
//                     setShowDeliveryFee(0);
//                     setShowDeliveryDistance(0);
//                     setShowSurcharge(0);
//                     setTotalPrice(0);
//                 }
//                 else if (totalDistanceInMeters === null){
//                     setErrorMessage('Please Press the "Get location" button first');
//                     return errorMessage;
//                 }
        
//                 else {
//                     setShowCartValue(0);
//                     setShowDeliveryFee(0);
//                     setShowDeliveryDistance(0);
//                     setShowSurcharge(0);
//                     setTotalPrice(0);
//                     return errorMessage;
//                 }
    
//             }
//   return (
//     <div>
//         <button
//             type="button"
//             onClick={submit}
//             className="bg-[hsla(198,100%,44%,0.9)] h-14 text-white max-w-32 w-full font-sans p-2 font-medium text-[16px] rounded-lg hover:bg-[hsla(198,100%,44%,1)]"
//             >
//             Calculate Price
//         </button>
//     </div>
//   )
// }

// export default handleFormSubmit