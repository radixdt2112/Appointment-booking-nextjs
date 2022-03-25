import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useRouter } from 'next/router';
import MoreTimeOutlinedIcon from '@mui/icons-material/MoreTimeOutlined';
import ManageHistoryOutlinedIcon from '@mui/icons-material/ManageHistoryOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../../_features/shopAdmin/shopAdminSlice';




export const MainListItem = () => {
    const router = useRouter();


    const dispatch = useDispatch();
    const mainListItem = [
        // { name: "Dashboard", icon: <DashboardIcon />, url: "/shopAdmin", title: "Dashboard", tab: 0 },
        { name: "Services", icon: <ShoppingCartIcon />, url: "/shopAdmin/services", title: "Services", tab: 0 },
        { name: "Slots", icon: <MoreTimeOutlinedIcon />, url: "/shopAdmin/slots", title: "Slots", tab: 1 },
        { name: "MSWS", icon: <ManageHistoryOutlinedIcon />, url: "/shopAdmin/slots", title: "Manage Slot Wise Seats", tab: 2 },
        { name: "Shop Detail", icon: <EditIcon />, url: "/shopAdmin/shopDetail", title: "Shop Detail", tab: 3 }
    ];
    return <React.Fragment>
        {mainListItem?.map((item) =>
            <ListItemButton key={item.name} onClick={() => { dispatch(setActiveTab(item.tab)); }}>
                <ListItemIcon title={!!item.title ? item.title : ''}>
                    {item.icon}
                </ListItemIcon>
                <ListItemText title={!!item.title ? item.title : ''} primary={item.name} />
            </ListItemButton>
        )}
        {/* <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItemButton> */}

    </React.Fragment >


}



export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Customer reports
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItemButton>
    </React.Fragment>
);