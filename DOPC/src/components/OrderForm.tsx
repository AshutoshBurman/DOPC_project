import { useState, useRef, useEffect } from 'react';
import ValidationSchema from '../validation/FormValidation';
import { useFormik, Form, Formik  } from 'formik';
import StaticApi from '../api/StaticApi';
import getDistance from 'geolib/es/getPreciseDistance';
import DynamicApi from '../api/DynamicApi';
import Inputmask from 'inputmask';


interface HandleChangeEvent {
    target: {
        value: string;
    };
}

const onSubmit = (values: { venueSlug: string; cartValue: string; userLatitude: string; userLongitude: string; }) => {
    console.log (values);
}



const OrderForm = () => {



    const cartValue = useRef <string | null>(null);
    const surCharge = useRef <number | null> (null);
    const totalDistanceInMeters = useRef <number | null> (null);
    const deliveryFee = useRef <number | null>(null);
    const venueSlug = useRef <string | null>(null);



    const [showCartValue, setShowCartValue] = useState <number | null>(0);
    const [showDeliveryFee, setShowDeliveryFee] = useState  <number | null>(0);
    const [showDeliveryDistance, setShowDeliveryDistance] = useState <number | null>(0);
    const [showSurcharge, setShowSurcharge] = useState <number | null>(0);
    const [totalPrice, setTotalPrice] = useState <number | null>(0);
    const [errorMessage, setErrorMessage] = useState <string | null >(''); 



    const { data: dynamicData } = DynamicApi();
    const { noSurCharge, basePrice, distanceRange } = dynamicData || {};
        
    const { data } = StaticApi();
    const coordinates = data?.venueCoordinates;


    const {values, handleBlur, errors, touched, handleChange, resetForm} = useFormik({
        initialValues: {
            venueSlug: '',
            cartValue: '',
            userLatitude: '',
            userLongitude: '',
        },
        validationSchema: ValidationSchema,
        onSubmit
    });


    const GetLocation = () => {
        (() => {
          if (coordinates) { 
            try {
              const venueCoordinate = { latitude: coordinates[1], longitude: coordinates[0] }; 
      
              if (values.userLatitude && values.userLongitude) {
                const userCoordinate = { latitude: values.userLatitude, longitude: values.userLongitude };
                totalDistanceInMeters.current = getDistance(venueCoordinate, userCoordinate);
                
                console.log(totalDistanceInMeters.current, 'distance meter');
                setErrorMessage('')
                return true;
                
              } 
              else {
                setErrorMessage('Please enter correct coordinates');
                return false;
              }
            } catch (error) {
              console.log('Error calculating distance',error);
              setErrorMessage('Error calculating distance');
              return false;
            }
          } else {
            console.log('Venue coordinates are not available.');
            setErrorMessage('Venue coordinates are not available.');
            return false;
          }
        })();        
      
      };
    
    //   60.2055
    // 24.6559
    // 60.1695
    // 24.9354

    // 60.18751
    // 24.9354



    
    const CalculatePrice = async () => {
        interface DistanceRange {
            min: number;
            max: number;
            a: number;
            b: number;
        }

        const range: DistanceRange | undefined = distanceRange.find((range: DistanceRange) => 
            totalDistanceInMeters.current !== null && totalDistanceInMeters.current >= range.min && (range.max === 0 || totalDistanceInMeters.current < range.max)
        );


        console.log('number');
        console.log(range);

        if (range && range.max !== 0){
            if (totalDistanceInMeters.current !== null) {
                deliveryFee.current = (
                    (Math.round(totalDistanceInMeters.current * range.b / 10) + basePrice + range.a) / 100
                );
            }
            console.log(deliveryFee.current,'fee log in calculation price');

            
            console.log(totalDistanceInMeters.current, 'total distance adlsjfkansdfsdfasd');
            setErrorMessage('')
            return true
        }  
        else {
            console.log('   is not available');
            setErrorMessage('Delivery is not available at this location');
            return false;
        }
    };







    
    useEffect(() => {
        let surcharge = 0;

        if (cartValue.current !== null && cartValue.current.toString().includes(",")) {
            // Code to execute if userLatitude contains a comma
            console.log("Contain comma not allowed");
            return setErrorMessage("Please use dot; comma is not allowed");
          }
        
        if (cartValue.current !== null && parseFloat(cartValue.current) < noSurCharge ) {
            const cartValueNumeric = parseFloat(cartValue.current);
            
            surcharge = (noSurCharge - (cartValueNumeric * 100));            
            surcharge = surcharge < 0 ? 0 : surcharge;            
            surcharge = surcharge / 100;            
        }
        else {
            surcharge = 0;
        }
    
        
        surCharge.current=surcharge;
    }, [cartValue.current]);




    const handleFormSubmit = async () => { 
        await CalculatePrice();

        if (cartValue.current !== null && surCharge.current !== null && totalDistanceInMeters.current !== null && deliveryFee.current !== null && venueSlug.current !== null) {

            if (deliveryFee.current !== null) {
                setShowDeliveryFee(deliveryFee.current);
                console.log(deliveryFee.current, 'check del fee');
            }

            setShowDeliveryDistance(totalDistanceInMeters.current ?? 0);
            setShowSurcharge(surCharge.current ?? 0);
            console.log(deliveryFee.current, 'surcharge');

            setShowCartValue(parseFloat(cartValue.current));
            setTotalPrice(parseFloat((parseFloat(cartValue.current) + (deliveryFee.current ?? 0) + (surCharge.current ?? 0)).toFixed(2)));        

            setErrorMessage('');
            cartValue.current = null;
            surCharge.current = null;
            totalDistanceInMeters.current = null;
            deliveryFee.current = null;
            venueSlug.current = null;
            resetForm();

        }
        // else if (cartValue.current === null){
        //     setErrorMessage('Please enter a cart value');
        // }
        // else if (venueSlug.current === null){
        //     setErrorMessage('Please enter a venue slug');
        // }
        else if (cartValue.current === null || venueSlug.current === null){
            setErrorMessage('Please fill in all required fields');   
            console.log('Form not valid');
            setShowCartValue(0);
            setShowDeliveryFee(0);
            setShowDeliveryDistance(0);
            setShowSurcharge(0);
            setTotalPrice(0);
        }
        else if (totalDistanceInMeters.current === null){
            setErrorMessage('Please Press the "Get location" button first');
            return errorMessage;
        }

        else {
            setShowCartValue(0);
            setShowDeliveryFee(0);
            setShowDeliveryDistance(0);
            setShowSurcharge(0);
            setTotalPrice(0);
            return errorMessage;
        }

    };


    const resetAll = () => {
        resetForm();
        setShowCartValue(0);
        setShowDeliveryFee(0);
        setShowDeliveryDistance(0);
        setShowSurcharge(0);
        setTotalPrice(0);
        setErrorMessage('');
    }


    useEffect(() => {
        if (cartValue.current) {
          // Apply Inputmask to the input field
          Inputmask({
            alias: 'decimal', // Allows decimal numbers
            radixPoint: '.',  // Sets the decimal separator to '.'
            groupSeparator: '', // No grouping separator (no commas)
            digits: 2, // Number of digits after the decimal point
            autoGroup: false, // Disables grouping
            allowMinus: false,
          }).mask(cartValue.current);
        }
      }, []);



    const handleVenueSlug = (e: HandleChangeEvent) => {
        handleChange(e);
        venueSlug.current = (e.target.value);
    };
    const handleCartValue = (e: HandleChangeEvent) => {
        handleChange(e);
        cartValue.current=(e.target.value);
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
                                type='number'
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
                                value={values.userLatitude}
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
                                value={values.userLongitude}
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
                onClick={() => resetAll()}
                className="bg-[hsla(198,100%,44%,0.9)] h-14 text-white max-w-20 w-full font-sans font-medium text-[16px] rounded-lg hover:bg-[hsla(198,100%,44%,1)]"
            >
            Reset
            </button> 
            <button
                type="button"
                onClick={GetLocation}
                className="bg-[hsla(198,100%,44%,0.9)] h-14 text-white max-w-32 w-full font-sans p-2 font-medium text-[16px] rounded-lg hover:bg-[hsla(198,100%,44%,1)]"
            >
            Get location
            </button> 

                <button type='button' 
                    onClick={handleFormSubmit}
                    className='bg-[hsla(198,100%,44%,0.9)] h-14 text-white max-w-52 w-full p-2 text-[16px] font-sans font-medium rounded-lg hover:bg-[hsla(198,100%,44%,1)]'>Calculate delivery price</button>
                

            {errorMessage && (<p tabIndex={0} className="text-red-500 text-sm">{errorMessage}</p>)}
        </div>

        <hr className='m-3 w-full'/>

            <div className='w-full'>
                <section className='w-full' >
                    <h3 tabIndex={0} >Price breakdown:</h3>
                    <div className='w-full'>
                        <div tabIndex={0} className=' w-full flex flex-row justify-between' >
                            <p>Cart value</p>
                            <p>{`${showCartValue}€`}</p>
                        </div>
                        <div tabIndex={0} className=' w-full flex flex-row justify-between' >
                            <p>Delivery fee</p>
                            <p>{`${showDeliveryFee}€`}</p>
                        </div>
                        <div tabIndex={0} className=' w-full flex flex-row justify-between' >
                            <p>Delivery distance</p>
                            <p>{`${showDeliveryDistance}m`}</p>
                        </div>
                        <div tabIndex={0} className=' w-full flex flex-row justify-between' >
                            <p>Small order surcharge</p>
                            <p>{`${showSurcharge}€`}</p>
                        </div>
                        <div tabIndex={0} className=' w-full flex flex-row justify-between' >
                            <p>Total price</p>
                            <p>{`${totalPrice}€`}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>

  )
}

export  default OrderForm;


