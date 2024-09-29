// components/WorkerFormFields.tsx
import { Field, ErrorMessage } from 'formik';

const WorkerFormFields = () => {
  return (
    <div>
      <Field type="text" name="name" placeholder="Worker Name" />
      <ErrorMessage name="name" component="div" />
      <Field type="number" name="restaurantId" placeholder="Restaurant ID" />
      <ErrorMessage name="restaurantId" component="div" />
    </div>
  );
};

export default WorkerFormFields;