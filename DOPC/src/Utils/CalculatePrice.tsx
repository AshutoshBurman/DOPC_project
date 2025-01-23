// import { useContext, useEffect } from 'react';
// import { OrderFormContext } from '../context/OrderFormContext';

// const CalculatePrice = () => {
//   const context = useContext(OrderFormContext);

//   if (!context) {
//     throw new Error('CalculatePrice must be used within an OrderFormProvider');
//   }

//   const { venueSlug, cartValue, userLatitude, userLongitude } = context;

//   useEffect(() => {
//     console.log(venueSlug, 
//         cartValue, 
//         userLatitude, 
//         userLongitude );
    
//   },[
//     venueSlug, 
//     cartValue, 
//     userLatitude, 
//     userLongitude  
//   ])

//   return null;

// };

// export default CalculatePrice;