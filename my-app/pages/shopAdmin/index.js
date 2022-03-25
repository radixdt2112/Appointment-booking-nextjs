import { AppBar, Grid, Paper, Tab, Tabs } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Services from '../../components/services';
import EnhancedTable from '../../components/services/servicesTable';
import { Dashboard } from '../../layouts';
import Chart from '../../layouts/shopAdmin/Chart';
import Deposits from '../../layouts/shopAdmin/Deposits';
import Orders from '../../layouts/shopAdmin/Oders';
import { selectActiveTab, setActiveTab } from '../../_features/shopAdmin/shopAdminSlice';

console.log(Dashboard);
const ShopAdmin = () => {
    const activeTab = useSelector(selectActiveTab);

    const dispatch = useDispatch();
    const handleChange = (event, newValue) => {
        dispatch(setActiveTab(newValue));

        // setAdminTabIndex(newValue);
    };

    return (
        <Dashboard >
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

            {["Services", "Slots", "Users"].map(i => <Grid item xs={12} md={4} lg={3}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 140,
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}
                    elevation={0}
                >
                    <Deposits title={i} />
                </Paper>
            </Grid>)}



            {/* Recent Orders */}
            <Grid item xs={12}>
                <div style={{
                    flexGrow: 1,
                    backgroundColor: 'white',
                    overflow: 'auto',
                    marginBottom: '10px',
                    flexDirection: 'column',
                    borderLeft: 'solid 5px rgb(1, 187, 139)',
                    padding: '25px',
                    '& header': {
                        backgroundColor: 'inherit',
                        boxShadow: 'unset',
                        borderBottom: '1px solid #BDC3C7',
                        marginBottom: '25px',
                    },
                }}>
                    <AppBar position="static" color="default" sx={{ background: 'white', boxShadow: 'none', borderBottom: '1px solid rgb(0,0,0,0.3)' }}>
                        <Tabs
                            value={activeTab}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            sx={{

                                '& button': {
                                    fontSize: '16px',
                                    color: '#6d757a',
                                },
                                '& .Mui-selected': {
                                    color: 'black',
                                    fontWeight: '900',
                                },
                                '& .MuiTabs-indicator': {
                                    height: '5px',
                                    backgroundColor: '#1976d2',
                                }
                            }}

                        >
                            <Tab label="Services" {...tabProps(0)} />
                            <Tab label="Manage Slots" {...tabProps(1)} />
                            <Tab label="MSWS" title="Manage slot wise seats" {...tabProps(2)} />
                            <Tab label="Edit detail" {...tabProps(3)} />

                        </Tabs>
                    </AppBar>
                    <AdminTab value={activeTab} index={0}>

                        <Services />
                    </AdminTab>
                    <AdminTab value={activeTab} index={1}>
                        Hui
                    </AdminTab>
                    <AdminTab value={activeTab} index={2}>
                        Kk
                    </AdminTab>
                    {/* <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Orders />
                </Paper> */}
                </div>


            </Grid>



        </Dashboard >
    )
}
function AdminTab(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            {...other}
            style={{ marginTop: '10px' }}
        >
            {value === index && <>{children}</>}
        </div>
    );
}

function tabProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
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
