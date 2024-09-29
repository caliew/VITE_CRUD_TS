// components/RestaurantForm.tsx
import { Formik, Form, Field, ErrorMessage } from 'formik';

interface RestaurantFormProps {
  initialValues: any;
  validationSchema: any;
  onSubmit: (values: any) => void;
}

const RestaurantForm: React.FC<RestaurantFormProps> = ({
  initialValues,
  validationSchema,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="name" placeholder="Restaurant Name" />
          <ErrorMessage name="name" component="div" />
          <Field type="text" name="address" placeholder="Restaurant Address" />
          <ErrorMessage name="address" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RestaurantForm;