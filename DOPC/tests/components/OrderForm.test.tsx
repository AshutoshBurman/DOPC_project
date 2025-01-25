import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import { Formik, Form } from 'formik';
import validationSchema  from '../../src/validation/schema'; 
import OrderForm from '../../src/components/OrderForm'; 

// Assuming your component is in CalculatorForm.js

test('Should display error messages for empty fields and invalid cart value', async () => {
  render(
    <Formik 
      validationSchema={validationSchema} 
      onSubmit={() => {}} 
    >
      <Form>
        <OrderForm /> 
      </Form>
    </Formik>
  );

  // ... rest of the test logic (as before) 
});