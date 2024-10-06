import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { login } from '../redux/features/authSlice';

const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token, error } = useSelector((state) => state.auth);

    // Navigate to /home when token is available
    if (token) navigate('/home')

    const handleSubmit = async (values: any, { setSubmitting, setFieldError  }: any) => {
        dispatch(login(values));
        setFieldError('accessCode', error.message);
        setSubmitting(false);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25vh' }}>
        <Box sx={{ width: 300, padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Formik
            initialValues={{ accessCode: '' }}
            onSubmit={handleSubmit}
            >
            {({ isSubmitting, handleSubmit, errors }) => (
                <Form>
                <Field
                    type="text"
                    name="accessCode"
                    placeholder="Access Code"
                    style={{ fontFamily: 'Roboto', textAlign: 'center', fontSize: 18, fontWeight: 50, color: 'red' }} 
                    />
                    {errors.accessCode && <Typography sx={{ fontSize: 18, fontWeight: 100, color: 'red' }}>{errors.accessCode}</Typography> }
                    <Button variant="contained" color="primary" disabled={isSubmitting} onClick={handleSubmit} style={{ marginLeft: 5 }}>
                    <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>LOGIN</Typography>
                    </Button>
                </Form>
            )}
            </Formik>
        </Box>
        </Box>
    );
};

export default LoginPage;