// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { Formik, Form } from 'formik';
// import { validationSchema } from '../../src/validation/schema'; 
// import CalculatorForm from '../../src/components'; 
// import { vi } from 'vitest';

// const mockDynamicApiData = {
//   noSurCharge: 100, 
//   basePrice: 200,
//   distanceRange: [
//     { min: 0, max: 1000, a: 10, b: 1 },
//     { min: 1000, max: 2000, a: 20, b: 2 },
//   ],
// };

// jest.mock('../api/DynamicApi', () => ({
//   __esModule: true,
//   default: () => ({ data: mockDynamicApiData }),
// }));

// const mockUseStore = vi.fn().mockReturnValue({
//   setUserCoordinates: vi.fn(),
//   setVenueCoordinates: vi.fn(),
//   setTotalDistance: vi.fn(),
//   setErrorMessage: vi.fn(),
//   totalDistanceInMeters: 1500, 
//   errorMessage: null, 
// });

// test('Should calculate and display correct price with valid input', async () => {
//   render(
//     <Formik
//       initialValues={{
//         venueSlug: 'test-venue',
//         cartValue: '50', 
//         userLatitude: '12.345',
//         userLongitude: '56.789',
//       }}
//       validationSchema={validationSchema}
//       onSubmit={() => {}} 
//     >
//       <Form>
//         <CalculatorForm /> 
//       </Form>
//     </Formik>
//   );

//   // Simulate user interaction (optional: to trigger calculations)
//   const calculatePriceButton = screen.getByRole('button', { name: /Calculate Price/i });
//   userEvent.click(calculatePriceButton); 

//   // Assert price calculations
//   const cartValueElement = screen.getByText('Cart value: €50.00'); 
//   expect(cartValueElement).toBeInTheDocument();
//   // Calculate expected delivery fee based on mock data 
//   const expectedDeliveryFee = ((1500 * 2 / 10) + 200 + 20) / 100; 
//   const deliveryFeeElement = screen.getByText(`Delivery fee: €${expectedDeliveryFee.toFixed(2)}`); 
//   expect(deliveryFeeElement).toBeInTheDocument();
//   // ... assert other price breakdown elements (surcharge, total price) 
// });

// // ... other tests for different scenarios (e.g., invalid latitude/longitude, 
// // noSurCharge conditions, etc.)



import React from 'react';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import OrderForm from '../../src/components/OrderForm';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ValidationSchema from '../../src/validation/Schema';
import { Formik, Form } from 'formik';


// describe('OrderForm component', () => {
//   it('should render without crashing and display a form element', () => {
//     render(<OrderForm />);
    
//     // Check if the form is rendered
//     const formElement = screen.getByTestId('order-form'); // Assuming the form has a data-testid="order-form"
//     expect(formElement).toBeInTheDocument();

//     // Check if some text or button within the form exists
//     const submitButton = screen.getByText('Submit Order'); // Change based on your actual text
//     expect(submitButton).toBeInTheDocument();
//   });
// });

describe('Should display an error message for empty Latitude', () => {
    // render(
    //   <Formik 
    //     initialValues={{ 
    //       // ... other initial values
    //       userLatitude: '', 
    //     }}
    //     validationSchema={ValidationSchema} 
    //     onSubmit={() => {}} 
    //   >
    //     <Form>
    //       <OrderForm /> 
    //     </Form>
    //   </Formik>
    // );

    it('should display', () => {
        render(<OrderForm/>);

        const heading = screen.getByRole('h1')
        expect(heading).toBeInTheDocument()
    })
  
    // Simulate user interaction
    // const latitudeInput = screen.getByTestId('userLatitude'); 
    // userEvent.click(latitudeInput); 
    // userEvent.type(latitudeInput, ''); 
  
    // // Find the error message element
    // const errorMessage = screen.getByText('Latitude is required'); 
  
    // expect(errorMessage).toBeInTheDocument(); 
  });
  