import React, { useState } from 'react'
import {
    Avatar,
    Button,
    CssBaseline,
    Dialog,
    Paper, Typography,
    Grid,
    Backdrop
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import OtpInput from "react-otp-input";
import { pink } from '@mui/material/colors';
import { userService } from '../../_services';
import { red } from '@mui/material/colors';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';


const OtpModal = ({ setConfirmBox, confirmBox, formValues }) => {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const router = useRouter();

    const handleChange = async (otp) => {
        setMessage("");
        setOtp(otp);
        if (otp.length == 4) {
            //otp expiration time
            // setTimeout(() => {

            // }, timeout);
            try {
                const result = await userService.verifyOtp({ email: formValues.email, otp: otp });
                setConfirmBox(false);
                router.push('/login');

            } catch (ex) {
                setMessage("Invalid OTP");
                setOtp("");
                console.log(ex);
            }

        }
    }

    const resendOtp = async (formValues) => {
        setMessage("");
        try {
            setConfirmBox(false);
            setIsLoading(true);
            const result = await userService.sendOtp(formValues);
            setIsLoading(false);
            setConfirmBox(true);
        } catch (ex) {
            console.log(ex);
            setIsError(true);

        }
    }
    return (
        <div>
            {isLoading ? <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color='info' />
            </Backdrop>
                :
                <Dialog
                    open={confirmBox}
                    onClose={() => { setConfirmBox(false); }}
                    fullWidth={true}
                    maxWidth={'sm'}
                >
                    <CssBaseline />
                    <Grid
                        container
                        style={{ backgroundColor: "white" }}
                        sx={{ p: 6 }}
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item container justify="center">
                            <Grid item container alignItems="center" direction="column">
                                <Grid item>
                                    <Avatar sx={{ bgcolor: pink[500] }}>
                                        <LockOutlinedIcon />
                                    </Avatar>
                                </Grid>
                                <Grid item>
                                    <Typography component="h1" variant="h5">
                                        Verification Code
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        {isError &&
                            <Grid item xs={12} textAlign="center">
                                <Paper elevation={0}>
                                    <Typography variant="h6" sx={{ color: red[500] }}>
                                        Something went wrong
                                    </Typography>
                                </Paper>
                            </Grid>
                        }
                        {!!message &&
                            <Grid item xs={12} textAlign="center">
                                <Paper elevation={0}>
                                    <Typography variant="h6" sx={{ color: red[500] }}>
                                        Invalid OTP
                                    </Typography>
                                </Paper>
                            </Grid>
                        }
                        <Grid item xs={12} textAlign="center" sx={{ mb: 2 }}>
                            <Paper elevation={0}>
                                <Typography variant="h6">
                                    Please enter otp send to your mail for email verification
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            container
                            justify="center"
                            alignItems="center"
                            direction="column"
                        >
                            <Grid item justify="center">
                                <OtpInput
                                    separator={
                                        <span>
                                            <strong>-</strong>
                                        </span>
                                    }
                                    numInputs={4}
                                    value={otp}
                                    onChange={handleChange}
                                    hasErrored={true}
                                    inputStyle={{
                                        width: "3rem",
                                        height: "3rem",
                                        margin: "0 1rem",
                                        fontSize: "2rem",
                                        borderRadius: 4,
                                        border: "1px solid rgba(0,0,0,0.3)"
                                    }}
                                />
                            </Grid>
                            {!!message &&
                                <Grid item xs={12} textAlign="center">
                                    <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => resendOtp(formValues)}>
                                        Resend OTP
                                    </Button>
                                </Grid>
                            }

                        </Grid>
                    </Grid>


                </Dialog>
            }
        </div>
    )
}

export default OtpModal;
