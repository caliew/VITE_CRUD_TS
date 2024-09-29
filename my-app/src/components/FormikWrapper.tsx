// components/FormikWrapper.tsx
import { Formik, Form, Field, ErrorMessage } from 'formik';

interface FormikWrapperProps {
  initialValues: any;
  validationSchema: any;
  onSubmit: (values: any) => void;
}

const FormikWrapper: React.FC<FormikWrapperProps> = ({
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
          {/* Form fields will go here */}
        </Form>
      )}
    </Formik>
  );
};

export default FormikWrapper;