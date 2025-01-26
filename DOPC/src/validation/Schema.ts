import * as Yup from "yup"


const ValidationSchema = Yup.object().shape({
    venueSlug: Yup
    .string()
    .required("Required")
    .matches(
        /^(?!.*<.*>).*$/,
        "Please enter a valid value"
    ),


    cartValue: Yup.string()
    .test('no-comma', 'Comma (,) is not allowed, use dot (.)', function (value) {
        if (value && value.includes(',')) {          
          return this.createError({
            path: this.path,
            message: 'Comma (,) is not allowed, use dot (.)',
          });
        } else {
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

    .typeError('Cart value must be a valid number with dot(.) separator')
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