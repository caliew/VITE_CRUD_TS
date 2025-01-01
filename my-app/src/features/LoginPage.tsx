import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useErrorHandler } from "react-error-boundary";

import { Formik, Form, Field } from "formik";

import { Button, HeaderTitle } from "@shared/components";
import { GetIcon } from "@shared/utils";
import {
  PageClasses,
  PageHeaderClasses,
  ButtonClasses,
} from "@shared/utils/classname";

import { login, logout } from "@shared/stores/features/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleError = useErrorHandler();

  const { token, error } = useSelector((state) => state.auth);

  // Navigate to /home when token is available
  if (token) {
    navigate("/");
  }
  useEffect(() => {
    if (token) dispatch(logout());
  }, []);

  const handleSubmit = async (
    values: any,
    { setSubmitting, setFieldError }: any
  ) => {
    dispatch(login(values));
    setFieldError("accessCode", error.message);
    setSubmitting(false);
  };

  return (
    <div className={PageClasses}>
      <HeaderTitle
        Icon={GetIcon("key")}
        className={PageHeaderClasses}
        title="LOGIN"
      />
      <div className="m-10">
        <Formik initialValues={{ accessCode: "" }} onSubmit={handleSubmit}>
          {({ isSubmitting, handleSubmit, errors }) => (
            <Form className="flex flex-col">
              <Field
                type="text"
                name="accessCode"
                placeholder="Access Code"
                style={{
                  fontFamily: "Roboto",
                  textAlign: "center",
                  fontSize: 24,
                  fontWeight: 50,
                  color: "red",
                }}
              />
              <span />
              <Button className={ButtonClasses} onClick={handleSubmit}>
                LOGIN
              </Button>
              <div className="flex justify-center font-Roboto font-extralight text-2xl text-color-3">
                {errors.accessCode && (
                  <div className="text-red">{errors.accessCode}</div>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
