import { Grid, Paper } from '@mui/material';
import React from 'react'
import { Dashboard } from '../../layouts';
import Chart from '../../layouts/shopAdmin/Chart';
import Deposits from '../../layouts/shopAdmin/Deposits';
import Orders from '../../layouts/shopAdmin/Oders';


const ShopAdmin = () => {
    return (
        <Dashboard>
            {/* Chart */}
            {/* <Grid item xs={12} md={8} lg={9}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <Chart />
                </Paper>
            </Grid> */}
            {/* Recent Deposits */}

            <Grid item xs={12} md={4} lg={3}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}

                >
                    <Deposits />
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <Deposits />
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <Deposits />
                </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Orders />
                </Paper>
            </Grid>
        </Dashboard>
    )
}

export async function getStaticProps(context) {
    return {
        props: {
            protected: true,
            userTypes: ['Shop Owner']
        }
    };
}
export default ShopAdmin;
