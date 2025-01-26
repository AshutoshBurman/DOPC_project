import { useState, useRef, useEffect } from 'react';
import ValidationSchema from '../validation/Schema';
import { useFormik, Form, Formik  } from 'formik';

import DynamicApi from '../api/DynamicApi';
import useStore from '../store/store';
// import GetLocation from './GetLocation';
import UserLocation from '../utils/UserLocation';




interface HandleChangeEvent {
    target: {
        value: string;
    };
}

interface DistanceRange {
    min: number;
    max: number;
    a: number;
    b: number;
}

const onSubmit = (values: { venueSlug: string; cartValue: string; userLatitude: string; userLongitude: string; }) => {
    console.log (values);
}



const OrderForm = () => {
    
    const surCharge = useRef <number | null> (null);
    const deliveryFee = useRef <number | null>(null);
    const venueSlug = useRef <string | null>(null);
    const cartValue = useRef <number | null>(null);
    
    
    
    const [showCartValue, setShowCartValue] = useState <number | null>(0);
    const [showDeliveryFee, setShowDeliveryFee] = useState  <number | null>(0);
    const [showDeliveryDistance, setShowDeliveryDistance] = useState <number | null>(0);
    const [showSurcharge, setShowSurcharge] = useState <number | null>(0);
    const [totalPrice, setTotalPrice] = useState <number | null>(0);
    const [userLatitude, setUserLatitude] = useState <number | null>(0);
    const [userLongitude, setUserLongitude] = useState <number | null>(0);

    
    
    const { data: dynamicData } = DynamicApi();
    const { noSurCharge, basePrice, distanceRange } = dynamicData || {};
    

    
    
    const {values, handleBlur, errors, touched, handleChange, resetForm} = useFormik({
        initialValues: {
            venueSlug: '',
            cartValue: '',
            userLatitude: '',
            userLongitude: '',
        },
        validationSchema: ValidationSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });
    
    

    const { setUserCoordinates, setErrorMessage, setTotalDistanceInMeters} = useStore.getState();

    const totalDistanceInMeters = useStore((state) => state.totalDistanceInMeters);
    const errorMessage = useStore((state) => state.errorMessage);
    const Latitude = useStore(((state) => state.userLatitude));
    const Longitude = useStore((state) => state.userLogitude);


    useEffect(() => {

      setUserCoordinates(parseFloat(values.userLatitude), parseFloat(values.userLongitude));
      setUserLatitude(Latitude);
      
      setUserLongitude(Longitude);
      
      
    },[Latitude, Longitude]);
    
    


    
    //   60.2055
    // 24.6559
    // 60.1695
    // 24.9354

    // 60.18751
    // 24.9354
    // 60.18770

    useEffect(() => {
        let surcharge = 0;

        if (errorMessage !== null && cartValue.current !== null && cartValue.current < noSurCharge) {
            const cartValueNumeric = cartValue.current;
            
            surcharge = (noSurCharge - (cartValueNumeric * 100));            
            surcharge = surcharge < 0 ? 0 : surcharge;            
            surcharge = surcharge / 100;  
            setErrorMessage('')          
        }
        else {
            surcharge = 0;
        }           
             
        surCharge.current=surcharge;
    }, [cartValue.current, noSurCharge]);
    
     


    const calculatePrice =  () => {
           if (cartValue.current !== null && cartValue.current.toString().includes(",")) {
               return false;
           }
   
           const range: DistanceRange | undefined =  distanceRange.find((range: DistanceRange) => 
               totalDistanceInMeters !== null && totalDistanceInMeters >= range.min && (range.max === 0 || totalDistanceInMeters < range.max)
           );
   
               if (range && range.max !== 0) {
                   if (totalDistanceInMeters !== null) {
                       deliveryFee.current = (
                           (Math.round(totalDistanceInMeters * range.b / 10) + basePrice + range.a) / 100
                       );
                   }
                   
                   setErrorMessage('');
                   return true ;
               } else {
                   setErrorMessage('Delivery is not available at this location'); 
                   return false
               }

    };


    


    const handleFormSubmit = () => {

        
        if (totalDistanceInMeters !== null) {
            calculatePrice();
        }

        if (deliveryFee.current !==null && cartValue.current !== null && !isNaN(cartValue.current) && surCharge.current !== null && totalDistanceInMeters !== null && venueSlug.current !== null) {
                
    
                setShowDeliveryFee(deliveryFee.current);
                setShowCartValue(cartValue.current)
                setShowDeliveryDistance(totalDistanceInMeters ?? 0);
                setShowSurcharge(surCharge.current);
                setTotalPrice(parseFloat(((cartValue.current ?? 0) + (deliveryFee.current ?? 0) + (surCharge.current ?? 0)).toFixed(2)));
    
                setErrorMessage('');
                surCharge.current = null;
                deliveryFee.current = null;
                venueSlug.current = null;
                cartValue.current = null;


                setTotalDistanceInMeters(0);
                resetForm();
    
            }
            else if (cartValue.current === null || venueSlug.current === null){
                setErrorMessage('Please fill in all required fields');   
                setShowCartValue(0);
                setShowDeliveryFee(0);
                setShowDeliveryDistance(0);
                setShowSurcharge(0);
                setTotalPrice(0);

            }
            else if (totalDistanceInMeters === null){
                setErrorMessage('Please Press the "Get location" button first');
                return errorMessage;
            }
    
            else {
                setErrorMessage('Cart value is not valid');
                setShowCartValue(0);
                setShowDeliveryFee(0);
                setShowDeliveryDistance(0);
                setShowSurcharge(0);
                setTotalPrice(0);

                return errorMessage;
            }

    };


    const setAll = () => {
        resetForm();

        setShowCartValue(0);
        setShowDeliveryFee(0);
        setShowDeliveryDistance(0);
        setShowSurcharge(0);
        setTotalPrice(0);
        setErrorMessage('');

        venueSlug.current = null;
        surCharge.current = null;
        deliveryFee.current = null;
        cartValue.current = null;
        
    }





    const handleVenueSlug = (e: HandleChangeEvent) => {
        handleChange(e);
        venueSlug.current = (e.target.value);
    };
    const handleCartValue = (e: HandleChangeEvent) => {
        handleChange(e);
        cartValue.current = parseFloat(e.target.value);
    };
    
  return (
    <div className='bg-black max-h-[55rem] max-w-[30rem] h-full w-full flex flex-col rounded-3xl text-white items-center justify-center p-10'>
        <Formik initialValues={values} onSubmit={onSubmit}>
            <Form  className=' flex flex-col h-full w-full justify-center'>
                <div className=' flex flex-col h-full w-full justify-center'>
                    <header tabIndex={0} >
                        <h1 className=' font-semibold text-center font-sans text-xl'>Delivery Order Price Calculator</h1>
                    </header>
                    <main className=' flex flex-col w-full h-full justify-evenly items-center'>      
                        
                        {/* venus slug input */}
                        <div className=' w-full flex flex-col items-center justify-center'>
                            <label tabIndex={0} htmlFor='venueSlug' >
                                <h2 className='pb-1 px-1 font-sans font-medium text-[16px]'>Venue Slug</h2>
                            </label>
                            <input  
                                id='venueSlug'
                                type='text'
                                onChange={handleVenueSlug}
                                placeholder='Enter venue Slug'
                                data-text-id='venueSlug'
                                value={values.venueSlug}
                                onBlur={handleBlur}  
                                aria-required='true'
                                required
                                className='bg-white text-black rounded-full h-12 max-w-64 w-full  px-4 font-sans font-medium text-[16px]'/>
                            {touched.venueSlug && errors.venueSlug && <p tabIndex={0} className="text-red-500 text-sm px-3">{errors.venueSlug}</p>}
                        </div>

                        {/* cart value input */}
                        <div className=' w-full flex flex-col items-center justify-center'>

                            <label  htmlFor='cartValue' tabIndex={0}  >
                                <h2 className='pb-1 px-1 font-sans font-medium text-[16px]'>Cart Value €</h2>
                            </label>
                            <input 
                                id='cartValue'
                                type='string'
                                // key={errors.cartValue}
                                step='0.01'
                                pattern="^\d+(\.\d{2})?$"
                                placeholder='Enter cart value'
                                data-text-id='cartValue' 
                                value={values.cartValue}
                                onChange={handleCartValue} 
                                onBlur={handleBlur} 
                                required
                                aria-required='true'
                                className='bg-white text-black rounded-full h-12 max-w-64 w-full px-4 font-sans font-medium text-[16px]'/>

                            {touched.cartValue && errors.cartValue && <p tabIndex={0} className="text-red-500 text-sm mx-3">{errors.cartValue}</p>}
                            
                        </div>

                        {/* latitude */}
                        <div className=' w-full flex flex-col items-center justify-center'>
                            
                            <label tabIndex={0} htmlFor='userLatitude' >
                                <h2 className='pb-1 px-1 font-sans font-medium text-[16px]'>Latitude</h2>
                            </label>
                            <input 
                                id='userLatitude'
                                type='number'
                                step='any'
                                placeholder='Enter latitude' 
                                value={userLatitude ?? ''}
                                onChange={handleChange} 
                                onBlur={handleBlur}   
                                data-text-id='userLatitude'
                                aria-required='true' 
                                required
                                className='bg-white text-black rounded-full h-12 max-w-64 w-full px-4 font-sans font-medium text-[16px]'/>
                            
                            {touched.userLatitude && errors.userLatitude && <p tabIndex={0} className="text-red-500 text-sm">{errors.userLatitude}</p>}

                        </div>

                            {/* longitude */}
                        <div className=' w-full flex flex-col items-center justify-center'>
                            <label tabIndex={0} htmlFor='userLongitude' >
                                <h2 className='pb-1 px-1 font-sans font-medium text-[16px]'>Longitude</h2>
                            </label>
                            <input 
                                id='userLongitude'
                                type='number'
                                step='any'
                                placeholder='Enter longitude'
                                value={userLongitude ?? ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                data-text-id='userLongitude' 
                                required
                                aria-required='true'

                                className='bg-white text-black rounded-full h-12 max-w-64 w-full px-4 font-sans font-medium text-[16px]'/>
                            {touched.userLongitude && errors.userLongitude && <p tabIndex={0} className="text-red-500 text-sm px-3">{errors.userLongitude}</p>}
                        </div>
                    </main>
                </div>
            </Form>
        </Formik>
        {/* Buttons */}
    
        <div className=' w-full items-center justify-between gap-3 flex flex-col'>
           
            <button
                type="button"
                onClick={setAll}
                className="bg-[hsla(198,100%,44%,0.9)] h-14 text-white max-w-20 w-full font-sans font-medium text-[16px] rounded-lg hover:bg-[hsla(198,100%,44%,1)]"
            >
            Reset
            </button> 
            <UserLocation/>

            {/* <GetLocation /> */}
            <button
                type="button"
                data-test-id="getLocation"	
                id='getLocation'
                onClick={handleFormSubmit}
                className="bg-[hsla(198,100%,44%,0.9)] h-14 text-white w-40 font-sans p-2 font-medium text-[16px] rounded-lg hover:bg-[hsla(198,100%,44%,1)]"
            >
                Calculate Price
            </button>

            {errorMessage && (<p tabIndex={0} className="text-red-500 text-sm">{errorMessage}</p>)}
        </div>

        <hr className='m-3 w-full'/>

            <div className='w-full'>
                <section className='w-full' >
                    <h3 tabIndex={0} >Price breakdown:</h3>
                    <div className='w-full'>
                        <div tabIndex={0} className=' w-full flex flex-row justify-between' >
                            <p>Cart value</p>
                            <span data-raw-value={`${(showCartValue ?? 0) * 100}`}>{`${showCartValue}€`}</span>
                        </div>
                        <div tabIndex={0} className=' w-full flex flex-row justify-between' >
                            <p>Delivery fee</p>
                            <span data-raw-value={`${(showDeliveryFee ?? 0) * 100}`}>{`${showDeliveryFee}€`}</span>
                        </div>
                        <div tabIndex={0} className=' w-full flex flex-row justify-between' >
                            <p>Delivery distance</p>
                            <span data-raw-value={`${showDeliveryDistance}`}>{`${showDeliveryDistance}m`}</span>
                        </div>
                        <div tabIndex={0} className=' w-full flex flex-row justify-between' >
                            <p>Small order surcharge</p>
                            <span data-raw-value={`${Math.round((showSurcharge ?? 0) * 100)}`}>{`${showSurcharge}€`}</span>
                        </div>
                        <div tabIndex={0} className=' w-full flex flex-row justify-between' >
                            <p>Total price</p> 
                            <span data-raw-value= {`${(totalPrice ?? 0) * 100}€`}>{`${totalPrice}€`}</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>

  )
}

export  default OrderForm;


