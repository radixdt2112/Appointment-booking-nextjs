import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, CssBaseline, Link, Paper, Box, Grid, Typography } from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRouter } from 'next/router'
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-mui';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { loginUser } from '../_features/users/usersSlice';
import { Alert, AlertTitle } from '@mui/material';

const validationSchema = Yup.object({
    email: Yup.string().email().required('Required'),
    password: Yup.string().required('Required'),
});

const Login = () => {
    const [initialValues, setIntialValues] = React.useState({
        email: '',
        password: ''
    });
    const router = useRouter()
    const [isError, setIsError] = React.useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (values, resetForm) => {
        try {

            const result = await dispatch(loginUser(values));
            unwrapResult(result);
            localStorage.setItem("user", JSON.stringify(result.payload));
            router.push('/')
            resetForm();
            setIsError(false);
        } catch (ex) {
            console.log(ex);
            setIsError(true);
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
                        <Box sx={{ mt: 1 }}>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
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

                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            onClick={() => handleSubmit(values, resetForm)}
                                        >
                                            Sign In
                                        </Button>
                                        <Grid container>
                                            <Grid item xs>
                                                <Link href="#" variant="body2">
                                                    Forgot password?
                                                </Link>
                                            </Grid>
                                            <Grid item>
                                                <Link href="#" variant="body2">
                                                    {"Don't have an account? Sign Up"}
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                </div>
                            }}
                            </Formik>

                        </Box>
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
                    </Box>

                </Grid>
            </Grid>
        </div>
    )
}

export default Login;
