import { useFormik } from 'formik';

export const OrderFormContext = createContext(null);

const OrderFormProvider = ({ children }: { children: React.ReactNode }) => {
    const formik = useFormik({
        initialValues: {
            // define your initial form values here
        },
        onSubmit: values => {
            // handle form submission here
        },
    });
    return (
        <FormikContext.Provider value={formik}>
            {children}
        </FormikContext.Provider>
    );
};

export default OrderFormProvider;