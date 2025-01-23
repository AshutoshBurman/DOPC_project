import React from 'react'
import OrderForm  from '../components/OrderForm'
// import StaticVenueData from '../api/StaticApi'
// import DynamicVenueData from '../api/DynamicApi'
// import GetLocation from '../Utils/GetLocation'
// import DynamicApi from '../api/DynamicApi';
// import StaticApi from '../api/StaticApi';

const CalculatorPage = () => {
  // DynamicVenueData();

    // This will trigger the `DynamicApi` query and log the data to the console
    // DynamicApi();
    // StaticApi();


    // CalculatePrice()

  return (
    <div className='bg-[#00c1e8] h-[100vh] w-full flex flex-col justify-center items-center'>
        <OrderForm />
    </div>
  )
}

export default CalculatorPage;