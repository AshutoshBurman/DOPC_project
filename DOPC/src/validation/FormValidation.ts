import * as Yup from "yup"

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

    cartValue: Yup.number()
    .transform((value) => {
        if (typeof value === 'string' && value.includes(',')) {
        return null;
        }
        return value;
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
    .test(
        'no-comma',
        'Comma(,) is not allowed, use dot(.)',
        (value) => {
        return value !== undefined && !value.toString().includes(',');
        }
    )
    // .transform((value) => (value ? parseFloat(value) : null)) // Convert to number after validation
    .typeError('Cart value must be a valid number') // General error for invalid input
    .positive('Cart value must be a positive number')
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