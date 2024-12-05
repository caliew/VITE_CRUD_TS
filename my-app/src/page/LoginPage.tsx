import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Button, HeaderTitle } from '../components';
import { GetIcon } from "../utils";

import { login, logout } from '../redux/features/authSlice';

const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token, error } = useSelector((state) => state.auth);

    // Navigate to /home when token is available
    if (token) {
        navigate('/')
    }
    useEffect(()=>{
        if (token) dispatch(logout());
    },[])

    const handleSubmit = async (values: any, { setSubmitting, setFieldError  }: any) => {
        dispatch(login(values));
        setFieldError('accessCode', error.message);
        setSubmitting(false);
    };

    return (
        <div className="mt-15 font-Roboto flex flex-col items-center justify-center">
            <HeaderTitle Icon={GetIcon('key')} className="inline-flex size-24" title='LOGIN'/>
            <Formik
            initialValues={{ accessCode: '' }}
            onSubmit={handleSubmit}
            >
            {({ isSubmitting, handleSubmit, errors }) => (
                <Form className='flex flex-col'>
                    <Field
                        type="text"
                        name="accessCode"
                        placeholder="Access Code"
                        style={{ fontFamily: 'Roboto', textAlign: 'center', fontSize: 24, fontWeight: 50, color: 'red' }} 
                        />
                        <span />
                        <Button  className='mt-5 font-Roboto font-extralight text-2xl px-5' onClick={handleSubmit}>
                            LOGIN
                        </Button>
                        <div className='flex justify-center font-Roboto font-extralight text-2xl text-color-3'>
                        {errors.accessCode && <div className='text-red'>{errors.accessCode}</div> }
                        </div>
                </Form>
            )}
            </Formik>
        </div>
    );
};

export default LoginPage;