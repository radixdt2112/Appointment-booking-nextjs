import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, CssBaseline, Link, Paper, Box, Grid, Typography, Alert, AlertTitle, Backdrop } from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRouter } from 'next/router'
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-mui';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { loginUser, selectActiveUser } from '../_features/users/usersSlice';
import { getLoadingState, activateLoading, deactivateLoading } from '../_features/globals/loadingSlice';
import CircularProgress from '@mui/material/CircularProgress';
import { loginSchema } from '../_constants/formValidationSchema';
import Layout from '../layouts/HomePage';

const Login = () => {

    const [initialValues, setIntialValues] = React.useState({
        email: '',
        password: ''
    });
    const router = useRouter();
    const [isError, setIsError] = React.useState(false);
    const dispatch = useDispatch();
    const isLoading = useSelector(getLoadingState);
    const activeUser = useSelector(selectActiveUser);

    const handleSubmit = async (values, resetForm) => {
        try {
            dispatch(activateLoading());
            const result = await dispatch(loginUser(values));
            unwrapResult(result);
            dispatch(deactivateLoading());
            localStorage.setItem("user", JSON.stringify(result.payload));
            router.push('/')
            setIsError(false);
        } catch (ex) {
            dispatch(deactivateLoading());
            console.log(ex);
            setIsError(true);
        }
    };

    if (!!activeUser) {
        router.push('/');
    }

    return (
        <Layout>
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
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            {isError &&
                                <Box sx={{ mt: 3 }}>
                                    <Alert
                                        severity="error"

                                    >
                                        <AlertTitle>
                                            <strong>Email and Password not matched</strong>
                                        </AlertTitle>

                                    </Alert></Box>
                            }
                            <Box sx={{ mt: 1 }}>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={loginSchema}
                                    onSubmit={(values, { resetForm }) => {
                                        handleSubmit(values, resetForm);
                                    }}
                                    enableReinitialize
                                >{({ values, resetForm, handleSubmit }) => {
                                    return <div>
                                        <Form>
                                            <Field
                                                id="email"
                                                margin="dense"
                                                variant="outlined"
                                                label="Email Address"
                                                type="text"
                                                name="email"
                                                component={TextField}
                                                placeholder="Email Address"
                                                onClick={() => setIsError(false)}
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
                                                onClick={() => setIsError(false)}
                                                autoComplete="current-password"
                                            />

                                            <Button
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                                onClick={() => handleSubmit(values, resetForm)}
                                            >
                                                Sign In
                                            </Button>
                                            <Grid container>
                                                {/* <Grid item xs>
                                                    <Link href="#" variant="body2">
                                                        Forgot password?
                                                    </Link>
                                                </Grid> */}
                                                <Grid item>
                                                    <Link onClick={() => router.push("/register")} variant="body2" sx={{ cursor: 'pointer' }}>
                                                        {"Don't have an account? Sign Up"}
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                        </Form>
                                    </div>
                                }}
                                </Formik>

                            </Box>

                        </Box>
                    }
                </Grid>
            </Grid>
        </Layout>
    )
}

export default Login;

