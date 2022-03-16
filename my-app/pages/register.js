import React, { useState } from 'react';

import {
    Button, Avatar, CssBaseline, Link, Paper, Box, Grid, Typography, RadioGroup, Backdrop,
    Radio, FormControlLabel, Alert, AlertTitle
} from '@mui/material';


import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useRouter } from 'next/router'
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-mui';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { registerUser } from '../_features/users/usersSlice';
import { useMutation } from 'react-query';

import { getLoadingState, activateLoading, deactivateLoading } from '../_features/globals/loadingSlice';
import CircularProgress from '@mui/material/CircularProgress';
import { registerSchema } from '../_constants/formValidationSchema';
import OtpModal from '../components/modals/otpModal';
import { userService } from '../_services';

const Register = () => {
    const [initialValues, setIntialValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        contactNo: '',
        gender: 'Male',
        role: ''
    });
    const [confirmBox, setConfirmBox] = useState(false);
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState("");

    const router = useRouter();
    const dispatch = useDispatch();
    const isLoading = useSelector(getLoadingState);

    const sendMail = useMutation(async (email) => {
        return userService.sendOtp({ email: email })
    }, {
        onSuccess: () => {
            dispatch(deactivateLoading());
            setConfirmBox(true);
        },
    }
    );

    const handleSubmit = async (values, resetForm) => {

        values["name"] = values.firstName + " " + values.lastName;
        delete values.firstName;
        delete values.lastName;
        delete values.confirmPassword;
        setFormData({ email: values.email });

        try {
            dispatch(activateLoading());
            const result = await dispatch(registerUser(values));
            const data = unwrapResult(result);


            if (!!data) {
                console.log(data);
                switch (data.msg) {
                    case 'already Registered':
                        setMessage("Already Registered User");
                        break;
                    case 'registerd successfully':
                        sendMail.mutate(values.email);


                        // setMessage("Registered successfully");

                        // router.push('/login');
                        break;
                    default:
                        setMessage('Something went wrong !!');
                        break;
                }


            }


            resetForm();

        } catch (ex) {
            console.log(ex);
            resetForm();
        }
    };

    return (
        <div>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={8}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
                    {isLoading ? <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={true}

                    >
                        <CircularProgress color='info' />
                    </Backdrop> :
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <HowToRegIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign Up
                            </Typography>
                            {message.length > 0 &&
                                <Box sx={{ mt: 3 }}>
                                    <Alert severity="error">
                                        <AlertTitle>
                                            <strong>{message}</strong>
                                        </AlertTitle>

                                    </Alert>
                                </Box>
                            }
                            <Box sx={{ mt: 1 }}>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={registerSchema}
                                    onSubmit={(values, { resetForm }) => {
                                        handleSubmit(values, resetForm);
                                    }}
                                    enableReinitialize
                                >{({ values, resetForm, handleSubmit, setFieldValue }) => {
                                    return <Form>
                                        <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Grid item xs={5}>
                                                <Field
                                                    id="First Name"
                                                    margin="dense"
                                                    variant="outlined"
                                                    label="First Name"
                                                    type="text"
                                                    name="firstName"
                                                    component={TextField}
                                                    placeholder="John"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Field
                                                    id="Last Name"
                                                    margin="dense"
                                                    variant="outlined"
                                                    label="Last Name"
                                                    type="text"
                                                    name="lastName"
                                                    component={TextField}
                                                    placeholder="Doe"
                                                    fullWidth
                                                />
                                            </Grid>


                                            <Field
                                                id="email"
                                                margin="dense"
                                                variant="outlined"
                                                label="Email Address"
                                                type="text"
                                                name="email"
                                                component={TextField}
                                                placeholder="Email Address"
                                                fullWidth
                                            />
                                            <Grid item xs={12} sx={{ justifyContent: 'space-between' }}>
                                                {/* <Typography variant="h6" component="h2">
                                                    Gender
                                                </Typography> */}
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="gender"
                                                    // value={values.selectedOption.toString()}
                                                    onChange={(event) => {
                                                        setFieldValue("gender", event.currentTarget.value)
                                                    }}
                                                    defaultValue={"Male"}

                                                >
                                                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                                    {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}

                                                </RadioGroup>
                                            </Grid>
                                            <Field
                                                id="contactNo"
                                                margin="dense"
                                                variant="outlined"
                                                label="Phone Number"
                                                type="text"
                                                name="contactNo"
                                                component={TextField}
                                                placeholder="phone no contain 10 digit"
                                                fullWidth
                                            />


                                            <Field
                                                margin="dense"
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                component={TextField}
                                                autoComplete="current-password"
                                            />
                                            <Field
                                                margin="dense"
                                                fullWidth
                                                name="confirmPassword"
                                                label="Confirm Password"
                                                type="password"
                                                id="password"
                                                component={TextField}
                                                autoComplete="current-password"
                                            />

                                            <Button
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                                onClick={() => handleSubmit(values, resetForm)}
                                            >
                                                Sign Up
                                            </Button>
                                            <Grid container>
                                                <Grid item xs>
                                                    <Link onClick={() => router.push('/login')} variant="body2" sx={{ cursor: 'pointer' }}>
                                                        Already Registered ? Go to Login
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                }}
                                </Formik>

                            </Box>
                        </Box>
                    }
                </Grid>
            </Grid>
            <OtpModal setConfirmBox={setConfirmBox} confirmBox={confirmBox} formValues={formData} />


        </div >
    )
}

export default Register;

