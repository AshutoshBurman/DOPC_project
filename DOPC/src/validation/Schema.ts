import * as Yup from "yup"
import useStore from "../store/store";
import { ErrorMessage } from "formik";
// import { useEffect } from "react";

const { setErrorMessage } = useStore.getState();


const ValidationSchema = Yup.object().shape({
    venueSlug: Yup
    .string()
    .required("Required")
    .matches(
        /^(?!.*<.*>).*$/,
        "Please enter a valid value"
    ),

    // cartValue: Yup.number()
    // .transform((_, value) => {
    //     if (value.includes(',')) {
    //       return null;
    //     }
    //     // return +value.replace(/,/, '.');
    // })
    // .positive()

    // .required("aasdfasd")
    // .positive("Cart value must be a positive number")
    // .typeError("sadfsadf")
    // // .matches(/^\d+(\.\d{0,2})?$/, "Cart value must be a valid number without commas or scientific notation.")
    // .test(
    //     'is-decimal',
    //     'Cart value must be a valid number with up to two decimal places, Ex: 10.12',
    //     (value) => {
    //         if (value === undefined || value === null) return false;
    //         // Check for up to 2 decimal places and disallow scientific notation
    //         return /^\d+(\.\d{1,2})?$/.test(value.toString());
    //       }
    // )
    // .test(
    //     'no-comma',
    //     'Comma(,) is not allowed, use dot(.)',
    //     (value) => {
    //         return value !== undefined && !value.includes(',');
    //     }
    // ),

    cartValue: Yup.string()
    // .transform((value) => {
    //     if (typeof value === 'string' && value.includes(',')) {
    //     return null;
    //     }
    //     return value;
    // })
    .test('no-comma', 'Comma (,) is not allowed, use dot (.)', function (value) {
        if (value && value.includes(',')) {
          // If there's a comma, set the error message and fail validation
          setErrorMessage('Comma (,) is not allowed, use dot (.)');
          console.log(setErrorMessage);
          
          return this.createError({
            path: this.path,
            message: 'Comma (,) is not allowed, use dot (.)',
          });
        } else {
          // If no comma, clear the error message
          setErrorMessage('');
          console.log(setErrorMessage);
          return true;
        }
      })
  
    .test(
        'is-decimal',
        'Cart value must be a valid number with up to two decimal places, Ex: 10.12',
        (value) => {
        if (!value) return false;
        // Check for up to 2 decimal places and disallow scientific notation
        return /^\d+(\.\d{1,2})?$/.test(value.toString());
        }
    )
    // .test(
    //     'no-comma',
    //     'Comma(,) is not allowed, use dot(.)',
    //     (value) => {
    //     return value !== undefined && !value.toString().includes('.');
    //     }
    // )
    // .test(
    //     'no-comma',
    //     'Comma (,) is not allowed, use dot (.)',
    //     (value) => {
    //       if (value === undefined) {
    //         // Leave it as valid if the value is undefined
    //         return true;
    //       } else if (value.toString().includes(',')) {
    //         // Throw an error if a comma is present
    //         throw new Error('Comma (,) is not allowed, use dot (.)');
    //       } else {
    //         // Leave it as valid if no comma is present
    //         return true;
    //       }
    //     }
    //   )
    
    // .transform((value) => (value ? parseFloat(value) : null)) // Convert to number after validation
    // .typeError('Cart value must be a valid number with dot(.) separator') // General error for invalid input
    // .positive('Cart value must be a positive number')
    .required('Cart value is required'),
    



    userLatitude: Yup.number()
    .required("Please enter a valid value")
    .min(-90, 'Latitude must be greater than or equal to -90')
    .max(90, 'Latitude must be less than or equal to 90')
    .typeError('Latitude must be a number'),


    userLongitude: Yup.number()
    .required("Please enter a valid value")
    .min(-180, 'Longitude must be greater than or equal to -180')
    .max(180, 'Longitude must be less than or equal to 180')
    .typeError('Longitude must be a valid number'),
  
})


export default ValidationSchema;